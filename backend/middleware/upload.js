const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };
ensureDir('uploads/profiles');
ensureDir('uploads/certificates');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.uploadType === 'profile') {
            cb(null, 'uploads/profiles/');
        } else {
            cb(null, 'uploads/certificates/');
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedImages = /jpeg|jpg|png|gif|webp/;
    const allowedDocs = /pdf|jpg|jpeg|png/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    if (allowedImages.test(ext) || allowedDocs.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only images and PDF files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = upload;
