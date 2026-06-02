# SyncNote

A modern collaborative note-taking application built with React Native, Node.js, Express, Prisma, and SQLite/PostgreSQL.

## Features

### Authentication

* User registration and login
* JWT-based authentication
* HTTP-only cookie support
* OAuth support (Google, GitHub)
* Account status management

### Notes Management

* Create, update, and delete notes
* Rich note content support
* Note image attachments
* Tags and categorization
* Folder organization

### Collaboration

* Share notes with other users
* View and edit permissions
* Real-time collaboration (planned)
* Shared note activity tracking

### Version Control

* Note version history
* Track content changes
* Restore previous versions

### Activity Tracking

* Note creation logs
* Update history
* Share activity
* Comment activity

### Notifications

* Share notifications
* Collaboration updates
* Activity alerts

---

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* SQLite (Development)
* PostgreSQL (Production)
* JWT Authentication
* Bcrypt Password Hashing

### Frontend

* React Native
* Expo
* React Navigation
* Axios
* Zustand

---

## Project Structure

```text
backend/
├── prisma/
│   └── schemas/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── services/
│   ├── routes/
│   ├── utils/
│   └── app.ts
└── package.json

frontend/
├── src/
│   ├── screens/
│   ├── navigation/
│   ├── services/
│   ├── store/
│   └── components/
└── package.json
```

---

## Database Models

### User

* Authentication information
* Profile details
* Account status

### Note

* Note content
* Ownership
* Folder association
* Sharing permissions

### Folder

* Organize notes
* User ownership

### ShareNote

* Shared note records
* Permission tracking

### Comment

* Collaborative discussions

### NoteVersion

* Version history

### ActivityLog

* Audit trail

### Notification

* User notifications

---

## Getting Started

### Prerequisites

* Node.js 20+
* pnpm
* Git

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd SyncNote
```

Install backend dependencies:

```bash
cd backend
pnpm install
```

Install frontend dependencies:

```bash
cd ../frontend
pnpm install
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL="file:./prisma/dev.db"

JWT_SECRET="your-secret-key"

PORT=3000
```

---

## Database Setup

Generate Prisma Client:

```bash
pnpm prisma generate
```

Run migrations:

```bash
pnpm prisma migrate dev --name init
```

Open Prisma Studio:

```bash
pnpm prisma studio
```

---

## Running the Application

### Backend

```bash
pnpm dev
```

### Frontend

```bash
pnpm start
```

---

## API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/logout
```

### Notes

```http
GET    /notes
GET    /notes/:id
POST   /notes
PUT    /notes/:id
DELETE /notes/:id
```

### Folders

```http
GET    /folders
POST   /folders
PUT    /folders/:id
DELETE /folders/:id
```

### Sharing

```http
POST /notes/:id/share
GET  /shared
```

---

## Future Enhancements

* Real-time collaboration using WebSockets
* Rich text editor
* Offline synchronization
* File uploads
* Note search
* Push notifications
* Dark mode
* AI-assisted note summaries

---

## Architecture

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
Database
```

The project follows a layered architecture to maintain separation of concerns and improve scalability.

---

## License

MIT License

---

## Author

Gaurav Kumar
s
