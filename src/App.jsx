import React, { useEffect, useState } from 'react'
import { motion } from "motion/react";

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

function NavLink({ href, children }) {
  return (
    <a href={href} className="text-sm text-ink/70 hover:text-ink transition-colors">
      {children}
    </a>
  )
}

function App() {
  const [leetCodeData, setLeetCodeData] = useState(null);
  const Head = "I build software";
  const Head2 = 'that works.'
  const [active,setActive] = useState(null);


  useEffect(() => {
    const fackdata = Array.from({ length: 70 }, (_, index) => ({
      date: `2023-01-${(index % 30) + 1}`,
      submissionCount: Math.floor(Math.random() * 5),
    }));
    setLeetCodeData(fackdata);
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

  console.log(active)
  // const [active,setActive] = useState<number | null>(null);

  return (
    <div className="min-h-screen  bg-paper text-ink font-body">

      {/* Nav */}
      <motion.header
        className="box-border text-white z-50 max-w-5xl backdrop-blur-md bg-black/10 rounded-2xl py-2 w-full mx-auto sticky top-2 border-ink/10"
      >
        <div className="max-w-5xl gap-52 rounded-md mx-auto px-6 flex items-center justify-between">
          <a href="#top" className="font-display font-bold text-lg tracking-tightest text-white">Dev</a>
          <motion.nav  layout className="hidden relative sm:flex  items-center gap-10 text-white">

            {NavItem && NavItem.map((val,idx)=>(
              <motion.NavLink layout  onMouseEnter={(el)=>{setActive(idx)}} onMouseLeave={()=>setActive(null)} className="cursor-pointer" layout key={idx} href={`#${val}`}>
                <span>{val}</span>
               {<motion.div layoutId="hover" style={{
                  display:active===idx?'flex':'none'
               }} className='w-full h-full p-1 bg-black/10 absolute top-0 left-0'></motion.div>}
              </motion.NavLink>)
            )}
            

          </motion.nav>
          <a
            href="#contact"
            className="text-sm font-medium border border-white px-5 py-2 hover:bg-ink hover:text-paper transition-colors"
          >
            Résumé
          </a>
        </div>
      </motion.header>


      {/* Hero Section */}
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

      {/* GitHub and LeetCode Status */}
      <section id="github-leetcode" className="border-t border-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-24 lg:grid lg:grid-cols-2 gap-10">
          <div className='lg:flex flex-col items-center justify-center'>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tightest mb-6">GitHub</h2>
            <div className="max-w-80 w-80 h-60 mx-auto"></div>
          </div>

          <div className='lg:flex flex-col items-center justify-start'>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tightest mb-6">Leetcode</h2>
            <div className="max-w-80 w-80 mx-auto grid grid-col-5">
              {leetCodeData ? (
                <div className="flex items-start gap-1 flex-wrap">
                  {leetCodeData.map((day, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-sm ${day.submissionCount === 0
                        ? 'bg-gray-200'
                        : day.submissionCount === 1
                          ? 'bg-green-200'
                          : day.submissionCount === 2
                            ? 'bg-green-400'
                            : day.submissionCount === 3
                              ? 'bg-green-600'
                              : 'bg-green-800'
                        }`}
                      title={`${day.date}: ${day.submissionCount} contributions`}
                    />
                  ))}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-24 grid sm:grid-cols-[120px_1fr] gap-10">
          <p className="text-sm text-muted">About</p>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-5 text-lg leading-relaxed">
              <p>
                I started out of curiosity how Computers work. Today I build web applications end to
                end — APIs, databases, and the interfaces people actually touch.
              </p>
              <p className="text-muted">
                I care most about software that stays easy to change six months
                later: clear architecture, honest documentation, and tests I
                actually trust.
              </p>
            </div>
            <dl className="space-y-6">
              <div className="flex justify-between border-b border-ink/10 pb-3">
                <dt className="text-muted">Location</dt>
                <dd>Indore, India</dd>
              </div>
              <div className="flex justify-between border-b border-ink/10 pb-3">
                <dt className="text-muted">Experience</dt>
                <dd>0 years</dd>
              </div>
              <div className="flex justify-between border-b border-ink/10 pb-3">
                <dt className="text-muted">Availability</dt>
                <dd>Open to roles</dd>
              </div>
              <div className="flex justify-between pb-3">
                <dt className="text-muted">Email</dt>
                <dd>ashishxmeena@gmail.com</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="border-t border-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid sm:grid-cols-[120px_1fr] gap-10 mb-4">
            <p className="text-sm text-muted">Work</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tightest">
              Selected projects
            </h2>
          </div>

          <div className="mt-10 border-t border-ink">
            {projects.map((p) => (
              <a
                key={p.name}
                href={`${p.path}`}
                className="group grid sm:grid-cols-[120px_1fr_auto] gap-4 sm:gap-10 items-baseline py-8 border-b border-ink/10"
              >
                <span className="text-sm text-muted">{p.year}</span>
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl group-hover:underline underline-offset-4">
                    {p.name}
                  </h3>
                  <p className="text-muted mt-2 max-w-lg">{p.desc}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-muted">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-t border-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-24 grid sm:grid-cols-[120px_1fr] gap-10">
          <p className="text-sm text-muted">Skills</p>
          <p className="font-display font-bold text-2xl sm:text-3xl leading-snug tracking-tight">
            {skills.map((s, i) => (
              <span key={s}>
                {s}
                {i < skills.length - 1 && <span className="text-ink/25"> — </span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-28">
          <p className="text-sm text-muted mb-6">Contact</p>
          <h2 className="font-display font-bold tracking-tightest leading-[0.95] text-[10vw] sm:text-6xl md:text-7xl mb-10">
            Let's build
            <br />
            something.
          </h2>
          <a
            href="mailto:ashishxmeena@gmail.com"
            className="inline-block text-lg sm:text-xl font-medium underline underline-offset-4"
          >
            ashishxmeena@gmail.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <span>© 2026 Ashish Meena</span>
          <div className="flex gap-6">
            <a href="https://github.com/ashishmeena01" className="hover:text-ink transition-colors">GitHub</a>
            <a href="https://leetcode.com/u/ashishxmeena" className="hover:text-ink transition-colors">LeetCode</a>
            <a href="https://x.com/ashishmeenax" className="hover:text-ink transition-colors">X</a>
          </div>
        </div>
      </footer>

      {/* Scroll Sticky Demo */}
      <div className='w-full mx-auto flex items-center justify-center flex-col relative py-12'>
        <div className='w-1/2 h-72 sticky top-9 bg-gray-100 border border-black text-black flex items-center justify-center'>hello i am page 1</div>
        <div className='w-1/2 h-72 top-12 sticky bg-gray-100 border border-black text-black flex items-center justify-center'>hello i am page 2</div>
        <div className='w-1/2 h-72 sticky top-14 bg-gray-100 border border-black text-black flex items-center justify-center'>hello i am page 3</div>
        <div className='w-1/2 h-72 sticky top-16 bg-gray-100 border border-black text-black flex items-center justify-center'>hello i am page 4</div>
      </div>

      <div className='w-screen h-screen bg-black'></div>
    </div>
  )
}

export default App