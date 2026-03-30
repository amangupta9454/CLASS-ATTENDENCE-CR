const xlsx = require('xlsx');

/**
 * Parse an Excel file buffer and return an array of student objects.
 * Expected columns: Roll No, Student ID, Name, Section, Email id
 */
const parseExcel = (buffer) => {
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });

  return rows.map((row) => {
    // Normalize column names (case-insensitive, trim)
    const normalized = {};
    Object.keys(row).forEach((key) => {
      normalized[key.toLowerCase().replace(/\s+/g, '')] = String(row[key]).trim();
    });

    return {
      rollNumber: normalized['rollno'] || normalized['rollnumber'] || normalized['roll'] || '',
      studentId: normalized['studentid'] || normalized['id'] || '',
      name: normalized['name'] || '',
      section: normalized['section'] || '',
      email: normalized['emailid'] || normalized['email'] || '',
    };
  }).filter((s) => s.rollNumber && s.name && s.email);
};

/**
 * Generate an Excel file buffer from attendance data (present students only).
 */
const generateAttendanceExcel = (records) => {
  const data = records.map((r) => ({
    Date: r.date,
    Lecture: `Lecture ${r.lectureNumber}`,
    Subject: r.subjectName,
    Timing: r.timing,
    'Roll No': r.studentId?.rollNumber || '',
    'Student ID': r.studentId?.studentId || '',
    Name: r.studentId?.name || '',
    Section: r.studentId?.section || '',
    Email: r.studentId?.email || '',
    Status: r.status,
  }));

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(data);

  // Auto-width columns
  const colWidths = Object.keys(data[0] || {}).map((key) => ({
    wch: Math.max(key.length, 14),
  }));
  ws['!cols'] = colWidths;

  xlsx.utils.book_append_sheet(wb, ws, 'Attendance');
  return xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
};

module.exports = { parseExcel, generateAttendanceExcel };
