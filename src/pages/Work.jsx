import React from 'react';
export default function Work({ projects }) {
  return (
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
  );
}



