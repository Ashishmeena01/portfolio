import React from 'react';
export default function Skills({ skills }) {
  return (
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
  );
}



