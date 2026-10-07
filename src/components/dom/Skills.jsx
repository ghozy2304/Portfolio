import React from 'react';
import { skillsData } from '../../data/portfolioData';
import { GlassCard } from '../ui/GlassCard';
import { Code, Server, Wrench } from 'lucide-react';

export function Skills() {
  const categoryIcons = [Code, Server, Wrench];

  return (
    <section id="skills" className="py-28 px-6 sm:px-12 max-w-6xl mx-auto pointer-events-none">
      <div className="pointer-events-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#8C7B6B]">
          <span className="w-6 h-[1px] bg-[#8C7B6B]" />
          <span>03 / Capabilities</span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#1C1C1C] mb-12">
          Technical Arsenal.
        </h2>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsData.map((category, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            return (
              <GlassCard key={category.category} className="flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/5 flex items-center justify-center text-[#7D7366] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-[#1C1C1C] mb-4">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium text-[#1C1C1C] bg-black/5 hover:bg-[#B8A594]/20 hover:text-[#7D7366] rounded-lg transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
