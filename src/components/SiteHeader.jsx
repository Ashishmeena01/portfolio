import { useState } from 'react';
import { motion } from 'motion/react';

const navigationItems = ['About', 'Work', 'Skills', 'Contact'];

export default function SiteHeader() {
  const [activeLink, setActiveLink] = useState(null);

  return (
    <motion.header className="sticky top-0 z-50 mx-auto w-full border-b border-ink/10 bg-gray-50/95 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <a href="#top" className="z-10 font-display text-lg font-extrabold tracking-tightest text-ink">
          Dev
        </a>
        <motion.nav layout className="hidden items-center gap-8 sm:flex">
          {navigationItems.map((label, index) => (
            <motion.a
              layout
              key={label}
              href={`#${label.toLowerCase()}`}
              className="relative cursor-pointer py-2 text-sm font-medium tracking-wide text-ink/65 transition-colors hover:text-ink"
              onMouseEnter={() => setActiveLink(index)}
              onMouseLeave={() => setActiveLink(null)}
            >
              <span>{label}</span>
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-ink"
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
