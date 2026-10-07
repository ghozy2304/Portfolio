import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { VirtualWebsite } from '../dom/VirtualWebsite';
import { MacKeyboard } from './MacKeyboard';

/**
 * LaptopModel - Apple MacBook Pro 16"
 * 
 * Fitur Lengkap & Presisi:
 * 1. Bodi Unibody Aluminium Space Silver (nodes.body_1) dengan normal map asli.
 * 2. Kaki Karet & Ventilasi Engsel (nodes.body_2).
 * 3. Authentic Apple Magic Keyboard (<MacKeyboard />):
 *    - 77 tombol chiclet dengan legenda font Apple SF
 *    - Backlit illumination LED warm-white pendaran lembut
 *    - Speaker grille perforasi akustik di kiri dan kanan
 *    - Force Touch glass trackpad dengan satin sheen
 * 4. Layar Retina Interaktif (nodes.back_1, nodes.back_2, nodes.matte):
 *    - Skala presisi distanceFactor=11.7 di dalam bezel
 *    - Konten website virtual normal (tanpa mirror flip)
 *    - Fade-in/out saat laptop membuka/menutup
 */
export function LaptopModel({ scrollProgress = 0 }) {
  const groupRef = useRef();
  const screenRef = useRef();
  const scrollContainerRef = useRef(null);

  const { nodes, materials } = useGLTF('/mac.glb');

  // Sudut engsel engsel (hinge)
  // CLOSED_ANGLE (Math.PI): Lid terlipat rapat di atas keyboard
  // OPEN_ANGLE (1.38): Lid terbuka ~79° menghadap ke depan kamera
  const CLOSED_ANGLE = Math.PI;
  const OPEN_ANGLE = 1.38;

  // Sinkronisasi scroll virtual website dengan progress scroll luar
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    if (scrollProgress <= 0.32) {
      el.scrollTop = 0;
    } else if (scrollProgress >= 0.85) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    } else {
      const ratio = (scrollProgress - 0.32) / 0.53;
      el.scrollTop = ratio * (el.scrollHeight - el.clientHeight);
    }
  }, [scrollProgress]);

  // Opasitas layar: mati saat laptop tertutup, menyala saat terbuka
  const screenOpacity = scrollProgress < 0.10
    ? 0
    : scrollProgress < 0.20
      ? (scrollProgress - 0.10) / 0.10
      : scrollProgress > 0.88
        ? Math.max(0, 1 - (scrollProgress - 0.88) / 0.10)
        : 1;

  useFrame((state, delta) => {
    if (!screenRef.current || !groupRef.current) return;

    // Kalkulasi rotasi engsel laptop berdasarkan scroll
    let targetAngle = OPEN_ANGLE;
    if (scrollProgress < 0.18) {
      const p = Math.min(1, scrollProgress / 0.18);
      const ease = 1 - Math.pow(1 - p, 3);
      targetAngle = THREE.MathUtils.lerp(CLOSED_ANGLE, OPEN_ANGLE, ease);
    } else if (scrollProgress > 0.85) {
      const p = Math.min(1, (scrollProgress - 0.85) / 0.15);
      targetAngle = THREE.MathUtils.lerp(OPEN_ANGLE, CLOSED_ANGLE, p * p);
    }

    screenRef.current.rotation.x = THREE.MathUtils.damp(
      screenRef.current.rotation.x,
      targetAngle,
      6,
      delta
    );

    // Parallax mouse halus
    const isZoomed = scrollProgress >= 0.30 && scrollProgress <= 0.85;
    const prlx = isZoomed ? 0.04 : 0.15;
    const inView = scrollProgress > 0.05 && scrollProgress < 0.95;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      inView ? state.pointer.x * prlx : 0,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.65, 0]} scale={0.13} dispose={null}>
      {/* ═════════════════════════════════════════════════════════════════════
          1. CHASSIS BODI BAWAH (Aluminium Anodized Apple Space Silver)
          ═════════════════════════════════════════════════════════════════════ */}
      <mesh
        geometry={nodes.body_1.geometry}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          color="#c5c5cb"
          metalness={0.82}
          roughness={0.28}
          normalMap={materials.aluminium?.normalMap}
          normalScale={new THREE.Vector2(0.15, 0.15)}
        />
      </mesh>

      {/* Kaki Karet Bawah & Kisi Ventilasi Udara Belakang */}
      <mesh
        geometry={nodes.body_2.geometry}
        receiveShadow
      >
        <meshStandardMaterial
          color="#121216"
          metalness={0.15}
          roughness={0.85}
        />
      </mesh>

      {/* ═════════════════════════════════════════════════════════════════════
          2. APPLE MACBOOK PRO 16" MAGIC KEYBOARD & TRACKPAD & SPEAKERS
          ═════════════════════════════════════════════════════════════════════ */}
      <MacKeyboard />

      {/* ═════════════════════════════════════════════════════════════════════
          3. ENGSEL + LAYAR LAPTOP (Screen Pivot Group)
          ═════════════════════════════════════════════════════════════════════ */}
      <group
        ref={screenRef}
        position={[0, -0.413, -11.346]}
        rotation={[CLOSED_ANGLE, 0, 0]}
      >
        {/* Punggung aluminium luar (Lid cover + Apple Logo) */}
        <mesh
          geometry={nodes.back_2.geometry}
          castShadow
        >
          <meshStandardMaterial
            color="#c5c5cb"
            metalness={0.82}
            roughness={0.28}
            normalMap={materials.aluminium?.normalMap}
            normalScale={new THREE.Vector2(0.15, 0.15)}
          />
        </mesh>

        {/* Bezel hitam bingkai layar bagian dalam */}
        <mesh geometry={nodes.back_1.geometry}>
          <meshStandardMaterial
            color="#121215"
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>

        {/* Kaca display Retina (Screen glass surface backdrop) */}
        <mesh geometry={nodes.matte.geometry}>
          <meshStandardMaterial
            color="#08080a"
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>

        {/* ═════════════════════════════════════════════════════════════════
            4. VIRTUAL WEBSITE SCREEN (HTML DOM Projection)
            ═════════════════════════════════════════════════════════════════ */}
        <group position={[0, -0.42, -11.52]} rotation={[-Math.PI / 2, 0, 0]}>
          <Html
            transform
            distanceFactor={11.7}
            occlude={false}
            className="select-none pointer-events-auto"
          >
            <div
              style={{
                width: 1024,
                height: 640,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                opacity: screenOpacity,
                transition: 'opacity 0.25s ease-out',
                borderRadius: '6px',
                boxShadow: '0 0 35px rgba(0,0,0,0.3)',
                background: '#F8F8F6',
              }}
            >
              {/* macOS Safari Browser Header Bar */}
              <div
                style={{
                  height: 38,
                  background: '#EAE8E4',
                  padding: '0 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                {/* Traffic lights & URL address bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F56', display: 'inline-block', border: '0.5px solid rgba(0,0,0,0.1)' }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block', border: '0.5px solid rgba(0,0,0,0.1)' }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27C93F', display: 'inline-block', border: '0.5px solid rgba(0,0,0,0.1)' }} />
                  <div style={{
                    marginLeft: 14,
                    background: 'rgba(255,255,255,0.85)',
                    padding: '3px 14px',
                    borderRadius: 6,
                    border: '1px solid rgba(0,0,0,0.06)',
                    fontSize: 11,
                    color: '#333',
                    fontFamily: 'monospace',
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center',
                  }}>
                    <span style={{ color: '#16a34a', fontSize: 10 }}>🔒</span>
                    <span style={{ fontWeight: 500 }}>azzamghozy.dev</span>
                  </div>
                </div>

                {/* macOS Model Badge */}
                <div style={{
                  fontSize: 10,
                  fontFamily: 'monospace',
                  color: '#7D7366',
                  background: 'rgba(184,165,148,0.15)',
                  padding: '2px 8px',
                  borderRadius: 999,
                  border: '1px solid rgba(184,165,148,0.25)',
                }}>
                  MacBook Pro 16″
                </div>
              </div>

              {/* Konten website virtual (Scrollable portfolio) */}
              <div
                ref={scrollContainerRef}
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  background: '#F8F8F6',
                }}
              >
                <VirtualWebsite />
              </div>
            </div>
          </Html>
        </group>
      </group>

      {/* Bayangan kontak fotorealistik di atas meja */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.42}
        scale={35}
        blur={2.6}
        far={6}
        color="#322d25"
      />
    </group>
  );
}

useGLTF.preload('/mac.glb');
