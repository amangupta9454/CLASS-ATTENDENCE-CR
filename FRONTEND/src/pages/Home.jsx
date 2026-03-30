import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  MailCheck, 
  Download, 
  ShieldCheck, 
  UserCog, 
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
  Zap,
  FileSpreadsheet
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const features = [
  {
    icon: ClipboardCheck,
    title: 'Mark Attendance',
    desc: 'CR marks attendance for Lectures 3, 4, 5, 6 with Present/Absent status per student.',
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-100',
  },
  {
    icon: MailCheck,
    title: 'Auto Email Alerts',
    desc: 'Absent students receive instant email notifications via Nodemailer automatically.',
    color: 'bg-emerald-50 text-emerald-600',
    borderColor: 'border-emerald-100',
  },
  {
    icon: Download,
    title: 'Export Reports',
    desc: 'Download Excel reports of present students filtered by date and lecture number.',
    color: 'bg-amber-50 text-amber-600',
    borderColor: 'border-amber-100',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Access',
    desc: 'Role-based login — CRs and Coordinators have separate portals with JWT auth.',
    color: 'bg-rose-50 text-rose-600',
    borderColor: 'border-rose-100',
  },
];

const stats = [
  { value: '3+', label: 'Class Representatives', icon: Users },
  { value: '4', label: 'Lectures Per Day', icon: Clock },
  { value: '100%', label: 'Attendance Tracked', icon: TrendingUp },
  { value: '<1min', label: 'Average Process Time', icon: Zap },
];

const benefits = [
  'Real-time attendance tracking for all lectures',
  'Automated email notifications to absent students',
  'Comprehensive Excel reports with one click',
  'Secure role-based authentication system',
  'Mobile-responsive interface for on-the-go access',
  'Historical data analysis and insights',
];

const workflow = [
  {
    step: '01',
    title: 'CR Logs In',
    desc: 'Class Representative securely logs into the portal using their credentials.',
    icon: UserCog,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: '02',
    title: 'Mark Attendance',
    desc: 'Select lecture number (3-6) and mark each student as Present or Absent.',
    icon: ClipboardCheck,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    step: '03',
    title: 'Auto Notify',
    desc: 'System automatically sends email alerts to all absent students instantly.',
    icon: MailCheck,
    color: 'from-amber-500 to-orange-500',
  },
  {
    step: '04',
    title: 'Export Data',
    desc: 'Download detailed Excel reports filtered by date and lecture for records.',
    icon: FileSpreadsheet,
    color: 'from-rose-500 to-pink-500',
  },
];

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
    {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Animated background patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold mb-8 shadow-lg"
          >
            <GraduationCap className="w-5 h-5 text-blue-300" />
            <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              College Attendance Management System
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-8"
          >
            Track Attendance,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Effortlessly.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            A smart, automated system empowering Class Representatives to mark, manage, and export lecture attendance — with instant email notifications for absentees.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Link
              to="/cr-login"
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
            >
              <UserCog className="w-5 h-5" />
              CR Login
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/faculty-login"
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              <ShieldCheck className="w-5 h-5" />
              Coordinator Login
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" />
        </svg>
      </div>
    </section>

    {/* Stats Bar */}
    <section className="bg-white border-y border-slate-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <s.icon className="w-7 h-7" />
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">{s.value}</p>
              <p className="text-sm sm:text-base text-slate-600 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
          Features
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Everything You Need in{' '}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            One Platform
          </span>
        </h2>
        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          A complete toolkit designed specifically for managing daily college attendance — from marking to comprehensive reporting.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`relative bg-white rounded-3xl p-8 border-2 ${f.borderColor} shadow-lg hover:shadow-2xl cursor-default transition-all duration-300 group overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${f.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`} />
            <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${f.color} group-hover:scale-110 transition-transform shadow-md`}>
              <f.icon className="w-7 h-7" />
            </div>
            <h3 className="relative font-bold text-xl text-slate-900 mb-3">{f.title}</h3>
            <p className="relative text-slate-600 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* How It Works */}
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
            Workflow
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            How It Works
          </h2>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Simple, fast, and automated workflow designed for efficiency
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflow.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="relative group"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-black text-white/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-blue-200 leading-relaxed">{item.desc}</p>
              </div>
              
              {i < workflow.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-blue-400/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
            Benefits
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Why Choose Our{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Attendance System?
            </span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Built specifically for educational institutions, our system streamlines attendance management with automation, security, and comprehensive reporting capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/cr-login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <p className="text-slate-700 font-medium leading-relaxed pt-0.5">{benefit}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
        
        <div className="relative text-center py-20 px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Streamline Your
            <br className="hidden sm:block" />
            Attendance Management?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join us today and experience effortless attendance tracking with automated notifications and comprehensive reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/cr-login"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/25 hover:scale-105 transition-all duration-300"
            >
              <UserCog className="w-6 h-6" />
              Access CR Portal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/faculty-login"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/40 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              <ShieldCheck className="w-6 h-6" />
              Coordinator Portal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Footer */}
    <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-slate-900">CR Attendance System</span>
          </div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} CR Attendance Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default Home;
