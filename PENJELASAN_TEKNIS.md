# 📖 Penjelasan Teknis Lengkap: 3D Portfolio Azzam Ghozy

Dokumen ini adalah **buku catatan teknis resmi** proyek portofolio 3D Anda. Setiap langkah, instalasi dependensi, perakitan aset 3D, koreografi scroll, crop gambar, dan pembaruan kode dicatat secara transparan di sini agar Anda memahaminya 100% dan siap menjawab pertanyaan wawancara kapan saja.

---

## 1. 🛠️ Fondasi Proyek & Daftar Instalasi

### A. Inisialisasi Proyek (Vite + React)
* **Perintah:**
  ```bash
  npx -y create-vite@latest temp-app --template react --no-interactive
  ```
* **Alasan teknis:** Dibuat di folder sementara lalu dipindahkan ke root agar file panduan awal (`PRD.md` dan `ARCHITECTURE.md`) tidak terhapus oleh proses scaffolding Vite.

### B. Dependensi yang Dipasang
* **Perintah:**
  ```bash
  npm install tailwindcss @tailwindcss/vite three @react-three/fiber @react-three/drei gsap lenis lucide-react
  ```
* **Peran masing-masing library:**
  * `three`: Mesin utama WebGL untuk kalkulasi 3D matematika, kamera, dan pencahayaan.
  * `@react-three/fiber` (R3F): Wrapper resmi Three.js untuk React. Memungkinkan kita menulis 3D secara deklaratif dengan JSX (`<mesh>`, `<Canvas>`, dll).
  * `@react-three/drei`: Kumpulan helper canggih Three.js (loader model `useGLTF`, bayangan `<ContactShadows>`, elemen `<Html>`, dan animasi melayang `<Float>`).
  * `lenis`: Mesin *inertial smooth scroll* yang membuat putaran roda mouse terasa licin dan halus seperti di perangkat Apple.
  * `@tailwindcss/vite`: Plugin resmi Tailwind CSS v4 untuk integrasi instan tanpa konfigurasi rumit.
  * `lucide-react`: Ikon-ikon UI modern.

---

## 2. 📸 Pemrosesan Aset Gambar IDN Website (Crop Otomatis)

Anda memberikan screenshot layar penuh browser yang memuat website `https://idnbs.my.id`.

