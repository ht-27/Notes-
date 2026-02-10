# NoteTaker | Organize your thoughts

A modern, full-stack note-taking application built to demonstrate **Frontend Development** skills with a robust **Node.js** backend. This project fulfills the requirements for a Frontend Developer Intern task, featuring secure authentication, real-time updates, and a glassmorphism-inspired UI.


## 🔮 Scaling Considerations

For a detailed breakdown of how this application could be scaled to millions of users (Database sharding, Load Balancing, Caching), please refer to [SCALING.md](./SCALING.md).

---


-   **🔐 Secure Authentication**: User registration and login using **JWT** (JSON Web Tokens) and secure password hashing with **bcrypt**.
-   **📝 Note Management**: Create, Read, Update, and Delete (CRUD) notes effortlessly.
-   **🔍 Smart Search**: Real-time filtering of notes by title or content.
-   **👤 User Profile**: Dedicated profile section to view and update user details.
-   **🎨 Modern UI**:
    -   **Glassmorphism Effects**: Frosted glass cards and navigation.
    -   **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
    -   **Interactivity**: Smooth transitions, hover effects, and loading states.
-   **🛡️ Protected Routes**: Prevents unauthorized access to dashboard and profile pages.

## 🛠️ Tech Stack

### Frontend
-   **React** (Vite): Fast and modern UI library.
-   **Tailwind CSS**: Utility-first CSS framework for rapid styling.
-   **React Router DOM**: Client-side routing.
-   **React Hook Form**: Efficient form handling and validation.
-   **Lucide React**: Beautiful, consistent icons.

### Backend
-   **Node.js & Express**: Robust server-side runtime and framework.
-   **Prisma ORM**: Modern database access for TypeScript & Node.js.
-   **SQLite**: Lightweight, serverless relational database (perfect for portable tasks).
-   **Zod**: Schema validation.

## 📦 Installation & Setup

Follow these steps to run the project locally.

### 1. clone the repository
```bash
git clone https://github.com/yourusername/note-taker.git
cd note-taker
```

### 2. Backend Setup
Initialize the database and start the server.

```bash
cd backend
npm install
npx prisma db push  # Creates the SQLite database file
node src/index.js
```
*Server runs on `http://localhost:3000`*

### 3. Frontend Setup
In a new terminal, start the React application.

```bash
cd frontend
npm install
npm run build       # Build for production
npm run preview -- --host # Run the production build
```
*Application runs on `http://localhost:4173`*



---

Developed by **Harsh Tiwari**
