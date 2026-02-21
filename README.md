# 🚀 Muniyappan R — Personal Portfolio

A modern, full-stack personal portfolio web application with JWT authentication,
role-based access control, MySQL database, 3D animations, and admin content management.

---

## 🔐 Admin Credentials

> ⚠️ **Keep this file private. Do not share or commit to public repositories.**

| Field    | Value                              |
|----------|------------------------------------|
| Email    | `muniramachandiran@gmail.com`      |
| Password | `admin@1234`                       |
| Role     | `admin`                            |

---

## 🗄️ Database Configuration

| Field       | Value            |
|-------------|------------------|
| Host        | `localhost`      |
| User        | `root`           |
| Password    | `Admin@1234`     |
| Database    | `portfolio_db`   |
| Port        | `3306` (default) |

These values are stored in `backend/.env`.

---

## ⚙️ Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, Vite, Framer Motion, Three.js, Axios  |
| Backend   | Node.js, Express, Sequelize ORM                 |
| Database  | MySQL 8.0                                       |
| Auth      | JWT (JSON Web Tokens), bcryptjs                 |
| Styling   | Tailwind CSS, Custom CSS                        |

---

## 📁 Project Structure

```
Portfolio/
├── backend/
│   ├── config/
│   │   └── database.js          # Sequelize DB connection
│   ├── middleware/
│   │   ├── auth.js              # JWT auth middleware
│   │   ├── adminOnly.js         # Admin-role guard middleware
│   │   └── upload.js            # Multer file upload middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Certificate.js
│   ├── routes/
│   │   ├── auth.js              # /api/auth — login, signup, me
│   │   ├── projects.js          # /api/projects
│   │   ├── certificates.js      # /api/certificates
│   │   └── profile.js           # /api/profile
│   ├── uploads/                 # Uploaded files (images, certs)
│   ├── .env                     # Environment variables (DB, JWT)
│   ├── schema.sql               # MySQL schema + seed data
│   ├── seedAdmin.js             # One-time admin user seed script
│   ├── server.js                # Express app entry point
│   └── package.json
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── CustomCursor.jsx
        │   ├── ProtectedRoute.jsx
        │   └── CopyProtection.jsx   # Disables right-click/copy for visitors
        ├── context/
        │   └── AuthContext.jsx       # Global auth state
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── LoginPage.jsx
        │   ├── SignupPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── AboutPage.jsx
        │   ├── SkillsPage.jsx
        │   ├── ProjectsPage.jsx
        │   ├── EducationPage.jsx
        │   ├── CertificationsPage.jsx
        │   ├── ExperiencePage.jsx
        │   └── ProfilePage.jsx
        ├── utils/
        │   └── api.js               # Axios instance
        ├── App.jsx
        └── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MySQL 8.0 running locally
- npm

---

### 1️⃣ Database Setup

Open MySQL and run:

```sql
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then import the schema:

```bash
mysql -u root -p portfolio_db < backend/schema.sql
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Verify `backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Admin@1234
DB_NAME=portfolio_db
JWT_SECRET=muniyappan_portfolio_jwt_super_secret_key_2024
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Seed the admin account (run once):

```bash
node seedAdmin.js
```

Start the backend dev server:

```bash
npm run dev
```

Backend runs at → **http://localhost:5000**

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → **http://localhost:5173**

---

## 👥 Role-Based Access Control

| Feature                        | Admin (You) | Visitor (Signed Up) |
|-------------------------------|:-----------:|:-------------------:|
| View all portfolio pages       | ✅          | ✅                  |
| Add / Edit / Delete projects   | ✅          | ❌ (403 Forbidden)  |
| Add / Delete certificates      | ✅          | ❌ (403 Forbidden)  |
| Update profile                 | ✅          | ❌                  |
| Right-click / Copy content     | ✅ (Free)   | ❌ (Blocked)        |
| Text selection                 | ✅ (Free)   | ❌ (Blocked)        |
| Keyboard shortcuts (Ctrl+C…)  | ✅ (Free)   | ❌ (Blocked)        |
| DevTools (F12, Ctrl+Shift+I)  | ✅ (Free)   | ❌ (Blocked)        |

---

## 🚫 Copyright Protection

The `CopyProtection` component (`frontend/src/components/CopyProtection.jsx`)
automatically activates for **all non-admin users** and:

- Disables **right-click** context menu
- Disables **text selection** across all content
- Blocks **Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+U, Ctrl+P, Ctrl+X**
- Blocks **F12** and **Ctrl+Shift+I / J / C** (DevTools)
- Disables **image drag-to-copy**

> Admin users bypass ALL restrictions automatically.

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint            | Access  | Description          |
|--------|---------------------|---------|----------------------|
| POST   | `/api/auth/signup`  | Public  | Register new user    |
| POST   | `/api/auth/login`   | Public  | Login, returns JWT   |
| GET    | `/api/auth/me`      | Auth    | Get current user     |

### Projects
| Method | Endpoint            | Access  | Description          |
|--------|---------------------|---------|----------------------|
| GET    | `/api/projects`     | Auth    | Get all projects     |
| POST   | `/api/projects`     | Admin   | Add new project      |
| PUT    | `/api/projects/:id` | Admin   | Update project       |
| DELETE | `/api/projects/:id` | Admin   | Delete project       |

### Certificates
| Method | Endpoint                 | Access  | Description            |
|--------|--------------------------|---------|------------------------|
| GET    | `/api/certificates`      | Auth    | Get certificates       |
| POST   | `/api/certificates`      | Admin   | Upload certificate     |
| DELETE | `/api/certificates/:id`  | Admin   | Delete certificate     |

---

## 📜 License

This portfolio is the personal property of **Muniyappan R**.  
All content, code, and design are protected by copyright.  
Unauthorized copying, reproduction, or distribution is strictly prohibited.

© 2024 Muniyappan R. All rights reserved.
