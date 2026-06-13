'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const screenshots = [
  { src: '/screenshots/chat-01.jpg', caption: 'Yeh yaad hai?? Bohot maja aaya tha!! Par sirf 1 baar padhi mere sath.. 😒' },
  { src: '/screenshots/chat-02.jpg', caption: 'Ye yaad?? 🤣 Raat mei pehli baar Harsh ke sath call kiya tha mujhe toh maja aaya tha diidiii...' },
  { src: '/screenshots/chat-03.jpg', caption: 'Hayyee 🙂!! sharam aa rhi yeh dekhkr.. Kitni nautanki aur nakhre karta hun yarr mai..' },
  { src: '/screenshots/chat-04.jpg', caption: 'Self aware ho yyrrr 🤣🤗!! Mast humour hai tumhara..' },
  { src: '/screenshots/chat-05.jpg', caption: 'Hayyee!! Kitti pyari lag rhi justify kar rhi  ki nahi mai lesbian nahi hun 🤣🤗👻' },
  { src: '/screenshots/chat-06.jpg', caption: 'Yeh kaise bhulu?? Mere hatho se click kii hui tumhari sabse sundar photooo 🤣!! Bas chale toh tumhare laptop and mobile ka wallpaper laga du ise 👻' },
];

export default function ChatArchive() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section-shell bg-ink-900/40" id="chats">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Preserved Correspondence</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            The Chat Archive
          </h2>
          <p className="mt-4 text-paper-300/70 font-body max-w-lg">
            Six conversations, kept exactly as they were. Click to read them properly.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((s, i) => (
            <motion.button
              key={s.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(i)}
              className="group relative text-left border border-gold/15 rounded-sm overflow-hidden bg-ink-950 hover:border-gold/40 transition-colors duration-500"
              data-cursor-hover
              aria-label={`Open ${s.caption}`}
            >
              <div className="relative w-full aspect-[3/4] bg-ink-900">
                <Image
                  src={s.src}
                  alt={s.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <p className="font-display italic text-sm text-paper-300/80 p-4">
                {s.caption}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-ink-950/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[80vh] aspect-[3/4] bg-ink-900 rounded-sm overflow-hidden ring-1 ring-gold/20">
                <Image
                  src={screenshots[active].src}
                  alt={screenshots[active].caption}
                  fill
                  sizes="80vw"
                  className="object-contain"
                />
              </div>
              <p className="font-display italic text-center text-paper-200 mt-4 text-lg">
                {screenshots[active].caption}
              </p>
              <button
                onClick={() => setActive(null)}
                className="absolute -top-10 right-0 eyebrow text-paper-300 hover:text-gold-light transition-colors"
                aria-label="Close"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
