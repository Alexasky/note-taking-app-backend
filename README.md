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
DB_LOGIN=postgres
DB_PASSWORD=site1234
DB_HOST=localhost
DB_PORT=5432
DB_AUTHDATABASE=notes
PORT=5000
ACCESS_TOKEN_SECRET=test
REFRESH_TOKEN_SECRET=refresh

```

### 4️⃣ Set Up Database

```
Run migrations to set up the database schema:

npm run build
npm run migration:run

```

### 5️⃣ Start the Server

```
npm run dev
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
- Jest - Testing framework
- TypeORM - Database interactions and ORM

