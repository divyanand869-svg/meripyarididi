'use client';

import { motion } from 'framer-motion';

const achievements = [
  {
    title: 'Kota, Survived',
    detail: 'Dropped into the Kota ecosystem, somehow jinda laut aaiiii.',
    tag: 'Milestone',
  },
  {
    title: 'Chess Silver Medal toh hai hi',
    detail: 'While certain people were busy staring at Rohit (BIchare jiju ko uss din didi ne chhodkrr sabhi ne dekha), madam was out collecting silver medals.',
    tag: 'Achievement',
  },
  {
    title: 'Khud Divyanand Pandey Ki Sabse Pyari Didi',
    detail: 'A lifetime title.permanently assigned, and impossible to resign from.',
    tag: 'Legacy',
  },
  {
    title: 'Certified Sweetest Human',
    detail: 'So sweet that people started inventing entire theories about it. Truly a dangerous level of sweetness. Pyari meethi didi',
    tag: 'Special Recognition',
  },
];

export default function Resume() {
  return (
    <section className="section-shell" id="resume">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Permanent Collection</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            The Résumé She Never Asked For
          </h2>
          <p className="mt-4 text-paper-300/70 font-body max-w-lg">
            None of this was for show. Most of it she probably forgot about.
            Here it is anyway, framed properly for once.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border border-gold/15 bg-ink-900/40 p-6 rounded-sm hover:border-gold/40 transition-colors duration-500"
              data-cursor-hover
            >
              <span className="eyebrow text-[0.6rem]">{item.tag}</span>
              <h3 className="heading-sub text-xl md:text-2xl text-paper-100 mt-3 mb-2">
                {item.title}
              </h3>
              <p className="font-body text-sm text-paper-300/70 leading-relaxed">
                {item.detail}
              </p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold/60 transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
