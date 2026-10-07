# 🏛️ Arsitektur Proyek: 3D Developer Portfolio (Quiet Luxury)

Dokumen ini mendefinisikan struktur folder, pembagian layer visual, dan alur data agar kode aplikasi rapi, modular, dan sangat mudah dipahami.

---

## 1. 🥞 Pembagian Layer Visual (Visual Stacking)

Salah satu kesalahan umum pada web 3D adalah mencampurkan tag HTML dengan Three.js dalam satu file sehingga kode menjadi semrawut. Kita membaginya menjadi **2 Layer Utama**:

```
+-------------------------------------------------------+
| LAYER 2: DOM UI OVERLAY (z-index: 10)                 |
| (Navbar, Teks, Kartu Glassmorphism, Tombol Klik)      |
| *pointer-events: none* (kecuali tombol & card)        |
+-------------------------------------------------------+
| LAYER 1: 3D WEBGL CANVAS (z-index: 0, fixed)          |
| (Three.js Scene: Meja, Laptop 3D, Lighting, Kamera)   |
| Mengikuti gerakan scroll dan kursor mouse             |
+-------------------------------------------------------+
| BACKGROUND BASE (z-index: -1)                         |
| Warna tema Quiet Luxury (#F4F4F2 / #1A1A1A)           |
+-------------------------------------------------------+
```

---

## 2. 📁 Struktur Folder & File (Modular Architecture)

```
portfolio/
├── PRD.md                       # Dokumen kebutuhan produk
├── ARCHITECTURE.md              # Dokumen arsitektur (file ini)
├── index.html                   # Entry HTML + Google Fonts (Cabinet Grotesk & Inter)
├── package.json
├── tailwind.config.js           # Token warna Quiet Luxury & tipografi kustom
├── vite.config.js
│
└── src/
    ├── assets/                  # Screenshot IDN Website, icon, resume PDF
    │   ├── images/
    │   └── models/              # Model 3D (.glb) jika ada
    │
    ├── data/                    # 🎯 Single Source of Truth (Semua teks & data)
    │   └── portfolioData.js     # Profil, info IDN Website, skills, medsos
    │
    ├── components/
    │   ├── canvas/              # 🪐 KHUSUS DUNIA 3D (Three.js & R3F)
    │   │   ├── Scene.jsx        # Canvas induk, renderer, & shadows
    │   │   ├── LaptopModel.jsx  # Objek 3D laptop + layar interaktif
    │   │   ├── CameraRig.jsx    # Kontrol kamera (Parallax kursor & GSAP scroll)
    │   │   └── Lights.jsx       # Pencahayaan lembut (Champagne & Studio Soft)
    │   │
    │   ├── dom/                 # 📄 KHUSUS UI 2D (HTML & Tailwind)
    │   │   ├── Navbar.jsx       # Floating glass navigation bar
    │   │   ├── Hero.jsx         # Headline, status badge, tombol CTA
    │   │   ├── About.jsx        # Bio ringkas & 4 highlight stats
    │   │   ├── FeaturedProject.jsx # Showcase mendalam IDN Website
    │   │   ├── Skills.jsx       # Grid keahlian (Frontend, Backend, Tools)
    │   │   ├── Experience.jsx   # Timeline pendidikan di IDN Boarding School
    │   │   ├── Contact.jsx      # Form & tautan media sosial
    │   │   └── Footer.jsx       # Copyright & credit
    │   │
    │   └── ui/                  # 🧩 Komponen Atom Reusable
    │       ├── Button.jsx       # Tombol aksen Quiet Luxury
    │       ├── GlassCard.jsx    # Kartu transparan dengan efek blur halus
    │       └── SectionHeading.jsx # Judul section konsisten
    │
    ├── hooks/                   # ⚙️ Logika & Utilitas
    │   ├── useLenis.js          # Inisialisasi smooth scroll ultra-halus
    │   └── useScrollSync.js     # Penghubung scroll GSAP dengan animasi 3D
    │
    ├── styles/
    │   └── index.css            # Tailwind directives, CSS variables, & typography
    │
    ├── App.jsx                  # Penggabung Layer 1 (3D) dan Layer 2 (DOM)
    └── main.jsx                 # Entry point React
```

---

## 3. 🔄 Alur Komunikasi Antar Modul

1. **Pemisahan Konten:**
   * Jika Anda ingin mengubah teks biodata, menambah skill, atau mengganti link demo **IDN Website**, Anda **hanya perlu mengedit `src/data/portfolioData.js`**. Tidak perlu menyentuh kode 3D atau JSX komponen sama sekali.

2. **Sinkronisasi Scroll (Scrollytelling):**
   * Pengguna men-scroll halaman menggunakan **Lenis** (membuat gerakan sangat mulus/fluid).
   * **GSAP ScrollTrigger** membaca posisi scroll container.
   * `CameraRig.jsx` memindahkan posisi kamera 3D mendekat ke layar laptop secara proporsional sesuai nilai scroll tersebut.

3. **Performa & Mobile Responsiveness:**
   * Di layar desktop: Kanvas 3D aktif penuh dengan rotasi kursor dan efek bayangan (*contact shadows*).
   * Di layar smartphone (< 768px): Sudut kamera otomatis disesuaikan agar objek tetap berada di tengah layar, dan beban render dikurangi agar hemat baterai.
