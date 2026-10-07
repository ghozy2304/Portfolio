import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * MacKeyboard - Apple MacBook Pro 16" Magic Keyboard Component
 * 
 * Fitur Estetika:
 * 1. Recessed All-Black Keyboard Well: Baki hitam anodized khas Apple Silicon MacBook Pro.
 * 2. 77 Tombol Chiclet Presisi Tinggi: Dihasilkan melalui canvas beresolusi 2048x820 dengan
 *    font Apple SF, rounded rect, dan specular bevel highlight.
 * 3. Backlit LED Illumination: Emissive map yang membuat semua huruf, simbol, dan tepi
 *    tombol berpendar dengan cahaya warm-white khas Apple keyboard di studio gelap.
 * 4. Bump Map 3D: Memberikan kedalaman nyata pada bevel tiap tombol saat terkena cahaya.
 * 5. Speaker Grille Kiri & Kanan: Perforasi ribuan titik laser akustik khas MacBook Pro 16".
 * 6. Force Touch Glass Trackpad: Permukaan kaca frosted satin dengan hairline seam di palmrest.
 */
export function MacKeyboard() {
  // 1. Generate Tekstur Keyboard Resolusi Tinggi (2048 x 820)
  const { diffuseMap, emissiveMap, bumpMap } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { diffuseMap: null, emissiveMap: null, bumpMap: null };
    }

    const W = 2048;
    const H = 820;

    // Canvas 1: Diffuse (Warna fisik tombol + teks)
    const cDiff = document.createElement('canvas');
    cDiff.width = W;
    cDiff.height = H;
    const ctxDiff = cDiff.getContext('2d');

    // Canvas 2: Emissive (Cahaya backlight LED putih-hangat)
    const cEmis = document.createElement('canvas');
    cEmis.width = W;
    cEmis.height = H;
    const ctxEmis = cEmis.getContext('2d');

    // Canvas 3: Bump (Timbul 3D untuk refleksi cahaya bevel)
    const cBump = document.createElement('canvas');
    cBump.width = W;
    cBump.height = H;
    const ctxBump = cBump.getContext('2d');

    // Background Keyboard Well (Hitam doff anodized)
    ctxDiff.fillStyle = '#0e0e13';
    ctxDiff.fillRect(0, 0, W, H);

    ctxEmis.fillStyle = '#000000';
    ctxEmis.fillRect(0, 0, W, H);

    ctxBump.fillStyle = '#101010';
    ctxBump.fillRect(0, 0, W, H);

    // Definisi Layout 6 Baris Apple MacBook Pro 16"
    const ROWS = [
      // Row 0: Function row (14 keys)
      [
        { label: 'esc', w: 1.4 },
        { label: 'F1', sub: '🔅', w: 1.0 },
        { label: 'F2', sub: '🔆', w: 1.0 },
        { label: 'F3', sub: '🎛️', w: 1.0 },
        { label: 'F4', sub: '🔍', w: 1.0 },
        { label: 'F5', sub: '🎙️', w: 1.0 },
        { label: 'F6', sub: '🌙', w: 1.0 },
        { label: 'F7', sub: '⏮', w: 1.0 },
        { label: 'F8', sub: '⏯', w: 1.0 },
        { label: 'F9', sub: '⏭', w: 1.0 },
        { label: 'F10', sub: '🔇', w: 1.0 },
        { label: 'F11', sub: '🔉', w: 1.0 },
        { label: 'F12', sub: '🔊', w: 1.0 },
        { label: 'Touch ID', isTouchId: true, w: 1.4 },
      ],
      // Row 1: Numbers (14 keys)
      [
        { label: '~', sub: '`', w: 1.0 },
        { label: '!', sub: '1', w: 1.0 },
        { label: '@', sub: '2', w: 1.0 },
        { label: '#', sub: '3', w: 1.0 },
        { label: '$', sub: '4', w: 1.0 },
        { label: '%', sub: '5', w: 1.0 },
        { label: '^', sub: '6', w: 1.0 },
        { label: '&', sub: '7', w: 1.0 },
        { label: '*', sub: '8', w: 1.0 },
        { label: '(', sub: '9', w: 1.0 },
        { label: ')', sub: '0', w: 1.0 },
        { label: '_', sub: '-', w: 1.0 },
        { label: '+', sub: '=', w: 1.0 },
        { label: 'delete', sub: '⌫', w: 1.8 },
      ],
      // Row 2: QWERTY (14 keys)
      [
        { label: 'tab', sub: '⇥', w: 1.6 },
        { label: 'Q', w: 1.0 }, { label: 'W', w: 1.0 }, { label: 'E', w: 1.0 },
        { label: 'R', w: 1.0 }, { label: 'T', w: 1.0 }, { label: 'Y', w: 1.0 },
        { label: 'U', w: 1.0 }, { label: 'I', w: 1.0 }, { label: 'O', w: 1.0 },
        { label: 'P', w: 1.0 },
        { label: '{', sub: '[', w: 1.0 },
        { label: '}', sub: ']', w: 1.0 },
        { label: '|', sub: '\\', w: 1.2 },
      ],
      // Row 3: ASDF (13 keys)
      [
        { label: 'caps lock', sub: '⇪', w: 1.9 },
        { label: 'A', w: 1.0 }, { label: 'S', w: 1.0 }, { label: 'D', w: 1.0 },
        { label: 'F', w: 1.0 }, { label: 'G', w: 1.0 }, { label: 'H', w: 1.0 },
        { label: 'J', w: 1.0 }, { label: 'K', w: 1.0 }, { label: 'L', w: 1.0 },
        { label: ':', sub: ';', w: 1.0 },
        { label: '"', sub: '\'', w: 1.0 },
        { label: 'return', sub: '↩', w: 1.9 },
      ],
      // Row 4: ZXCV (12 keys)
      [
        { label: 'shift', sub: '⇧', w: 2.4 },
        { label: 'Z', w: 1.0 }, { label: 'X', w: 1.0 }, { label: 'C', w: 1.0 },
        { label: 'V', w: 1.0 }, { label: 'B', w: 1.0 }, { label: 'N', w: 1.0 },
        { label: 'M', w: 1.0 },
        { label: '<', sub: ',', w: 1.0 },
        { label: '>', sub: '.', w: 1.0 },
        { label: '?', sub: '/', w: 1.0 },
        { label: 'shift', sub: '⇧', w: 2.4 },
      ],
      // Row 5: Modifiers & Arrow keys (10 keys)
      [
        { label: 'fn', sub: '🌐', w: 1.1 },
        { label: 'control', sub: '⌃', w: 1.1 },
        { label: 'option', sub: '⌥', w: 1.3 },
        { label: 'command', sub: '⌘', w: 1.6 },
        { label: '', isSpace: true, w: 6.3 },
        { label: 'command', sub: '⌘', w: 1.6 },
        { label: 'option', sub: '⌥', w: 1.3 },
        { label: '◀', isArrow: true, w: 0.9 },
        { label: '▲▼', isArrowUpDown: true, w: 0.9 },
        { label: '▶', isArrow: true, w: 0.9 },
      ],
    ];

    const padX = 22;
    const padY = 22;
    const gapX = 10;
    const gapY = 10;
    const availableW = W - padX * 2;
    const rowH = (H - padY * 2 - gapY * (ROWS.length - 1)) / ROWS.length;

    // Helper: Gambar Rounded Rectangle
    function drawRoundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    // Iterasi Gambar Semua Tombol
    ROWS.forEach((row, rowIndex) => {
      const curY = padY + rowIndex * (rowH + gapY);
      const totalWeight = row.reduce((acc, k) => acc + k.w, 0);
      const unitW = (availableW - gapX * (row.length - 1)) / totalWeight;

      let curX = padX;

      row.forEach((key) => {
        const keyW = key.w * unitW;
        const radius = 9;

        // 1. Gambar Diffuse (Keycap Bodi)
        if (key.isTouchId) {
          // Tombol Touch ID: Sensor bundar di dalam kotak hitam
          drawRoundRect(ctxDiff, curX, curY, keyW, rowH, radius);
          ctxDiff.fillStyle = '#0a0a0d';
          ctxDiff.fill();
          ctxDiff.strokeStyle = 'rgba(255,255,255,0.18)';
          ctxDiff.lineWidth = 1.5;
          ctxDiff.stroke();

          // Sensor Ring
          ctxDiff.beginPath();
          ctxDiff.arc(curX + keyW / 2, curY + rowH / 2, rowH * 0.28, 0, Math.PI * 2);
          ctxDiff.fillStyle = '#121216';
          ctxDiff.fill();
          ctxDiff.strokeStyle = 'rgba(255,255,255,0.3)';
          ctxDiff.lineWidth = 1.2;
          ctxDiff.stroke();

          // Emissive Ring
          ctxEmis.beginPath();
          ctxEmis.arc(curX + keyW / 2, curY + rowH / 2, rowH * 0.28, 0, Math.PI * 2);
          ctxEmis.strokeStyle = 'rgba(255,245,230,0.5)';
          ctxEmis.lineWidth = 1;
          ctxEmis.stroke();
        } else if (key.isArrowUpDown) {
          // Tombol Panah Atas & Bawah (Split Setengah Tinggi)
          const halfH = (rowH - 4) / 2;

          // Tombol Panah Atas
          drawRoundRect(ctxDiff, curX, curY, keyW, halfH, 6);
          ctxDiff.fillStyle = '#181820';
          ctxDiff.fill();
          ctxDiff.strokeStyle = 'rgba(255,255,255,0.14)';
          ctxDiff.lineWidth = 1;
          ctxDiff.stroke();

          // Tombol Panah Bawah
          drawRoundRect(ctxDiff, curX, curY + halfH + 4, keyW, halfH, 6);
          ctxDiff.fillStyle = '#181820';
          ctxDiff.fill();
          ctxDiff.strokeStyle = 'rgba(255,255,255,0.14)';
          ctxDiff.lineWidth = 1;
          ctxDiff.stroke();

          // Teks Panah ▲
          ctxDiff.font = 'bold 15px -apple-system, sans-serif';
          ctxDiff.fillStyle = '#eae5dc';
          ctxDiff.textAlign = 'center';
          ctxDiff.fillText('▲', curX + keyW / 2, curY + halfH * 0.72);

          // Teks Panah ▼
          ctxDiff.fillText('▼', curX + keyW / 2, curY + halfH + 4 + halfH * 0.72);

          // Emissive Panah
          ctxEmis.font = 'bold 15px -apple-system, sans-serif';
          ctxEmis.fillStyle = '#fff6ea';
          ctxEmis.textAlign = 'center';
          ctxEmis.fillText('▲', curX + keyW / 2, curY + halfH * 0.72);
          ctxEmis.fillText('▼', curX + keyW / 2, curY + halfH + 4 + halfH * 0.72);

          // Bump Map
          drawRoundRect(ctxBump, curX, curY, keyW, halfH, 6);
          ctxBump.fillStyle = '#d0d0d0';
          ctxBump.fill();
          drawRoundRect(ctxBump, curX, curY + halfH + 4, keyW, halfH, 6);
          ctxBump.fillStyle = '#d0d0d0';
          ctxBump.fill();
        } else {
          // Tombol Standar Chiclet
          drawRoundRect(ctxDiff, curX, curY, keyW, rowH, radius);
          // Gradien keycap Apple
          const grad = ctxDiff.createLinearGradient(curX, curY, curX, curY + rowH);
          grad.addColorStop(0, '#1c1c23');
          grad.addColorStop(1, '#15151a');
          ctxDiff.fillStyle = grad;
          ctxDiff.fill();

          // Bevel Edge Highlight atas & samping
          ctxDiff.strokeStyle = 'rgba(255, 255, 255, 0.13)';
          ctxDiff.lineWidth = 1.2;
          ctxDiff.stroke();

          // 2. Gambar Huruf / Simbol Tombol
          ctxDiff.textAlign = 'center';
          ctxDiff.textBaseline = 'middle';

          if (!key.isSpace) {
            // Label Utama
            ctxDiff.font = rowIndex === 0 ? '500 15px -apple-system, sans-serif' : '600 21px -apple-system, sans-serif';
            ctxDiff.fillStyle = '#ede7dc';

            const centerY = curY + rowH / 2;
            const textY = key.sub ? centerY - 10 : centerY;
            ctxDiff.fillText(key.label, curX + keyW / 2, textY);

            // Sub-label (Shift symbol, Fn icon, dll)
            if (key.sub) {
              ctxDiff.font = '500 13px -apple-system, sans-serif';
              ctxDiff.fillStyle = '#aba398';
              ctxDiff.fillText(key.sub, curX + keyW / 2, centerY + 13);
            }

            // 3. Emissive Map (Cahaya Huruf Menyala)
            ctxEmis.textAlign = 'center';
            ctxEmis.textBaseline = 'middle';
            ctxEmis.font = rowIndex === 0 ? '500 15px -apple-system, sans-serif' : '600 21px -apple-system, sans-serif';
            ctxEmis.fillStyle = '#ffffff';
            ctxEmis.fillText(key.label, curX + keyW / 2, textY);

            if (key.sub) {
              ctxEmis.font = '500 13px -apple-system, sans-serif';
              ctxEmis.fillStyle = '#e8dccb';
              ctxEmis.fillText(key.sub, curX + keyW / 2, centerY + 13);
            }

            // Halo Pendaran di sekeliling pinggiran tombol
            drawRoundRect(ctxEmis, curX, curY, keyW, rowH, radius);
            ctxEmis.strokeStyle = 'rgba(255, 245, 230, 0.28)';
            ctxEmis.lineWidth = 1.5;
            ctxEmis.stroke();
          }

          // 4. Bump Map (Bodi tombol timbul warna abu-abu terang)
          drawRoundRect(ctxBump, curX, curY, keyW, rowH, radius);
          ctxBump.fillStyle = '#d8d8d8';
          ctxBump.fill();
        }

        curX += keyW + gapX;
      });
    });

    const texDiff = new THREE.CanvasTexture(cDiff);
    texDiff.colorSpace = THREE.SRGBColorSpace;
    texDiff.anisotropy = 16;

    const texEmis = new THREE.CanvasTexture(cEmis);
    texEmis.colorSpace = THREE.SRGBColorSpace;
    texEmis.anisotropy = 16;

    const texBump = new THREE.CanvasTexture(cBump);
    texBump.anisotropy = 16;

    return { diffuseMap: texDiff, emissiveMap: texEmis, bumpMap: texBump };
  }, []);

  // 2. Generate Tekstur Speaker Grille Kiri & Kanan (512 x 1024)
  const speakerTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;

    const W = 256;
    const H = 768;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d');

    ctx.fillStyle = '#c5c5cb';
    ctx.fillRect(0, 0, W, H);

    // Grid ribuan titik lubang speaker
    ctx.fillStyle = '#222228';
    const stepX = 7;
    const stepY = 7;
    for (let y = 14; y < H - 14; y += stepY) {
      for (let x = 14; x < W - 14; x += stepX) {
        ctx.beginPath();
        ctx.arc(x, y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);

  if (!diffuseMap) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* ═════════════════════════════════════════════════════════════════════
          1. RECESSED KEYBOARD WELL & CHICLET KEYS (22.8 x 9.1 unit)
          Diposisikan tepat di atas deck aluminium di Z = -5.3, Y = 0.038
          ═════════════════════════════════════════════════════════════════════ */}
      <mesh
        position={[0, 0.040, -5.30]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[22.6, 9.0]} />
        <meshStandardMaterial
          map={diffuseMap}
          emissiveMap={emissiveMap}
          emissive="#fff6ec"
          emissiveIntensity={0.65}
          bumpMap={bumpMap}
          bumpScale={0.035}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Frame Pinggiran Bevel Keyboard Well */}
      <mesh position={[0, 0.036, -5.30]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22.9, 9.3]} />
        <meshStandardMaterial
          color="#0a0a0e"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* ═════════════════════════════════════════════════════════════════════
          2. SPEAKER GRILLES KIRI & KANAN (MacBook Pro 16" Flanking Speakers)
          ═════════════════════════════════════════════════════════════════════ */}
      {/* Speaker Kiri */}
      <mesh position={[-13.20, 0.036, -5.30]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.7, 9.0]} />
        <meshStandardMaterial
          map={speakerTexture}
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Speaker Kanan */}
      <mesh position={[13.20, 0.036, -5.30]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.7, 9.0]} />
        <meshStandardMaterial
          map={speakerTexture}
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* ═════════════════════════════════════════════════════════════════════
          3. FORCE TOUCH SATIN GLASS TRACKPAD (11.8 x 7.4 unit)
          ═════════════════════════════════════════════════════════════════════ */}
      <mesh position={[0, 0.038, 4.20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11.6, 7.2]} />
        <meshStandardMaterial
          color="#bcbcc2"
          roughness={0.25}
          metalness={0.82}
          transparent
          opacity={0.40}
        />
      </mesh>

      {/* Hairline Seam di Sekeliling Trackpad */}
      <mesh position={[0, 0.035, 4.20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11.8, 7.4]} />
        <meshStandardMaterial
          color="#8a8a92"
          roughness={0.8}
          metalness={0.5}
        />
      </mesh>

      {/* Lampu Pendaran Lembut Langsung di Atas Tombol Keyboard */}
      <pointLight
        position={[0, 0.6, -5.3]}
        intensity={0.55}
        distance={4.0}
        color="#fff5e8"
      />
    </group>
  );
}
