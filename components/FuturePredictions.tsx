'use client';

import { motion } from 'framer-motion';

const predictions = [
  { text: 'Will still overthink random things at 1 a.m.', probability: '100%' },
  { text: 'Will achieve something ridiculous again, probably soon.', probability: '97%' },
  { text: 'Will continue getting annoyed by me, on schedule.', probability: '100%' },
  { text: 'Will deny being competitive, then immediately compete.', probability: '99%' },
  { text: 'Will pretend this website didn\u2019t make her feel anything.', probability: '12%' },
  { text: 'Will read this section twice.', probability: '88%' },
];

export default function FuturePredictions() {
  return (
    <section className="section-shell" id="predictions">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Forecast</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            Future Predictions
          </h2>
          <p className="mt-4 text-paper-300/70 font-body max-w-lg">
            Based on extensive, mostly unscientific observation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions.map((p, i) => (
            <motion.div
              key={p.text}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="border border-gold/15 rounded-sm p-6 bg-ink-900/40 flex flex-col justify-between min-h-[150px]"
              data-cursor-hover
            >
              <p className="font-sub text-lg text-paper-100 leading-snug">{p.text}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="eyebrow text-[0.6rem]">Probability</span>
                <span className="font-display text-2xl text-gold-light">{p.probability}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
