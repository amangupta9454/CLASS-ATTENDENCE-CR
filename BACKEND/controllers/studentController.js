const connectDB = require('../config/db');
const Student = require('../models/Student');
const { parseExcel } = require('../utils/excelHandler');

// POST /api/students/upload  (multipart/form-data, field: "file")
const uploadStudents = async (req, res) => {
  try {
    await connectDB();

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const students = parseExcel(req.file.buffer);

    if (!students.length) {
      return res.status(400).json({ success: false, message: 'No valid student records found in the file' });
    }

    // Upsert each student by rollNumber
    const ops = students.map((s) => ({
      updateOne: {
        filter: { rollNumber: s.rollNumber },
        update: { $set: s },
        upsert: true,
      },
    }));

    const result = await Student.bulkWrite(ops);

    return res.status(200).json({
      success: true,
      message: `${students.length} student(s) processed successfully`,
      inserted: result.upsertedCount,
      updated: result.modifiedCount,
      students,
    });
  } catch (err) {
    console.error('Upload students error:', err);
    return res.status(500).json({ success: false, message: 'Failed to upload students' });
  }
};

// GET /api/students
const getStudents = async (req, res) => {
  try {
    await connectDB();
    const students = await Student.find().sort({ rollNumber: 1 });
    return res.status(200).json({ success: true, students });
  } catch (err) {
    console.error('Get students error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch students' });
  }
};

module.exports = { uploadStudents, getStudents };
