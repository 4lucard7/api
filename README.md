# Node API (Books & Authors)

A simple Node.js + Express API for managing users, authors and books with JWT auth and a password reset flow.

## Features
- User registration & login (JWT)
- Admin-protected endpoints
- CRUD for books and authors
- Password reset via tokenized link (email flow stubbed)
- EJS views for reset pages

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with the following variables:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/api
JWT_SECRET_KEY=your_jwt_secret_here
```

3. (Optional) Seed database

If you want sample authors and books, run the seeder (if present):

```bash
node seeder.js
```

4. Start development server

```bash
npm run dev
```

The server listens on `http://localhost:3000` by default.

## Important Files
- `app.js` — application entry
- `routes/` — route definitions
- `controllers/` — request handlers
- `models/` — Mongoose schemas
- `views/` — EJS templates for password reset

## Project Structure
```
api/
├─ app.js
├─ package.json
├─ seeder.js
├─ .env (not committed)
├─ config/
│  └─ db.js
├─ controllers/
│  ├─ AuthController.js
│  ├─ AuthorController.js
│  ├─ BookController.js
│  ├─ passwordController.js
│  └─ UserController.js
├─ data/
│  └─ data.js
├─ middlewares/
│  ├─ error.js
│  ├─ logger.js
│  └─ VerifyToken.js
├─ models/
│  ├─ Author.js
│  ├─ Book.js
│  └─ User.js
├─ routes/
│  ├─ Auth.js
│  ├─ Authors.js
│  ├─ Books.js
│  ├─ password.js
│  └─ Users.js
└─ views/
  ├─ forgot-password.ejs
  ├─ reset-password.ejs
  └─ success-password.ejs
```

## Endpoints (summary)

- POST `/api/auth/register` — register user
  - Body: `{ username, email, password }`
- POST `/api/auth/login` — login
  - Body: `{ email, password }`
- GET `/api/authors` — list authors
- POST `/api/authors` — create author (admin)
- GET `/api/books` — list books
- POST `/api/books` — create book (admin)
- POST `/password/forgot-password` — request reset link
  - Body: `{ email }` — returns a reset link (in response or sent by email)
- GET `/password/reset-password/:userId/:token` — open reset page
- POST `/password/reset-password/:userId/:token` — submit new password
  - Body: `{ password }`

Note: Admin-protected routes require verifying a JWT with `isAdmin` flag.

## Password Reset Flow
1. User requests a reset with their email via `/password/forgot-password`.
2. Server creates a token signed with `JWT_SECRET_KEY + user.password` and sends a link:
   `/password/reset-password/<userId>/<token>`.
3. Visiting the link renders a reset form; submitting posts the new password to the same URL.

## Troubleshooting
- "User not found" on forgot-password: register that email first.
- `jwt malformed`: ensure the form posts to `/password/reset-password/:userId/:token` (the token must be in the URL path, not the form body) — the repository already includes fixes for view and route.
- `User.findById is not a function`: models export `{ User }`, import accordingly: `const { User } = require("../models/User")`.

## Development Tips
- Use `nodemon` (already configured with `npm run dev`) for automatic restarts.
- Check `.env` and MongoDB connection if routes return DB errors.


