# 📊 Prisma Setup Guide - SyncNote Backend

## Overview

Prisma is an ORM (Object-Relational Mapping) tool that provides:

- Type-safe database access
- Automatic migrations
- Visual database browser (Prisma Studio)
- Query builder with autocomplete
- Connection pooling

---

## 🚀 Quick Start

### 1. Initialize Prisma (Already Done)

```bash
# The schema.prisma file is already created with models:
# - User
# - Note
# - Tag
# - NoteTag (join table)
```

### 2. Set Up Database

**SQLite (Development - Default):**

```bash
# .env is already configured
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./prisma/dev.db
```

**PostgreSQL (Production):**

```bash
# Update .env
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://user:password@localhost:5432/syncnote_db
```

### 3. Run Migrations

```bash
# Push schema to database (creates tables)
pnpm db:push

# Or create migration file
pnpm db:migrate

# Reset database (dev only)
pnpm db:reset
```

### 4. Seed Database

```bash
pnpm db:seed
```

### 5. View Database (Optional)

```bash
pnpm db:studio
```

---

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          ← Database schema definitions
│   ├── seed.js                ← Sample data seeding
│   └── dev.db                 ← SQLite database (local)
│
├── src/
│   ├── services/
│   │   └── database.js        ← Database connection & client
│   │
│   ├── models/
│   │   ├── User.js            ← User repository (CRUD)
│   │   └── Note.js            ← Note repository (CRUD)
│   │
│   └── utils/
│       └── prisma.js          ← Database helpers & error handling
│
└── .env                       ← Database configuration
```

---

## 📊 Database Schema

### Models Defined:

#### **User Model**

```prisma
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  password  String
  name      String?
  avatar    String?
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  notes     Note[]     // One-to-many relationship
}
```

#### **Note Model**

```prisma
model Note {
  id        String     @id @default(cuid())
  title     String
  content   String
  color     String?    @default("yellow")
  isPinned  Boolean    @default(false)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  userId    String     // Foreign key
  user      User       // Many-to-one relationship
  tags      Tag[]      // Many-to-many relationship
}
```

#### **Tag Model**

```prisma
model Tag {
  id        String     @id @default(cuid())
  name      String     @unique
  color     String?
  createdAt DateTime   @default(now())

  notes     Note[]     // Many-to-many relationship
}
```

---

## 💻 Usage Examples

### Import Database Client

```javascript
import db from "../services/database.js";
// db is the Prisma client instance
```

### User Operations

```javascript
import * as UserRepo from "../models/User.js";

// Create user
const user = await UserRepo.createUser({
  email: "user@example.com",
  password: "hashed_password",
  name: "John Doe",
});

// Find user by ID
const user = await UserRepo.findUserById("user_id");

// Find user by email
const user = await UserRepo.findUserByEmail("user@example.com");

// Get all users
const users = await UserRepo.getAllUsers();

// Update user
const updated = await UserRepo.updateUser("user_id", {
  name: "Jane Doe",
});

// Delete user
await UserRepo.deleteUser("user_id");

// Check if email exists
const exists = await UserRepo.emailExists("user@example.com");
```

### Note Operations

```javascript
import * as NoteRepo from "../models/Note.js";

// Create note
const note = await NoteRepo.createNote({
  title: "My Note",
  content: "Note content",
  color: "yellow",
  userId: "user_id",
});

// Find note by ID
const note = await NoteRepo.findNoteById("note_id");

// Get user's notes (with pagination)
const result = await NoteRepo.getNotesByUserId(
  "user_id",
  (page = 1),
  (limit = 10),
);
// Returns: { data: [], pagination: { total, page, limit, ... } }

// Get pinned notes
const pinned = await NoteRepo.getPinnedNotes("user_id");

// Search notes
const results = await NoteRepo.searchNotes(
  "user_id",
  "query",
  (page = 1),
  (limit = 10),
);

// Update note
const updated = await NoteRepo.updateNote("note_id", {
  title: "Updated Title",
  isPinned: true,
});

// Toggle pin status
await NoteRepo.toggleNotePin("note_id", true);

// Delete note
await NoteRepo.deleteNote("note_id");

// Delete all user notes
await NoteRepo.deleteUserNotes("user_id");
```

---

## 🔧 Available Commands

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `pnpm db:push`    | Push schema to database (no migration file) |
| `pnpm db:migrate` | Create and apply migration                  |
| `pnpm db:seed`    | Run seed script                             |
| `pnpm db:studio`  | Open Prisma Studio GUI                      |
| `pnpm db:reset`   | Reset database (dev only)                   |

---

## 🛡️ Error Handling

Prisma errors are automatically handled by the `handlePrismaError` utility:

```javascript
import { handlePrismaError } from "../utils/prisma.js";

