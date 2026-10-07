import React from 'react';
import { personalInfo } from '../../data/portfolioData';
import { GlassCard } from '../ui/GlassCard';
import { Layers, Cpu, Compass, CheckCircle2 } from 'lucide-react';

export function About() {
  const { about } = personalInfo;

  const icons = [Layers, Cpu, Compass, CheckCircle2];

  return (
    <section id="about" className="py-28 px-6 sm:px-12 max-w-6xl mx-auto pointer-events-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pointer-events-auto">
        {/* Left Column: Heading & Philosophy */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-[#8C7B6B]">
            <span className="w-6 h-[1px] bg-[#8C7B6B]" />
            <span>01 / Philosophy</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1C1C1C] leading-tight mb-6">
            Bridging Architectural Structure & Visual Harmony.
          </h2>

          <p className="font-body text-[#6B6B70] text-base leading-relaxed mb-6">
            {about.bio}
          </p>

          <p className="font-body text-sm text-[#8E8E93] leading-relaxed">
            Setiap baris kode bukan sekadar logika komputer, melainkan fondasi bagi pengalaman digital yang intuitif, stabil, dan menyenangkan bagi pengguna akhir.
          </p>
        </div>

        {/* Right Column: 4 Highlight Metrics in GlassCards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {about.highlights.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <GlassCard key={item.label} className="flex flex-col justify-between min-h-[140px]">
                <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/5 flex items-center justify-center text-[#7D7366] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#8E8E93] mb-1">
                    {item.label}
                  </div>
                  <div className="font-heading font-semibold text-lg text-[#1C1C1C]">
                    {item.value}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
