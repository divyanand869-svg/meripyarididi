'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface AdaptiveFrameProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  /**
   * priority: pass through to next/image for above-the-fold images
   */
  priority?: boolean;
  /**
   * frame: 'portrait' forces a tall frame, 'cinematic' forces a wide frame,
   * 'auto' (default) measures the image and decides.
   */
  frame?: 'auto' | 'portrait' | 'cinematic' | 'square';
  zoomOnHover?: boolean;
}

/**
 * AdaptiveFrame renders an image inside a container whose aspect ratio
 * matches the image's natural orientation, using object-fit: contain
 * within a styled letterbox so faces and important content are never
 * cropped. A subtle ambient backdrop (blurred duplicate) fills the frame.
 */
export default function AdaptiveFrame({
  src,
  alt,
  caption,
  className,
  priority,
  frame = 'auto',
  zoomOnHover = true,
}: AdaptiveFrameProps) {
  const [orientation, setOrientation] = useState<
    'portrait' | 'landscape' | 'square' | null
  >(frame === 'auto' ? null : frame === 'square' ? 'square' : frame === 'portrait' ? 'portrait' : 'landscape');

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (frame !== 'auto') return;
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio > 1.15) setOrientation('landscape');
    else if (ratio < 0.85) setOrientation('portrait');
    else setOrientation('square');
  };

  const aspectClass = clsx(
    'relative w-full overflow-hidden rounded-sm transition-all duration-700',
    {
      'aspect-[3/4] md:aspect-[4/5]': orientation === 'portrait',
      'aspect-[16/9] md:aspect-[16/10]': orientation === 'landscape',
      'aspect-square': orientation === 'square',
      'aspect-[4/5]': orientation === null,
    }
  );

  return (
    <figure className={clsx('w-full', className)}>
      <div
        className={clsx(
          aspectClass,
          'bg-ink-900 ring-1 ring-gold/15 shadow-[0_30px_80px_-40px_rgba(212,175,55,0.25)]'
        )}
      >
        {/* Ambient blurred backdrop fills frame without cropping subject */}
        <div className="absolute inset-0 scale-110 opacity-30 blur-2xl">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
        </div>

        <motion.div
          className="absolute inset-0"
          whileHover={zoomOnHover ? { scale: 1.03 } : undefined}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            onLoad={handleLoad}
            priority={priority}
          />
        </motion.div>

        {/* subtle gold corner accents */}
        <span className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-gold/40" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-gold/40" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-display italic text-sm text-paper-300/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
