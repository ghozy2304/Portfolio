import React, { useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { GlassCard } from '../ui/GlassCard';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { GithubIcon, InstagramIcon } from '../ui/Icons';

export function Contact() {
  const { contact } = personalInfo;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-12 max-w-6xl mx-auto pointer-events-none">
      <div className="pointer-events-auto">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-[#8C7B6B]">
          <span className="w-6 h-[1px] bg-[#8C7B6B]" />
          <span>05 / Connection</span>
        </div>

        <GlassCard className="p-8 sm:p-14 relative overflow-hidden shadow-sm">
          <div className="max-w-3xl">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#1C1C1C] leading-tight mb-6">
              {contact.heading}
            </h2>

            <p className="font-body text-[#6B6B70] text-base leading-relaxed mb-10">
              Apakah Anda sedang merencanakan proyek baru, membutuhkan pengembang web full-stack, atau ingin berdiskusi seputar teknologi modern? Pintu selalu terbuka untuk bertukar pikiran.
            </p>

            {/* Direct Email Action & Social Links */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href={`mailto:${contact.email}`}
                className="group px-7 py-3.5 rounded-full bg-[#1C1C1C] text-[#F8F8F6] font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#333338] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] flex items-center gap-2.5"
              >
                <Mail className="w-4 h-4 text-[#B8A594]" />
                <span>Send An Email</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-3.5 rounded-full glass-panel text-[#1C1C1C] font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:border-[#B8A594]/60 flex items-center gap-2"
                title="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#7D7366]" />
                    <span>Copy: {contact.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-8 border-t border-black/5">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B6B70] hover:text-[#1C1C1C] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-[#8E8E93]" />
              </a>

              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B6B70] hover:text-[#1C1C1C] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-[#8E8E93]" />
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
