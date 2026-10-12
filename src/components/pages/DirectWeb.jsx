import React, { useState, useEffect } from 'react';
import { Hero } from '../dom/Hero';
import { About } from '../dom/About';
import { FeaturedProject } from '../dom/FeaturedProject';
import { Skills } from '../dom/Skills';
import { Experience } from '../dom/Experience';
import { Contact } from '../dom/Contact';
import { Footer } from '../dom/Footer';
import { personalInfo } from '../../data/portfolioData';
import { Box, Laptop, Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';

/**
 * DirectWeb - Halaman Web Portofolio Langsung (/web)
 * 
 * Menampilkan seluruh portofolio dalam format web layar penuh 2D responsif standar,
 * lengkap dengan navigasi, animasi halus Lenis, dan tombol kembali ke mode 3D.
 */
export function DirectWeb({ onNavigate }) {
  // Aktifkan smooth scroll
  useLenis();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#project' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6] text-[#1C1C1C] selection:bg-[#B8A594]/30 font-sans relative overflow-x-hidden">
      {/* Ambient Luxury Blurred Glow Spots */}
      <div className="fixed top-20 -left-40 w-96 h-96 bg-[#B8A594]/12 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-40 -right-40 w-96 h-96 bg-[#7D7366]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Floating Header Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 pt-4 sm:pt-6 transition-all duration-300 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel transition-all duration-300 hover:border-[#B8A594]/60 shadow-xs"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8A594] group-hover:scale-125 transition-transform duration-300" />
            <span className="font-heading font-bold text-xs tracking-widest uppercase text-[#1C1C1C]">
              {personalInfo.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full glass-panel border border-[#B8A594]/20 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs tracking-wider uppercase text-[#6B6B70] hover:text-[#1C1C1C] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tombol Beralih ke Mode 3D */}
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1C1C] text-[#F8F8F6] hover:bg-[#333338] transition-all duration-300 text-xs tracking-wider uppercase shadow-md hover:scale-105 active:scale-95"
            >
              <Laptop className="w-3.5 h-3.5 text-[#B8A594]" />
              <span className="hidden sm:inline">3D Workspace</span>
              <span className="sm:hidden">3D</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full glass-panel text-[#1C1C1C] hover:text-[#B8A594] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 max-w-sm mx-auto p-4 rounded-2xl glass-panel pointer-events-auto flex flex-col gap-2 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#6B6B70] hover:text-[#1C1C1C] hover:bg-black/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/');
              }}
              className="mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1C1C1C] text-[#F8F8F6] text-xs font-semibold tracking-wider uppercase"
            >
              <Laptop className="w-4 h-4 text-[#B8A594]" />
              <span>Buka 3D Workspace</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-16">
        <Hero />
        <About />
        <FeaturedProject />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#1C1C1C] text-[#F8F8F6] hover:bg-[#333338] transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="w-4 h-4 text-[#B8A594]" />
        </button>
      )}
    </div>
  );
}
