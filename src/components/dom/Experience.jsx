import React from 'react';
import { personalInfo } from '../../data/portfolioData';
import { GlassCard } from '../ui/GlassCard';
import { GraduationCap, Calendar, Sparkles } from 'lucide-react';

export function Experience() {
  const { education } = personalInfo;

  return (
    <section id="journey" className="py-28 px-6 sm:px-12 max-w-6xl mx-auto pointer-events-none">
      <div className="pointer-events-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#8C7B6B]">
          <span className="w-6 h-[1px] bg-[#8C7B6B]" />
          <span>04 / Journey</span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#1C1C1C] mb-12">
          Academic & Growth.
        </h2>

        {/* Timeline Card */}
        <div className="max-w-3xl">
          <GlassCard className="relative border-l-2 border-l-[#8C7B6B] pl-8 sm:pl-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#7D7366]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{education.period}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Active Focus
              </span>
            </div>

            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1C1C1C] mb-1">
              {education.role}
            </h3>
            <div className="text-sm font-medium text-[#7D7366] mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>{education.institution}</span>
            </div>

            <p className="font-body text-[#6B6B70] text-sm sm:text-base leading-relaxed mb-6">
              {education.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5">
              <span className="px-3 py-1 text-xs rounded-md bg-black/5 text-[#1C1C1C]">
                Full-Stack Architecture
              </span>
              <span className="px-3 py-1 text-xs rounded-md bg-black/5 text-[#1C1C1C]">
                Modern Web Standards
              </span>
              <span className="px-3 py-1 text-xs rounded-md bg-black/5 text-[#1C1C1C]">
                Artificial Intelligence Integration
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
