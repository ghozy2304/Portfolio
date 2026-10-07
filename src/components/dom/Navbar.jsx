import React, { useState, useEffect } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
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
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 pt-4 sm:pt-6 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Monogram / Brand */}
        <a
          href="#"
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel transition-all duration-300 hover:border-[#B8A594]/60"
        >
          <span className="w-2 h-2 rounded-full bg-[#B8A594] group-hover:scale-125 transition-transform duration-300" />
          <span className="font-heading font-bold text-sm tracking-widest uppercase text-[#1C1C1C]">
            {personalInfo.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full glass-panel">
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

        {/* Action Button: Contact / Resume */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1C1C1C] text-[#F8F8F6] font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#333338] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-full glass-panel text-[#1C1C1C] hover:text-[#B8A594] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto p-4 rounded-2xl glass-panel pointer-events-auto flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
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
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-xl bg-[#1C1C1C] text-[#F8F8F6] font-medium text-xs tracking-wider uppercase"
          >
            Let's Talk
          </a>
        </div>
      )}
    </header>
  );
}
