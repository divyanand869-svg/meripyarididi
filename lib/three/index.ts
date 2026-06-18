/**
 * lib/three/index.ts
 * ------------------
 * Barrel export for the 3D foundation.
 * Import from '@/lib/three' in all components.
 */


export {
  getPicManifest,
  getPicSlice,
  loadTexture,
  preloadTextures,
  getCachedTexture,
  disposeAllTextures,
  useLoadedTexture,
  type PicEntry,
} from './AssetLoader';
