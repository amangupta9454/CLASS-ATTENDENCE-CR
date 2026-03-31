import { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, ClipboardCheck, BarChart2, AlertTriangle, CheckCircle,
  Download, Send, Users, BookOpen, Clock, Calendar, FileSpreadsheet,
  ChevronDown, Loader2, X, Check, TrendingUp, Activity, Zap, Eye, Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const LECTURES = [3, 4, 5, 6];
const LECTURE_TIMINGS = {
  3: '11:30 AM - 12:30 PM',
  4: '1:30 PM - 2:30 PM',
  5: '2:30 PM - 3:30 PM',
  6: '3:30 PM - 4:30 PM',
};

const SUBJECT_OPTIONS = [
  'SOFTWARE ENGINEERING',
  'SOFTWARE PROJECT MANAGEMENT',
  'COMPUTER NETWORK',
  'BIG DATA',
  'COMPILER DESIGN',
  'COMUTER NETWORK LAB',
  'SOFTWARE ENGINEERING LAB',
  'COMPILER DESIGN LAB',
  'EITK'
];

const TIMING_OPTIONS = [
  '11:30 AM - 12:30 PM',
  '1:30 PM - 2:30 PM',
  '2:30 PM - 3:30 PM',
  '3:30 PM - 4:30 PM'
];

const getISTDate = (offsetDays = 0) => {
  const d = new Date();
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + 19800000); // IST is UTC+5:30
  istDate.setDate(istDate.getDate() + offsetDays);
  return istDate.toISOString().split('T')[0];
};

const todayIST = () => getISTDate(0);
const yesterdayIST = () => getISTDate(-1);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

/* ───── TabBtn Component ───── */
const TabBtn = ({ active, onClick, icon: Icon, label }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold rounded-2xl transition-all whitespace-nowrap relative overflow-hidden group`}
  >
    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
      active
        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/30'
        : 'bg-slate-100 group-hover:bg-slate-200'
    }`} />
    <span className={`relative flex items-center gap-2 ${active ? 'text-white' : 'text-slate-700'}`}>
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="hidden sm:inline">{label}</span>
    </span>
  </motion.button>
);

