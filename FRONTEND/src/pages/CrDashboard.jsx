import { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, ClipboardCheck, BarChart2, AlertTriangle, CheckCircle,
  Download, Send, Users, BookOpen, Clock, Calendar, FileSpreadsheet,
  ChevronDown, Loader2, X, Check
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

const today = () => new Date().toISOString().split('T')[0];

/* ───── Small shared components ───── */
const TabBtn = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
      active
        ? 'bg-[#1e3a5f] text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const SectionCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
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
      <SectionCard className="p-6">
        <h2 className="font-600 text-slate-800 mb-1 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-[#1e3a5f]" /> Upload Student Data
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          Upload an Excel file with columns: Roll No, Student ID, Name, Section, Email Id
        </p>

        {/* Drop zone */}
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
            dragging ? 'border-[#1e3a5f] bg-blue-50' : 'border-slate-300 hover:border-[#1e3a5f] hover:bg-slate-50'
          }`}
        >
          <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          {file ? (
            <p className="text-sm font-medium text-[#1e3a5f]">{file.name}</p>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-700">Drag & drop your Excel file here</p>
              <p className="text-xs text-slate-400 mt-1">or click to browse — .xlsx, .xls supported</p>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />

        {/* Preview */}
        {preview.length > 0 && (
          <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
            <p className="text-xs font-medium text-slate-500 px-4 pt-3 pb-2">Preview (first 5 rows)</p>
            <table className="w-full text-xs">
              <thead className="bg-slate-50">
                <tr>
                  {Object.keys(preview[0]).map((k) => (
                    <th key={k} className="px-4 py-2 text-left text-slate-600 font-medium">{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="px-4 py-2 text-slate-700">{String(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Result */}
        {result && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{result.message}</p>
              <p className="text-xs mt-0.5 text-emerald-600">Inserted: {result.inserted} | Updated: {result.updated}</p>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          id="upload-students-btn"
          className="mt-5 flex items-center gap-2 px-6 py-2.5 bg-[#1e3a5f] hover:bg-[#2d5282] text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {loading ? 'Uploading...' : 'Upload Students'}
        </button>
      </SectionCard>
    </div>
  );
};

/* ───── Mark Attendance Tab ───── */
const MarkAttendanceTab = ({ pendingLectures }) => {
  const [date, setDate] = useState(today());
  const [lectureNum, setLectureNum] = useState(3);
  const [subject, setSubject] = useState('');
  const [timing, setTiming] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const { data } = await api.get('/api/students');
      setStudents(data.students || []);
      const init = {};
      (data.students || []).forEach((s) => { init[s._id] = 'Present'; });
      setAttendance(init);
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
      toast.success(data.message);
      
      if (data.absentCount > 0) {
        toast(`📧 Absence emails sent to ${data.absentCount} student(s)`, { icon: '✉️' });
      }
      
      if (data.correctedCount > 0) {
        toast(`✅ Correction emails sent to ${data.correctedCount} student(s)`, { icon: '✅' });
      }
        
      // Intentionally not resetting the form fields so the CR can easily make corrections
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setSubmitting(false);
    }
  };

  const presentCount = Object.values(attendance).filter((v) => v === 'Present').length;
  const absentCount = Object.values(attendance).filter((v) => v === 'Absent').length;

  return (
    <div className="space-y-6">
      {/* Pending alerts */}
      {pendingLectures.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Pending Attendance Today</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Lectures not yet marked: {pendingLectures.map((l) => `Lecture ${l}`).join(', ')}
            </p>
          </div>
        </motion.div>
      )}

      {/* Config */}
      <SectionCard className="p-6">
        <h2 className="font-600 text-slate-800 mb-4 flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-[#1e3a5f]" /> Lecture Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              <Calendar className="w-3 h-3 inline mr-1" />Date
            </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              min={today()} max={today()}
              id="attendance-date"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              <BookOpen className="w-3 h-3 inline mr-1" />Lecture Number
            </label>
            <select value={lectureNum} onChange={(e) => handleLectureChange(Number(e.target.value))}
              id="lecture-select"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]">
              {LECTURES.map((l) => <option key={l} value={l}>Lecture {l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Subject Name</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}
              id="subject-input"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]">
              <option value="">Select Subject</option>
              {SUBJECT_OPTIONS.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              <Clock className="w-3 h-3 inline mr-1" />Timing
            </label>
            <select value={timing} onChange={(e) => setTiming(e.target.value)}
              id="timing-input"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]">
              <option value="">Select Timing</option>
              {TIMING_OPTIONS.map((time) => <option key={time} value={time}>{time}</option>)}
            </select>
          </div>
        </div>
      </SectionCard>

      {/* Student list */}
      <SectionCard className="overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-[#1e3a5f]" />
            <span className="font-600 text-slate-800 text-sm">Students ({students.length})</span>
            <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">P: {presentCount}</span>
            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">A: {absentCount}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toggleAll('Present')} className="px-3 py-1.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors">
              All Present
            </button>
            <button onClick={() => toggleAll('Absent')} className="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
              All Absent
            </button>
          </div>
        </div>

        {loadingStudents ? (
          <div className="py-12 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400 mx-auto" />
            <p className="text-sm text-slate-400 mt-2">Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="py-12 text-center">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No students found. Upload student data first.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-slate-500">Roll No</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-slate-500">Name</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 hidden sm:table-cell">Section</th>
                  <th className="px-5 py-3 text-center text-xs font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => {
                  const status = attendance[s._id] || 'Present';
                  return (
                    <tr key={s._id} className={`border-t border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                      <td className="px-5 py-3 text-slate-600 font-medium text-xs">{s.rollNumber}</td>
                      <td className="px-5 py-3 text-slate-800">{s.name}</td>
                      <td className="px-5 py-3 text-slate-500 hidden sm:table-cell">{s.section}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setAttendance((p) => ({ ...p, [s._id]: 'Present' }))}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                              status === 'Present'
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                                : 'border-slate-300 text-slate-500 hover:border-emerald-400 hover:text-emerald-600'
                            }`}
                          >P</button>
                          <button
                            onClick={() => setAttendance((p) => ({ ...p, [s._id]: 'Absent' }))}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                              status === 'Absent'
                                ? 'bg-red-500 border-red-500 text-white shadow-sm'
                                : 'border-slate-300 text-slate-500 hover:border-red-400 hover:text-red-600'
                            }`}
                          >A</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {students.length > 0 && (
          <div className="p-5 border-t border-slate-100">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              id="submit-attendance-btn"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1e3a5f] hover:bg-[#2d5282] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {submitting ? 'Submitting...' : 'Submit Attendance & Send Emails'}
            </button>
          </div>
        )}
      </SectionCard>
    </div>
  );
};

