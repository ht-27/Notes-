const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// Get all notes for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const { search } = req.query;
        const whereClause = { userId: req.user.userId };

        if (search) {
            whereClause.OR = [
                { title: { contains: search } }, // SQLite is case-sensitive by default with Prisma contains, but good enough for now
                { content: { contains: search } }
            ];
        }

        const notes = await prisma.note.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching notes' });
    }
});

// Create a note
router.post('/', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId: req.user.userId,
            },
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Error creating note' });
    }
});

// Update a note
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, isArchived } = req.body;

        // Ensure the note belongs to the user
        const existingNote = await prisma.note.findFirst({
            where: { id, userId: req.user.userId }
        });

        if (!existingNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const note = await prisma.note.update({
            where: { id },
            data: { title, content, isArchived },
        });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: 'Error updating note' });
    }
});

// Delete a note
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the note belongs to the user
        const existingNote = await prisma.note.findFirst({
            where: { id, userId: req.user.userId }
        });

        if (!existingNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        await prisma.note.delete({ where: { id } });
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting note' });
    }
});

module.exports = router;