/* ───── SectionCard Component ───── */
const SectionCard = ({ children, className = '' }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    className={`bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

/* ───── StatCard Component ───── */
const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4 }}
    className={`p-4 sm:p-6 rounded-2xl border-2 ${color} backdrop-blur-sm relative overflow-hidden group`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:scale-150 transition-transform duration-500">
      <Icon className="w-20 h-20" />
    </div>
    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-xs sm:text-sm font-medium opacity-70 mb-1 sm:mb-2">{label}</p>
        <p className="text-2xl sm:text-3xl font-bold">{value}</p>
        {trend && <p className="text-xs mt-1 sm:mt-2 opacity-60">{trend}</p>}
      </div>
      <div className="p-2 sm:p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
    </div>
  </motion.div>
);

/* ───── Upload Students Tab ───── */
const UploadTab = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const wb = XLSX.read(e.target.result, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
      setPreview(rows.slice(0, 5));
    };
    reader.readAsArrayBuffer(f);
  };

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a file first.');
    const fd = new FormData();
    fd.append('file', file);
    setLoading(true);
    try {
      const { data } = await api.post('/api/students/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(data);
      toast.success(data.message);
      setFile(null);
      setPreview([]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100"
          >
            <FileSpreadsheet className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          </motion.div>
          <div>
            <h2 className="font-bold text-base sm:text-lg text-slate-800">Upload Student Data</h2>
            <p className="text-xs sm:text-sm text-slate-500">Excel file: Roll No, Student ID, Name, Section, Email</p>
          </div>
        </div>

        <motion.div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`border-3 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
            dragging 
              ? 'border-blue-500 bg-blue-50 scale-105' 
              : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
        >
          <motion.div
            animate={{ y: dragging ? -4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ scale: dragging ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
            </motion.div>
            {file ? (
              <div>
                <p className="text-sm sm:text-base font-bold text-blue-600">{file.name}</p>
                <p className="text-xs text-slate-500 mt-1">Ready to upload</p>
              </div>
            ) : (
              <>
                <p className="text-sm sm:text-base font-bold text-slate-700">Drag & drop your Excel file</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">or click to browse — .xlsx, .xls supported</p>
              </>
            )}
          </motion.div>
        </motion.div>
        <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />

        {preview.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-xl border border-slate-200 overflow-hidden shadow-md"
          >
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-3 border-b border-slate-200">
              <p className="text-sm font-bold text-slate-700">Preview (first 5 rows)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    {Object.keys(preview[0]).map((k) => (
                      <th key={k} className="px-3 sm:px-4 py-2 sm:py-3 text-left text-slate-600 font-bold">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                      {Object.values(row).map((v, j) => (
                        <td key={j} className="px-3 sm:px-4 py-2 sm:py-3 text-slate-700">{String(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl text-sm text-emerald-800 flex items-start gap-3"
          >
            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <p className="font-bold">{result.message}</p>
              <p className="text-xs mt-1 text-emerald-600">Inserted: {result.inserted} | Updated: {result.updated}</p>
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={handleUpload}
          disabled={!file || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          id="upload-students-btn"
          className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/30 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          {loading ? 'Uploading...' : 'Upload Students'}
        </motion.button>
      </SectionCard>
    </div>
  );
};

/* ───── Mark Attendance Tab ───── */
const MarkAttendanceTab = ({ pendingLectures }) => {
  const [date, setDate] = useState(todayIST());
  const [lectureNum, setLectureNum] = useState(3);
  const [subject, setSubject] = useState('');
  const [timing, setTiming] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudent, setExpandedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      fetchExistingAttendance();
    }
  }, [date, lectureNum, students]);

  const fetchExistingAttendance = async () => {
    try {
      const { data } = await api.get(`/api/attendance?date=${date}&lectureNumber=${lectureNum}`);
      if (data.records && data.records.length > 0) {
        const existingAtt = {};
        data.records.forEach((r) => {
          if (r.studentId && r.studentId._id) {
            existingAtt[r.studentId._id] = r.status;
          }
        });
        setAttendance(existingAtt);
        setSubject(data.records[0].subjectName || '');
        setTiming(data.records[0].timing || '');
      } else {
        const init = {};
        students.forEach((s) => { init[s._id] = 'Present'; });
        setAttendance(init);
        setSubject('');
        setTiming('');
      }
    } catch (err) {
      console.error("Failed to fetch existing attendance", err);
    }
  };

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const { data } = await api.get('/api/students');
      setStudents(data.students || []);
      // The secondary useEffect will handle setting the initial 'Present' state or fetching existing attendance
    } catch {
      toast.error('Failed to load students');
    } finally {
      setLoadingStudents(false);
    }
  };

  const toggleAll = (status) => {
    const updated = {};
    students.forEach((s) => { updated[s._id] = status; });
    setAttendance(updated);
  };

  const handleLectureChange = (l) => {
    setLectureNum(l);
  };

  const handleSubmit = async () => {
    if (!subject.trim()) return toast.error('Please enter a subject name.');
    if (!timing.trim()) return toast.error('Please enter timing.');
    if (!students.length) return toast.error('No students found. Upload students first.');

    const records = students.map((s) => ({ studentId: s._id, status: attendance[s._id] || 'Present' }));
    setSubmitting(true);
    try {
      const { data } = await api.post('/api/attendance/mark', {
        date, lectureNumber: lectureNum, subjectName: subject, timing, records,
      });

      if (data.emailErrors && data.emailErrors.length > 0) {
        toast.error(`Attendance marked, but ${data.emailErrors.length} email(s) failed to send. Check console/logs.`, { duration: 5000 });
        console.error('Email sending errors:', data.emailErrors);
      } else {
        toast.success(data.message);
      }
      
      if (data.absentCount > 0) {
        toast(`📧 Absence emails sent to ${data.absentCount} student(s)`, { icon: '✉️' });
      }
      
      if (data.correctedCount > 0) {
        toast(`✅ Correction emails sent to ${data.correctedCount} student(s)`, { icon: '✅' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setSubmitting(false);
    }
  };

  const presentCount = Object.values(attendance).filter((v) => v === 'Present').length;
  const absentCount = Object.values(attendance).filter((v) => v === 'Absent').length;
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNumber.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {pendingLectures.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl flex items-start gap-3 backdrop-blur-sm"
        >
          <div className="p-2 rounded-lg bg-amber-200 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-amber-800">Pending Attendance Today</p>
            <p className="text-xs text-amber-700 mt-1 font-medium">
              Lectures not yet marked: {pendingLectures.map((l) => `L${l}`).join(', ')}
            </p>
          </div>
        </motion.div>
      )}

      <SectionCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <motion.div whileHover={{ scale: 1.1 }} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100">
            <ClipboardCheck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          </motion.div>
          <h2 className="font-bold text-base sm:text-lg text-slate-800">Lecture Details</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
              <Calendar className="w-3 h-3 inline mr-1" />Date
            </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              min={yesterdayIST()} max={todayIST()}
              id="attendance-date"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border-2 border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
              <BookOpen className="w-3 h-3 inline mr-1" />Lecture
            </label>
            <select value={lectureNum} onChange={(e) => handleLectureChange(Number(e.target.value))}
              id="lecture-select"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border-2 border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              {LECTURES.map((l) => <option key={l} value={l}>Lecture {l}</option>)}
            </select>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}
              id="subject-input"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border-2 border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="">Select Subject</option>
              {SUBJECT_OPTIONS.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
            </select>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
              <Clock className="w-3 h-3 inline mr-1" />Timing
            </label>
            <select value={timing} onChange={(e) => setTiming(e.target.value)}
              id="timing-input"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border-2 border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="">Select Timing</option>
              {TIMING_OPTIONS.map((time) => <option key={time} value={time}>{time}</option>)}
            </select>
          </motion.div>
        </div>
      </SectionCard>

      <SectionCard className="overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-xs sm:text-sm text-slate-800">Students</span>
            </div>
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full font-bold border border-emerald-200"
            >
              <Check className="w-3 h-3 inline mr-1" /> {presentCount}
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-red-100 to-rose-100 text-red-700 rounded-full font-bold border border-red-200"
            >
              <X className="w-3 h-3 inline mr-1" /> {absentCount}
            </motion.span>
            <span className="text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 bg-slate-100 text-slate-600 rounded-full font-bold border border-slate-200">
              {students.length}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleAll('Present')}
              className="px-3 py-2 text-xs font-bold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-lg hover:shadow-md border border-emerald-200 transition-all"
            >
              All P
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleAll('Absent')}
              className="px-3 py-2 text-xs font-bold bg-gradient-to-r from-red-100 to-rose-100 text-red-700 rounded-lg hover:shadow-md border border-red-200 transition-all"
            >
              All A
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        {students.length > 0 && (
          <div className="px-5 sm:px-6 pt-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <motion.input
                type="text"
                placeholder="Search name or roll..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm border-2 border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        {loadingStudents ? (
          <div className="py-16 text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Loader2 className="w-8 h-8 text-blue-500 mx-auto" />
            </motion.div>
            <p className="text-xs sm:text-sm text-slate-500 mt-3 font-medium">Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-xs sm:text-sm text-slate-500 font-medium">No students found. Upload student data first.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Roll No</th>
                    <th className="px-5 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Name</th>
                    <th className="px-5 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Section</th>
                    <th className="px-5 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, i) => {
                    const status = attendance[s._id] || 'Present';
                    return (
                      <motion.tr
                        key={s._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02 }}
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                        className="border-t border-slate-100 transition-all"
                      >
                        <td className="px-5 py-4 text-slate-700 font-semibold text-sm">{s.rollNumber}</td>
                        <td className="px-5 py-4 text-slate-800 font-medium">{s.name}</td>
                        <td className="px-5 py-4 text-slate-600 text-sm">{s.section}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setAttendance((p) => ({ ...p, [s._id]: 'Present' }))}
                              className={`px-4 py-2 text-xs font-bold rounded-lg border-2 transition-all flex items-center gap-1.5 ${
                                status === 'Present'
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                                  : 'border-slate-300 text-slate-600 hover:border-emerald-400 hover:text-emerald-600'
                              }`}
                            >
                              <Check className="w-4 h-4" />
                              <span className="hidden sm:inline">P</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setAttendance((p) => ({ ...p, [s._id]: 'Absent' }))}
                              className={`px-4 py-2 text-xs font-bold rounded-lg border-2 transition-all flex items-center gap-1.5 ${
                                status === 'Absent'
                                  ? 'bg-gradient-to-r from-red-500 to-rose-500 border-red-600 text-white shadow-lg shadow-red-500/30'
                                  : 'border-slate-300 text-slate-600 hover:border-red-400 hover:text-red-600'
                              }`}
                            >
                              <X className="w-4 h-4" />
                              <span className="hidden sm:inline">A</span>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredStudents.map((s, i) => {
                const status = attendance[s._id] || 'Present';
                return (
                  <motion.div
                    key={s._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{s.rollNumber}</span>
                          <span className="text-xs font-medium text-slate-500">{s.section}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{s.name}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setAttendance((p) => ({ ...p, [s._id]: 'Present' }))}
                          className={`w-10 h-10 rounded-lg border-2 font-bold transition-all flex items-center justify-center text-sm ${
                            status === 'Present'
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                              : 'border-slate-300 text-slate-600 hover:border-emerald-400'
                          }`}
                        >
                          <Check className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setAttendance((p) => ({ ...p, [s._id]: 'Absent' }))}
                          className={`w-10 h-10 rounded-lg border-2 font-bold transition-all flex items-center justify-center text-sm ${
                            status === 'Absent'
                              ? 'bg-gradient-to-r from-red-500 to-rose-500 border-red-600 text-white shadow-lg shadow-red-500/30'
                              : 'border-slate-300 text-slate-600 hover:border-red-400'
                          }`}
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {students.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-slate-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <motion.button
              onClick={handleSubmit}
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="submit-attendance-btn"
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/30 text-white rounded-xl font-bold transition-all disabled:opacity-50 w-full"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {submitting ? 'Submitting...' : 'Submit & Send Emails'}
            </motion.button>
          </div>
        )}
      </SectionCard>
    </div>
  );
};

/* ───── View & Export Tab ───── */
const ViewExportTab = () => {
  const [date, setDate] = useState(todayIST());
  const [lectureNum, setLectureNum] = useState('');
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (lectureNum) params.append('lectureNumber', lectureNum);
      const { data } = await api.get(`/api/attendance?${params}`);
      setRecords(data.records || []);
      setSummary({ total: data.total, present: data.presentCount, absent: data.absentCount });
    } catch {
      toast.error('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (lectureNum) params.append('lectureNumber', lectureNum);
      const res = await api.get(`/api/attendance/export?${params}`, { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_${date || 'all'}_lec${lectureNum || 'all'}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Excel downloaded!');
    } catch {
      toast.error('No present records found for these filters.');
    } finally {
      setExporting(false);
    }
  };

  const attendanceRate = summary && summary.total ? Math.round((summary.present / summary.total) * 100) : 0;

  return (
    <div className="space-y-6">
      <SectionCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <motion.div whileHover={{ scale: 1.1 }} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100">
            <BarChart2 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          </motion.div>
          <h2 className="font-bold text-base sm:text-lg text-slate-800">View & Export Attendance</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              id="view-date"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border-2 border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Lecture</label>
            <select value={lectureNum} onChange={(e) => setLectureNum(e.target.value)}
              id="view-lecture"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border-2 border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <option value="">All Lectures</option>
              {LECTURES.map((l) => <option key={l} value={l}>Lecture {l}</option>)}
            </select>
          </motion.div>

          <motion.button
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            onClick={fetchRecords}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="fetch-records-btn"
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
            <span className="hidden sm:inline">{loading ? 'Loading...' : 'Fetch'}</span>
            <span className="sm:hidden text-xs font-bold">{loading ? '...' : 'View'}</span>
          </motion.button>

          <motion.button
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            onClick={handleExport}
            disabled={exporting || !summary}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="export-excel-btn"
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50"
          >
            {exporting ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Download className="w-4 h-4 sm:w-5 sm:h-5" />}
            <span className="hidden sm:inline">{exporting ? 'Exporting...' : 'Export'}</span>
            <span className="sm:hidden text-xs font-bold">{exporting ? '...' : 'DL'}</span>
          </motion.button>
        </div>
      </SectionCard>

      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            icon={Users}
            label="Total Records"
            value={summary.total}
            color="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-blue-700"
          />
          <StatCard
            icon={CheckCircle}
            label="Present"
            value={summary.present}
            color="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700"
          />
          <StatCard
            icon={AlertTriangle}
            label="Absent"
            value={summary.absent}
            color="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 text-red-700"
          />
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="p-4 sm:p-6 rounded-2xl border-2 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 text-violet-700 overflow-hidden group relative"
          >
            <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:scale-150 transition-transform duration-500">
              <TrendingUp className="w-20 h-20" />
            </div>
            <div className="relative">
              <p className="text-xs sm:text-sm font-medium opacity-70 mb-1 sm:mb-2">Attendance Rate</p>
              <p className="text-2xl sm:text-3xl font-bold mb-2">{attendanceRate}%</p>
              <div className="w-full bg-violet-200/50 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${attendanceRate}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {records.length > 0 && (
        <SectionCard className="overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
            <p className="font-bold text-xs sm:text-sm text-slate-700 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Attendance Records ({records.length})
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 border-b-2 border-slate-200">
                <tr>
                  {['Roll No', 'Name', 'Subject', 'Lecture', 'Date', 'Status'].map((h) => (
                    <th key={h} className="px-4 sm:px-5 py-3 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <motion.tr
                    key={r._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className="border-t border-slate-100 transition-all"
                  >
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-slate-700 text-xs font-bold">{r.studentId?.rollNumber}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-slate-800 font-medium text-sm">{r.studentId?.name}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-slate-600 text-xs sm:text-sm">{r.subjectName}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-slate-600 font-semibold text-xs sm:text-sm">L{r.lectureNumber}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-slate-600 text-xs">{r.date}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                          r.status === 'Present'
                            ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200'
                            : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {r.status === 'Present' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        {r.status}
                      </motion.span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            {records.map((r, i) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">{r.studentId?.rollNumber}</span>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">L{r.lectureNumber}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{r.studentId?.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{r.subjectName}</p>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                        r.status === 'Present'
                          ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200'
                          : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200'
                      }`}
                    >
                      {r.status === 'Present' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      {r.status}
                    </motion.span>
                  </div>
                  <p className="text-xs text-slate-400">{r.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
};

/* ───── Main CrDashboard ───── */
const TABS = [
  { id: 'mark', label: 'Mark Attendance', icon: ClipboardCheck },
  { id: 'upload', label: 'Upload Students', icon: Upload },
  { id: 'view', label: 'View & Export', icon: BarChart2 },
];

const CrDashboard = () => {
  const [tab, setTab] = useState('mark');
  const [pendingLectures, setPendingLectures] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/api/attendance/pending')
      .then(({ data }) => setPendingLectures(data.pending || []))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-white via-blue-50/50 to-white  top-0 z-20 border-b-2 border-slate-200/60 shadow-md backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                CR Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2 font-semibold">
                Welcome back, <span className="text-blue-600 font-bold">{user?.name}</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden sm:flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl shadow-lg"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50"
              />
              <span className="text-xs sm:text-sm font-bold text-emerald-900 tracking-wide uppercase">Active</span>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {TABS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <TabBtn active={tab === t.id} onClick={() => setTab(t.id)} icon={t.icon} label={t.label} />
              </motion.div>
            ))}

            {pendingLectures.length > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 ml-auto px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 text-amber-800 rounded-2xl text-xs sm:text-xs font-bold shrink-0 self-center shadow-lg backdrop-blur-sm whitespace-nowrap"
              >
                <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                <span className="hidden sm:inline">{pendingLectures.length} Pending</span>
                <span className="sm:hidden">{pendingLectures.length}P</span>
              </motion.span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'upload' && <UploadTab />}
            {tab === 'mark' && <MarkAttendanceTab pendingLectures={pendingLectures} />}
            {tab === 'view' && <ViewExportTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CrDashboard;

