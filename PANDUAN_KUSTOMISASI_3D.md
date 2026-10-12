# 📘 Buku Panduan Kustomisasi 3D & Scroll Animation
**Dokumen Resmi Panduan Modifikasi Portofolio 3D (Three.js + React Three Fiber + Vite)**

Dokumen ini adalah panduan lengkap (*handbook*) untuk mengubah segala aspek 3D di proyek ini: mulai dari titik scroll animasi, gerakan model, kamera, pencahayaan, penambahan aset 3D baru, hingga penempatan website di dalam objek 3D.

---

## 📑 Daftar Isi
1. [Peta Cepat File Proyek (Cheat Sheet)](#1-peta-cepat-file-proyek-cheat-sheet)
2. [Memahami Logika Scroll Progress (0.00 s/d 1.00)](#2-memahami-logika-scroll-progress-000-sd-100)
3. [Cara Mengatur Gerakan Model di Nilai Scroll Tertentu](#3-cara-mengatur-gerakan-model-di-nilai-scroll-tertentu)
4. [Cara Mengatur Kamera & Zoom di Nilai Scroll Tertentu](#4-cara-mengatur-kamera--zoom-di-nilai-scroll-tertentu)
5. [Cara Menambah & Memasang Model 3D Baru (.glb / .gltf)](#5-cara-menambah--memasang-model-3d-baru-glb--gltf)
6. [Cara Mengatur Pencahayaan (Lighting) Studio](#6-cara-mengatur-pencahayaan-lighting-studio)
7. [Cara Menaruh Tampilan Website di Objek 3D (<Html transform>)](#7-cara-menaruh-tampilan-website-di-objek-3d-html-transform)
8. [Mengatur Material PBR (Warna, Logam, Lampu Menyala)](#8-mengatur-material-pbr-warna-logam-lampu-menyala)
9. [Resep Kustomisasi Populer (Tinggal Salin-Tempel)](#9-resep-kustomisasi-populer-tinggal-salin-tempel)

---

## 1. 🗺️ Peta Cepat File Proyek (Cheat Sheet)

Bila Anda ingin mengubah sesuatu, langsung buka file yang bersangkutan di bawah ini:

| Apa yang Ingin Diubah? | File yang Dibuka | Variabel / Bagian Kunci |
|---|---|---|
| **Batas fase scroll (0%, 18%, 35%, dll)** | [`src/App.jsx`](file:///c:/Users/novit/Documents/portfolio/src/App.jsx) | Fungsi `getStageInfo()` & baris scroll |
| **Kamera, zoom, kemiringan, lookAt** | [`src/components/canvas/CameraRig.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/CameraRig.jsx) | `ty, tz, ly, lz` di tiap Fase 1–4 |
| **Sudut buka/tutup engsel laptop** | [`src/components/canvas/LaptopModel.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/LaptopModel.jsx) | `CLOSED_ANGLE, OPEN_ANGLE, targetAngle` |
| **Ukuran & letak website di layar laptop** | [`src/components/canvas/LaptopModel.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/LaptopModel.jsx) | `<Html transform distanceFactor={11.7}>` |
| **Terang/gelap lampu, warna studio** | [`src/components/canvas/Lights.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/Lights.jsx) | `<directionalLight>`, `<pointLight>` |
| **Tombol keyboard, font, pendaran LED** | [`src/components/canvas/MacKeyboard.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/MacKeyboard.jsx) | Canvas texture generator & emissive |
| **Isi teks, proyek, foto di dalam laptop** | [`src/components/dom/VirtualWebsite.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/dom/VirtualWebsite.jsx) & folder `src/components/dom/` | Komponen React biasa (`Hero`, `About`, dll) |
| **Data portofolio (nama, bio, kontak)** | [`src/data/portfolioData.js`](file:///c:/Users/novit/Documents/portfolio/src/data/portfolioData.js) | Objek `personalInfo` |

---

## 2. ⏱️ Memahami Logika Scroll Progress (0.00 s/d 1.00)

### Bagaimana Sistem Membaca Scroll?
Di [`src/App.jsx`](file:///c:/Users/novit/Documents/portfolio/src/App.jsx#L14-L27), seluruh tinggi halaman web dihitung menggunakan rumus persentase ternormalisasi:

$$\text{scrollProgress} = \frac{\text{Posisi Scroll Saat Ini}}{\text{Total Tinggi Scroll Maksimal}}$$

* Saat halaman **paling atas**: `scrollProgress = 0.00` (0%)
* Saat halaman **di tengah**: `scrollProgress = 0.50` (50%)
* Saat halaman **paling bawah**: `scrollProgress = 1.00` (100%)

### Timeline 4 Babak Saat Ini:
```text
 0.00 (0%)                 0.18 (18%)                0.35 (35%)                                0.85 (85%)       1.00 (100%)
   ├───────────────────────────┼─────────────────────────┼─────────────────────────────────────────┼────────────────┤
   │          FASE 1           │         FASE 2          │                 FASE 3                  │     FASE 4     │
   │      Laptop Membuka       │    Kamera Zoom-In       │    Scroll Website di Dalam Layar        │ Laptop Menutup │
   │  (Engsel berputar 180°->79°)│   (Meluncur ke tengah)  │     (Kamera terkunci di tengah)         │ (Kembali wide) │
```

---

## 3. 🎬 Cara Mengatur Gerakan Model di Nilai Scroll Tertentu

Buka file [**`src/components/canvas/LaptopModel.jsx`**](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/LaptopModel.jsx).

Gerakan fisik 3D dijalankan setiap frame oleh loop **`useFrame((state, delta) => { ... })`**.

### Rumus Menggerakkan Objek pada Rentang Scroll:
Jika Anda ingin sebuah objek bergerak dari scroll **A** menuju **B**:

```javascript
if (scrollProgress >= A && scrollProgress < B) {
  // 1. Hitung progres lokal dari 0 sampai 1 di dalam rentang tersebut
  const p = (scrollProgress - A) / (B - A);

  // 2. Beri efek kelenturan (easing) agar gerakannya tidak kaku:
  // Linear: p
  // Smooth (pelan di awal & akhir): THREE.MathUtils.smoothstep(p, 0, 1)
  // Ease-Out (cepat lalu melambat): 1 - Math.pow(1 - p, 3)
  const ease = THREE.MathUtils.smoothstep(p, 0, 1);

  // 3. Interpolasi nilai target dari POSISI_AWAL ke POSISI_AKHIR
  targetNilai = THREE.MathUtils.lerp(NILAI_AWAL, NILAI_AKHIR, ease);
}
```

### Contoh Nyata di LaptopModel:
Mengatur kapan engsel laptop mulai membuka dan selesai membuka:

```javascript
// Sudut engsel (dalam satuan radian):
const CLOSED_ANGLE = Math.PI; // 3.14 rad = 180 derajat (tertutup rapat)
const OPEN_ANGLE   = 1.38;    // 1.38 rad = ~79 derajat (terbuka ideal)

let targetAngle = OPEN_ANGLE;

// Ingin laptop membuka dari scroll 0.00 sampai 0.25 (misal diperpanjang):
if (scrollProgress < 0.25) {
  const p = scrollProgress / 0.25;
  const ease = 1 - Math.pow(1 - p, 3);
  targetAngle = THREE.MathUtils.lerp(CLOSED_ANGLE, OPEN_ANGLE, ease);
}

// Terapkan ke rotasi fisik engsel dengan redaman halus (damp):
screenRef.current.rotation.x = THREE.MathUtils.damp(
  screenRef.current.rotation.x,
  targetAngle,
  6,     // Kecepatan kehalusan redaman (makin tinggi makin responsif)
  delta
);
```

---

## 4. 🎥 Cara Mengatur Kamera & Zoom di Nilai Scroll Tertentu

Buka file [**`src/components/canvas/CameraRig.jsx`**](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/CameraRig.jsx).

Kamera dikontrol oleh 4 variabel utama:
* **`ty`** = Ketinggian kamera berdiri (Sumbu Y: atas/bawah).
* **`tz`** = Jarak mundur kamera / **ZOOM** (Sumbu Z: makin kecil = makin zoom-in, makin besar = makin zoom-out).
* **`ly`** = Arah bidikan lensa vertikal (LookAt Y: mendongak ke layar atau menunduk ke meja).
* **`lz`** = Arah bidikan lensa kedalaman (LookAt Z).

### Kode Pengaturan Fase Kamera:

```javascript
useFrame((state, delta) => {
  const { pointer, camera } = state;

  let ty = 0.70, tz = 4.80;
  let ly = -0.30, lz = -0.20;

  if (scrollProgress < 0.18) {
    // -------------------------------------------------------------
    // FASE 1 (Scroll 0% -> 18%): Posisi saat pertama kali dibuka
    // -------------------------------------------------------------
    const p = Math.min(1, scrollProgress / 0.18);
    const ease = 1 - Math.pow(1 - p, 3);
    ty = THREE.MathUtils.lerp(0.70,  1.60, ease); // Tinggi kamera
    tz = THREE.MathUtils.lerp(4.80,  4.30, ease); // Jarak zoom
    ly = THREE.MathUtils.lerp(-0.30, 0.05, ease); // Titik bidik Y
    lz = THREE.MathUtils.lerp(-0.20,-0.60, ease); // Titik bidik Z

  } else if (scrollProgress < 0.35) {
    // -------------------------------------------------------------
    // FASE 2 (Scroll 18% -> 35%): Transisi meluncur menuju layar
    // -------------------------------------------------------------
    const p = (scrollProgress - 0.18) / 0.17;
    const ease = THREE.MathUtils.smoothstep(p, 0, 1);
    ty = THREE.MathUtils.lerp(1.60,  1.65, ease); // Menuju Y tengah layar
    tz = THREE.MathUtils.lerp(4.30,  2.80, ease); // Menuju jarak zoom target
    ly = THREE.MathUtils.lerp(0.05,  0.75, ease); // Menuju pusat layar
    lz = THREE.MathUtils.lerp(-0.60,-1.82, ease); // Menuju kedalaman layar

  } else if (scrollProgress <= 0.85) {
    // -------------------------------------------------------------
    // FASE 3 (Scroll 35% -> 85%): Terkunci saat membaca website
    // -------------------------------------------------------------
    ty = 1.65;  // Ubah nilai ini jika ingin kamera lebih naik/turun
    tz = 2.80;  // UBAH NILAI INI UNTUK ZOOM (misal 2.20 = sangat dekat)
    ly = 0.75;  // 0.75 adalah titik tengah tepat panel layar laptop
    lz = -1.82; // -1.82 adalah posisi kedalaman layar laptop

  } else {
    // -------------------------------------------------------------
    // FASE 4 (Scroll 85% -> 100%): Zoom-out saat laptop menutup rapat
    // -------------------------------------------------------------
    const p = Math.min(1, (scrollProgress - 0.85) / 0.15);
    const ease = Math.pow(p, 2);
    ty = THREE.MathUtils.lerp(1.65,  0.70, ease);
    tz = THREE.MathUtils.lerp(2.80,  4.80, ease);
    ly = THREE.MathUtils.lerp(0.75, -0.30, ease);
    lz = THREE.MathUtils.lerp(-1.82,-0.20, ease);
  }

  // Efek Parallax Kursor Mouse:
  const isZoomed = scrollProgress >= 0.35 && scrollProgress <= 0.85;
  const parallax = isZoomed ? 0.03 : 0.16; // Lebih tenang saat zoom agar nyaman dibaca

  camera.position.lerp(new THREE.Vector3(pointer.x * parallax, ty + pointer.y * (parallax * 0.4), tz), 0.1);
  camera.lookAt(new THREE.Vector3(0, ly, lz));
});
```

---

## 5. 📦 Cara Menambah & Memasang Model 3D Baru (.glb / .gltf)

Jika di masa depan Anda ingin mengganti laptop dengan model 3D lain (misalnya iPhone, monitor desktop, robot, mobil, atau meja kerja):

### Langkah 1: Siapkan File 3D
1. Unduh model berformat **`.glb`** (GLTF Binary, kompresi Draco sangat disarankan).
2. Letakkan file tersebut di folder **`public/`** (contoh: `public/my-model.glb`). File di folder `public` bisa dipanggil langsung via URL root: `useGLTF('/my-model.glb')`.

### Langkah 2: Bedah Struktur Node Model (Otomatis)
Buka terminal dan jalankan tool pembuat komponen otomatis dari tim Poimandres:
```bash
npx -y gltfjsx public/my-model.glb
```
Perintah ini akan membuat file JSX (misalnya `My-model.jsx`) yang memperlihatkan nama-nama mesh dan geometri aslinya:
```jsx
// Hasil dump gltfjsx akan memperlihatkan node apa saja yang ada di dalamnya:
export function Model(props) {
  const { nodes, materials } = useGLTF('/my-model.glb');
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Body.geometry} material={materials.Metal} />
      <mesh geometry={nodes.Screen.geometry} material={materials.Glass} />
    </group>
  );
}
```

### Langkah 3: Render di Dalam Komponen Canvas
Buat komponen baru di `src/components/canvas/NamaModel.jsx`:
```jsx
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function CustomObject({ scrollProgress }) {
  const modelRef = useRef();
  const { nodes, materials } = useGLTF('/my-model.glb');

  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={1.0}>
      <mesh 
        geometry={nodes.Body.geometry} 
        material={materials.Metal} 
        castShadow 
        receiveShadow 
      />
    </group>
  );
}

useGLTF.preload('/my-model.glb'); // Preload agar langsung muncul tanpa lag
```

---

## 6. 💡 Cara Mengatur Pencahayaan (Lighting) Studio

Buka file [**`src/components/canvas/Lights.jsx`**](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/Lights.jsx).

Three.js menggunakan beberapa tipe lampu studio:

### A. Jenis-Jenis Lampu:
1. **`<ambientLight />`** (Cahaya Lingkungan / Merata)
   * Tidak memiliki arah bayangan. Menerangi seluruh ruangan secara merata agar area gelap tidak menjadi hitam pekat.
   * `intensity={0.8}` $\rightarrow$ makin tinggi makin terang secara keseluruhan.
   * `color="#f7f3ed"` $\rightarrow$ gunakan warna putih gading hangat untuk kesan mewah.

2. **`<directionalLight />`** (Lampu Sorot Utama Matahari / Key Light)
   * Memiliki arah pancaran paralel dan menghasilkan bayangan tajam (*castShadow*).
   * `position={[X, Y, Z]}`:
     * `X = +6` (dari kanan), `X = -6` (dari kiri)
     * `Y = +8` (dari atas)
     * `Z = +5` (dari depan kamera)
   * `intensity={1.6}`: kekuatan pancaran cahaya.

3. **`<pointLight />`** (Lampu Bohlam Titik / Rim Light / Aksen)
   * Memancarkan cahaya ke segala arah dari satu titik seperti bohlam lampu.
   * Sangat bagus diletakkan di samping atau belakang laptop untuk menghasilkan garis kilau (*rim light*) pada lekukan bodi aluminium.
   * `distance={4.0}` $\rightarrow$ jarak jangkauan cahaya sebelum meredup.

### Contoh Menambah Lampu Aksen Baru:
```jsx
{/* Menambahkan lampu sorot neon/aksen biru lembut dari kiri */}
<pointLight
  position={[-5, 2, 1]}
  intensity={0.8}
  color="#dbeafe"
  distance={8}
/>
```

---

## 7. 💻 Cara Menaruh Tampilan Website di Objek 3D (`<Html transform>`)

Buka file [**`src/components/canvas/LaptopModel.jsx`**](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/LaptopModel.jsx#L140-L175).

### Struktur Dasar:
```jsx
<group position={[X, Y, Z]} rotation={[rotX, rotY, rotZ]}>
  <Html
    transform             // Wajib: memproyeksikan elemen HTML menjadi bidang 3D
    distanceFactor={11.7} // Skala pembesar/pengecil agar pas dengan bingkai fisik
    occlude={false}       // true jika ingin tertutup saat ada objek 3D di depannya
  >
    {/* Wadah div dengan ukuran resolusi tetap */}
    <div style={{ width: 1024, height: 640 }}>
      <KomponenWebsiteAnda />
    </div>
  </Html>
</group>
```

### Tips Pengaturan:
1. **Mengubah Ukuran Tampilan Layar**:
   * Jika resolusi div diubah (misalnya jadi `1280 × 800`), sesuaikan juga `distanceFactor`:
     $$\text{distanceFactor Baru} = \frac{\text{Lebar Fisik 3D (30.37)}}{\text{Lebar CSS (1280)}} \times 400 \approx 9.49$$
2. **Menyinkronkan Scroll Roda Mouse Luar dengan Isi Website Virtual**:
   Di dalam `LaptopModel.jsx`:
   ```javascript
   useEffect(() => {
     if (!scrollContainerRef.current) return;
     const el = scrollContainerRef.current;
     // Ketika scrollProgress berada di Fase 3 (0.32 s/d 0.85):
     const ratio = (scrollProgress - 0.32) / 0.53;
     el.scrollTop = ratio * (el.scrollHeight - el.clientHeight);
   }, [scrollProgress]);
   ```

---

## 8. 🎨 Mengatur Material PBR (Warna, Logam, Lampu Menyala)

Setiap objek 3D menggunakan material berbasis fisik (*Physically Based Rendering* / PBR) bernama **`<meshStandardMaterial />`**.

### Parameter Paling Penting:
* **`color="#c5c5cb"`**: Warna dasar permukaan.
* **`metalness={0.82}`**: Nilai logam (0 = plastik/kayu/kain, 1 = logam/aluminium murni).
* **`roughness={0.28}`**: Kekasaran (0 = kaca/cermin mengkilap, 1 = kapur/dof kasar).
* **`emissive="#fff5e6"`**: Warna pendaran cahaya dari dalam objek (efek neon/LED menyala).
* **`emissiveIntensity={0.38}`**: Seberapa kuat cahaya berpendar.
* **`transparent={true}` & `opacity={0.5}`**: Membuat material transparan / tembus pandang (seperti kaca).

### Contoh: Membuat Tombol Menyala Neon:
```jsx
<mesh geometry={nodes.Tombol.geometry}>
  <meshStandardMaterial
    color="#000000"
    emissive="#00f0ff"        // Pendaran warna biru cyan neon
    emissiveIntensity={1.5}   // Menyala sangat terang
    roughness={0.2}
  />
</mesh>
```

---

## 9. 🍳 Resep Kustomisasi Populer (Tinggal Salin-Tempel)

### Resep A: Ingin Kamera Lebih Dekat ke Layar (Lebih Zoom-In Saat Fase 3)
Buka [`src/components/canvas/CameraRig.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/CameraRig.jsx#L42-L48), ubah nilai `tz` di Fase 3:
```diff
} else if (scrollProgress <= 0.85) {
  ty = 1.65;
- tz = 2.80;
+ tz = 2.10; // Makin kecil = layar makin besar & dekat ke mata
  ly = 0.75;
  lz = -1.82;
}
```

### Resep B: Ingin Laptop Terbuka Lebih Lebar Saat Membuka
Buka [`src/components/canvas/LaptopModel.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/LaptopModel.jsx#L36-L39):
```diff
const CLOSED_ANGLE = Math.PI; // 180 derajat
- const OPEN_ANGLE   = 1.38;   // ~79 derajat
+ const OPEN_ANGLE   = 1.15;   // ~65 derajat (layar lebih miring ke belakang)
```

### Resep C: Mengubah Lampu Studio Menjadi Nuansa Dark Mode / Cyberpunk
Buka [`src/components/canvas/Lights.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/Lights.jsx):
```diff
- <ambientLight intensity={0.90} color="#f7f3ed" />
+ <ambientLight intensity={0.30} color="#0f172a" /> // Ruangan gelap

- <directionalLight position={[6, 8, 5]} intensity={1.6} color="#fffbf5" />
+ <directionalLight position={[6, 8, 5]} intensity={1.2} color="#38bdf8" /> // Sorotan biru

- <pointLight position={[-6, 3, -3]} intensity={1.0} color="#D4C5B9" />
+ <pointLight position={[-6, 3, -3]} intensity={1.5} color="#ec4899" /> // Aksen rim ungu neon
```

---

## 10. 🛠️ Perintah Berguna untuk Terminal

* **Menjalankan Server Lokal Dev:**
  ```bash
  npm run dev
  ```
* **Memvalidasi Apakah Ada Kode yang Error:**
  ```bash
  npm run build
  ```
* **Menyimpan Perubahan & Push ke GitHub:**
  ```bash
  git add .
  git commit -m "update: kustomisasi kamera dan model 3d"
  git push origin main
  ```
  *(Begitu Anda push ke GitHub, Vercel akan otomatis meng-update website Anda secara online).*
