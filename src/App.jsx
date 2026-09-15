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
    path:"#",
    desc: 'Many project which are waiting to go Production.',
    tags: ['Building', 'It', 'with', 'Heart'],
  },

]

const skills = [
  'TypeScript', 'React', 'Node.js', 'PostgreSQL',
  , 'Docker', 'GraphQL', 'System design', 'Rust',
]

function NavLink({ href, children }) {
  return (
    <a href={href} className="text-sm text-ink/70 hover:text-ink transition-colors">
      {children}
    </a>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">

      {/* Nav */}
      <header className="border-b border-ink/10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#top" className="font-display font-bold text-lg tracking-tightest">Dev</a>
          <nav className="hidden sm:flex items-center gap-10">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#work">Work</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <a
            href="#contact"
            className="text-sm font-medium border border-ink px-5 py-2 hover:bg-ink hover:text-paper transition-colors"
          >
            Résumé
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="text-sm text-muted mb-6">Ashish Meena — Software Engineer</p>
        <h1 className="font-display font-bold tracking-tightest leading-[0.95] text-[13vw] sm:text-[7rem] md:text-[8rem]">
          I build software
          <br />
          that works.
        </h1>
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

      {/* About */}
      <section id="about" className="border-t border-ink/10">
        <div className="max-w-5xl mx-auto px-6 py-24 grid sm:grid-cols-[120px_1fr] gap-10">
          <p className="text-sm text-muted">About</p>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-5 text-lg leading-relaxed">
              <p>
                I started out of curiosity how Computer work. Today I build web applications end to
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
    </div>
  )
}

export default App
