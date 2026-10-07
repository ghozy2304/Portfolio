import React from 'react';

/**
 * GlassCard - Komponen UI Atomik
 * 
 * Desain: Kartu kaca es (Frosted Glass) khas Quiet Luxury.
 * Menggunakan border tipis champagne, efek blur latar belakang, dan bayangan lembut.
 */
export function GlassCard({ children, className = '', hover = true }) {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 sm:p-8 transition-all duration-500 ${
        hover ? 'glass-panel-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
