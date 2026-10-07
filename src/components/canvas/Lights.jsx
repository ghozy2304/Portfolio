import React from 'react';

/**
 * Lights - Pencahayaan Studio Bernuansa "Quiet Luxury"
 * 
 * Menggunakan perpaduan ambient hangat (Warm Champagne) dan directional light
 * dengan sudut lembut untuk menciptakan kilau mewah pada permukaan metalik laptop
 * serta mempertegas detail tombol keyboard chiclet dan trackpad.
 */
export function Lights() {
  return (
    <>
      {/* Cahaya Lingkungan Dasar (Soft Warm Tint) */}
      <ambientLight intensity={0.90} color="#f7f3ed" />

      {/* Cahaya Utama (Key Light) dari sudut atas depan */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.6}
        color="#fffbf5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Cahaya Studio Langsung ke Keyboard & Unibody Base */}
      <directionalLight
        position={[0, 6, 2.5]}
        intensity={1.3}
        color="#ffffff"
      />

      {/* Specular Keycap Rake Light (Mempertegas bevel tombol keyboard dari sudut miring) */}
      <pointLight
        position={[0, 2.2, 0.4]}
        intensity={0.85}
        distance={4.5}
        color="#fff8ed"
      />

      {/* Cahaya Pengisi (Fill Light) dengan aksen Champagne Gold */}
      <pointLight
        position={[-6, 3, -3]}
        intensity={1.0}
        color="#D4C5B9"
      />

      {/* Cahaya Rim dari belakang untuk mempertegas lekukan lid aluminium */}
      <pointLight
        position={[0, 4, -5]}
        intensity={0.9}
        color="#8C8275"
      />

      {/* Aksen Kilau Tepi Aluminium Kiri-Kanan */}
      <pointLight
        position={[-3.5, 2, 2]}
        intensity={0.7}
        color="#EADDCF"
      />
      <pointLight
        position={[3.5, 2, 2]}
        intensity={0.7}
        color="#E0E6F0"
      />

      {/* Cahaya Pantulan Bawah (Subtle Uplight Meja) */}
      <pointLight
        position={[0, -3, 2]}
        intensity={0.4}
        color="#E8DFD8"
      />
    </>
  );
}
