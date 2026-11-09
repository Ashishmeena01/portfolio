import React from 'react';
import { motion } from 'motion/react';
export default function Hero({ containerVariants, letterVariants }) {
  const Head = 'I build software';
  const Head2 = 'that works.'
  return (
<section id="top" className="max-w-5xl mx-auto px-6 pt-24 pb-20">
          <p className="text-sm text-muted mb-6">Ashish Meena — Software Engineer</p>

          {/* Fixed overlapping / conflicting props */}
          <motion.h1
            variants={containerVariants}
            initial="init"
            animate="anime"
            className="font-display font-bold tracking-tightest leading-[0.95] text-[13vw] sm:text-[7rem] md:text-[8rem]"
          >
            {Head.split("").map((el, indx) => (
              <motion.span variants={letterVariants} key={indx} className="inline-block">
                {el === " " ? "\u00A0" : el}
              </motion.span>
            ))}

            <br />
            {Head2.split("").map((el, indx) => (
              <motion.span variants={letterVariants} key={indx} className="inline-block">
                {el === " " ? "\u00A0" : el}
              </motion.span>
            ))}
          </motion.h1>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-t border-ink pt-8">
            <p className="max-w-md text-muted">
              Full-stack engineer focused on fast, dependable products — from the
              database to the pixel. Based in Indore, working with teams anywhere.
            </p>
            <a href="#work" className="text-sm font-medium underline underline-offset-4 whitespace-nowrap">
              See selected work
            </a>
          </div>
        </section>
  );
}


