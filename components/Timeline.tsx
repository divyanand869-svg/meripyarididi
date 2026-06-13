'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const events = [
  {
    date: 'Somewhere mere april attempt 2024 ke pehle',
    time: 'Dopeher ka',
    title: 'The Beginning',
    description:
      'The exact moment this whole thing started. Pehli bar mili thi mujhe meri pyari sumiko didiii...',
  },
  {
    date: 'Week One',
    time: '',
    title: ' Bohot sari yappings',
    description:
      'kitne incidents sunaya jinka koi point bhi nahi tha...kabhi bore nahi hue maja aay abohot yrr bohot hase hain sath mei..!! Aur unintentionally meri pyari didi ban gai...',
  },
  {
    date: 'Somewhere in the middle',
    time: '',
    title: 'Pyari pyari baatein started..',
    description:
      'A point of no return. Once the "Mele pyale bhaiiyya" exist, there is no going back to being normal acquaintances.',
  },
   
  {
    date: 'Now',
    time: '',
    title: 'This Surprise for most important person in my life',
    description:
      'Built quietly, in stolen pockets of time, because some things deserve more effort than a message that says "THANKYOU FOR BEING THERE."',
  },
  {
    date: 'Next',
    time: '',
    title: 'Whatever Happens Next',
    description:
      'Reserved. To be filled in later, because this archive is not finished, and neither is the friendship it documents.',
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.3,
  });

  return (
    <section className="section-shell" id="timeline">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-20 max-w-2xl"
        >
          <p className="eyebrow mb-4">The Record</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            Timeline
          </h2>
          <p className="mt-4 text-paper-300/70 font-body max-w-lg">
            Every story has a starting point. This one has a timestamp.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative pl-10 md:pl-16">
          {/* base line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gold/10" />
          {/* animated growing line */}
          <motion.div
            className="absolute left-0 top-0 w-px bg-gold origin-top"
            style={{
              scaleY: lineHeight,
              height: '100%',
              boxShadow: '0 0 12px rgba(212,175,55,0.5)',
            }}
          />

          <div className="space-y-20">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <span className="absolute -left-10 md:-left-16 top-1.5 h-3 w-3 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.7)]" />
                <p className="eyebrow mb-2">
                  {event.date}
                  {event.time && (
                    <span className="text-paper-300/50"> &nbsp;&middot;&nbsp; {event.time}</span>
                  )}
                </p>
                <h3 className="heading-sub text-2xl md:text-3xl text-paper-100 mb-2">
                  {event.title}
                </h3>
                <p className="font-body text-sm md:text-base text-paper-300/70 max-w-xl leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* future entries marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-20"
          >
            <span className="absolute -left-10 md:-left-16 top-1.5 h-3 w-3 rounded-full border border-gold/40" />
            <p className="eyebrow mb-2 opacity-50">To be continued</p>
            <p className="font-display italic text-xl text-paper-300/50">
              &mdash; more entries will appear here, eventually &mdash;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
