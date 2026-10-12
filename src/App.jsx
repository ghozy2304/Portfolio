import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { Scene } from './components/canvas/Scene';
import { Sparkles, ArrowDown, ChevronUp, Laptop, Globe } from 'lucide-react';
import { personalInfo } from './data/portfolioData';
import { DirectWeb } from './components/pages/DirectWeb';

/**
 * 3D Interactive MacBook Experience (Route: /)
 */
function MacBook3DExperience({ onNavigate, scrollProgress, setScrollProgress, isActive }) {
  // Inisialisasi Lenis Smooth Scroll untuk mode 3D
  useLenis(isActive);

  useEffect(() => {
    if (!isActive) return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = window.scrollY / totalScroll;
        setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive, setScrollProgress]);

  // Penentuan teks fase panduan scroll
  const getStageInfo = () => {
    if (scrollProgress < 0.18) {
      return {
        stage: '01 / 04',
        label: 'Scroll to Open MacBook',
        desc: 'Layar MacBook 3D sedang terbuka...',
      };
    } else if (scrollProgress < 0.35) {
      return {
        stage: '02 / 04',
        label: 'Zooming into Screen',
        desc: 'Kamera mendekati layar virtual...',
      };
    } else if (scrollProgress < 0.90) {
      const pct = Math.min(100, Math.max(0, Math.round(((scrollProgress - 0.35) / 0.55) * 100)));
      return {
        stage: '03 / 04',
        label: `Exploring Portfolio (${pct}%)`,
        desc: 'Navigasi konten di dalam layar laptop virtual',
      };
    } else {
      return {
        stage: '04 / 04',
        label: 'Closing Workspace',
        desc: 'Laptop menutup kembali',
      };
    }
  };

  const stage = getStageInfo();

  return (
    <main className="relative min-h-[550vh] bg-transparent text-[#1C1C1C] selection:bg-[#B8A594]/30">
      {/* Ambient Lighting Decoration */}
      <div className="fixed top-1/4 -left-48 w-[450px] h-[450px] bg-[#B8A594]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 -right-48 w-[450px] h-[450px] bg-[#7D7366]/8 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* === LAYER 2: PERSISTENT OUTER HUD OVERLAY (Fixed z-20) === */}
      
      {/* Top Floating HUD Header */}
      <header className="fixed top-0 left-0 w-full z-30 px-6 py-5 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Monogram / Brand */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel border-[#B8A594]/30 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8A594]" />
            <span className="font-heading font-bold text-xs tracking-widest uppercase text-[#1C1C1C]">
              {personalInfo.name}
            </span>
            <span className="text-[10px] font-mono text-[#7D7366] bg-black/5 px-2 py-0.5 rounded-full">
              3D Workspace
            </span>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tombol Masuk ke View Layar Laptop */}
            <button
              onClick={() => {
                const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo({ top: totalScroll * 0.25, behavior: 'smooth' });
              }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs tracking-wider uppercase text-[#1C1C1C] hover:border-[#B8A594]/60 transition-colors"
            >
              <Laptop className="w-3.5 h-3.5 text-[#8C7B6B]" />
              <span>Zoom Screen</span>
            </button>

            {/* Tombol Buka Web Langsung (/web) */}
            <button
              onClick={() => onNavigate('/web')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1C1C] text-[#F8F8F6] hover:bg-[#333338] transition-all duration-300 text-xs tracking-wider uppercase shadow-md hover:scale-105 active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-[#B8A594]" />
              <span>Direct Web (/web)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Floating Stage Guidance Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-full max-w-md px-4">
        <div className="glass-panel p-3.5 rounded-2xl shadow-lg border border-[#B8A594]/30 flex flex-col gap-2 pointer-events-auto backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[#8C7B6B] font-semibold">{stage.stage}</span>
            <span className="font-heading font-bold text-[#1C1C1C] uppercase tracking-wider">{stage.label}</span>
          </div>

          {/* Progress Bar Line */}
          <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8C7B6B] to-[#1C1C1C] transition-all duration-150"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6B6B70]">
            <span>{stage.desc}</span>
            <div className="flex items-center gap-1 text-[#8C7B6B]">
              <span>Scroll</span>
              <ArrowDown className="w-3 h-3 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Outro Modal Stage (Appears when scroll reaches the end) */}
      {scrollProgress > 0.9999 && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-xs pointer-events-auto animate-in fade-in duration-300">
          <div className="max-w-md p-8 rounded-3xl glass-panel shadow-2xl border border-[#B8A594]/40 text-center">
            <span className="text-xs uppercase tracking-widest text-[#8C7B6B] font-semibold mb-2 block">
              Workspace Closed
            </span>
            <h3 className="font-heading font-bold text-2xl text-[#1C1C1C] mb-3">
              Thank You for Exploring.
            </h3>
            <p className="font-body text-xs text-[#6B6B70] leading-relaxed mb-6">
              Laptop 3D telah menutup kembali secara penuh. Anda dapat membuka kembali ruang kerja 3D atau menjelajahi versi web standar layar penuh.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-black/10 text-[#1C1C1C] font-medium text-xs tracking-widest uppercase hover:bg-black/5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ChevronUp className="w-4 h-4 text-[#8C7B6B]" />
                <span>Reopen 3D</span>
              </button>
              <button
                onClick={() => onNavigate('/web')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1C1C1C] text-[#F8F8F6] font-medium text-xs tracking-widest uppercase hover:bg-[#333338] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4 text-[#B8A594]" />
                <span>Direct Web (/web)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/**
 * Root Router Component:
 * - Route '/'    : Mode 3D Interaktif MacBook
 * - Route '/web' : Mode Web Layar Penuh Langsung
 */
export function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  const is3DMode = currentPath !== '/web' && currentPath !== '/web/';

  const navigate = (path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {/* === PERSISTENT 3D CANVAS LAYER === */}
      {/* Canvas tetap hidup di memori; frameloop dipause saat di /web */}
      <Scene scrollProgress={scrollProgress} isActive={is3DMode} />

      {/* Mode 3D Experience (Track scroll 550vh & HUD Overlay) */}
      <div className={is3DMode ? 'block' : 'hidden'}>
        <MacBook3DExperience
          onNavigate={navigate}
          scrollProgress={scrollProgress}
          setScrollProgress={setScrollProgress}
          isActive={is3DMode}
        />
      </div>

      {/* Mode Web Layar Penuh Langsung (/web) */}
      {!is3DMode && <DirectWeb onNavigate={navigate} />}
    </>
  );
}

export default App;
