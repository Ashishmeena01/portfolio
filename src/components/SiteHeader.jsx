import { useState } from 'react';
import { motion } from 'motion/react';

const navigationItems = ['About', 'Work', 'Skills', 'Contact'];

export default function SiteHeader() {
  const [activeLink, setActiveLink] = useState(null);

  return (
    <motion.header className="box-border overflow-hidden z-50 backdrop-blur-md rounded-t-2xl py-2 w-full mx-auto sticky top-1">
      <div className="w-full h-full absolute left-0 top-0 bg-gradient-to-b from-gray-100 from-20% z-0" />
      <div className="max-w-5xl gap-52 rounded-md mx-auto px-6 flex items-center justify-between z-10">
        <a href="#top" className="font-display text-lg tracking-tightest font-extrabold text-white drop-shadow-[0_0.2px_0.65px_rgba(0,0,0,0.8)] z-10">
          Dev
        </a>
        <motion.nav layout className="hidden relative sm:flex items-center gap-10 font-extrabold text-white drop-shadow-[0_0.2px_0.5px_rgba(0,0,0,0.8)]">
          {navigationItems.map((label, index) => (
            <motion.a
              layout
              key={label}
              href={`#${label.toLowerCase()}`}
              className="cursor-pointer"
              onMouseEnter={() => setActiveLink(index)}
              onMouseLeave={() => setActiveLink(null)}
            >
              <span>{label}</span>
              <motion.div
                layoutId="hover"
                className=""
                style={{ display: activeLink === index ? 'flex' : 'none' }}
              />
            </motion.a>
          ))}
        </motion.nav>
        <a
          href="#contact"
          className="z-10 inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ink/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Resume
        </a>
      </div>
    </motion.header>
  );
}
