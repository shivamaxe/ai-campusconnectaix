# CampusConnect AI X
**Autonomous AI-Powered University, Placement & Career Intelligence Ecosystem**

CampusConnect AI X is a next-generation intelligent platform that unifies college management, placement tracking, and an AI-driven career coach into one seamless ecosystem.

## Key Features
- **Role-based Dashboards:** Custom experiences for Students, Faculty, Recruiters, and Admins.
- **AI Career Coach:** Context-aware LLM mentoring for interview prep and skill gap analysis.
- **Academic Core:** Manage courses, track attendance, and submit assignments.
- **Placement Engine:** Job board, application tracking, and automated placement drive management.
- **Real-Time Communication:** Real-time chat messaging and notification system powered by Socket.io.

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion, Redux Toolkit Query.
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io.
- **AI Integration:** Abstracted LLM Provider Strategy (supports Google Gemini and OpenAI).

## Getting Started

### Prerequisites
- Node.js v20+
- MongoDB (running locally or via Docker/Atlas)
- Docker & Docker Compose (optional, for containerized setup)

### Environment Setup
Create a `.env` file in the `server` directory with the following configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/campusconnect
JWT_SECRET=your_super_secret_jwt_key_that_is_at_least_32_chars
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7
CORS_ORIGIN=http://localhost:5173
OPENAI_API_KEY=your_openai_key # Optional
GEMINI_API_KEY=your_gemini_key # Optional
```

### Running with Docker (Recommended)
1. Ensure Docker Desktop is running.
2. Run the full stack using Compose:
   ```bash
   docker-compose up --build
   ```

### Running Locally
1. Install dependencies for both server and client:
   ```bash
   npm run install:all
   ```
2. Run the database seed script to populate initial data:
   ```bash
   cd server && npm run seed
   ```
3. Start the development servers concurrently:
   ```bash
   npm run dev
   ```

### Accessing the App
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000/api/v1`

## Testing Credentials
The seed script generates a few test accounts:
- **Admin:** `admin@campusconnect.com` / `password123`
- **Student:** `john@student.com` / `password123`
- **Recruiter:** `recruiter@google.com` / `password123`
