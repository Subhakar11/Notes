# MERN Notes App (JavaScript)


Email + OTP / Google authentication with notes CRUD.


## Setup
### Backend

cd backend
npm i
cp .env.example .env # or create .env from values above
MONGODB_URI=
OTP_EXPIRES_MIN=5
GOOGLE_CLIENT_I
MAIL_USER=
MAIL_PASS=
npm run dev


### Frontend
```bash
cd ../frontend
npm i
# .env file for frontend
cat > .env <<'EOF'
VITE_API_BASE=http://localhost:3002/api
VITE_GOOGLE_CLIENT_ID=<your-google-client-id>.apps.googleusercontent.com
EOF
npm run dev
```


Open http://localhost:5173