/**
 * AssetLoader
 * -----------
 * Shared Three.js texture cache so multiple R3F scenes never load
 * the same image twice. Also provides the canonical list of /pics/
 * images so scenes don't hard-code filenames.
 *
 * Design
 * - Pure singleton Map<url, THREE.Texture>
 * - R3F useTexture hook handles the actual GPU upload; this cache
 *   wraps it so the loader promise is reused
 * - Sizes textures down to PerformanceConfig.textureSizeCap at load time
 *   by rendering to an OffscreenCanvas before GPU upload
 */

import * as THREE from 'three';


// ─── Pic manifest ────────────────────────────────────────────────────────────
// All photos in /public/pics/ — auto-discoverable at build time via
// the static manifest below. Add new pics here; they propagate to every scene.

export interface PicEntry {
  /** Public URL, e.g. "/pics/pic-01.jpeg" */
  url: string;
  /** Display label for captions / accessibility */
  label: string;
  /** Numeric index (1-based) */
  index: number;
}

/**
 * Master manifest of /public/pics/ images.
 * Files use the "pic N.jpeg" naming from the project.
 * URL-encoding handled at access time.
 */
const PIC_FILENAMES: readonly string[] = [
  'pic 1.jpeg',
  'pic 2.jpeg',
  'pic 3.jpeg',
  'pic 4.jpeg',
  'pic 5.jpeg',
  'pic 6.jpeg',
  'pic 7.jpeg',
  'pic 8.jpeg',
  'pic 9.jpeg',
  'pic 10.jpeg',
  'pic 11.jpeg',
  'pic 12.jpeg',
] as const;

/** Returns the full set of pic entries with public-safe URLs */
export function getPicManifest(): PicEntry[] {
  return PIC_FILENAMES.map((filename, i) => ({
    url: `/pics/${encodeURIComponent(filename)}`,
    label: `Memory ${i + 1}`,
    index: i + 1,
  }));
}

/** Return a slice of the manifest (0-indexed start, exclusive end) */
export function getPicSlice(start: number, end: number): PicEntry[] {
  return getPicManifest().slice(start, end);
}

// ─── Texture cache ────────────────────────────────────────────────────────────

const _cache = new Map<string, THREE.Texture>();
const _pending = new Map<string, Promise<THREE.Texture>>();

/**
 * Resize an image to fit within `maxSize` using OffscreenCanvas if available,
 * falling back to a regular canvas. Returns a new ImageBitmap or the original.
 */
async function resizeImage(
  img: HTMLImageElement,
  maxSize: number
): Promise<TexImageSource> {
  const { width, height } = img;
  if (width <= maxSize && height <= maxSize) return img;

  const scale = maxSize / Math.max(width, height);
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  if (typeof OffscreenCanvas !== 'undefined') {
    const oc = new OffscreenCanvas(w, h);
    const ctx = oc.getContext('2d')!;
    ctx.drawImage(img, 0, 0, w, h);
    return oc.transferToImageBitmap();
  }

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, w, h);
  return canvas;
}

/**
 * Load a texture with automatic caching and size capping.
 * Safe to call concurrently for the same URL – deduplicates the fetch.
 */
export function loadTexture(url: string): Promise<THREE.Texture> {
  if (_cache.has(url)) return Promise.resolve(_cache.get(url)!);
  if (_pending.has(url)) return _pending.get(url)!;

  const textureSizeCap = 2048;

  const promise = new Promise<THREE.Texture>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = async () => {
      try {
        const source = await resizeImage(img, textureSizeCap);
        const texture = new THREE.Texture(source as HTMLImageElement);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        // Mipmap filtering for quality
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        _cache.set(url, texture);
        _pending.delete(url);
        resolve(texture);
      } catch (err) {
        _pending.delete(url);
        reject(err);
      }
    };

    img.onerror = () => {
      _pending.delete(url);
      reject(new Error(`AssetLoader: failed to load "${url}"`));
    };

    img.src = url;
  });

  _pending.set(url, promise);
  return promise;
}

/**
 * Preload a batch of textures. Returns a promise that resolves when all
 * succeed (individual failures are caught and logged, not thrown).
 */
export async function preloadTextures(urls: string[]): Promise<void> {
  await Promise.all(
    urls.map((url) =>
      loadTexture(url).catch((err) => {
        console.warn('[AssetLoader]', err.message);
      })
    )
  );
}

/** Retrieve a cached texture synchronously — returns undefined if not loaded */
export function getCachedTexture(url: string): THREE.Texture | undefined {
  return _cache.get(url);
}

/** Dispose all cached textures — call on scene unmount if needed */
export function disposeAllTextures(): void {
  _cache.forEach((tex) => tex.dispose());
  _cache.clear();
  _pending.clear();
}

/**
 * React hook: returns a texture from cache if available, undefined otherwise.
 * Triggers a state update when the texture loads so the component re-renders.
 */
import { useState, useEffect } from 'react';

export function useLoadedTexture(
  url: string
): THREE.Texture | undefined {
  const [texture, setTexture] = useState<THREE.Texture | undefined>(
    () => getCachedTexture(url)
  );

  useEffect(() => {
    if (getCachedTexture(url)) {
      setTexture(getCachedTexture(url));
      return;
    }
    let cancelled = false;
    loadTexture(url)
      .then((t) => {
        if (!cancelled) setTexture(t);
      })
      .catch((err) => console.warn('[useLoadedTexture]', err.message));
    return () => {
      cancelled = true;
    };
  }, [url]);

  return texture;
}
