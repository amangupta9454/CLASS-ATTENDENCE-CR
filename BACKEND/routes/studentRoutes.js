const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadStudents, getStudents } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Store file in memory (no disk writes — works on Vercel)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/vnd.ms-excel' ||
      file.originalname.endsWith('.xlsx') ||
      file.originalname.endsWith('.xls')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files (.xlsx, .xls) are allowed'));
    }
  },
});

router.post('/upload', protect, authorize('CR'), upload.single('file'), uploadStudents);
router.get('/', protect, authorize('CR', 'Coordinator'), getStudents);

module.exports = router;
