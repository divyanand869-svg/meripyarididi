'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// NOTE: This is a client-side "lock" for atmosphere, not real security.
// Set your chosen passphrase here.
const PASSCODE = 'kuchu';

export default function MemoryVault() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === PASSCODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <section className="section-shell" id="vault">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl mx-auto text-center"
        >
          <p className="eyebrow mb-4">Restricted Access</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            The Memory Vault
          </h2>
          <p className="mt-4 text-paper-300/70 font-body">
            Tumhari sabse pyarii pic...
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!unlocked ? (
              <motion.form
                key="lock"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="border border-gold/20 rounded-sm p-10 bg-ink-900/60 text-center"
              >
                <motion.div
                  animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="mb-6 flex justify-center"
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold-light">
                    <rect x="4" y="11" width="16" height="9" rx="1" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </motion.div>
                <label htmlFor="vault-pass" className="eyebrow block mb-3">
                  Nickname dalo apna !!_ To see something !! tumhaari sabse pyaruu si pic jise maine kheechi hai... 👻👻
                </label>
                <input
                  id="vault-pass"
                  type="password"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-ink-950 border border-gold/20 rounded-sm px-4 py-3 text-center font-body text-paper-100 focus:border-gold/50 outline-none tracking-widest"
                  placeholder="••••••••"
                />
                <button
                  type="submit"
                  className="eyebrow mt-6 inline-block border border-gold/30 rounded-sm px-6 py-3 hover:border-gold/60 transition-colors"
                  data-cursor-hover
                >
                  Unlock
                </button>
                {error && (
                  <p className="mt-4 text-xs text-paper-300/60 italic font-display">
                    That&apos;s not it. Think harder.
                  </p>
                )}
              </motion.form>
            ) : (
              <motion.div
  key="vault"
  initial={{ opacity: 0, rotateX: -10, y: 20 }}
  animate={{ opacity: 1, rotateX: 0, y: 0 }}
  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  className="border border-gold/30 rounded-sm overflow-hidden bg-ink-900/80 shadow-[0_30px_80px_-30px_rgba(212,175,55,0.35)]"
>
  <div className="relative w-full h-[520px]">
    <img
      src="/images/vault-photo.jpg"
      alt="Memory Vault"
      className="absolute inset-0 w-full h-full object-contain"
    />
  </div>
</motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
