import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClipboardCheck, MailCheck, Download, ShieldCheck, UserCog, GraduationCap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const features = [
  {
    icon: ClipboardCheck,
    title: 'Mark Attendance',
    desc: 'CR marks attendance for Lectures 3, 4, 5, 6 with Present/Absent status per student.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MailCheck,
    title: 'Auto Email Alerts',
    desc: 'Absent students receive instant email notifications via Nodemailer automatically.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Download,
    title: 'Export Reports',
    desc: 'Download Excel reports of present students filtered by date and lecture number.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Access',
    desc: 'Role-based login — CRs and Coordinators have separate portals with JWT auth.',
    color: 'bg-orange-50 text-orange-600',
  },
];

const stats = [
  { value: '3', label: 'Class Representatives' },
  { value: '4', label: 'Lectures Per Day' },
  { value: '100%', label: 'Attendance Tracked' },
];

const Home = () => (
  <div className="min-h-screen bg-[#f8fafc]">
    {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#2d5282] to-[#1a365d] text-white">
      {/* decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6"
        >
          <GraduationCap className="w-4 h-4" />
          College Attendance Management
        </motion.div>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="text-4xl sm:text-5xl md:text-6xl font-800 leading-tight mb-6"
        >
          Track Attendance,{' '}
          <span className="text-blue-300">Effortlessly.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A smart system for CRs to mark, manage, and export lecture attendance — with automatic email notifications for absentees.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/cr-login"
            id="cr-login-hero-btn"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#1e3a5f] rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <UserCog className="w-4 h-4" />
            CR Login
          </Link>
          <Link
            to="/faculty-login"
            id="faculty-login-hero-btn"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 border border-white/30 text-white rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 backdrop-blur"
          >
            <ShieldCheck className="w-4 h-4" />
            Coordinator Login
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Stats Bar */}
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 divide-x divide-slate-200">
          {stats.map((s, i) => (
            <motion.div
              key={i} variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={i}
              className="text-center px-4"
            >
              <p className="text-2xl sm:text-3xl font-800 text-[#1e3a5f]">{s.value}</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-700 text-[#1e3a5f] mb-4">Everything You Need</h2>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          A complete toolkit for managing daily college attendance — from marking to reporting.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i} variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={i}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(30,58,95,0.12)' }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm cursor-default transition-shadow"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
              <f.icon className="w-5 h-5" />
            </div>
            <h3 className="font-600 text-slate-800 mb-2">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5282] py-16 mx-4 mb-12 rounded-3xl max-w-5xl lg:mx-auto text-center text-white px-6">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 className="text-3xl font-700 mb-4">Ready to get started?</h2>
        <p className="text-blue-200 mb-8 text-lg">Login with your role to access the dashboard.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/cr-login" className="px-8 py-3 bg-white text-[#1e3a5f] rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            CR Portal
          </Link>
          <Link to="/faculty-login" className="px-8 py-3 border border-white/40 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
            Coordinator Portal
          </Link>
        </div>
      </motion.div>
    </section>

    {/* Footer */}
    <footer className="text-center py-6 text-sm text-slate-400 border-t border-slate-200">
      © {new Date().getFullYear()} CR Attendance Management System. All rights reserved.
    </footer>
  </div>
);

export default Home;
