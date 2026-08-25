# JobTrack

**Track your applications. Manage your career.**

JobTrack is a full-stack web application that helps job seekers organize and track their job applications, interviews, follow-ups, and overall progress — all in one clean, modern dashboard.

![Status](https://img.shields.io/badge/status-in%20development-blue)

---

## Features

- 🔐 Secure authentication (JWT + bcrypt password hashing)
- 📋 Full CRUD for job applications — add, edit, delete, view details
- 🔍 Live search and multi-filter (status, job type, work mode)
- 🗓️ Interview tracking with upcoming/past sorting
- 📊 Dashboard with real-time statistics (no fake numbers)
- 📈 Analytics — status breakdown, monthly trends, interview/offer rates
- 👤 Editable user profile and account settings
- 🌗 Light and dark mode with persistent preference
- 📱 Fully responsive — tested at 320px through 1440px
- 🔒 Rate limiting, input sanitization, and security headers

---

## Screenshots

> _Add screenshots here once available — landing page, dashboard, applications list, and dark mode are good ones to include._

| Landing Page | Dashboard | Applications |
|---|---|---|
| _screenshot_ | _screenshot_ | _screenshot_ |

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Plain CSS with CSS variables (no UI framework)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose

**Auth & Security**
- JWT (JSON Web Tokens)
- bcryptjs
- Helmet, express-rate-limit, express-mongo-sanitize

**Tools**
- Git & GitHub
- Postman (API testing)
- VS Code

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- npm (comes with Node.js)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/jobtrack.git
cd jobtrack
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_string
PORT=5000
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### 3. Set up the frontend
Open a new terminal:
```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A random string used to sign JWT tokens |
| `PORT` | Port for the backend server (default: 5000) |
| `NODE_ENV` | `development` or `production` |

**Never commit your `.env` file.** It's already excluded via `.gitignore`.

---

## API Overview

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Log in and receive a JWT |
| GET | `/api/auth/me` | Get the logged-in user's info (protected) |

### Applications
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Get all of the user's applications |
| GET | `/api/applications/:id` | Get a single application |
| POST | `/api/applications` | Create a new application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

### Interviews
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/interviews` | Get all of the user's interviews |
| POST | `/api/interviews` | Create a new interview |
| PUT | `/api/interviews/:id` | Update an interview |
| DELETE | `/api/interviews/:id` | Delete an interview |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/profile` | Get profile info |
| PUT | `/api/users/profile` | Update profile info |
| PUT | `/api/users/change-password` | Change password |
| DELETE | `/api/users/account` | Delete account |

All routes except register/login require a `Bearer <token>` in the `Authorization` header.

---

## Project Structure

```
jobtrack/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-level pages
│   │   ├── layouts/      # Shared page layouts
│   │   ├── context/      # Auth, Theme, Toast contexts
│   │   └── services/     # API service layer
│   └── package.json
│
├── server/                # Express backend
│   ├── config/            # Database connection
│   ├── controllers/       # Route logic
│   ├── middleware/        # Auth, error handling, rate limiting
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   └── package.json
│
└── README.md
```

---

## Future Improvements

- File upload support for resumes/cover letters
- Email reminders for follow-up dates
- Link interviews directly to their related application
- Export applications to CSV/PDF
- Kanban-style drag-and-drop status board

---

## Author

Built by [Your Name] as a full-stack portfolio project.

---

## License

This project is open source and available under the [MIT License](LICENSE).