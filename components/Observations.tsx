'use client';

import { motion } from 'framer-motion';

const observations = [
  'You pretend not to care. You actually care a lot. Pagal ho na!! Pretend nahi kartiii',
  'You are competitive in places where competition doesn\u2019t even exist. Har cheez mei jeetna hota haii.. Gadhi didi',
  'You somehow manage to be responsible and chaotic at the same time. Toxic kahii ki',
  'You can be incredibly annoying. Unfortunately, so can I. Aur karta rahunga bhi pareshan tumhe.. Meri pyari didi ho kya kar loge',
  'You remember things you claim not to remember, the moment it benefits you. Pagall..GAlat samay mei galat cheezein yaad aa jati tumhe!!',
  'You have a very specific laugh reserved for when you\u2019re trying not to laugh. Khikhikhi khi karke hasti tabbb..',
  'You give advice you would never personally follow. Padhai karle pagliii',
  'PYaruu didi bolta hun toh pagal hone lagti 😒 par mai to bolunga.. 👻_(Yeh bhi bolti ki normal hi bhai ho mere kuchh special naii..) 😒 Ek baar toh bola tha ki anand aur mai same hun tumhare liyye!! Yaaad hai mujhe',
  'You\u2019re more sentimental than you\u2019ll ever admit out loud. Sentyyy pagal gadhi kahi ki',
  'You have never once let me win an argument, even when I was right. kehta tha ki nashe achhi cheez hain maani hi nahi kahii kkhud kar lo mai apki jagah logo ko bata dungiiii ye cheez 🤣👻',
];

export default function Observations() {
  return (
    <section className="section-shell bg-ink-900/40" id="learned">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Field Notes</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            Things I Learned About You
          </h2>
          <p className="mt-4 text-paper-300/70 font-body max-w-lg">
            Collected over time. Unverified by you. Accurate anyway.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-px bg-gold/10 rounded-sm overflow-hidden">
          {observations.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
              className="bg-ink-950 p-6 md:p-8 hover:bg-ink-900 transition-colors duration-500"
              data-cursor-hover
            >
              <span className="font-display text-gold/40 text-sm mr-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-sub text-base md:text-lg text-paper-200 leading-relaxed inline">
                {line}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
