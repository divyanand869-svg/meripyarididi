'use client';

import { motion } from 'framer-motion';
import AdaptiveFrame from './AdaptiveFrame';

const roles = ['Didi.', 'Dost.', 'Chudail 👻.', 'BHooottni.', 'Meri sardard.'];

export default function Hero() {
  return (
    <section className="section-shell min-h-screen flex items-center" id="hero">
      <div className="container-shell grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <p className="eyebrow mb-6">An archive, of sorts</p>
          <h1 className="heading-display text-5xl md:text-7xl text-paper-100 leading-[1.05] mb-6">
            Thank you for being meri pyaruu didi 🤗,
            <br />
            <span className="text-gold-light">Whoever You Are</span>
          </h1>

          <div className="font-sub text-xl md:text-2xl text-paper-300 space-y-1">
            {roles.slice(0, -1).map((r, i) => (
              <motion.p
                key={r}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
              >
                {r}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-gold italic font-display text-2xl md:text-3xl pt-2"
            >
              {roles[roles.length - 1]}
            </motion.p>
          </div>

          <div className="gold-rule mt-10 max-w-xs" />
          <p className="mt-6 font-body text-sm text-paper-300/70 max-w-sm">
            Chats nahi padh pati website kya padhegi.. 😒👻👻 Par boht pyara banaya hai...Padhna toh padega!! 🤣
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2"
        >
          <AdaptiveFrame
            src="/images/portrait.jpg"
            alt="Portrait"
            caption="Meri pyari pudina didi..🤗"
            priority
            frame="portrait"
          />
        </motion.div>
      </div>
    </section>
  );
}
