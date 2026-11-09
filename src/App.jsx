import React, { useEffect, useState } from 'react'
import { motion } from "motion/react";
import Hero from './pages/Hero';
import Contributions from './pages/Contributions';
import About from './pages/About';
import Work from './pages/Work';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import StickyCardsDemo from './pages/StickyCardsDemo';


const projects = [
  {
    name: 'Video Transciption',
    year: '2026',
    path: "https://video-transcription-frontend.vercel.app/",
    desc: 'A web App where you can chat with ai chat bot and You can generate transcription(caption) of your videos Feel Free to use it any time.',
    tags: ['React', 'Express', 'Postgres + Prisma'],
  },
  {
    name: 'Coming Soon',
    year: '2026',
    path: "#",
    desc: 'Many project which are waiting to go Production.',
    tags: ['Building', 'It', 'with', 'Heart'],
  },
]

// Fixed array syntax error (removed the trailing/orphan comma)
const skills = [
  'TypeScript', 'React', 'Node.js', 'PostgreSQL',
  'Docker', 'GraphQL', 'System design', 'Rust',
]

function App() {
  const [contributions, setContributions] = useState(null);
  const [active, setActive] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);


  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/contributions', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Contribution API is unavailable.');
        return response.json();
      })
      .then(setContributions)
      .catch((error) => {
        if (error.name !== 'AbortError') setContributions({ error: error.message });
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  // Variants for parent container staggering
  const containerVariants = {
    init: { opacity: 0, filter: "blur(10px)" },
    anime: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
    transition: {
      delay: 2
    }
  };

  // Variants for individual letter animation
  const letterVariants = {
    init: { y: 50, opacity: 0, filter: "blur(10px)" },
    anime: { y: 0, opacity: 1, transition: { duration: 0.4 }, filter: "blur(0px)" },
  };

  const NavItem = [
    "About",
    "Work",
    "Skills",
    "Contact"
  ]

  return (
    <div className=" min-h-screen relative mx-auto max-w-5xl">
      {/* Nav */}
      <motion.header
        className="box-border  overflow-hidden  z-50 backdrop-blur-md rounded-t-2xl py-2 w-full mx-auto sticky top-1 "
      >
        <div className='w-full h-full absolute left-0 top-0 bg-gradient-to-b from-gray-100 from-20%  z-0'></div>
        <div className="max-w-5xl gap-52 rounded-md mx-auto px-6 flex items-center justify-between z-10">
          <a href="#top" className="font-display text-lg tracking-tightest font-extrabold  text-white drop-shadow-[0_0.2px_0.65px_rgba(0,0,0,0.8)] z-10">Dev</a>
          <motion.nav layout className="hidden relative sm:flex  items-center gap-10 font-extrabold text-white drop-shadow-[0_0.2px_0.5px_rgba(0,0,0,0.8)]">

            {NavItem.map((val, idx) => (
              <motion.a layout onMouseEnter={() => setActive(idx)} onMouseLeave={() => setActive(null)} className="cursor-pointer" key={idx} href={`#${val.toLowerCase()}`}>
                <span>{val}</span>
                <motion.div layoutId="hover" style={{
                  display: active === idx ? 'flex' : 'none'
                }} className=''></motion.div>
              </motion.a>)
            )}


          </motion.nav>
          <a
            href="#contact"
            className="z-10 inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ink/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Resume
          </a>
        </div>

      </motion.header>


      <main className='w-full relative bg-gradient-to-b from-gray-50 to-5% to-white  max-w-full'>

        <div
          className='z-[100] fixed progress w-[1px] h-[90vh] py-2 right-4 top-1/2 -translate-y-1/2 rounded-full'
          style={{ background: `linear-gradient(to bottom, #000 ${scrollProgress}%, #fff ${scrollProgress}%)` }}
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollProgress)}
        />
        <Hero containerVariants={containerVariants} letterVariants={letterVariants} />
        <Contributions contributions={contributions} />
        <About />
        <Work projects={projects} />
        <Skills skills={skills} />
        <Contact />
        <Footer />
        {/* <StickyCardsDemo /> */}
      </main>


    </div>
  )
}

export default App
