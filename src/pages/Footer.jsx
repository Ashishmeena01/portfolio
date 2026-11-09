import React from 'react';
export default function Footer() {
  return (
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
  );
}


