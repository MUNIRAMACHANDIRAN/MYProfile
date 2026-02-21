const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const authMiddleware = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const upload = require('../middleware/upload');
const path = require('path');

// GET all certificates — publicly accessible to everyone
router.get('/', async (req, res) => {
    try {
        const certs = await Certificate.findAll({ order: [['createdAt', 'DESC']] });
        res.json({ success: true, certificates: certs });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch certificates.' });
    }
});

// POST upload certificate — admin only
router.post('/', authMiddleware, adminOnly, (req, res, next) => {
    req.uploadType = 'certificate';
    next();
}, upload.single('file'), async (req, res) => {
    try {
        const { name, organization, issueDate } = req.body;
        if (!name || !organization)
            return res.status(400).json({ success: false, message: 'Certificate name and organization are required.' });

        const filePath = req.file ? `/uploads/certificates/${req.file.filename}` : null;
        const fileType = req.file ? path.extname(req.file.originalname).replace('.', '') : null;

        const cert = await Certificate.create({
            userId: req.user.id,
            name, organization,
            issueDate: issueDate || null,
            filePath, fileType,
        });
        res.status(201).json({ success: true, message: 'Certificate uploaded.', certificate: cert });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to upload certificate.' });
    }
});

// DELETE certificate — admin only
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        const cert = await Certificate.findByPk(req.params.id);
        if (!cert) return res.status(404).json({ success: false, message: 'Certificate not found.' });
        await cert.destroy();
        res.json({ success: true, message: 'Certificate deleted.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete certificate.' });
    }
});

module.exports = router;
