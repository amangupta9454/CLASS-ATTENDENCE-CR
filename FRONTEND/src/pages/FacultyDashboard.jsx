import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, Download, Users, CheckCircle, XCircle,
  Calendar, BookOpen, Loader2, X, Check, TrendingUp, FileSpreadsheet, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const LECTURES = [3, 4, 5, 6];
const getISTDate = (offsetDays = 0) => {
  const d = new Date();
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + 19800000); // IST is UTC+5:30
  istDate.setDate(istDate.getDate() + offsetDays);
  return istDate.toISOString().split('T')[0];
};

const todayIST = () => getISTDate(0);

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl border p-5 flex items-center gap-4 shadow-sm ${color}`}
  >
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color.replace('border', 'bg')}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-2xl font-700">{value}</p>
      <p className="text-xs font-medium opacity-70 mt-0.5">{label}</p>
    </div>
  </motion.div>
);

const FacultyDashboard = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(todayIST());
  const [lectureNum, setLectureNum] = useState('');
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [lectureSummary, setLectureSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [searched, setSearched] = useState(false);
  const [frequentAbsentees, setFrequentAbsentees] = useState([]);
  const [loadingHeatmap, setLoadingHeatmap] = useState(true);

  // Load lecture summary & frequent absentees on mount
  useEffect(() => {
    api.get(`/api/attendance/summary?date=${todayIST()}`)
      .then(({ data }) => setLectureSummary(data.summary || []))
      .catch(() => {});

    api.get(`/api/attendance/frequent-absentees?minDays=3`)
      .then(({ data }) => {
        setFrequentAbsentees(data.absentees || []);
        setLoadingHeatmap(false);
      })
      .catch(() => setLoadingHeatmap(false));
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    setSearched(false);
    try {
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (lectureNum) params.append('lectureNumber', lectureNum);
      const { data } = await api.get(`/api/attendance?${params}`);
      setRecords(data.records || []);
      setSummary({ total: data.total, present: data.presentCount, absent: data.absentCount });
      setSearched(true);
      if (!data.total) toast('No records found for the selected filters.', { icon: 'ℹ️' });
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
      a.download = `attendance_report_${date || 'all'}_lec${lectureNum || 'all'}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Report downloaded!');
    } catch {
      toast.error('No present records for these filters.');
    } finally {
      setExporting(false);
    }
  };

  const pct = summary?.total
    ? Math.round((summary.present / summary.total) * 100)
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-emerald-100/60 shadow-sm backdrop-blur-xl bg-white/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center justify-between flex-wrap gap-4 pb-2">
              <div>
                <h1 className="text-2xl font-800 text-slate-800 tracking-tight">Coordinator Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1.5 font-medium">
                  Welcome back, <span className="font-bold text-emerald-600">{user?.name}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-xs font-bold text-emerald-900 tracking-wide uppercase">Coordinator Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Today's Lecture Summary */}
        {lectureSummary.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-sm font-600 text-slate-600 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Today's Lecture Summary
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lectureSummary.map((s, i) => {
                const p = s.totalStudents ? Math.round((s.presentCount / s.totalStudents) * 100) : 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Lecture {s._id.lectureNumber}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        p >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>{p}%</span>
                    </div>
                    <p className="text-sm font-600 text-slate-800 mb-1">{s._id.subjectName}</p>
                    <p className="text-xs text-slate-400 mb-3">{s._id.timing}</p>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                      <div
                        className={`h-1.5 rounded-full transition-all ${p >= 75 ? 'bg-emerald-500' : 'bg-red-400'}`}
                        style={{ width: `${p}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span className="text-emerald-600 font-medium">P: {s.presentCount}</span>
                      <span className="text-red-500 font-medium">A: {s.absentCount}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Frequent Absentees Heatmap */}
        {!loadingHeatmap && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <h2 className={`text-sm font-600 mb-3 flex items-center gap-2 ${frequentAbsentees.length > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
              {frequentAbsentees.length > 0 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
              Frequent Absentees Warning (≥3 Days)
            </h2>
            
            {frequentAbsentees.length > 0 ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {frequentAbsentees.map((student, i) => (
                    <div key={i} className="bg-white border border-red-100 rounded-xl p-4 flex gap-4 items-center shadow-sm relative overflow-hidden transition-all hover:shadow-md hover:border-red-300">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0 title-font">
                        <span className="text-red-700 font-bold tracking-tighter text-lg">{student.distinctAbsentDates}</span>
                        <span className="text-[10px] font-semibold text-red-500 ml-0.5">d</span>
                      </div>
                      <div>
                        <h3 className="text-slate-800 font-bold text-sm tracking-tight truncate w-full">{student.name}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{student.rollNumber} • {student.section}</p>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-red-500 mt-2 bg-red-50 inline-block px-1.5 py-0.5 rounded border border-red-100">
                          Missed {student.totalAbsentLectures} Lectures Total
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-emerald-800 font-bold text-sm">All Good!</h3>
                <p className="text-emerald-600 text-xs mt-1">No students have missed 3 or more days of classes.</p>
              </div>
            )}
          </motion.section>
        )}

        {/* Filter & Search */}
        <motion.section
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="font-600 text-slate-800 mb-4 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#065f46]" /> View Attendance Records
          </h2>
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                <Calendar className="w-3 h-3 inline mr-1" />Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                id="faculty-date"
                className="px-3 py-2 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                <BookOpen className="w-3 h-3 inline mr-1" />Lecture
              </label>
              <select
                value={lectureNum}
                onChange={(e) => setLectureNum(e.target.value)}
                id="faculty-lecture"
                className="px-3 py-2 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              >
                <option value="">All Lectures</option>
                {LECTURES.map((l) => <option key={l} value={l}>Lecture {l}</option>)}
              </select>
            </div>
            <button
              onClick={fetchRecords}
              disabled={loading}
              id="faculty-fetch-btn"
              className="flex items-center gap-2 px-5 py-2 bg-[#065f46] hover:bg-[#047857] text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BarChart2 className="w-4 h-4" />}
              {loading ? 'Loading...' : 'View Records'}
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              id="faculty-export-btn"
              className="flex items-center gap-2 px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {exporting ? 'Downloading...' : 'Download Report'}
            </button>
          </div>
        </motion.section>

        {/* Summary Stats */}
        <AnimatePresence>
          {summary && searched && (
            <motion.section
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-700 text-blue-700">{summary.total}</p>
                  <p className="text-xs font-medium text-blue-500">Total Records</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-700 text-emerald-700">{summary.present}</p>
                  <p className="text-xs font-medium text-emerald-500">Present</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-700 text-red-600">{summary.absent}</p>
                  <p className="text-xs font-medium text-red-400">Absent</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-purple-200 shadow-sm p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-700 text-purple-700">{pct}%</p>
                  <p className="text-xs font-medium text-purple-400">Attendance Rate</p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Records Table */}
        <AnimatePresence>
          {searched && records.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-600 text-slate-800 text-sm">Detailed Records ({records.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Roll No', 'Student ID', 'Name', 'Section', 'Subject', 'Lecture', 'Timing', 'Date', 'Status'].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-medium text-slate-500 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={r._id} className={`border-t border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/50'} hover:bg-slate-50 transition-colors`}>
                        <td className="px-5 py-3 text-slate-600 text-xs font-medium whitespace-nowrap">{r.studentId?.rollNumber}</td>
                        <td className="px-5 py-3 text-slate-500 text-xs whitespace-nowrap">{r.studentId?.studentId}</td>
                        <td className="px-5 py-3 text-slate-800 whitespace-nowrap">{r.studentId?.name}</td>
                        <td className="px-5 py-3 text-slate-500 text-xs">{r.studentId?.section}</td>
                        <td className="px-5 py-3 text-slate-700 whitespace-nowrap">{r.subjectName}</td>
                        <td className="px-5 py-3 text-slate-600 whitespace-nowrap">L{r.lectureNumber}</td>
                        <td className="px-5 py-3 text-slate-500 text-xs whitespace-nowrap">{r.timing}</td>
                        <td className="px-5 py-3 text-slate-500 text-xs whitespace-nowrap">{r.date}</td>
                        <td className="px-5 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            r.status === 'Present'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {r.status === 'Present'
                              ? <Check className="w-3 h-3" />
                              : <X className="w-3 h-3" />}
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {searched && records.length === 0 && !loading && (
          <div className="text-center py-16">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No records found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
