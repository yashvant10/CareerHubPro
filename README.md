<div align="center">

# 🚀 CareerHub Pro

### Enterprise-Grade Career & Recruitment Platform

[![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![DRF](https://img.shields.io/badge/Django_REST_Framework-3.15-red?style=for-the-badge)](https://www.django-rest-framework.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A production-ready, full-stack recruitment ecosystem featuring dual-sided workflows for Employers and Candidates, a SuperAdmin analytics console, JWT-secured REST APIs, PDF resume pipelines, real-time applicant tracking, virtual interview integration, and a modern glassmorphic React UI.**

[Features](#-features) · [Tech Stack](#-technology-stack) · [Installation](#%EF%B8%8F-installation-guide) · [API Overview](#-api-overview) · [Demo Accounts](#-demo-accounts) · [Screenshots](#-screenshots)

---

</div>

## ✨ Features

### 👔 Employer Suite
| Feature | Description |
|---------|-------------|
| **Command Dashboard** | Real-time monitoring of active postings, applications, and pipeline KPIs |
| **Job Posting & Management** | Full CRUD for comprehensive job listings with salary, skills, and work models |
| **Candidate Review Pipeline** | Filter, shortlist, and track applicant statuses through a visual pipeline |
| **Interview Scheduling** | Schedule interviews with custom date/time via elegant modal UI |
| **Virtual Interview Rooms** | Conduct live video interviews via integrated WebRTC rooms |

### 🎯 Candidate Suite
| Feature | Description |
|---------|-------------|
| **Job Discovery & Search** | Advanced real-time filtering by title, category, location, and work model |
| **Resume Management** | Upload, preview, and download PDF resumes |
| **One-Click Applications** | Multi-field application with cover letter, experience, and graduation year |
| **Application Tracking** | Monitor status: Applied → Shortlisted → Interview → Accepted/Rejected |
| **Virtual Interview Ready** | Join employer-assigned virtual rooms securely |

### 🛡️ Admin Suite
| Feature | Description |
|---------|-------------|
| **Platform Dashboard** | High-level KPIs: total users, jobs, companies, applications |
| **Manage Users** | Full CRUD operations on all user accounts with search & filters |
| **Manage Employers** | Employer-specific account auditing and management |
| **Manage Candidates** | Candidate-specific account auditing and management |
| **Manage Companies** | Override and audit registered employer companies |
| **Manage Jobs** | Moderate and remove inappropriate job postings platform-wide |
| **Manage Applications** | Global visibility into the entire application pipeline |
| **Reports & Analytics** | User demographics, engagement metrics, and visual progress bars |

### 🔐 Authentication & Security
- **JWT (JSON Web Token)** authentication with access & refresh tokens
- **Role-Based Access Control** — 3 roles: `Admin`, `Employer`, `Applicant`
- **Protected Routes** — unauthorized access automatically redirected
- **Session Persistence** — tokens stored securely in `localStorage`

---

## 🛠 Technology Stack

<div align="center">

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, Vite 8.1, React Router DOM, Tailwind CSS 4.3, Framer Motion, React Icons, Axios, React Hook Form |
| **Backend** | Django 6.0, Django REST Framework 3.15, SimpleJWT, Django Filters |
| **Database** | SQLite (Development) · PostgreSQL-Ready (Production) |
| **Auth** | JWT (Access + Refresh Tokens) with Role-Based Permissions |
| **File Handling** | Django Media Storage for PDF Resume Upload/Preview/Download |

</div>

---

## 📁 Project Structure

```
CareerHubPro/
├── backend/
│   ├── accounts/          # User models, JWT auth, registration, admin API
│   ├── applications/      # Application & Resume models, CRUD, file uploads
│   ├── companies/         # Company models & employer management
│   ├── jobs/              # Job models, search, filters, CRUD
│   ├── core/              # Django settings, root URLs, WSGI/ASGI
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, ProtectedRoute
│   │   ├── context/       # AuthContext (JWT + Role management)
│   │   ├── pages/         # 50+ React pages (all functional)
│   │   └── services/      # Axios API client
│   ├── index.html
│   └── vite.config.js
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔌 API Overview

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/auth/register/` | POST | Register new user (Employer/Applicant) | Public |
| `/api/auth/login/` | POST | JWT Login → returns access + refresh tokens | Public |
| `/api/auth/me/` | GET/PUT | Get or update current user profile | 🔒 JWT |
| `/api/auth/users/` | GET/POST/DELETE | Admin CRUD on all platform users | 🔒 Admin |
| `/api/jobs/` | GET/POST | List all jobs or create new (Employer) | 🔒 Role |
| `/api/jobs/{id}/` | GET/PUT/DELETE | Retrieve, update, or delete a job | 🔒 Owner |
| `/api/applications/` | GET/POST | List or create applications | 🔒 JWT |
| `/api/applications/{id}/` | GET/PUT/DELETE | Manage a specific application | 🔒 JWT |
| `/api/companies/` | GET/POST | List or register a company | 🔒 Role |
| `/api/companies/{id}/` | GET/PUT/DELETE | Manage a specific company | 🔒 Owner |
| `/api/resumes/` | GET/POST | Upload or list resumes (PDF) | 🔒 JWT |

---

## ⚙️ Installation Guide

### Prerequisites
- **Node.js** v18+ & npm
- **Python** 3.10+
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yashvant10/CareerHubPro.git
cd CareerHubPro
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py create_demo_users
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Run the Application

**Terminal 1 — Backend API Server:**
```bash
cd backend
.\venv\Scripts\activate
python manage.py runserver 8080
```

**Terminal 2 — Frontend Dev Server:**
```bash
cd frontend
npm run dev
```

🌐 Open **http://localhost:5173** in your browser.

---

## 🔐 Environment Variables

Copy `.env.example` and configure:

**Backend** (`backend/.env`):
```env
DEBUG=True
SECRET_KEY=your-secure-django-secret-key
DATABASE_URL=sqlite:///db.sqlite3
```

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://127.0.0.1:8080/api/
```

---

## 👥 Demo Accounts

| Role | Username | Password |
|------|----------|----------|
| 👔 **Employer** | `employer_demo` | `demo1234` |
| 🎯 **Candidate** | `candidate_demo` | `demo1234` |
| 🛡️ **Admin** | `admin_demo` | `demo1234` |

> Run `python manage.py create_demo_users` to auto-generate these accounts.

---

## 📸 Screenshots

> _Screenshots can be added here to showcase the UI._

| Page | Description |
|------|-------------|
| Landing Page | Modern glassmorphic hero with animated statistics |
| Employer Dashboard | Active job cards with applicant counts |
| Candidate Dashboard | Applied jobs, resume status, recommended listings |
| Admin Dashboard | Platform KPIs with module navigation |
| Job Details | Full job description with 1-click apply |
| Application Pipeline | Status tracking with interview scheduling modal |
| Reports & Analytics | User demographics and engagement metrics |

---

## 🐘 PostgreSQL Migration (Optional)

If your deployment requires PostgreSQL:

1. Install PostgreSQL and create a database
2. Update `backend/core/settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'careerhub_db',
           'USER': 'postgres',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```
3. Install adapter: `pip install psycopg2-binary`
4. Run migrations: `python manage.py migrate`

---

## 🏆 Project Completion Report

<div align="center">

| Component | Status | Completion |
|-----------|--------|------------|
| Frontend (React) | ✅ Complete | 100% |
| Backend (Django) | ✅ Complete | 100% |
| Database | ✅ Complete | 100% |
| REST APIs | ✅ Complete | 100% |
| Admin Module | ✅ Complete | 100% |
| Authentication | ✅ Complete | 100% |
| **Overall** | **✅ Production Ready** | **100%** |

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Yashvant](https://github.com/yashvant10)**

⭐ Star this repo if you found it useful!

</div>
