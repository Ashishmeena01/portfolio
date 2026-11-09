import React from 'react';
export default function About() {
  return (
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
  );
}


