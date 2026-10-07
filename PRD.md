# 📋 Product Requirement Document (PRD): 3D Developer Portfolio

> **Petunjuk:** Ubah atau sesuaikan teks di dalam tanda kurung siku `[ ... ]` sesuai dengan profil, preferensi desain, dan kebutuhan Anda.

---

## 1. 📌 Ringkasan Proyek (Overview)
* **Nama Pemilik:** [Azzam Ghozy]
* **Role / Gelar:** [Web Developer (Full-Stack)]
* **Tujuan Utama:** [Menampilkan karya terbaik dengan visual 3D yang clean dan interaktif untuk menarik klien freelance / rekruter]
* **Target Audiens:** Rekruter IT, Tech Lead, Klien Freelance, Desainer UI/UX.

---

## 2. 🎨 Konsep Visual & Estetika (The Vibe)
* **Tema Visual:** [Quiet Luxury (Ultra-Minimalism) atau sering disebut juga Quiet Aesthetics]
* **Skema Warna (Palette):**
  * **Background:** [ #FFFFFF (Minimalist White) / #F4F4F2 (Alabaster Off-White) / #E8E8E8 (Soft Silk Grey) / #1A1A1A (Obsidian Dark) ]
 * **Primary Accent (Glow):** [ #D4C5B9 (Warm Champagne Sand) / #8C8275 (Taupe Shimmer) ]
  * **Secondary Accent:** [ #333333 (Charcoal Black) / #B5A48C (Brushed Gold) ]
  * **Text Primary:** #1C1C1C (Tailored Black)
  * **Text Muted:** #707070 (Granite Grey)
* **Tipografi:**
  * **Heading:** [Cabinet Grotesk]
  * **Body:** [Inter ]
* **Efek UI:** Minimalist Glassmorphism (Efek Kaca Es Premium), Soft Organic Floating Shadow (Bayangan Melayang Halus), Metallic/Champagne Border Reveal (Efek Border Berkilau Halus),Bounded Smooth Hover Lift (Animasi Angkat yang Tenang), Text Reveal on Scroll (Efek Teks Muncul Perlahan).

---

## 3. 🪐 Elemen & Pengalaman 3D (3D Experience)
* **Gaya 3D Utama:** [Pilih opsi di bawah]
  * [ ] **Opsi A (Hero Centerpiece):** Model 3D interaktif di hero section yang berotasi dan merespons gerakan mouse (misal: Komputer Cyber, Planet, Helm Astronaut, atau Kristal Abstrak).
  * [saya milih ini ] **Opsi B (Scrollytelling / Camera Path):** Kamera 3D berpindah sudut pandang secara dinamis seiring pengguna men-scroll ke bawah.
  * [ ] **Opsi C (Background Particle Galaxy):** Ribuan partikel 3D bereaksi terhadap kursor mouse di latar belakang, dengan kartu UI melayang di atasnya.
* **Interaktivitas:**
  * Subtle Mouse Parallax: Saat pengguna menggerakkan mouse tanpa men-scroll, sudut kamera sedikit bergeser agar ruangan meja dan laptop terasa nyata secara 3D.
  * Screen Interaction: Ketika kamera sudah masuk ke dalam layar, UI portofolio Anda (teks, card proyek) mulai muncul menggunakan efek fade-in
* **Performa & Mobile Fallback:**
  * Target: 60 FPS di desktop.
  * Di layar smartphone (< 768px): Optimasi jumlah partikel / reduksi lighting agar baterai dan performa HP tetap enteng.

---

## 4. 🧭 Struktur Halaman & Konten (Page Sections)

### A. Navigation Bar (Sticky / Floating Glass)
* Logo / Monogram: [Azzam Ghozy]
* Menu Navigasi:
  * [x] About
  * [x] Skills
  * [x] Projects
  * [x] Experience
  * [x] Contact
* Tombol CTA: ["Resume / CV"]

---

### B. Hero Section (Panggung Utama)
* **Badge Status:** [`🟢 Available for freelance / work`]
* **Headline:** [Developing Thoughtful & High-Performance Digital Experiences]
* **Sub-headline:** [I am Azzam Ghozy, a developer who specializes in building modern, interactive, and high-performance websites, bridges the gap between creative design and technical excellence.]
* **Call-to-Action (CTA):**
  * Tombol 1: "Explore Projects" (Scroll ke project)
  * Tombol 2: "Get In Touch" (Scroll ke kontak)
* **Komponen 3D:** Canvas 3D interaktif utama.

---

### C. About Section (Tentang Saya)
* **Bio Singkat:** [Saya adalah developer yang fokus membangun website modern/clean, interaktif, dan performa tinggi.]
* **Quick Stats / Highlights:**
  * [Full-Stack Focus]
  * [Responsive Web Design]
  * [Problem Solver]
  * [Clean Code & Modern Arch]

---

### D. Skills & Tech Stack
* **Kategori 1: Frontend & 3D**
  * [React, Three.js / React Three Fiber, Next.js, TailwindCSS, TypeScript]
* **Kategori 2: Backend & Database**
  * [PHP / Laravel, MySQL]
* **Kategori 3: Tools & Workflow**
  * [Git,, Figma, Vite, Docker]

---

### E. Featured Projects (Showcase Karya)
> *Sediakan 3 - 6 proyek unggulan Anda:*

* **Proyek 1:**
  * **Judul:** [IDN Website]
  * **Deskripsi Singkat:** [A comprehensive full-stack institutional web portal designed for IDN Boarding School, featuring role-based access control (Admin & Students), interactive academic dashboards, and modern database management.]
  * **Tech Stack:** [Laravel, PHP, MySQL, TailwindCSS]
  * **Links:** [Live Demo URL](https://idnbs.my.id), [GitHub Repo URL](https://github.com/ghozy2304/JHIC-2.0)

---

### F. Experience / Journey (Timeline)
* **Tahun / Periode:** [2025 - sekarang]
  * **Peran:** [Student IDN Boarding School]
  * **Organisasi / Perusahaan:** [IDN Boarding School]
  * **Pencapaian:** [Belajar Fullstack Web Development dan AI]

---

### G. Contact Section & Footer
* **Ajakan:** ["Let's collaborate, innovate, and create something extraordinary together"]
* **Formulir Kontak (Opsional):** Nama, Email, Pesan.
* **Sosial Media & Kontak Langsung:**
  * Email: `[ghozy0432@gmail.com]`
  * GitHub: `[https://github.com/ghozy2304]`
  * LinkedIn: `[belum ada]`
  * Instagram / Twitter: `[@zams_ghoy]`
* **Copyright:** © [2025] [Azzam Ghozy]. Built with React & Three.js.

---

## 5. 🛠️ Tech Stack Rekomendasi
* **Framework:** React + Vite
* **3D Engine:** Three.js + `@react-three/fiber` + `@react-three/drei`
* **Animations & Scroll Controls:** GSAP + ScrollTrigger
* **Scroll Experience:** Lenis Smooth Scroll
* **Styling:** Tailwind CSS + Vanilla Extract atau CSS Modules (Opsional)
* **Icon:** Lucide React

---

## 6. 🚀 Checklist Kesiapan (Sebelum Eksekusi Kode)
- [ ] PRD ini sudah diedit dan disesuaikan dengan data Anda.
- [ ] Model 3D / Konsep 3D sudah diputuskan (bentuk geometri procedural atau file 3D .glb).
- [ ] Tautan media sosial dan daftar proyek sudah siap diisi.
