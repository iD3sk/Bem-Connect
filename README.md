# BEM Connect

BEM Fasilkom UI 2026 | Open Recruitment Assignment for Biro Bisnis dan Kemitraan (bismit).  
Platform micro-blogging eksklusif untuk kolaborasi dan berbagi momen antar mahasiswa.

---

## Persiapan Lokal (Local Setup)

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal:

### 1. Prasyarat
Pastikan sudah menginstal:
*   [Node.js](https://nodejs.org/) (v18 ke atas)
*   [PostgreSQL](https://www.postgresql.org/) (Sudah berjalan di port 5432)
*   NPM (Bawaan Node.js)

### 2. Instalasi Dependensi
Jalankan perintah berikut di root direktori proyek:
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env` di root direktori (jika belum ada) dan isi dengan variabel berikut:

```env
# Server (Express) Config
PORT=5000
NODE_ENV=development

# URL Frontend (CORS)
CLIENT_URL=http://localhost:3000

# URL API untuk Frontend (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Rahasia Token (JWT)
JWT_SECRET=tulis_kode_rahasia_bebas_disini
JWT_EXPIRES_IN=7d

# Koneksi Database (PostgreSQL)
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public
DATABASE_URL="postgresql://postgres:password_anda@localhost:5432/bemconnect?schema=public"
```

### 4. Setup Database (Prisma)
Sinkronkan schema database dan jalankan migrasi:
```bash
npx prisma migrate dev --name init
```

### 5. Menjalankan Aplikasi
Saya menggunakan `concurrently` untuk menjalankan Backend dan Frontend secara bersamaan dengan satu perintah:

```bash
npm run dev
```

*   **Frontend**: http://localhost:3000
*   **Backend API**: http://localhost:5000/api

---

## 📂 Struktur Proyek

```
bem-connect/
├── server/              # Express.js backend (API)
│   ├── config/          # Konfigurasi DB & App
│   ├── controllers/     # Logika penanganan request
│   ├── middlewares/     # Middleware (Auth, dll)
│   ├── routes/          # Definisi endpoint API
│   └── services/        # Logika bisnis & interaksi Prisma
├── src/                 # Next.js frontend
│   ├── app/             # Halaman (Next.js App Router)
│   ├── components/      # Komponen UI (Navbar, PostCard, dll)
│   ├── context/         # React Context (AuthContext)
│   └── lib/             # Helper API fetcher
├── prisma/              # Prisma schema & migrasi database
├── package.json         # Dependensi proyek gabungan
└── next.config.mjs      # Konfigurasi Next.js
```

---

## Tech Stack
*   **Frontend**: Next.js (App Router), Tailwind CSS v4, Lucide React (Icons).
*   **Backend**: Node.js, Express.js.
*   **ORM & DB**: Prisma ORM, PostgreSQL.
*   **Auth**: JSON Web Token (JWT).
*   **Design**: Glassmorphism (Glass Flow Refined System).
