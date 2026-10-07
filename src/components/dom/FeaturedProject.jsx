import React from 'react';
import { featuredProject } from '../../data/portfolioData';
import { GlassCard } from '../ui/GlassCard';
import { ArrowUpRight, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import idnPreview from '../../assets/idn-preview.png';

export function FeaturedProject() {
  const p = featuredProject;

  return (
    <section id="project" className="py-28 px-6 sm:px-12 max-w-6xl mx-auto pointer-events-none">
      <div className="pointer-events-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#8C7B6B]">
              <span className="w-6 h-[1px] bg-[#8C7B6B]" />
              <span>02 / Case Study</span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#1C1C1C]">
              Featured Engineering.
            </h2>
          </div>
          <p className="text-xs tracking-wider uppercase text-[#8E8E93]">
            Flagship Production Project
          </p>
        </div>

        {/* Featured Case Study Card */}
        <GlassCard className="relative overflow-hidden border-[#B8A594]/30 hover:border-[#B8A594]/60 p-8 sm:p-12 shadow-sm">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#B8A594]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Deep Dive Narrative */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-medium text-[#7D7366] mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7D7366]" />
                <span>{p.subtitle}</span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#1C1C1C] mb-4">
                {p.title}
              </h3>

              <p className="font-body text-[#6B6B70] text-base leading-relaxed mb-6">
                {p.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-2.5 mb-8">
                {p.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2.5 text-xs text-[#1C1C1C]">
                    <span className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center text-[#7D7366]">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {p.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono tracking-wider text-[#7D7366] bg-black/5 rounded-md border border-black/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-6 py-3 rounded-full bg-[#1C1C1C] text-[#F8F8F6] font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#333338] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] flex items-center gap-2"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-5 py-3 rounded-full glass-panel text-[#1C1C1C] font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:border-[#B8A594]/60 flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4 text-[#7D7366]" />
                  <span>Inspect Source Code</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-[#1C1C1C] transition-colors" />
                </a>
              </div>
            </div>

            {/* Right Column: Visual Preview Mockup / Interactive Portal Window */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-black/10 bg-[#FFFFFF] shadow-lg p-4 group">
                {/* Browser Window Chrome */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] font-mono tracking-wider text-[#8E8E93] bg-black/5 px-3 py-0.5 rounded-full">
                    idnbs.my.id
                  </div>
                  <div className="w-8" />
                </div>

                {/* Real Live Screenshot Representation */}
                <div className="rounded-xl overflow-hidden border border-black/5 shadow-inner bg-white group-hover:shadow-md transition-shadow">
                  <img
                    src={idnPreview}
                    alt="IDN Boarding School Institutional Portal"
                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
