'use client';

import { motion } from 'framer-motion';

const paragraphs = [
  `Sachhi kya likhna hai pata nahi ... Thoda random, thoda idhar-udhar aur beech beech mein unnecessary baatein bhi aa sakti hain... kyunki waise bhi hamari conversations kab seedhe topic par rehti hain? HAAHAA Pehle din se hi`,

  `Ek time toh aaya tha lagta tha agar notification hai whatsapp katoh didi ne hi msg kiyua hoga lolll... `,

  `Itna comfortable mai ksii ke sath tha hi nahi.. dheere dheere build hota par didii ke sath  day 1 se hi ... huhhh!! 🤣 Sab kuchh skip ho gyaa meri phyaruu didi ban gai day 1 se hii..`,

  `Oii yaad hai ypt prr pehli baar mile the !! Maja aaya tha bandar bhaiya waha bola tha tumne !! Hayye maja aata yaad krke sab!!  MEri pyari pudina diidii...`,

  `Kuch aur bhi notice kiya hai maine, pagloo... Tum jitna dikhati ho usse kaafi zyada care karti ho. Bahar se dekho to lagta hai 'mujhe kya', 'farak nahi padta', 'jo bhi hai'. Lekin phir koi choti si baat ho jaati hai aur turant pata chal jaata hai ki actually farak padta hai 🤭 paaglii ho na.. You do care maano ya na maano.`,

  `ladte ladte ladai ka topic hi bhul jati 😒.. Kitna ladti thii yrr 🤧 Mai  toh seedha tha kabhii ladai nahi ki 🤣.`,

  `Waise official record ke liye, maximum arguments main hi jeeta tha. Source: trust me.`,

  `Mujhe hamari random conversations bhi bahut pasand hain. Woh wali jinka koi purpose nahi hota. Bas kisi random cheez se start hui aur pata nahi kaise ek ghante ki conversation ban gayi.`,

  `Isliye timeline hai. Isliye screenshots hain. Isliye roast archive hai. Isliye achievements hain. Isliye ye sab hai. Taaki ye friendship bas yaad na rahe. Properly preserve ho.`,

  `Aur honestly, tumhari achievements ki baat karun to tumne kaafi cheezon mein achha kiya hai... Ahhem achievements ki baat horiii hai to seedha jinda Divyanand achieve kiya hai tumne 😎🤗`,

  `Aur phir bhi somehow tum normal behave karti ho jaise ye sab koi badi baat hi nahi thi. Mujhe lagta hai kabhi kabhi tum khud bhi realize nahi karti ki tumne kya achieve kiya hai 🤣👻.`,

  `Bas ek request hai. Aisi hi rehna. Thodi competitive. Thodi stubborn. Thodi annoying. Kyunki agar woh sab change ho gaya to phir maja nahi ayega`,

  `Aur hopefully future mein is website mein aur bhi memories add karni padengi. Aur bhi screenshots. Aur bhi roast files. Aur bhi arguments jisme obviously main jeetunga.`,

  `Aur jiske liye shayad maine jitna bola hai usse zyada feel kiya hai.`,

  `THANKYOU FOR BEING HERE ALWAYS.`,

  `Aur haan... kal se phir irritate karna shuru kar dunga.`,

  `— Your Professional Irritator`
];

export default function TheLetter() {
  return (
    <section className="section-shell bg-ink-900/40" id="letter">
      <div className="container-shell max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 text-center"
        >
          <p className="eyebrow mb-4">Read When Ready</p>
          <h2 className="heading-display text-4xl md:text-6xl text-paper-100">
            The Letter
          </h2>
        </motion.div>

        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={
                i === paragraphs.length - 1
                  ? 'font-display italic text-xl text-gold-light text-right pt-6'
                  : 'font-sub text-base md:text-lg leading-[1.9] text-paper-200/90'
              }
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
