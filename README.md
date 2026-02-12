<div align="center">

#  atakanclskn.me

**Personal Portfolio Website — Atakan Çalışkan**

A modern, responsive portfolio built with React, TypeScript, and Firebase.

[![Live](https://img.shields.io/badge/Live-atakanclskn.me-06b6d4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://atakanclskn.me)

</div>

---

##  Features

-  **Single Page App** — React 19 with Vite for blazing-fast builds
-  **Multi-language** — English & Turkish support (i18n)
-  **Dynamic Theming** — Light/Dark mode with customizable accent colors
-  **Admin Panel** — Google Auth protected CMS for real-time content management
-  **Firebase Backend** — Firestore for data, Storage for resume/CV upload, Hosting for deployment
-  **Fully Responsive** — Mobile-first design with Tailwind CSS
-  **GitHub Stats** — Live GitHub contribution and stats integration
-  **Contact Form** — Messages stored in Firebase with admin inbox
-  **SEO Optimized** — Meta tags, Open Graph, JSON-LD structured data
-  **Smooth Animations** — Fade-in, parallax, interactive background effects

## Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React 19, TypeScript 5.8 |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Build Tool | Vite 6 |
| Backend | Firebase (Firestore, Auth, Storage) |
| Hosting | Firebase Hosting |
| Domain | atakanclskn.me |

## Project Structure

```
├── App.tsx                  # Main app with lazy-loaded admin
├── index.html               # SEO meta tags, Tailwind config
├── index.tsx                # Entry point
├── types.ts                 # TypeScript type definitions
├── vite.config.ts           # Vite + code splitting config
├── components/
│   ├── Hero.tsx             # Hero section with CTA
│   ├── AboutMe.tsx          # About section with animated beam
│   ├── TechStack.tsx        # Tech stack carousel
│   ├── SelectedWork.tsx     # Projects showcase
│   ├── Experience.tsx       # Timeline with drag-drop ordering
│   ├── Connect.tsx          # Contact form + social links
│   ├── Navbar.tsx           # Navigation with lang toggle
│   ├── AdminPanelNew.tsx    # Admin panel (lazy loaded)
│   └── admin/tabs/          # Admin CMS tab components
├── lib/
│   ├── adminContext.tsx     # Central state + Firebase sync
│   ├── firebase.ts          # Firebase init (Auth, Firestore, Storage)
│   ├── firestore.service.ts # Firestore CRUD operations
│   ├── i18n.tsx             # Internationalization
│   └── multiLangHelper.ts  # Multi-language text utilities
└── public/
    ├── favicon.svg          # Site favicon
    ├── robots.txt           # Search engine crawling rules
    └── site.webmanifest     # PWA manifest
```

##  Getting Started

### Prerequisites

- Node.js 18+
- Firebase project with Firestore, Auth, Storage enabled

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/atakanclskn/atakanclskn-portfolio.git
   cd atakanclskn-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase credentials in `.env`:
   ```
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Build & Deploy

```bash
npm run build
firebase deploy --only hosting
```

##  Admin Panel

Access the admin panel by pressing `Ctrl + K` or clicking the admin button. Sign in with Google (admin email only).

**Admin features:**
- Edit all sections (Hero, About, Tech Stack, Projects, Experience, Contact)
- Upload Resume/CV (PDF) to Firebase Storage
- Manage contact form messages (read/star/archive/delete)
- Drag-and-drop reordering for projects and experiences
- Multi-language content editing (EN/TR)
- Real-time save to Firebase Firestore

##  License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ by <a href="https://atakanclskn.me">Atakan Çalışkan</a>
</div>
