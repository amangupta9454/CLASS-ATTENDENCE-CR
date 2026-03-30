const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // YYYY-MM-DD
    lectureNumber: { type: Number, enum: [3, 4, 5, 6], required: true },
    subjectName: { type: String, required: true, trim: true },
    timing: { type: String, required: true, trim: true }, // e.g. "11:00 AM - 11:50 AM"
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate attendance for same student/lecture/date
attendanceSchema.index({ date: 1, lectureNumber: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
