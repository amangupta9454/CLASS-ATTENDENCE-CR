const connectDB = require('../config/db');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { generateAttendanceExcel } = require('../utils/excelHandler');
const { sendAbsenceEmail, sendPresentCorrectionEmail } = require('../utils/emailService');

// POST /api/attendance/mark
// Body: { date, lectureNumber, subjectName, timing, records: [{ studentId, status }] }
const markAttendance = async (req, res) => {
  try {
    await connectDB();
    const { date, lectureNumber, subjectName, timing, records } = req.body;

    if (!date || !lectureNumber || !subjectName || !timing || !records?.length) {
      return res.status(400).json({ success: false, message: 'Missing required attendance fields' });
    }

    if (![3, 4, 5, 6].includes(Number(lectureNumber))) {
      return res.status(400).json({ success: false, message: 'Lecture number must be 3, 4, 5, or 6' });
    }

    // --- Prevent past date customization ---
    const todayIST = new Date().toLocaleString("en-CA", { timeZone: "Asia/Kolkata" }).split(",")[0];
    if (date < todayIST) {
      return res.status(400).json({ success: false, message: 'Cannot mark or modify attendance for past dates.' });
    }

    // --- Fetch existing attendance to detect changes ---
    const existingRecords = await Attendance.find({ date, lectureNumber: Number(lectureNumber) });
    const existingMap = {};
    existingRecords.forEach((r) => {
      existingMap[r.studentId.toString()] = r.status;
    });

    const newAbsents = [];
    const newlyPresent = [];

    records.forEach((r) => {
      const oldStatus = existingMap[r.studentId.toString()];
      if (r.status === 'Absent' && oldStatus !== 'Absent') {
        newAbsents.push(r.studentId);
      } else if (r.status === 'Present' && oldStatus === 'Absent') {
        newlyPresent.push(r.studentId);
      }
    });

    // Upsert each attendance record
    const ops = records.map((r) => ({
      updateOne: {
        filter: { date, lectureNumber: Number(lectureNumber), studentId: r.studentId },
        update: {
          $set: {
            subjectName,
            timing,
            status: r.status,
            markedBy: req.user._id,
          },
        },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(ops);

    // Send emails to newly absent students (fire and forget)
    if (newAbsents.length > 0) {
      Student.find({ _id: { $in: newAbsents } })
        .then((students) => {
          students.forEach((student) => {
            sendAbsenceEmail({
              studentName: student.name,
              studentEmail: student.email,
              date,
              lectureNumber: Number(lectureNumber),
              subjectName,
            }).catch((emailErr) => console.error('Email error for', student.email, emailErr.message));
          });
        })
        .catch((err) => console.error('Fetch absent students error:', err.message));
    }

    // Send emails to newly present (corrected) students (fire and forget)
    if (newlyPresent.length > 0) {
      Student.find({ _id: { $in: newlyPresent } })
        .then((students) => {
          students.forEach((student) => {
            sendPresentCorrectionEmail({
              studentName: student.name,
              studentEmail: student.email,
              date,
              lectureNumber: Number(lectureNumber),
              subjectName,
            }).catch((emailErr) => console.error('Email error for', student.email, emailErr.message));
          });
        })
        .catch((err) => console.error('Fetch corrected students error:', err.message));
    }

    return res.status(200).json({
      success: true,
      message: `Attendance marked for Lecture ${lectureNumber} on ${date}`,
      totalMarked: records.length,
      absentCount: newAbsents.length,
      correctedCount: newlyPresent.length,
    });
  } catch (err) {
    console.error('Mark attendance error:', err);
    return res.status(500).json({ success: false, message: 'Failed to mark attendance' });
  }
};

// GET /api/attendance?date=YYYY-MM-DD&lectureNumber=3
const getAttendance = async (req, res) => {
  try {
    await connectDB();
    const { date, lectureNumber } = req.query;
    const filter = {};
    if (date) filter.date = date;
    if (lectureNumber) filter.lectureNumber = Number(lectureNumber);

    const records = await Attendance.find(filter)
      .populate('studentId', 'rollNumber studentId name section email')
      .populate('markedBy', 'name email')
      .sort({ date: -1, lectureNumber: 1 });

    const presentCount = records.filter((r) => r.status === 'Present').length;
    const absentCount = records.filter((r) => r.status === 'Absent').length;

    return res.status(200).json({
      success: true,
      total: records.length,
      presentCount,
      absentCount,
      records,
    });
  } catch (err) {
    console.error('Get attendance error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch attendance' });
  }
};

// GET /api/attendance/export?date=YYYY-MM-DD&lectureNumber=3
const exportAttendance = async (req, res) => {
  try {
    await connectDB();
    const { date, lectureNumber } = req.query;
    const filter = { status: 'Present' };
    if (date) filter.date = date;
    if (lectureNumber) filter.lectureNumber = Number(lectureNumber);

    const records = await Attendance.find(filter)
      .populate('studentId', 'rollNumber studentId name section email')
      .sort({ 'studentId.rollNumber': 1 });

    if (!records.length) {
      return res.status(404).json({ success: false, message: 'No present records found for the selected filters' });
    }

    const buffer = generateAttendanceExcel(records);

    const fileName = `attendance_${date || 'all'}_lecture${lectureNumber || 'all'}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    return res.send(buffer);
  } catch (err) {
    console.error('Export attendance error:', err);
    return res.status(500).json({ success: false, message: 'Failed to export attendance' });
  }
};

// GET /api/attendance/lectures-summary?date=YYYY-MM-DD
const getLecturesSummary = async (req, res) => {
  try {
    await connectDB();
    const { date } = req.query;
    const filter = date ? { date } : {};

    const summary = await Attendance.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { date: '$date', lectureNumber: '$lectureNumber', subjectName: '$subjectName', timing: '$timing' },
          totalStudents: { $sum: 1 },
          presentCount: { $sum: { $cond: [{ $eq: ['$status', 'Present'] }, 1, 0] } },
          absentCount: { $sum: { $cond: [{ $eq: ['$status', 'Absent'] }, 1, 0] } },
        },
      },
      { $sort: { '_id.date': -1, '_id.lectureNumber': 1 } },
    ]);

    return res.status(200).json({ success: true, summary });
  } catch (err) {
    console.error('Lectures summary error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch summary' });
  }
};

// GET /api/attendance/pending?date=YYYY-MM-DD
const getPendingLectures = async (req, res) => {
  try {
    await connectDB();
    const date = req.query.date || new Date().toISOString().split('T')[0];
    const allLectures = [3, 4, 5, 6];

    const marked = await Attendance.distinct('lectureNumber', { date });
    const pending = allLectures.filter((l) => !marked.includes(l));

    return res.status(200).json({ success: true, date, pending, marked });
  } catch (err) {
    console.error('Pending lectures error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch pending lectures' });
  }
};

// GET /api/attendance/frequent-absentees?minDays=3
const getFrequentAbsentees = async (req, res) => {
  try {
    await connectDB();
    const minDays = parseInt(req.query.minDays, 10) || 3;

    const absentees = await Attendance.aggregate([
      { $match: { status: 'Absent' } },
      {
        $group: {
          _id: { studentId: '$studentId', date: '$date' },
          totalLecturesOnDay: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.studentId',
          distinctAbsentDates: { $sum: 1 },
          totalAbsentLectures: { $sum: '$totalLecturesOnDay' }
        }
      },
      { $match: { distinctAbsentDates: { $gte: minDays } } },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: '_id',
          as: 'studentInfo'
        }
      },
      { $unwind: { path: '$studentInfo', preserveNullAndEmptyArrays: true } },
      { $sort: { distinctAbsentDates: -1, totalAbsentLectures: -1 } },
      {
        $project: {
          _id: 0,
          studentId: '$_id',
          distinctAbsentDates: 1,
          totalAbsentLectures: 1,
          name: '$studentInfo.name',
          rollNumber: '$studentInfo.rollNumber',
          section: '$studentInfo.section',
          email: '$studentInfo.email'
        }
      }
    ]);

    return res.status(200).json({ success: true, absentees });
  } catch (err) {
    console.error('Frequent absentees error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch frequent absentees' });
  }
};

module.exports = { markAttendance, getAttendance, exportAttendance, getLecturesSummary, getPendingLectures, getFrequentAbsentees };
