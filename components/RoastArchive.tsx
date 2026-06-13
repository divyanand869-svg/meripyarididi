'use client';

import { motion } from 'framer-motion';

const cases = [
  {
    label: 'Evidence #01',
    body: 'She was wrong.\nI was right.',
    footer: '(According to me.)',
  },
  {
    label: 'Case File #02',
    body: 'Claimed she "doesn\u2019t care."\nProceeded to care for the next 45 minutes.',
    footer: 'Verdict: Cared.',
  },
  {
    label: 'Evidence #03',
    body: 'Na sunti na padhti mere chats beech mei msgs ignore karne lagi thi 2-2 din...😒 isko toh marunga kisi din pakadkar mai',
    footer: 'Margin of error: 22 minutes.',
  },
  {
    label: 'Case File #04',
    body: 'Lost an argument.\nWon the silence that followed. ladai krke shant ho jati mai sorry sorry karta rehta 🤧🤧.. Hayye yeh struggle',
    footer: 'Tactical retreat.',
  },
  {
    label: 'Evidence #05',
    body: 'Said "I\u2019m not mad."\nWas mad. theek hai bolkrr baat karna band kar deti thi 😒 yaad hai sab mujhe..',
    footer: 'Confidence: very high.',
  },
  {
    label: 'Case File #06',
    body: 'Changed her opinion mid-argument.\nDenied changing it.',
    footer: 'Status: unresolved.',
  },
  {
    label: 'Case File #07',
    body: 'Argument duration: 43 minutes\nWinner: Nobody',
    footer: 'Damage: Both suffered.',
  },
];

export default function RoastArchive() {
  return (
    <section className="section-shell" id="roast">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Exhibit Hall B</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            The Roast Archive
          </h2>
          <p className="mt-4 text-paper-300/70 font-body max-w-lg">
            Filed, dated, and kept for the record. All charges admissible.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 24, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="border border-gold/15 bg-ink-900/50 p-6 rounded-sm flex flex-col justify-between min-h-[160px]"
              data-cursor-hover
            >
              <div>
                <p className="eyebrow text-[0.6rem] mb-3">{c.label}</p>
                <p className="font-display text-lg md:text-xl text-paper-100 whitespace-pre-line leading-snug">
                  {c.body}
                </p>
              </div>
              <p className="font-body text-xs text-gold-light/70 mt-4 italic">
                {c.footer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
