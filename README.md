# 👁️ Usman Laser Eye Clinic Portal

A full-stack appointment management system for Usman Laser Eye Clinic.

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18 + Vite + React Router    |
| Backend   | Node.js + Express.js              |
| Database  | MongoDB + Mongoose                |
| Auth      | JWT (JSON Web Tokens)             |
| Icons     | Lucide React                      |

---

## Folder Structure

```
usman-laser-eye-clinic/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Login, getMe, seed users
│   │   └── appointmentController.js # CRUD + stats
│   ├── middleware/
│   │   └── auth.js                # JWT verification
│   ├── models/
│   │   ├── User.js                # User schema (bcrypt)
│   │   └── Appointment.js         # Appointment schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── appointmentRoutes.js
│   ├── scripts/
│   │   └── seed.js                # Database seeder
│   ├── .env                       # Environment variables
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # Express entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.jsx        # Landing page
│   │   │   ├── Login.jsx          # Login form
│   │   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   │   ├── TopBar.jsx         # Top bar
│   │   │   ├── Dashboard.jsx      # Stats + recent
│   │   │   ├── Appointments.jsx   # Table + CRUD
│   │   │   ├── AppointmentForm.jsx# Create/edit form modal
│   │   │   ├── CalendarView.jsx   # Monthly calendar
│   │   │   ├── ConfirmDialog.jsx  # Reusable confirm modal
│   │   │   └── Badge.jsx          # Status badge
│   │   ├── pages/
│   │   │   └── Portal.jsx         # Protected layout
│   │   ├── services/
│   │   │   └── api.js             # Axios API client
│   │   ├── App.jsx                # Root + routing
│   │   ├── main.jsx               # React entry
│   │   └── index.css              # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Quick Start

### Prerequisites
- **Node.js** v16 or higher
- **MongoDB** running locally OR a MongoDB Atlas connection string

---

### Step 1 — Start MongoDB
**Local:**
```bash
mongod
```
**Or use MongoDB Atlas** — get your connection URI from https://cloud.mongodb.com

---

### Step 2 — Setup Backend
```bash
cd backend
npm install
```

Edit `.env` and set your MongoDB URI:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/usman_laser_eye_clinic
JWT_SECRET=usman_clinic_super_secret_jwt_key_change_in_production
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Seed the database with default users and sample data:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev      # development (nodemon)
npm start        # production
```
Backend runs on **http://localhost:5000**

---

### Step 3 — Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on **http://localhost:5173**

---

## Login Credentials

| Role         | Username | Password  |
|--------------|----------|-----------|
| Doctor       | `admin`  | admin123  |
| Receptionist | `staff`  | staff123  |

> You can also create users via the seed script or by hitting `POST /api/auth/seed`

---

## API Reference

### Authentication
| Method | Endpoint          | Description          | Auth |
|--------|-------------------|----------------------|------|
| POST   | /api/auth/login   | Login                | No   |
| GET    | /api/auth/me      | Get current user     | Yes  |
| POST   | /api/auth/seed    | Seed default users   | No   |

### Appointments
| Method | Endpoint                    | Description             | Auth |
|--------|-----------------------------|-------------------------|------|
| GET    | /api/appointments           | Get all (with filters)  | Yes  |
| POST   | /api/appointments           | Create appointment      | Yes  |
| PUT    | /api/appointments/:id       | Update appointment      | Yes  |
| DELETE | /api/appointments/:id       | Delete appointment      | Yes  |
| GET    | /api/appointments/stats     | Get counts/stats        | Yes  |

**Query params for GET /api/appointments:**
- `search` — search by patient name, service, or phone
- `status` — filter by status (Scheduled / In Progress / Completed / Cancelled)
- `date`   — filter by specific date (YYYY-MM-DD)

---

## Features

- ✅ **Landing Page** — Hero, services, testimonials, about, contact
- ✅ **Staff Login** — JWT authentication, persists on refresh
- ✅ **Dashboard** — Live stats from MongoDB, today's schedule
- ✅ **Appointments Table** — Search, filter, update status, edit, delete
- ✅ **Instruction Popup** — Patient notice before booking
- ✅ **Appointment Form** — Full validation, 8 fields, shared by create & edit
- ✅ **Double-Booking Prevention** — Same date + time slot can't be booked twice (Scheduled/In Progress only)
- ✅ **Calendar View** — Monthly grid with status-colored appointments, click to see day's schedule
- ✅ **Reusable Confirm Dialog** — Custom styled modal replaces native browser confirm popups
- ✅ **Protected Routes** — Redirect to login if not authenticated
- ✅ **Dark Sidebar** — Always-dark navigation panel
- ✅ **Night-Shift Hours** — Appointment time slots run 4:00 PM – 11:00 PM

---

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/usman_laser_eye_clinic
JWT_SECRET=change_this_to_a_long_random_string
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```