try {
  // Database operation
} catch (error) {
  const { statusCode, message } = handlePrismaError(error);
  // statusCode: 409 (unique constraint)
  // statusCode: 404 (not found)
  // statusCode: 400 (foreign key error)
  // statusCode: 500 (generic error)
}
```

---

## 📄 Database Connection Flow

```
server.js (startup)
    ↓
connectDatabase() called
    ↓
src/services/database.js
    ├─ Initializes PrismaClient
    ├─ Connects to database
    └─ Returns db instance
    ↓
Database connected
    ↓
Routes can now use db operations
```

---

## 🔄 Migration Workflow

### When you change schema.prisma:

```bash
# Step 1: Update schema.prisma (e.g., add new field)
# editor schema.prisma

# Step 2: Create migration
pnpm db:migrate

# Step 3: Name the migration (e.g., "add_user_bio")
# Migration created in: prisma/migrations/

# Step 4: Done! Schema updated
```

---

## 🌍 Environment Variables

```env
# SQLite
DATABASE_PROVIDER=sqlite
DATABASE_URL=file:./prisma/dev.db

# PostgreSQL
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://user:password@localhost:5432/syncnote_db

# MySQL
DATABASE_PROVIDER=mysql
DATABASE_URL=mysql://user:password@localhost:3306/syncnote_db
```

---

## 💡 Best Practices

### 1. **Always Use Repositories**

```javascript
// ✅ Good
import * as NoteRepo from "../models/Note.js";
const note = await NoteRepo.findNoteById(id);

// ❌ Avoid direct db calls in routes
import db from "../services/database.js";
const note = await db.note.findUnique(...);
```

### 2. **Handle Errors Properly**

```javascript
import { handlePrismaError } from "../utils/prisma.js";

try {
  const user = await NoteRepo.createNote(data);
} catch (error) {
  const { statusCode, message } = handlePrismaError(error);
  res.status(statusCode).json({ error: message });
}
```

### 3. **Use Pagination for Lists**

```javascript
import { getPaginationParams } from "../utils/prisma.js";

const { skip, take } = getPaginationParams(page, limit);
const notes = await db.note.findMany({ skip, take });
```

### 4. **Select Only Needed Fields**

```javascript
// ✅ Good - excludes password
const user = await db.user.findUnique({
  where: { id: "user_id" },
  select: {
    id: true,
    email: true,
    name: true,
    // password: false (not included)
  },
});
```

### 5. **Use Transactions for Multiple Operations**

```javascript
const result = await db.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData });
  const note = await tx.note.create({ data: { ...noteData, userId: user.id } });
  return { user, note };
});
```

---

## 🐛 Common Errors & Solutions

| Error                | Cause                      | Solution                     |
| -------------------- | -------------------------- | ---------------------------- |
| `P2002`              | Unique constraint violated | Check for duplicate values   |
| `P2025`              | Record not found           | Verify ID exists             |
| `P2003`              | Foreign key error          | Ensure related record exists |
| `ENOENT`             | dev.db not created         | Run `pnpm db:push`           |
| `Connection refused` | DB not running             | Start database service       |

---

## 🔍 Prisma Studio

Visual database browser:

```bash
pnpm db:studio
```

Access at: http://localhost:5555

Features:

- View/edit records
- Create new records
- Delete records
- Filter and sort

---

## 📚 Next Steps

1. **Run migrations**: `pnpm db:push`
2. **Seed data**: `pnpm db:seed`
3. **View database**: `pnpm db:studio`
4. **Create routes** using repositories
5. **Start server**: `pnpm dev`

---

## 🎯 Example Route with Prisma

```javascript
// src/routes/users.js
import * as UserRepo from "../models/User.js";
import { handlePrismaError } from "../utils/prisma.js";

export const getUser = async (req, res) => {
  try {
    const user = await UserRepo.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    const { statusCode, message } = handlePrismaError(error);
    res.status(statusCode).json({ error: message });
  }
};
```

---

## ✅ Checklist

- ✅ Prisma installed
- ✅ Schema defined
- ✅ Database service created
- ✅ Repositories created
- ✅ Utilities created
- ✅ Server setup with database connection
- ✅ Migration commands added
- ✅ Seed script created

**You're all set to use Prisma!** 🎉
