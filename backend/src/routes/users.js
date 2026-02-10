const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// Get current user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { id: true, email: true, name: true, createdAt: true },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
    try {
        const { name } = req.body;
        const user = await prisma.user.update({
            where: { id: req.user.userId },
            data: { name },
            select: { id: true, email: true, name: true, createdAt: true },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile' });
    }
});

module.exports = router;
