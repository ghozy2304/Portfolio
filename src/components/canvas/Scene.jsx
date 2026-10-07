import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lights } from './Lights';
import { LaptopModel } from './LaptopModel';
import { CameraRig } from './CameraRig';

/**
 * Scene - Kanvas 3D Utama (Layer 1)
 * 
 * Posisi: Fixed di latar belakang seluruh halaman web.
 * Konfigurasi:
 * - dpr={[1, 1.8]}: Membatasi rasio pixel maksimal 1.8 agar tetap tajam namun sangat ringan di layar 4K/Retina.
 * - powerPreference: 'high-performance' untuk rendering GPU yang optimal.
 * - alpha: true agar background kanvas tembus pandang ke warna dasar CSS (#0c0c0e).
 */
export function Scene({ scrollProgress = 0 }) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 1.2, 5.6], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <LaptopModel scrollProgress={scrollProgress} />
          <CameraRig scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
