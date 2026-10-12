import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CameraRig - Koreografi Kamera 4 Babak
 * 
 * Framing Apple MacBook Pro 16" Estetik:
 * - Fase 1: Wide studio angle memperlihatkan laptop membuka elegan di atas meja.
 * - Fase 2: Zoom-in transisi sinematik meluncur tepat menuju tengah layar.
 * - Fase 3: Kamera tepat di tengah-tengah layar laptop (Y=1.65, Z=2.80, Look=[0, 0.75, -1.82]):
 *   Layar portofolio berada tepat di pusat monitor dengan simetri sempurna.
 * - Fase 4: Kamera zoom-out kembali ke wide view saat laptop menutup rapat.
 */
export function CameraRig({ scrollProgress = 0 }) {
  const currentLook = useRef(new THREE.Vector3(0, -0.30, -0.20));

  useFrame((state, delta) => {
    const { pointer, camera } = state;

    let ty = 0.70, tz = 4.80;
    let ly = -0.30, lz = -0.20;

    if (scrollProgress < 0.18) {
      // FASE 1: Wide Elevated Studio View – Laptop membuka perlahan
      const p = Math.min(1, scrollProgress / 0.18);
      const ease = 1 - Math.pow(1 - p, 3);
      ty = THREE.MathUtils.lerp(0.70, 1.60, ease);
      tz = THREE.MathUtils.lerp(4.80, 4.30, ease);
      ly = THREE.MathUtils.lerp(-0.30, 0.05, ease);
      lz = THREE.MathUtils.lerp(-0.20, -0.60, ease);

    } else if (scrollProgress < 0.35) {
      // FASE 2: Zoom-in Sinematik Meluncur Tepat ke Tengah Layar
      const p = (scrollProgress - 0.18) / 0.17;
      const ease = THREE.MathUtils.smoothstep(p, 0, 1);
      ty = THREE.MathUtils.lerp(1.60, 1.65, ease);
      tz = THREE.MathUtils.lerp(4.30, 2.80, ease);
      ly = THREE.MathUtils.lerp(0.05, 0.75, ease);
      lz = THREE.MathUtils.lerp(-0.60, -1.82, ease);

    } else if (scrollProgress <= 0.85) {
      // FASE 3: LOCKED VIEW – TEPAT DI TENGAH-TENGAH LAYAR LAPTOP
      ty = 1.65;
      tz = 1.80;
      ly = 0.75;
      lz = -1.82;

    } else {
      // FASE 4: Unzoom – Laptop menutup kembali
      const p = Math.min(1, (scrollProgress - 0.85) / 0.15);
      const ease = Math.pow(p, 2);
      ty = THREE.MathUtils.lerp(1.65, 0.70, ease);
      tz = THREE.MathUtils.lerp(2.80, 4.80, ease);
      ly = THREE.MathUtils.lerp(0.75, -0.30, ease);
      lz = THREE.MathUtils.lerp(-1.82, -0.20, ease);
    }

    // Parallax mouse interaktif (halus saat zoom agar membaca teks nyaman)
    const isZoomed = scrollProgress >= 0.35 && scrollProgress <= 0.85;
    const parallax = isZoomed ? 0.03 : 0.16;

    const targetPos = new THREE.Vector3(
      pointer.x * parallax,
      ty + pointer.y * (parallax * 0.4),
      tz
    );
    const targetLook = new THREE.Vector3(0, ly, lz);

    const k = Math.min(delta * 5, 1);
    camera.position.lerp(targetPos, k);
    currentLook.current.lerp(targetLook, k);
    camera.lookAt(currentLook.current);
  });

  return null;
}