/* ───── View & Export Tab ───── */
const ViewExportTab = () => {
  const [date, setDate] = useState(today());
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

  return (
    <div className="space-y-6">
      <SectionCard className="p-6">
        <h2 className="font-600 text-slate-800 mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-[#1e3a5f]" /> View & Export Attendance
        </h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              id="view-date"
              className="px-3 py-2 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Lecture</label>
            <select value={lectureNum} onChange={(e) => setLectureNum(e.target.value)}
              id="view-lecture"
              className="px-3 py-2 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]">
              <option value="">All Lectures</option>
              {LECTURES.map((l) => <option key={l} value={l}>Lecture {l}</option>)}
            </select>
          </div>
          <button onClick={fetchRecords} disabled={loading} id="fetch-records-btn"
            className="flex items-center gap-2 px-5 py-2 bg-[#1e3a5f] hover:bg-[#2d5282] text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BarChart2 className="w-4 h-4" />}
            {loading ? 'Loading...' : 'Fetch Records'}
          </button>
          <button onClick={handleExport} disabled={exporting} id="export-excel-btn"
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {exporting ? 'Exporting...' : 'Export Present'}
          </button>
        </div>
      </SectionCard>

      {summary && (
        <motion.section
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Selected', val: summary.total, color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'Total Present', val: summary.present, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { label: 'Total Absent', val: summary.absent, color: 'bg-red-50 text-red-700 border-red-200' },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl border p-4 flex flex-col items-center justify-center ${s.color}`}>
              <p className="text-2xl font-bold">{s.val}</p>
              <p className="text-xs font-semibold opacity-80 mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
          
          <div className="rounded-xl border p-4 border-indigo-200 bg-indigo-50 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-2">
                 <p className="text-xs font-semibold opacity-80 text-indigo-700 uppercase tracking-wider">Attendance Rate</p>
                 <span className="text-sm font-bold text-indigo-700">{summary.total ? Math.round((summary.present / summary.total) * 100) : 0}%</span>
             </div>
             <div className="w-full bg-indigo-200/50 rounded-full h-2">
                 <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${summary.total ? Math.round((summary.present / summary.total) * 100) : 0}%` }}
                     transition={{ duration: 0.8, ease: 'easeOut' }}
                     className="h-2 rounded-full bg-indigo-600"
                 />
             </div>
          </div>
        </motion.section>
      )}

      {records.length > 0 && (
        <SectionCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Roll No', 'Name', 'Subject', 'Lecture', 'Date', 'Status'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={r._id} className={`border-t border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                    <td className="px-5 py-3 text-slate-600 text-xs font-medium">{r.studentId?.rollNumber}</td>
                    <td className="px-5 py-3 text-slate-800">{r.studentId?.name}</td>
                    <td className="px-5 py-3 text-slate-600">{r.subjectName}</td>
                    <td className="px-5 py-3 text-slate-600">L{r.lectureNumber}</td>
                    <td className="px-5 py-3 text-slate-600 text-xs">{r.date}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        r.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {r.status === 'Present' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
};

/* ───── Main CrDashboard ───── */
const TABS = [
  { id: 'upload', label: 'Upload Students', icon: Upload },
  { id: 'mark', label: 'Mark Attendance', icon: ClipboardCheck },
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-indigo-100/60 shadow-sm backdrop-blur-xl bg-white/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center justify-between pb-4">
               <div>
                  <h1 className="text-2xl font-800 text-slate-800 tracking-tight">CR Dashboard</h1>
                  <p className="text-sm text-slate-500 mt-1.5 font-medium">
                    Welcome back, <span className="font-bold text-indigo-600">{user?.name}</span>
                  </p>
               </div>
               <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                  <span className="text-xs font-bold text-indigo-900 tracking-wide uppercase">Active Session</span>
               </div>
            </div>
          </motion.div>
        
          {/* Tabs */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 mt-2 hide-scrollbar">
            {TABS.map((t) => (
              <TabBtn key={t.id} active={tab === t.id} onClick={() => setTab(t.id)} icon={t.icon} label={t.label} />
            ))}
            {pendingLectures.length > 0 && (
              <span className="flex items-center gap-1.5 ml-auto px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs font-bold shrink-0 self-center shadow-sm">
                <AlertTriangle className="w-4 h-4" />
                {pendingLectures.length} Pending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
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
