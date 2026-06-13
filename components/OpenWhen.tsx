'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const envelopes = [
  {
    title: 'Open When Sad',
    message:
      'Awlelellee!! Rani sahiba dukhi hain.. Parde girakar light wight band kar do.. 😒!! Chal get back to work mere contact mei ho that means uh are not allowed to be sad .. !! Samjhii pagal??',
  },
  {
    title: 'Open When Angry',
    message:
      'Oii merse gussa hai?? Marunga abhi bohot jor se smjhi na?? Pagal... Terko permission kisne di merse gussa hone ki 😒 pagal didi chudail didi..',
  },
  {
    title: 'Open When Missing Me',
    message:
      'miss kar rhi to text kar na!! Mar thodi gaya hun kahin... 🙂_(kahi mere marne ke baad senty hokr toh nahi dekh rhi yeh for memoriess?? Fir toh ro le banta hai rona tumhara)',
  },
  {
    title: 'Open When You Need Motivation',
    message:
      'Mai hun na pagal andha bharosa hai tumprr!! Kranti likh do jaooo..... Jab merko jhel liya toh ye sab situations kya hi hain!! Lol 🤣',
  },
  {
    title: 'Open When You Feel Like Giving Up',
    message:
      'Haar maan le !! Tere bas ki kuchh na haii.. Nas was kaat kar mummy mummy chillati aana fir 😒😒!! Dettol laga kar bhag jaunga first aid bhi nahi karunhga jalta rhega..',
  },
];

export default function OpenWhen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-shell" id="open-when">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">For Later</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            Open When
          </h2>
          <p className="mt-4 text-paper-300/70 font-body max-w-lg">
            A few envelopes, set aside for days that aren&apos;t today.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {envelopes.map((env, i) => (
            <motion.button
              key={env.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              onClick={() => setOpenIndex(i)}
              className="relative aspect-[4/3] border border-gold/20 bg-gradient-to-br from-ink-900 to-ink-950 rounded-sm flex items-center justify-center group hover:border-gold/50 transition-colors duration-500"
              data-cursor-hover
            >
              {/* envelope flap */}
              <div className="absolute top-0 left-0 right-0 h-1/2 origin-top border-b border-gold/15 bg-ink-900/60 [clip-path:polygon(0_0,100%_0,50%_100%)] transition-transform duration-700 group-hover:-translate-y-1" />
              <span className="relative z-10 font-display text-xl md:text-2xl text-paper-100 text-center px-4">
                {env.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink-950/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg w-full bg-ink-900 border border-gold/20 rounded-sm p-8 md:p-12 shadow-[0_30px_80px_-30px_rgba(212,175,55,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="eyebrow mb-4">{envelopes[openIndex].title}</p>
              <p className="font-display italic text-lg md:text-xl text-paper-100 leading-relaxed">
                {envelopes[openIndex].message}
              </p>
              <button
                onClick={() => setOpenIndex(null)}
                className="eyebrow mt-8 text-paper-300 hover:text-gold-light transition-colors"
              >
                Seal it back up
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
