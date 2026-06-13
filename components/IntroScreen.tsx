'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen({
  onEnter,
}: {
  onEnter: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; left: number; top: number; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 6,
    }));
    setParticles(generated);

    const t = setTimeout(() => setShowPrompt(true), 3200);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (!showPrompt) return;
    setVisible(false);
    setTimeout(onEnter, 900);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 cursor-pointer"
          onClick={handleClick}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          role="button"
          aria-label="Click anywhere to begin"
        >
          <div className="particle-field">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="ambient-particle"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center px-6 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="font-display text-2xl md:text-4xl text-paper-100 leading-relaxed"
            >
              Some people take whole life.
              <br />
              <span className="italic-line">You somehow managed it in 3 yrs onlyyy_  <br /> ( Meri pyaruu didi toh day 1 se thi 🤗🤗!! website banani ab seekhi maine lolll. )</span>
            </motion.p>

            <AnimatePresence>
              {showPrompt && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="eyebrow mt-12"
                >
                  Click anywhere to begin
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
