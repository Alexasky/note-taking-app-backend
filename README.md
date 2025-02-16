# Note-Taking App - Backend

This is the backend API for the Note-Taking App, built using Node.js, Express, and PostgreSQL. It provides authentication, user management, and CRUD operations for notes.

## 📌 Features

- User Registration & Login (JWT Authentication)

- Create, Read, Update, and Delete (CRUD) Notes

- Secure API with Token-based Authentication

- PostgreSQL as the database

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```
git clone https://github.com/Alexasky/note-taking-app-backend.git
cd note-taking-app-backend

```

### 2️⃣ Install Dependencies
```
npm install
```
### 3️⃣ Set Up Environment Variables

Create a .env file in the project root and add the following:
```
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/note_app
JWT_SECRET=your_jwt_secret_key
TOKEN_EXPIRES_IN=1h
```

### 4️⃣ Set Up Database

Run migrations to set up the database schema:
```
npm run migrate
```
### 5️⃣ Start the Server
```
npm start
```
The server will run on http://localhost:5000

## 📡 API Endpoints

### 🔹 Authentication

- POST /auth/register - Register a new user

- POST /auth/login - Login and receive an access token

- POST /auth/logout - Logout user

- POST /auth/refresh - Refresh token

### 🔹 Notes

- GET /notes/:id - Get all notes (Authenticated)

- POST /note/create - Create a new note (Authenticated)

- PUT /note/:id - Update a note (Authenticated)

- DELETE /note/:id - Delete a note (Authenticated)

## 🛠️ Technologies Used

- Node.js & Express - Backend framework

- PostgreSQL - Database

- JWT (JSON Web Token) - Authentication

- bcrypt - Password hashing

- dotenv - Environment variables management
