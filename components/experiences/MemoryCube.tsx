'use client';

/**
 * MemoryCube
 * ──────────
 * A CSS perspective 3D cube showing 6 photos from /pics/.
 * Drag / touch to rotate on any axis.
 * Auto-rotates slowly when idle.
 *
 * No WebGL — pure CSS transform3d + Framer Motion drag.
 * Works identically on mobile.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { getPicSlice } from '@/lib/three';

// pics 6–11 (0-indexed 5–10) on the cube faces
const FACE_PICS = getPicSlice(5, 11);

// CSS transforms for each face of a unit cube (size = 1 = 100%)
const FACES: { label: string; transform: string }[] = [
  { label: 'Front',  transform: 'rotateY(0deg)   translateZ(140px)' },
  { label: 'Back',   transform: 'rotateY(180deg)  translateZ(140px)' },
  { label: 'Right',  transform: 'rotateY(90deg)   translateZ(140px)' },
  { label: 'Left',   transform: 'rotateY(-90deg)  translateZ(140px)' },
  { label: 'Top',    transform: 'rotateX(90deg)   translateZ(140px)' },
  { label: 'Bottom', transform: 'rotateX(-90deg)  translateZ(140px)' },
];

export default function MemoryCube() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation values
  const rotX = useMotionValue(20);
  const rotY = useMotionValue(-30);
  const springX = useSpring(rotX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rotY, { stiffness: 80, damping: 20 });

  // Auto-rotate when idle
  const isDragging = useRef(false);
  const autoRafRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReduced) return;

    let lastTime = 0;
    const tick = (t: number) => {
      if (!isDragging.current) {
        const dt = Math.min(t - lastTime, 50) / 1000;
        rotY.set(rotY.get() + 12 * dt);
        rotX.set(Math.sin(t * 0.0004) * 15 + 10);
      }
      lastTime = t;
      autoRafRef.current = requestAnimationFrame(tick);
    };
    autoRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoRafRef.current);
  }, [prefersReduced, rotX, rotY]);

  // Pointer / touch drag
  const dragStart = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, rx: rotX.get(), ry: rotY.get() };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [rotX, rotY]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    rotY.set(dragStart.current.ry + dx * 0.5);
    rotX.set(dragStart.current.rx - dy * 0.5);
  }, [rotX, rotY]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  if (prefersReduced) {
    // Static grid fallback
    return (
      <section className="section-shell" id="memory-cube">
        <div className="container-shell max-w-2xl mx-auto text-center">
          <p className="eyebrow mb-4">Memory Cube</p>
          <div className="grid grid-cols-3 gap-3">
            {FACE_PICS.map((pic, i) => (
              <div key={pic.url} className="relative aspect-square rounded-sm overflow-hidden ring-1 ring-gold/20">
                <Image src={pic.url} alt={pic.label} fill sizes="33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell" id="memory-cube">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-12 max-w-2xl mx-auto text-center"
        >
          <p className="eyebrow mb-4">Memory Cube</p>
          <h2 className="heading-display text-4xl md:text-5xl text-paper-100">
            Six sides. Infinite memories.
          </h2>
          <p className="mt-4 text-paper-300/60 font-body text-sm">
            Drag to rotate 👻
          </p>
        </motion.div>

        {/* Perspective container */}
        <div
          className="relative mx-auto flex items-center justify-center select-none"
          style={{ width: 280, height: 280, perspective: '900px', cursor: 'grab' }}
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {/* The cube */}
          <motion.div
            style={{
              width: 280,
              height: 280,
              transformStyle: 'preserve-3d',
              rotateX: springX,
              rotateY: springY,
            }}
          >
            {FACES.map((face, i) => (
              <div
                key={face.label}
                style={{
                  position: 'absolute',
                  width: 280,
                  height: 280,
                  transform: face.transform,
                  backfaceVisibility: 'visible',
                  overflow: 'hidden',
                  borderRadius: 4,
                  boxShadow: '0 0 0 1px rgba(212,175,55,0.3)',
                }}
              >
                {FACE_PICS[i] && (
                  <Image
                    src={FACE_PICS[i].url}
                    alt={FACE_PICS[i].label}
                    fill
                    sizes="280px"
                    className="object-cover pointer-events-none"
                    draggable={false}
                  />
                )}
                {/* Subtle gold overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            ))}
          </motion.div>

          {/* Floor shadow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: 200,
              height: 20,
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.15) 0%, transparent 70%)',
              filter: 'blur(8px)',
              transform: 'translateX(-50%) translateY(60px)',
            }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 text-center font-display italic text-paper-300/50 text-lg"
        >
          Har taraf se dekho, har jagah tum ho. 🤗
        </motion.p>
      </div>
    </section>
  );
}
