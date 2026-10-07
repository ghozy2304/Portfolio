import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Custom Hook: useLenis
 * 
 * Fungsi: Mengaktifkan smooth scroll inertial kelas atas (seperti di website Apple & Awwwards).
 * Menghilangkan efek scroll yang kaku/patah-patah dari mouse wheel bawaan browser.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);
}
