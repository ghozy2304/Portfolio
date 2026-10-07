/**
 * PORTFOLIO DATA - SINGLE SOURCE OF TRUTH
 * 
 * Filosofi: Semua teks, konten, tautan, dan data proyek disimpan di sini.
 * Jika Anda ingin memperbarui profil atau menambahkan proyek baru,
 * Anda HANYA perlu mengubah file ini tanpa menyentuh kode 3D atau JSX komponen!
 */

export const personalInfo = {
  name: "Azzam Ghozy",
  role: "Full-Stack Web Developer",
  statusBadge: "Available for freelance & projects",
  hero: {
    headline: "Developing Thoughtful & High-Performance Digital Experiences.",
    subheadline:
      "I am Azzam Ghozy, a developer specializing in modern, interactive, and high-performance websites — bridging the gap between creative design and technical excellence.",
    ctaPrimary: "Explore Featured Work",
    ctaSecondary: "Get In Touch",
  },
  about: {
    bio: "Saya adalah developer yang fokus membangun website modern, bersih, interaktif, dan berkinerja tinggi. Menggabungkan arsitektur kode yang terstruktur dengan estetika minimalis.",
    highlights: [
      { label: "Architecture", value: "Clean & Scalable" },
      { label: "Core Focus", value: "Full-Stack Web" },
      { label: "Experience", value: "Modern Ecosystem" },
      { label: "Mindset", value: "Problem Solver" },
    ],
  },
  education: {
    period: "2025 — Sekarang",
    role: "Student & Developer",
    institution: "IDN Boarding School",
    description: "Mendalami Full-Stack Web Development, arsitektur modern, dan integrasi Artificial Intelligence (AI).",
  },
  contact: {
    heading: "Let's collaborate, innovate, and create something extraordinary together.",
    email: "ghozy0432@gmail.com",
    github: "https://github.com/ghozy2304",
    instagram: "https://instagram.com/zams_ghoy",
    linkedin: null, // Siap diisi kapan saja
  },
};

export const skillsData = [
  {
    category: "Frontend & Creative",
    skills: ["React", "Three.js", "React Three Fiber", "Next.js", "TailwindCSS", "TypeScript"],
  },
  {
    category: "Backend & Database",
    skills: ["PHP", "Laravel", "MySQL", "RESTful API", "MVC Architecture"],
  },
  {
    category: "Tools & Workflow",
    skills: ["Git & GitHub", "Figma", "Vite", "Docker", "Postman"],
  },
];

export const featuredProject = {
  id: "idn-website",
  title: "IDN Institutional Portal",
  subtitle: "Full-Stack Educational Platform",
  description:
    "A comprehensive full-stack institutional web portal designed for IDN Boarding School. Features role-based access control (Admin & Students), interactive academic dashboards, and modern database management.",
  techStack: ["Laravel", "PHP", "MySQL", "TailwindCSS", "MVC Pattern"],
  liveUrl: "https://idnbs.my.id",
  githubUrl: "https://github.com/ghozy2304/JHIC-2.0",
  highlights: [
    "Role-based authentication & authorization",
    "Academic management dashboard",
    "Responsive interface with modern UI architecture",
  ],
};
