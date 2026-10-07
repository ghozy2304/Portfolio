import React from 'react';
import { personalInfo } from '../../data/portfolioData';
import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  const { hero, statusBadge } = personalInfo;

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-2 sm:pt-2 pb-12 px-6 sm:px-12 max-w-6xl mx-auto pointer-events-none">
      {/* Top Hero Text Overlay */}
      <div className="max-w-3xl pointer-events-auto">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel mb-8 border-[#B8A594]/30 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="text-[11px] font-medium tracking-wider uppercase text-[#7D7366]">
            {statusBadge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-[#1C1C1C] mb-6">
          Developing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C1C] via-[#5C554D] to-[#8C7B6B]">Thoughtful</span> & High-Performance Experiences.
        </h1>

        {/* Sub-headline */}
        <p className="font-body text-base sm:text-lg text-[#6B6B70] max-w-2xl leading-relaxed mb-8">
          {hero.subheadline}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#project"
            className="group px-6 py-3 rounded-full bg-[#1C1C1C] text-[#F8F8F6] font-medium text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[#333338] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] flex items-center gap-2"
          >
            <span>{hero.ctaPrimary}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#B8A594]" />
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-full glass-panel text-[#1C1C1C] font-medium text-xs tracking-widest uppercase transition-all duration-300 hover:border-[#B8A594]/60 hover:text-[#7D7366]"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Bottom Hint: Interactive 3D / Scroll Indicator */}
      <div className="flex items-center justify-between pt-8 border-t border-black/5 pointer-events-auto">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#8E8E93]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8A594]" />
          <span>Interactive 3D Apple MacBook Pro 16"</span>
        </div>

        <a
          href="#about"
          className="group flex items-center gap-2 text-xs tracking-widest uppercase text-[#8E8E93] hover:text-[#1C1C1C] transition-colors"
        >
          <span>Scroll to open laptop & explore</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 text-[#B8A594]" />
        </a>
      </div>
    </section>
  );
}
