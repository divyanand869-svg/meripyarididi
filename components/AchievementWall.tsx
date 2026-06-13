'use client';

import { motion } from 'framer-motion';
import AdaptiveFrame from './AdaptiveFrame';

const exhibits = [
  {
    title: 'Kota, Survived',
    plate: 'dEROPPER specimen, returned alive and mostly functional',
  },
  {
    title: 'Chess Silver Medal',
    plate: 'Bichare Rohit ko dekhne chhodkrr chess khel rhi thi didiidii.... Hayye Re sttruggle!! 😔🤗',
  },
  {
    title: 'Khud Divyanand Pandey ki sabse pyari didiiii....',
    plate: 'A lifetime title, family approved, aur rehna padega hamesha sabse pyari didi bankar 🤗',
  },
  {
    title: 'Certified Sweetest Human',
    plate: 'itni sweet hun ki log lesbian bolne lage loll 🤣',
  },
];

export default function AchievementWall() {
  return (
    <section className="section-shell bg-ink-900/40" id="wall">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Gallery Wing</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            The Achievement Wall
          </h2>
          <p className="mt-4 text-paper-300/70 font-body max-w-lg">
            Spotlit, framed, and given the respect they were probably never given the first time around.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <AdaptiveFrame
              src="/images/group.jpg"
              alt="Group photo"
              caption="The whole crew, present and accounted for"
              frame="cinematic"
            />
          </motion.div>

          <div className="space-y-8">
            {exhibits.map((ex, i) => (
              <motion.div
                key={ex.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative pl-6 border-l border-gold/20 group"
                data-cursor-hover
              >
                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-gold/60 group-hover:shadow-[0_0_14px_rgba(212,175,55,0.7)] transition-shadow duration-500" />
                <h3 className="heading-sub text-xl md:text-2xl text-paper-100">{ex.title}</h3>
                <p className="font-body text-xs text-paper-300/50 mt-1 italic">{ex.plate}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
