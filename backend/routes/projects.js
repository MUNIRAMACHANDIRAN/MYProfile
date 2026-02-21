const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// GET all projects — any logged-in user can view
router.get('/', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.findAll({ order: [['order', 'ASC'], ['createdAt', 'ASC']] });
        res.json({ success: true, projects });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch projects.' });
    }
});

// POST add project — admin only
router.post('/', authMiddleware, adminOnly, async (req, res) => {
    try {
        const { name, description, githubLink, techStack, imageUrl, order } = req.body;
        if (!name) return res.status(400).json({ success: false, message: 'Project name is required.' });
        const project = await Project.create({ name, description, githubLink, techStack, imageUrl, order: order || 0 });
        res.status(201).json({ success: true, message: 'Project added.', project });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to add project.' });
    }
});

// PUT update project — admin only
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
        await project.update(req.body);
        res.json({ success: true, message: 'Project updated.', project });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update project.' });
    }
});

// DELETE project — admin only
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
        await project.destroy();
        res.json({ success: true, message: 'Project deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete project.' });
    }
});

module.exports = router;