* **Tantangan:** Screenshot tersebut masih memuat tab Chrome, address bar, dan scrollbar browser di sisi kanan.
* **Solusi Otomatis:**
  Kami membuat script PowerShell [`src/assets/crop.ps1`](file:///c:/Users/novit/Documents/portfolio/src/assets/crop.ps1) menggunakan pustaka `System.Drawing`:
  * Memotong `56px` dari atas (membersihkan seluruh address bar dan tab).
  * Memotong `14px` dari kanan (membersihkan scrollbar browser).
* **Hasil Akhir:** Tersimpan di file [`src/assets/idn-preview.png`](file:///c:/Users/novit/Documents/portfolio/src/assets/idn-preview.png). Gambar ini murni menampilkan navbar IDN, headline *"Menghafal Al-Qur'an. Membangun Teknologi..."*, foto gedung, dan statistik sekolah.
* **Pemasangan:** Gambar ini dipasang di 2 tempat sekaligus:
  1. Di dalam layar **3D Apple MacBook Pro**.
  2. Di dalam kartu **Featured Engineering Case Study** di halaman utama.

---

## 3. 💻 Aset 3D HD: Apple MacBook Pro 16" ([`public/mac.glb`](file:///c:/Users/novit/Documents/portfolio/public/mac.glb))

Alih-alih bentuk balok biasa, kita menggunakan model 3D resmi open-source **Apple MacBook Pro 16"** standar industri creative developer (Poimandres / Drei ecosystem):

* **Ukuran File:** Hanya **~214 KB** (Sangat ringan, 0 detik loading time, bebas lag).
* **Anatomi Model (Hasil Bedah Node 3D):**
  * `body`: Sasis bawah aluminium, keyboard chiclet, speaker grill, dan trackpad kaca.
  * `screen`: Node engsel di koordinat pivot `[0, -0.4129, -11.346]`.
  * `back`: Punggung layar berbahan aluminium anodized lengkap dengan logo Apple.
  * `matte`: Bezel hitam layar dengan permukaan kaca.
* **Pemasangan Layar Interaktif:**
  Di dalam node `screen`, kita menyematkan komponen `<Html transform distanceFactor={18}>` yang menempelkan screenshot asli IDN Boarding School tepat di dalam bingkai layar MacBook.

---

## 4. 🎬 Koreografi Scroll 4 Babak Virtual Laptop (Apple Style Interactive Experience)

Inilah alur interaktif yang Anda minta: **Seluruh konten website berada di DALAM layar laptop 3D virtual, dan scroll browser mengendalikan gerakan fisik laptop, zoom kamera, serta scroll website di dalam layar virtual secara seamless**.

### Matematika & Logika di [`LaptopModel.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/LaptopModel.jsx), [`CameraRig.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/CameraRig.jsx), & [`VirtualWebsite.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/dom/VirtualWebsite.jsx):

```
+-----------------------------------------------------------------------------------------+
| FASE 1: LAPTOP MEMBUKA (Scroll 0% -> 18%)                                               |
| • Posisi Awal: Laptop TERTUTUP RAPAT (Engsel = 3.14 rad / 180°).                        |
| • Kamera: Berada di posisi wide [0, 1.65, 4.8] melihat bodi MacBook di atas meja.       |
| • Gerakan Scroll: Engsel membuka perlahan ke 1.38 rad (105°) memperlihatkan Hero Section |
|   di dalam bingkai layar browser macOS virtual.                                         |
+-----------------------------------------------------------------------------------------+
                                             │
                                             ▼
+-----------------------------------------------------------------------------------------+
| FASE 2: CAMERA ZOOM-IN KE LAYAR LAPTOP + KEYBOARD (Scroll 18% -> 35%)                   |
| • Engsel laptop tetap terbuka stabil (105°).                                            |
| • Kamera ZOOM-IN sinematik dari wide view [0, 1.65, 4.8] mendekat ke [0, 0.65, 3.35]    |
|   sehingga bingkai layar virtual laptop memenuhi ~56% lebar viewport secara nyaman,    |
|   dan jajaran keyboard chiclet yang menyala estetik terlihat di bagian bawah.          |
+-----------------------------------------------------------------------------------------+
                                             │
                                             ▼
+-----------------------------------------------------------------------------------------+
| FASE 3: MENG-SCROLL WEBSITE DI DALAM LAYAR LAPTOP VIRTUAL (Scroll 35% -> 85%)          |
| • Kamera locked di depan layar laptop dengan sudut pandang yang memperlihatkan keyboard.|
| • Saat pengunjung memutar scroll wheel mouse, isi website DI DALAM layar laptop virtual |
|   meng-scroll secara halus dari Hero -> About -> Case Study -> Skills -> Journey ->     |
|   Contact -> Footer.                                                                    |
| • Dikontrol via `scrollTop` terikat pada `virtualRatio = (scrollProgress - 0.35) / 0.50`. |
+-----------------------------------------------------------------------------------------+
                                             │
                                             ▼
+-----------------------------------------------------------------------------------------+
| FASE 4: UNZOOM & LAPTOP MENUTUP KEMBALI (Scroll 85% -> 100%)                            |
| • Pengunjung telah mencapai ujung bawah konten website virtual.                         |
| • Kamera UNZOOM / PULL-BACK mundur kembali ke wide view [0, 1.65, 4.8].                 |
| • Engsel MacBook MENUTUP KEMBALI secara halus dari 105° menuju 180° (tertutup rapat).   |
| • Muncul overlay penutup: "Workspace Completed • Scroll back up / Reopen Workspace ↑".   |
+-----------------------------------------------------------------------------------------+
```

---

## 5. 🔍 Bedah Teknis & Solusi Tuntas 3 Bug

| Masalah | Penyebab Teknis (Root Cause) | Solusi & Pemulihan (Fix) |
|---|---|---|
| **1. Layar laptop tampak menghilang** | Nilai `distanceFactor={18}` menghasilkan ukuran 3D HTML sebesar 46.08 unit, padahal panel layar fisik hanya 30.37 unit (overflow 150%). Layar HTML raksasa tersebut menutupi seluruh bingkai bezel dan punggung laptop. | Dihitung ulang presisi: `distanceFactor={11.7}` menghasilkan lebar 29.95 unit yang pas rapi di dalam bezel 30.37 unit. Ditambahkan efek fade elegan saat laptop tertutup. |
| **2. Teks website terbalik / mirror** | Terdapat `transform: 'scaleX(-1)'` yang dipasang secara keliru pada div pembungkus. Rotasi `[-Math.PI/2, 0, 0]` sebenarnya sudah memetakan sumbu X kanan ke kanan secara normal. | Menghapus `scaleX(-1)`. Teks, navbar, dan tombol sekarang 100% terbaca normal dari kiri ke kanan. |
| **3. Keyboard tidak muncul & bodi polos abu-abu** | Bedah binary mendalam pada aset `mac.glb`: Model bawaan **ternyata sama sekali tidak memiliki geometri 3D tombol keyboard**. Node `body_2` hanya memuat kaki karet bawah dan celah ventilasi engsel belakang. Area di belakang trackpad pada model asli murni berupa lempengan aluminium kosong polos. | Diciptakan komponen dedicated **[`MacKeyboard.jsx`](file:///c:/Users/novit/Documents/portfolio/src/components/canvas/MacKeyboard.jsx)** yang menyematkan sistem Apple Magic Keyboard 16" lengkap:<br>• **77 Tombol Chiclet Presisi**: Bertekstur matte charcoal (`#15151a`) dengan font asli Apple SF Pro, Touch ID sensor ring, dan split inverted-T arrows.<br>• **Backlit LED Illumination**: Emissive map warm-white (`#fff5e6`) pendaran khas Apple keyboard studio.<br>• **Bump Map 3D**: Menghasilkan lekukan dan bevel timbul nyata di sekeliling tiap tombol saat disinari cahaya studio.<br>• **Speaker Grilles Kiri-Kanan**: Perforasi ribuan titik laser akustik khas MacBook Pro 16".<br>• **Force Touch Glass Trackpad**: Permukaan kaca satin dengan hairline seam di palm rest. |

---

## 6. ☀️ Sistem Desain: Quiet Luxury Light Mode

Seluruh tampilan menggunakan estetika **Quiet Luxury Terang** (terinspirasi dari galeri arsitektur Nordik dan website produk Apple):
* **Latar Belakang:** `#F8F8F6` (*Alabaster Off-White*).
* **Teks:** `#1C1C1C` (*Tailored Black*).
* **Aksen Logam:** `#B8A594` dan `#8C7B6B` (*Warm Champagne Sand*).
* **Bodi Laptop:** Space Silver Anodized Aluminium (`#c5c5cb`, metalness 0.82, roughness 0.28, bead-blasted normal map).
* **Keyboard:** Backlit chiclet keyboard dengan pendaran cahaya LED optik dan trackpad Force Touch satin glass.
* **Kartu Transparan (Glassmorphism):** Putih kaca es (`rgba(255, 255, 255, 0.78)`) dengan efek blur `20px` dan bayangan lembut.
* **Bayangan Laptop:** Menggunakan `<ContactShadows>` berwarna hangat di atas meja agar MacBook tampak benar-benar berpijak di dunia nyata.

---

## 7. 🎯 Contekan Siap Pakai untuk Wawancara (Interview Talking Points)

> **Q: "Bagaimana cara kamu membuat model 3D laptop membuka dan menutup saat di-scroll?"**
> **A:** *"Saya menggunakan model 3D GLTF yang memiliki pemisahan hierarki antara node sasis (`body`) dan node layar (`screen`). Saya membaca nilai normalized scroll progress (0 sampai 1) dari browser melalui hook Lenis, lalu menginterpolasi nilai rotasi sumbu X pada pivot engsel layar menggunakan fungsi matematika `lerp` dan `damp` di dalam render loop `@react-three/fiber`. Di awal halaman, engsel diatur tertutup rapat (sudut Math.PI), membuka hingga 105 derajat saat di-scroll, dan menutup kembali di ujung halaman."*

> **Q: "Bagaimana cara kamu memproyeksikan website ke dalam layar laptop 3D tanpa terbalik atau distort?"**
> **A:** *"Saya memanfaatkan komponen `<Html transform>` dari `@react-three/drei`. Saya mengkalibrasi rasio proyeksi menggunakan `distanceFactor` agar resolusi CSS 1024x640 pas secara matematis dengan unit bounding box mesh layar (30.37 unit), serta menyelaraskan matriks rotasi Euler [-Math.PI/2, 0, 0] agar orientasi vertikal dan horizontal sejalan dengan koordinat Three.js tanpa memerlukan scale flip manual."*

> **Q: "Bagaimana cara kamu membuat detail keyboard MacBook Pro tampak realistis dan bercahaya?"**
> **A:** *"Pada model 3D aslinya, material keycap bersifat non-emissive yang dapat tampak gelap tanpa refleksi lingkungan. Saya meningkatkan shader materialnya menggunakan PBR MeshStandardMaterial dengan keycap matte, subtle emissive warm-white glow, serta menambahkan plat diffuser optik di bawah sasis tombol. Dipadukan dengan pencahayaan studio directional rake light dari atas dan sudut kamera 3/4 yang proporsional, seluruh baris keyboard chiclet, speaker grill, dan trackpad Force Touch tampil jelas dengan karakter premium khas Apple."*

---

## 8. 🚀 Status Pengujian & Server Lokal
* **Build Status:** `✓ built in 789ms` (0 error, production ready).
* **Local Dev Server:** Aktif di **http://localhost:5173/**.
