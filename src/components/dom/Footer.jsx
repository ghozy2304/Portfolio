import React from 'react';
import { personalInfo } from '../../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 sm:px-12 max-w-6xl mx-auto border-t border-black/5 pointer-events-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B8A594]" />
          <span className="text-xs uppercase tracking-widest text-[#7D7366]">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[11px] uppercase tracking-wider text-[#9A9AA0]">
            Quiet Luxury Architecture • React 19 & Three.js
          </span>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full glass-panel text-[#6B6B70] hover:text-[#1C1C1C] transition-colors"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
