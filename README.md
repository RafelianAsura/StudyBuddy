<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1&height=200&section=header&text=StudyBuddy&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Platform%20Manajemen%20Belajar%20Fullstack&descAlignY=58&descSize=18&descColor=c7d2fe" width="100%"/>

<br/>

<p>
  <a href="https://laravel.com"><img src="https://img.shields.io/badge/Laravel-10-FF2D20?style=for-the-badge&logo=laravel&logoColor=white"/></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white"/></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge"/></a>
</p>

<p>
  <img src="https://img.shields.io/badge/PHP-8.1+-777BB4?style=flat-square&logo=php&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=flat-square&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sanctum-Token%20Auth-FF2D20?style=flat-square&logo=laravel&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer%20Motion-Animation-0055FF?style=flat-square&logo=framer&logoColor=white"/>
</p>

<br/>

> **Satu ruang kerja digital** untuk mengatur jadwal, tugas, dan fokus belajar.  
> Dibangun untuk performa, dirancang untuk kenyamanan mata.

<br/>

**[🚀 Mulai Sekarang](#-instalasi--menjalankan) · [📖 Dokumentasi API](#-api-endpoints) · [🐛 Laporan Bug](../../issues) · [💡 Request Fitur](../../issues)**

</div>

<br/>

---

## 📸 Preview

<div align="center">

| 🌙 Dark Mode | ☀️ Light Mode |
|:---:|:---:|
| ![Dark](https://placehold.co/480x280/111111/6366f1?text=Dashboard+Dark&font=montserrat) | ![Light](https://placehold.co/480x280/fcfcfd/4f46e5?text=Dashboard+Light&font=montserrat) |

</div>

---

## ✨ Fitur Unggulan

<table>
  <tr>
    <td width="50%">
      <h3>🔐 Autentikasi Aman</h3>
      <p>Register, login, dan logout dengan <strong>Laravel Sanctum</strong>. Token di-revoke server-side saat logout — tidak ada sesi yang menggantung.</p>
    </td>
    <td width="50%">
      <h3>✅ Manajemen Tugas</h3>
      <p>Tambah, selesaikan, dan hapus tugas dengan <strong>animasi Framer Motion</strong>. Dilengkapi progress bar real-time dan konfirmasi hapus.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>⏱️ Focus Timer (Pomodoro)</h3>
      <p>Timer 25 menit dengan progress bar visual. Notifikasi otomatis saat sesi selesai. Pause, lanjut, dan reset kapan saja.</p>
    </td>
    <td width="50%">
      <h3>📝 Catatan Cepat</h3>
      <p>Simpan ide dan ringkasan materi langsung di browser. Data tersimpan di <strong>localStorage</strong> — tetap ada meski halaman di-refresh.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📊 Rekap Statistik</h3>
      <p>Visualisasi distribusi tugas selesai vs belum. Lihat total, progress persen, dan breakdown status dalam satu tampilan.</p>
    </td>
    <td width="50%">
      <h3>🌙 Dark / Light Mode</h3>
      <p>Otomatis mengikuti <strong>system preference</strong> (<code>prefers-color-scheme</code>). Bisa di-toggle manual, preferensi tersimpan di localStorage.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>👤 Mode Tamu</h3>
      <p>Akses dashboard tanpa login. Fitur tugas dan catatan terkunci, tapi Focus Timer dan tampilan tetap bisa dinikmati.</p>
    </td>
    <td width="50%">
      <h3>📱 Fully Responsive</h3>
      <p>Tampilan optimal di semua ukuran layar. Mobile menu dengan hamburger animation, layout grid adaptif.</p>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Teknologi |
|:---:|:---|
| **Backend** | PHP 8.1+ · Laravel 10 · Laravel Sanctum · MySQL |
| **Frontend** | React 19 · Vite 8 · React Router 7 · Tailwind CSS 4 |
| **UI/UX** | Framer Motion · Lucide React · Plus Jakarta Sans |
| **Auth** | Token-based (Bearer) via Laravel Sanctum |
| **State** | React useState · localStorage |

</div>

---

## 🏗️ Arsitektur

```
Browser (React SPA)
       │
       │  HTTP + Bearer Token
       ▼
Laravel API (port 8000)
       │
       ├── POST /api/signup   → AuthController@signup
       ├── POST /api/login    → AuthController@login
       ├── POST /api/logout   → AuthController@logout  [auth:sanctum]
       │
       └── /api/tasks/*       → TaskController         [auth:sanctum]
              │
              ▼
           MySQL (studybuddy)
           ├── users
           └── tasks (FK → users.id)
```

---

## 🚀 Instalasi & Menjalankan

### Prerequisites

Pastikan sudah terinstal di sistem kamu:

| Tools | Versi Minimum |
|---|:---:|
| PHP + Composer | ≥ 8.1 |
| Node.js + npm | ≥ 18 |
| MySQL | ≥ 8.0 |

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/study-buddy-fullstack.git
cd study-buddy-fullstack
```

---

### 2️⃣ Setup Backend

```bash
cd study-buddy-be

# Install dependencies PHP
composer install

# Salin environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

Buka `.env` dan sesuaikan konfigurasi database:

```env
APP_NAME=StudyBuddy
APP_URL=http://localhost:8000

DB_DATABASE=studybuddy
DB_USERNAME=root
DB_PASSWORD=your_password
```

```bash
# Buat database 'studybuddy' di MySQL, lalu:
php artisan migrate

# Jalankan server
php artisan serve
```

> ✅ Backend siap di **http://localhost:8000**

---

### 3️⃣ Setup Frontend

```bash
cd ../study-buddy-fe

# Install dependencies Node
npm install
```

File `.env` sudah tersedia di repo dengan isi:

```env
VITE_API_URL=http://localhost:8000/api
```

```bash
# Jalankan development server
npm run dev
```

> ✅ Frontend siap di **http://localhost:5173**

---

## 📁 Struktur Proyek

```
study-buddy-fullstack/
│
├── 📂 study-buddy-be/                  # Backend Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php  # signup · login · logout
│   │   │   │   └── TaskController.php  # index · store · show · update · destroy
│   │   │   └── Kernel.php
│   │   └── Models/
│   │       ├── User.php                # HasApiTokens · hasMany(Task)
│   │       └── Task.php                # belongsTo(User)
│   ├── database/migrations/
│   │   ├── create_users_table.php
│   │   └── create_tasks_table.php
│   ├── routes/
│   │   └── api.php                     # Semua API routes
│   ├── config/cors.php                 # CORS config (allow all origins)
│   └── .env.example
│
└── 📂 study-buddy-fe/                  # Frontend React
    └── src/
        ├── api/
        │   └── axios.js                # Instance + auth interceptor + 401 handler
        ├── context/
        │   └── ThemeContext.jsx        # Dark/light mode + system preference
        ├── layouts/
        │   ├── MainLayout.jsx          # Layout untuk user login
        │   └── GuestLayout.jsx         # Layout untuk tamu
        ├── pages/
        │   ├── Landing.jsx             # Halaman utama / hero
        │   ├── Login.jsx               # Form login
        │   ├── Register.jsx            # Form registrasi + password strength
        │   └── Dashboard.jsx           # Tab: Tugas · Catatan · Timer · Rekap
        ├── services/
        │   ├── authService.js          # signup · login · logout (API calls)
        │   └── taskService.js          # getTasks · createTask · updateTask · deleteTask
        └── components/
            ├── Navbar.jsx              # Sticky nav + mobile menu + avatar dropdown
            └── TaskItem.jsx            # Reusable task card component
```

---

## 🔌 API Endpoints

**Base URL:** `http://localhost:8000/api`

### 🔐 Auth

| Method | Endpoint | Auth | Body | Response |
|:---:|---|:---:|---|---|
| `POST` | `/signup` | ❌ | `name, email, password` | `201` user object |
| `POST` | `/login` | ❌ | `email, password` | `200` `{ token, user }` |
| `POST` | `/logout` | ✅ | — | `200` `{ message }` |

### ✅ Tasks

| Method | Endpoint | Auth | Body | Response |
|:---:|---|:---:|---|---|
| `GET` | `/tasks` | ✅ | — | Array of tasks |
| `POST` | `/tasks` | ✅ | `title, description?, deadline?` | `201` task object |
| `GET` | `/tasks/{id}` | ✅ | — | Task object |
| `PUT` | `/tasks/{id}` | ✅ | `title?, completed?, description?, deadline?` | Updated task |
| `DELETE` | `/tasks/{id}` | ✅ | — | `200` `{ message }` |

> 🔑 Semua endpoint `✅` wajib menyertakan header:
> ```
> Authorization: Bearer <your_token>
> ```

---

## 🗄️ Skema Database

```sql
-- Tabel users
CREATE TABLE users (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,           -- bcrypt hashed
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Tabel tasks
CREATE TABLE tasks (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,                           -- nullable
  completed   BOOLEAN DEFAULT FALSE,
  deadline    DATE,                           -- nullable
  user_id     BIGINT UNSIGNED NOT NULL,
  created_at  TIMESTAMP,
  updated_at  TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🏗️ Build Production

**Frontend:**
```bash
cd study-buddy-fe
npm run build
# Output siap deploy ada di dist/
```

**Backend:**
```bash
cd study-buddy-be

# Update .env untuk production
APP_ENV=production
APP_DEBUG=false

# Optimasi
php artisan config:cache
php artisan route:cache
php artisan optimize
```

---

## 🧪 Testing & Linting

```bash
# Backend — PHPUnit
cd study-buddy-be
php artisan test

# Frontend — ESLint
cd study-buddy-fe
npm run lint
```

---

## 🔧 Troubleshooting

<details>
<summary><b>❌ CORS error saat frontend hit API</b></summary>

Pastikan `config/cors.php` di backend sudah mengizinkan origin frontend:
```php
'allowed_origins' => ['http://localhost:5173'],
```
Atau untuk development, biarkan `['*']` (sudah default).

</details>

<details>
<summary><b>❌ 401 Unauthorized padahal sudah login</b></summary>

Token mungkin sudah expired atau ter-revoke. Coba logout lalu login ulang. Pastikan header `Authorization: Bearer <token>` terkirim — cek di browser DevTools → Network tab.

</details>

<details>
<summary><b>❌ php artisan migrate gagal</b></summary>

Pastikan database `studybuddy` sudah dibuat di MySQL:
```sql
CREATE DATABASE studybuddy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

</details>

<details>
<summary><b>❌ npm run dev error "Cannot find module"</b></summary>

Hapus `node_modules` dan install ulang:
```bash
rm -rf node_modules package-lock.json
npm install
```

</details>

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Ikuti langkah berikut:

```bash
# 1. Fork & clone
git clone https://github.com/username/study-buddy-fullstack.git

# 2. Buat branch fitur
git checkout -b feature/nama-fitur

# 3. Commit dengan conventional commits
git commit -m "feat: tambah fitur X"
git commit -m "fix: perbaiki bug Y"
git commit -m "docs: update README"

# 4. Push & buat Pull Request
git push origin feature/nama-fitur
```

---

## 📄 Lisensi

Proyek ini menggunakan lisensi **MIT** — bebas digunakan, dimodifikasi, dan didistribusikan.  
Lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1&height=120&section=footer" width="100%"/>

**Dibuat dengan ❤️ oleh CC26-PS048**

*© 2026 StudyBuddy Team — Built for learners, by learners.*

</div>
