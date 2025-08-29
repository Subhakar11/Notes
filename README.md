### Notes— Full-Stack Note-Taking App (React + Node) [Live Demo](https://notes-ddtu.onrender.com)

A complete README for the Notey project — a mobile-friendly note-taking application with email+OTP and Google signup/login, JWT-protected notes, and  React frontend + Node backend.
Troubleshooting & FAQ

##Project Overview

Notey is a note-taking app that replicates the provided front-end design (assets available at the provided link) and implements:
Signup with Email + OTP or Google account
Proper input validation and error reporting
JWT-based authorization for creating/deleting notes
Mobile-first responsive UI (React + TypeScript)
Backend in Node.js — sample uses Express
MongoDB as the default example DB 

##Features
Signup: Email + OTP OR Google OAuth 2.0.
Login: Email + OTP verification or Google (if user registered via Google).
User profile / welcome page after login.
Create, list, delete notes (only owner can CRUD).
Proper form validation and descriptive error messages.
Token-based API guarding (access token = JWT).
Mobile-first responsive UI designed to match the provided design assets.

##Tech Stack
Frontend: React (TypeScript). (React docs / Quick start recommended.) 
React
Backend: Node.js + Express (TypeScript). 
Express.js
Auth: Google OAuth 2.0 (for Google sign-in) and custom email + OTP using an email provider (Nodemailer or transactional email service). 
Google for Developers
Nodemailer
JWT: jsonwebtoken for issuing/verifying access tokens. 
Password hashing: bcrypt / bcryptjs.
Database: MongoDB (Atlas recommended quickstart). 
MongoDB
Deployment:  Render.

## Architecture & Data Flow
Frontend (React) provides signup/login screens.
For email signup: frontend calls POST /auth/request-otp → backend generates and stores an OTP (short-lived, hashed), sends it by email.
For OTP verification: frontend calls POST /auth/verify-otp → backend verifies OTP and issues JWT (access token).
For Google OAuth: frontend uses Google OAuth flow (redirect or popup), receives code/token → backend verifies and creates/fetches user, issues JWT. (Follow Google's docs.) 
Google for Developers
Authenticated requests (create/delete notes) send Authorization: Bearer <JWT> to backend; backend verifies JWT with jsonwebtoken.

## Getting Started (Local Development)
Prerequisites
Node.js (v18+ recommended)
npm or yarn
Git
MongoDB Atlas account (or local MongoDB)
Google Cloud Console project & OAuth credentials (for Google sign-in)
SMTP credentials (for sending OTP emails) — use Gmail SMTP, Sendgrid, Mailgun, or Mailtrap for dev. (Nodemailer recommended.)
git clone https://github.com/yourusername/notey.git
cd Notes

Environment variables
Create .env files in backend/ and frontend/ as needed.
backend/.env (example)
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/notey?retryWrites=true&w=majority
JWT_SECRET=super_secret_here_change_this
JWT_EXPIRES_IN=1d
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:4000/auth/google/callback
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-pass
OTP_EXPIRE_MIN=10
FRONTEND_URL=http://localhost:3000

frontend/.env (example)
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

##Backend — Setup & run
cd backend
npm install
npm start

##Frontend — Setup & run
cd frontend
npm install
npm run dev

## Deployment
[Live Demo](https://notes-ddtu.onrender.com)

Thank you!!
