import React from 'react';
import { Hero } from './Hero';
import { About } from './About';
import { FeaturedProject } from './FeaturedProject';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Contact } from './Contact';
import { Footer } from './Footer';

/**
 * VirtualWebsite - Seluruh isi portofolio yang dirender DI DALAM layar laptop 3D.
 */
export function VirtualWebsite() {
  return (
    <div className="w-full bg-[#F8F8F6] text-[#1C1C1C] font-sans selection:bg-[#B8A594]/30">
      {/* Virtual Navigation Header inside screen */}
      <div className="sticky top-0 z-30 bg-[#F8F8F6]/90 backdrop-blur-md border-b border-black/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B8A594]" />
          <span className="font-heading font-bold text-xs tracking-widest uppercase text-[#1C1C1C]">
            AZZAM GHOZY
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase text-[#6B6B70]">
          <a href="#about" className="hover:text-[#1C1C1C] transition-colors">About</a>
          <a href="#project" className="hover:text-[#1C1C1C] transition-colors">Work</a>
          <a href="#skills" className="hover:text-[#1C1C1C] transition-colors">Skills</a>
          <a href="#journey" className="hover:text-[#1C1C1C] transition-colors">Journey</a>
          <a href="#contact" className="hover:text-[#1C1C1C] transition-colors">Contact</a>
        </div>
      </div>

      {/* Main Sections */}
      <div className="px-4 py-2">
        <Hero />
        <About />
        <FeaturedProject />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
