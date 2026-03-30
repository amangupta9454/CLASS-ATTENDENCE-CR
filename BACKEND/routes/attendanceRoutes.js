const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAttendance,
  exportAttendance,
  getLecturesSummary,
  getPendingLectures,
  getFrequentAbsentees,
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/mark', protect, authorize('CR'), markAttendance);
router.get('/', protect, authorize('CR', 'Coordinator'), getAttendance);
router.get('/export', protect, authorize('CR', 'Coordinator'), exportAttendance);
router.get('/summary', protect, authorize('CR', 'Coordinator'), getLecturesSummary);
router.get('/pending', protect, authorize('CR'), getPendingLectures);
router.get('/frequent-absentees', protect, authorize('CR', 'Coordinator'), getFrequentAbsentees);

module.exports = router;
