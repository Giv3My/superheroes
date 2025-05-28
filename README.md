# 🦸 Superheroes

A web application for creating, editing, listing, and viewing superheroes. Built with **React** on the frontend and **Node.js (NestJS)** on the backend.

---

## 📦 Features

- List all superheroes with nickname and thumbnail (pagination: 5 per page)
- View full details of any superhero
- Create a new superhero with multiple images
- Edit superhero information and images
- Delete superheroes
- Fully responsive UI (Tailwind CSS)
- RESTful API

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Giv3My/superheroes.git
cd superheroes
```

### 2. Install dependencies
#### Backend

```bash
cd server
npm install
npm run prisma:push
npm run prisma:seed
```

#### Frontend

```bash
cd ../client
npm install
```

### 3. Run the application
#### Start backend

```bash
cd server
npm run start:dev
```

#### Start frontend

```bash
cd ../client
npm run dev
```

## 🧠 Assumptions
- Each superhero has at least one image, but it's optional at creation.
- Image uploads are stored locally in the "uploads/" folder.
- No authentication is implemented — the app is public.
- Frontend uses basic client-side routing (React Router).
- Form validation is minimal and handled on frontend.


## 🛠️ Technologies
- Frontend: React, React Router, React Query, Tailwind CSS, Axios
- Backend: Node.js, NestJS, Multer (for file uploads), Prisma
- Database: PostgreSQL
