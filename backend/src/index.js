require('dotenv').config();
console.log("DEBUG: DATABASE_URL is", process.env.DATABASE_URL);
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
let prisma;
try {
    prisma = new PrismaClient();
} catch (e) {
    console.error("Failed to initialize PrismaClient", e);
    process.exit(1);
}
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
let authRoutes, noteRoutes, userRoutes;
try {
    authRoutes = require('./routes/auth');
    noteRoutes = require('./routes/notes');
    userRoutes = require('./routes/users');
} catch (e) {
    console.error("Failed to load routes", e);
    process.exit(1);
}

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Frontend Task Backend API is running');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
