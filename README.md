<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 20px;">

  <!-- HEADER SECTION -->
  <div style="text-align: center; padding: 40px 0;">
    <h1 style="color: #0f172a; margin-bottom: 8px; font-size: 2.5em; letter-spacing: -0.02em;">CR-ATTENDANCE SYSTEM</h1>
    <p style="font-size: 1.2em; color: #64748b; font-weight: 500;">CR-Attendance System is a full-stack MERN application designed to digitize and streamline classroom attendance management. It allows Class Representatives (CRs) to mark lecture-wise attendance, upload student data via Excel, and notify absent students automatically via email. Coordinators can monitor attendance, generate reports, and track student participation efficiently through a centralized dashboard. </p>
    <p style="margin-top: 20px;">
      <a href="#" style="background-color: #10b981; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);">View Live Demo</a>
    </p>
    <p style="margin-top: 24px;">
      <img src="https://img.shields.io/badge/MERN-Stack-3b82f6?style=flat-square&logo=react" alt="MERN Stack" />
      <img src="https://img.shields.io/badge/UI-Tailwind_CSS-0ea5e9?style=flat-square&logo=tailwind-css" alt="Tailwind" />
      <img src="https://img.shields.io/badge/Status-Active-10b981?style=flat-square" alt="Status" />
    </p>
  </div>

  <hr style="border: 0; height: 1px; background-color: #e2e8f0; margin: 32px 0;">

  <!-- TABLE OF CONTENTS -->
  <h2 style="color: #0f172a; font-size: 1.5em; margin-bottom: 16px;">📑 Table of Contents</h2>
  <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 16px;">🔎 <a href="#what-is" style="color: #2563eb; text-decoration: none; font-weight: 500;">What is CR-ATTENDANCE</a></td>
      <td style="padding: 12px 16px; border-left: 1px solid #e2e8f0;">🌐 <a href="#api-routes" style="color: #2563eb; text-decoration: none; font-weight: 500;">All API routes (summary)</a></td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 16px;">👩‍👧 <a href="#who-its-for" style="color: #2563eb; text-decoration: none; font-weight: 500;">Who it's for</a></td>
      <td style="padding: 12px 16px; border-left: 1px solid #e2e8f0;">👥 <a href="#user-roles" style="color: #2563eb; text-decoration: none; font-weight: 500;">User roles and permissions</a></td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 16px;">⚕️ <a href="#problems-solved" style="color: #2563eb; text-decoration: none; font-weight: 500;">What problems it solves</a></td>
      <td style="padding: 12px 16px; border-left: 1px solid #e2e8f0;">🧠 <a href="#how-features-work" style="color: #2563eb; text-decoration: none; font-weight: 500;">How each major feature works</a></td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 16px;">✨ <a href="#features" style="color: #2563eb; text-decoration: none; font-weight: 500;">Features by module</a></td>
      <td style="padding: 12px 16px; border-left: 1px solid #e2e8f0;">🚀 <a href="#deployment" style="color: #2563eb; text-decoration: none; font-weight: 500;">Deployment</a></td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 16px;">📂 <a href="#structure" style="color: #2563eb; text-decoration: none; font-weight: 500;">Project structure</a></td>
      <td style="padding: 12px 16px; border-left: 1px solid #e2e8f0;">📦 <a href="#dependencies" style="color: #2563eb; text-decoration: none; font-weight: 500;">Package dependencies</a></td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 16px;">💻 <a href="#tech-stack" style="color: #2563eb; text-decoration: none; font-weight: 500;">Tech stack</a></td>
      <td style="padding: 12px 16px; border-left: 1px solid #e2e8f0;">📜 <a href="#scripts" style="color: #2563eb; text-decoration: none; font-weight: 500;">Available scripts</a></td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px 16px;">⚙️ <a href="#run-locally" style="color: #2563eb; text-decoration: none; font-weight: 500;">How to run locally</a></td>
      <td style="padding: 12px 16px; border-left: 1px solid #e2e8f0;">⚠️ <a href="#errors-ui" style="color: #2563eb; text-decoration: none; font-weight: 500;">Error Handling & UI</a></td>
    </tr>
    <tr>
      <td style="padding: 12px 16px;">🔑 <a href="#env-vars" style="color: #2563eb; text-decoration: none; font-weight: 500;">Environment variables</a></td>
      <td style="padding: 12px 16px; border-left: 1px solid #e2e8f0;">📬 <a href="#contact" style="color: #2563eb; text-decoration: none; font-weight: 500;">Contact</a></td>
    </tr>
  </table>

  <hr id="what-is" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 1 -->
  <h2 style="color: #0f172a;">🔎 1. What is CR-ATTENDANCE</h2>
 <p>
  The <b>CR-ATTENDANCE SYSTEM</b> is a modern, centralized digital platform designed to replace traditional manual attendance methods with an efficient, secure, and automated lecture-wise attendance workflow. Built using the MERN stack, the system enables Class Representatives (CRs) to mark attendance in real-time for each lecture, ensuring accuracy and eliminating delays or manipulation.
</p>

<p>
  The platform allows seamless management of student records through Excel uploads, dynamic subject allocation per lecture, and structured data storage for easy retrieval. It enhances communication by automatically notifying absent students via email, helping them stay informed and take immediate action if required.
</p>

<p>
  For Coordinators/Faculty, the system provides a powerful dashboard with real-time insights, including attendance trends, defaulter identification, and downloadable reports. With features like analytics, alerts, and structured reporting, the platform ensures better transparency, accountability, and decision-making in academic environments.
</p>

<hr>

<p><b>✨ Key Features:</b></p>
<ul>
  <li>Lecture-wise attendance marking with simple <b>P (Present)</b> / <b>A (Absent)</b> controls</li>
  <li>Excel-based student data upload and management</li>
  <li>Automatic email notifications to absent students</li>
  <li>Subject and lecture mapping for organized tracking</li>
  <li>Downloadable attendance reports (Excel) for each lecture</li>
  <li>Role-based dashboards for CRs and Coordinators</li>
  <li>Real-time attendance tracking and updates</li>
  <li>Analytics dashboard with attendance percentage and defaulter identification</li>
  <li>Secure authentication with predefined roles</li>
  <li>Error handling with backend logging and frontend alerts</li>
  <li>Clean, responsive, and user-friendly UI with smooth interactions</li>
</ul>


  <hr id="who-its-for" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 2 -->
<h2 style="color: #0f172a;">👩‍👧 2. Who it's for</h2>

<ul>
  <li>
    <b>Universities & Colleges:</b> Institutions aiming to digitize and modernize their attendance systems with a structured, lecture-wise workflow that reduces manual effort and improves data accuracy.
  </li>

  <li>
    <b>Class Representatives (CRs):</b> Students responsible for managing attendance who need a fast, reliable, and easy-to-use interface for marking attendance, uploading student data, and handling daily lecture records without confusion.
  </li>

  <li>
    <b>Faculty / Coordinators:</b> Academic staff who want real-time visibility into class attendance, quick access to reports, defaulter tracking, and better decision-making through organized data and analytics.
  </li>

  <li>
    <b>Students:</b> Individuals who benefit from timely absence notifications, improved transparency, and the ability to stay informed about their attendance status and take corrective actions when needed.
  </li>

  <li>
    <b>Educational Institutions Scaling Digitally:</b> Colleges transitioning towards smart campus solutions, looking for scalable, secure, and automation-driven systems to improve administrative efficiency.
  </li>
</ul>

  <hr id="problems-solved" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 3 -->
  <h2 style="color: #0f172a;">⚕️ 3. What problems it solves</h2>

<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
  <tr style="background-color: #f1f5f9;">
    <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1; color: #334155;">🚫 Problem</th>
    <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1; color: #334155;">✅ Solution</th>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">⏳ Manual attendance marking consumes valuable lecture time and creates inefficiencies.</td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">⚡ Intuitive UI with one-tap <b>P/A</b> marking enables fast, bulk attendance updates within seconds.</td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">🎭 Proxy attendance and data manipulation reduce system reliability.</td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">🔒 Time-locking and lecture-based validation prevent backdated edits and unauthorized changes.</td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">📉 No clear visibility of frequently absent students or attendance trends.</td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">📊 Smart analytics and heatmaps highlight defaulters and recurring absentees instantly.</td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">📵 Delayed communication between students, CRs, and faculty.</td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">📩 Automated real-time email notifications ensure instant alerts for absentees and updates.</td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">🗂️ Disorganized student records and difficulty in managing large datasets.</td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">📂 Structured Excel upload system centralizes and organizes student data efficiently.</td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">📄 Generating attendance reports manually is time-consuming and error-prone.</td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">📥 One-click Excel export generates accurate, lecture-wise reports instantly.</td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">🔍 Lack of transparency and accountability in attendance handling.</td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">👁️ Real-time dashboards provide complete visibility to coordinators and ensure accountability.</td>
  </tr>

</table>
  <hr id="features" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 4 -->
<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
  <tr style="background-color: #1e293b; color: white;">
    <th style="padding: 12px; text-align: left; border: 1px solid #334155;">🚀 Module</th>
    <th style="padding: 12px; text-align: left; border: 1px solid #334155;">✨ Key Features</th>
  </tr>

  <!-- CR Dashboard -->

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold; background-color: #f8fafc;">
      👨‍💼 CR Dashboard
    </td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">
      <ul>
        <li>📂 Upload and manage student records using Excel (Roll No, ID, Name, Section)</li>
        <li>⚡ Mark attendance quickly using <b>P (Present)</b> / <b>A (Absent)</b> controls</li>
        <li>📘 Add subject name dynamically for each lecture</li>
        <li>⏱️ Lecture-wise attendance marking (Lecture 3, 4, 5, 6)</li>
        <li>📊 View attendance summaries with basic visual insights</li>
        <li>📥 Export lecture-wise attendance reports (Excel with present students)</li>
        <li>🔄 Real-time updates and instant data saving</li>
        <li>📩 Trigger automatic email notifications for absent students</li>
        <li>⚠️ Get alerts for pending attendance submissions</li>
      </ul>
    </td>
  </tr>

  <!-- Coordinator Dashboard -->

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold; background-color: #f8fafc;">
      🧑‍🏫 Coordinator Dashboard
    </td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">
      <ul>
        <li>📊 View consolidated attendance reports across all lectures</li>
        <li>📅 Filter attendance by date, lecture, and subject</li>
        <li>📥 Download structured attendance reports instantly</li>
        <li>🔥 Identify defaulters using <b>Frequent Absentees Heatmap</b></li>
        <li>👁️ Monitor real-time attendance activity by CRs</li>
        <li>📈 Analyze trends and class participation patterns</li>
        <li>🔍 Quick access to student-wise attendance history</li>
      </ul>
    </td>
  </tr>

  <!-- System Core -->

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold; background-color: #f8fafc;">
      ⚙️ System Core
    </td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">
      <ul>
        <li>🔐 Secure role-based authentication (CR & Coordinator)</li>
        <li>📧 Automated email notifications using Nodemailer</li>
        <li>🗓️ Strict date and lecture validation to prevent manipulation</li>
        <li>🌐 Environment-based configuration using <code>.env</code></li>
        <li>🧠 Optimized backend with MVC architecture</li>
        <li>⚡ Fast API responses with efficient database queries</li>
        <li>🛡️ Security enhancements using Helmet & CORS</li>
        <li>🐞 Robust error handling (backend logs + frontend alerts)</li>
        <li>📦 Scalable and maintainable code structure</li>
      </ul>
    </td>
  </tr>

</table>


  <hr id="structure" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 5 -->
  <h2 style="color: #0f172a;">📂 5. Project structure</h2>
  <pre style="background-color: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; font-family: monospace;">
CR-ATTENDANCE/
├── BACKEND/
│   ├── config/          # DB Connection setup
│   ├── controllers/     # Core Business Logic 
│   │   ├── attendanceController.js
│   │   ├── authController.js
│   │   └── studentController.js
│   ├── middleware/      # Authentication & Role guards (authMiddleware.js)
│   ├── models/          # MongoDB Mongoose Schemas (User, Student, Attendance)
│   ├── routes/          # Express API Routers
│   │   ├── attendanceRoutes.js
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   ├── utils/           # Utilities
│   │   ├── emailService.js  # Dedicated Nodemailer engine
│   │   └── excelParser.js   # XLSX parser functions
│   ├── .env             # Backend Env Variables
│   └── index.js         # Backend Server Bootstrapper & CORS config
│
└── FRONTEND/
    ├── public/
    ├── src/
    │   ├── assets/      # Static assets and icons
    │   ├── components/  # Reusable UI Blocks (Navbar.jsx, ProtectedRoute.jsx, etc)
    │   ├── context/     # React Context for Global Auth State (AuthContext.jsx)
    │   ├── pages/       # Major UI views
    │   │   ├── CrDashboard.jsx
    │   │   ├── CrLogin.jsx
    │   │   ├── FacultyDashboard.jsx
    │   │   ├── FacultyLogin.jsx
    │   │   └── Home.jsx
    │   ├── App.jsx      # React-Router DOM definition & Application Shell
    │   ├── main.jsx     # Vite Mount Entry Node
    │   └── index.css    # Tailwind CSS & custom styling rules
    ├── .env             # Frontend Env Variables
    ├── netlify.toml     # Netlify Redirects logic
    ├── tailwind.config.js
    └── package.json
  </pre>

  <hr id="tech-stack" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 6 -->
  <h2 style="color: #0f172a;">💻 6. Tech stack</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="background-color: #f1f5f9;">
      <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1; color: #334155;">Layer</th>
      <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1; color: #334155;">Technologies</th>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Frontend</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">React.js, Vite, Tailwind CSS, Framer Motion, Axios, React Hot Toast</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Backend</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">Node.js, Express.js, Mongoose, JWT, Nodemailer, Multer</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Database</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">MongoDB (Atlas)</td>
    </tr>
  </table>

  <hr id="run-locally" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 7 -->
  <h2 style="color: #0f172a;">⚙️ 7. How to run locally</h2>
  <p>Follow these steps to spin up the project locally for development or validation:</p>
  <pre style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace;">
<b>1. Clone the repository</b>
git clone &lt;repository_url&gt;
cd CR-ATTENDANCE
<b>2. Setup Database & Mailing</b>
<li>Create a MongoDB Atlas cluster and acquire the MONGO_URI.</li>
<li>Ensure you have a Gmail account with "App Passwords" enabled to retrieve an EMAIL_PASS.</li>
<b>3. Setup Backend</b>
<pre> 
cd BACKEND
npm install
Create the backend .env file utilizing the template below.
npm run dev
The Backend server will start at `http://localhost:5000`
</pre>
<b>4. Setup Frontend</b>
cd ../FRONTEND
npm install
Create the frontend .env file utilizing the template below.
npm run dev
The Frontend will start up via Vite at http://localhost:5173
  </pre>

  <hr id="env-vars" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 8 -->
  <h2 style="color: #0f172a;">🔑 8. Environment variables</h2>
  <p>Create a <code>.env</code> file in both directories.</p>
  
  <p><b>Backend <code>.env</code></b> (in <code>BACKEND/</code> directory):</p>
  <pre style="background-color: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px;">
  PORT=5000
  MONGO_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.abcde.mongodb.net/test
  JWT_SECRET=super_secret_key_make_this_long_and_secure
  CR1_NAME="John Doe"
  CR1_EMAIL=john@example.com
  CR1_PASSWORD=strongpassword1
  CR2_NAME="Jane Doe"
  CR2_EMAIL=jane@example.com
  CR2_PASSWORD=strongpassword2
  CR3_NAME="Alex Smith"
  CR3_EMAIL=alex@example.com
  CR3_PASSWORD=strongpassword3
  COORD_NAME="Prof. Riddhi Chauhan"
  COORD_EMAIL=riddhi.chauhan@hietgroup.org
  COORD_PASSWORD=Coordinator@123
  EMAIL_USER=your_email@gmail.com
  EMAIL_PASS=your_gmail_app_password
  FRONTEND_URL=http://localhost:5173 
  </pre>
  <p><b>Frontend <code>.env</code></b> (in <code>FRONTEND/</code> directory):</p>
  <pre style="background-color: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px;">
  VITE_API_URL=http://localhost:5000
  </pre>
  <p style="background-color: #fef2f2; color: #991b1b; padding: 12px; border-left: 4px solid #ef4444; border-radius: 4px;">
    <b>IMPORTANT:</b> The frontend must use the backend URL exclusively from environment variables. Example in Axios: <code>const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })</code>
  </p>
  <hr id="api-routes" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 9 -->
  <h2 style="color: #0f172a;">🌐 9. All API routes (summary)</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
    <tr style="background-color: #f1f5f9;">
      <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Method</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Route</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Description</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Auth Protect</th>
    </tr>
    <!-- Authentication -->
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #059669; font-weight: bold;">POST</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/auth/login</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Authenticate User & Return Token</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Public</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #2563eb; font-weight: bold;">GET</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/auth/me</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Get currently authenticated user details</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Protected</td>
    </tr>
    <!-- Students -->
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #059669; font-weight: bold;">POST</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/students/upload</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Bulk upload students via Excel (Memory Storage)</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Protected (CR)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #2563eb; font-weight: bold;">GET</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/students/</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">List all uploaded students inside the branch</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Protected (CR/Coord)</td>
    </tr>
    <!-- Attendance -->
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #059669; font-weight: bold;">POST</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/attendance/mark</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Submit daily attendance and trigger automated emails</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Protected (CR)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #2563eb; font-weight: bold;">GET</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/attendance/</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Fetch specific date/subject attendance registries</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Protected (CR/Coord)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #2563eb; font-weight: bold;">GET</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/attendance/summary</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Fetch aggregated subject lecture completion summary</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Protected (CR/Coord)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #2563eb; font-weight: bold;">GET</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/attendance/pending</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Identify unaccounted/unmarked recent lectures</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Protected (CR)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #2563eb; font-weight: bold;">GET</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/attendance/frequent-absentees</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Fetch graphical Heatmap data (≥ 3 Days Absent)</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Protected (CR/Coord)</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><code style="color: #2563eb; font-weight: bold;">GET</code></td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">/api/attendance/export</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Export complete attendance into clean Excel Sheets</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">Protected (CR/Coord)</td>
    </tr>
  </table>

  <hr id="user-roles" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 10 -->
  <h2 style="color: #0f172a;">👥 10. User roles and permissions</h2>

<ul>
  <li>
    <b>👨‍💼 Class Representative (CR):</b>  
    Primary operator of the system responsible for managing daily attendance workflows.  
    <ul>
      <li>📂 Uploads and manages student data via Excel</li>
      <li>📝 Marks lecture-wise attendance (Lecture 3, 4, 5, 6)</li>
      <li>📘 Assigns subject names and lecture timings dynamically</li>
      <li>📥 Generates and downloads attendance reports</li>
      <li>📩 Triggers automated email notifications for absentees</li>
      <li>⚠️ Receives alerts for pending attendance submissions</li>
      <li>🔄 Can update attendance within allowed time window</li>
      <li>📊 Access to CR Dashboard with real-time data</li>
    </ul>
  </li>

  <li>
    <b>🧑‍🏫 Coordinator / Faculty:</b>  
    Supervisory role focused on monitoring, validation, and analysis.  
    <ul>
      <li>👁️ Read-only access to all attendance records</li>
      <li>📊 View class-wise and lecture-wise attendance summaries</li>
      <li>📅 Filter data by date, lecture, and subject</li>
      <li>📥 Download consolidated reports (Excel)</li>
      <li>🔥 Identify defaulters using analytics and heatmaps</li>
      <li>🔍 Monitor CR activity and attendance consistency</li>
      <li>🚫 Cannot directly modify or mark attendance (ensures integrity)</li>
    </ul>
  </li>
</ul>

<hr id="how-features-work" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

<!-- SECTION 11 -->

<h2 style="color: #0f172a;">🧠 11. How each major feature works</h2>

<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">

  <tr style="background-color: #f1f5f9;">
    <th style="padding: 12px; border: 1px solid #cbd5e1; text-align: left;">⚙️ Feature</th>
    <th style="padding: 12px; border: 1px solid #cbd5e1; text-align: left;">🔍 Working Mechanism</th>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0; vertical-align: top;">
      <b>📝 Attendance Marking</b>
    </td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">
      CR selects <b>lecture number, subject, and timing</b> through dropdown inputs. Each student is marked using <b>P/A toggle buttons</b>.  
      The system maintains state to prevent accidental resets and allows quick corrections within a valid time window.  
      Data is stored with <b>date, lecture, subject, and status</b> ensuring structured tracking.
    </td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0; vertical-align: top;">
      <b>📂 Excel Upload System</b>
    </td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">
      Student data is uploaded via Excel using <code>xlsx</code> parsing on the frontend.  
      The parsed data is sent as structured JSON to the backend where <b>Mongoose bulk operations</b> are used to efficiently insert or update records without duplication.  
      This ensures scalability and clean data management.
    </td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0; vertical-align: top;">
      <b>📩 Email Notification Engine</b>
    </td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">
      When a student is marked absent, the backend triggers <b>automated emails using Nodemailer</b>.  
      Each email is dynamically generated with student-specific details and instructions.  
      The system also supports sending <b>correction or follow-up emails</b> in case of attendance disputes, ensuring clear communication.
    </td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0; vertical-align: top;">
      <b>📥 Attendance Export</b>
    </td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">
      CR can export attendance data lecture-wise into Excel format.  
      The system filters and includes <b>only present students</b> with structured fields like date, lecture, subject, and timing.  
      This simplifies official record submission.
    </td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0; vertical-align: top;">
      <b>📊 Analytics & Defaulter Detection</b>
    </td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">
      Attendance data is aggregated to calculate <b>student-wise and lecture-wise performance</b>.  
      The system highlights <b>frequent absentees</b> using thresholds and visual indicators like heatmaps, enabling quick identification by coordinators.
    </td>
  </tr>

  <tr>
    <td style="padding: 12px; border: 1px solid #e2e8f0; vertical-align: top;">
      <b>🔐 Authentication & Security</b>
    </td>
    <td style="padding: 12px; border: 1px solid #e2e8f0;">
      Role-based authentication ensures that only authorized users (CR/Coordinator) can access their respective dashboards.  
      Sensitive configurations are stored in <code>.env</code>, and middleware like <b>Helmet & CORS</b> enhances API security.
    </td>
  </tr>

</table>

  <hr id="deployment" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 12 -->
  <h2 style="color: #0f172a;">🚀 12. Deployment</h2>
  <p>The system is highly optimized for serverless and static deployments. For full comprehensive directions, please refer to the dedicated <a href="DEPLOYMENT.md" style="color: #2563eb; font-weight: bold; text-decoration: none;">DEPLOYMENT.md</a> file.</p>
  <hr id="dependencies" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">
  <!-- SECTION 13 -->
  <h2 style="color: #0f172a;">📦 13. Package dependencies</h2>
  <ul style="column-count: 2; column-gap: 40px;">
    <li><b>Express</b> - API Framework</li>
    <li><b>Mongoose</b> - MongoDB ODM</li>
    <li><b>JsonWebToken</b> - Auth</li>
    <li><b>Nodemailer</b> - Emails</li>
    <li><b>Cors & Dotenv</b> - Config</li>
    <li><b>React & Vite</b> - Frontend</li>
    <li><b>Tailwind CSS 4</b> - Styling</li>
    <li><b>Framer Motion</b> - UI Animations</li>
    <li><b>Lucide React</b> - Icons</li>
    <li><b>XLSX</b> - Excel exports</li>
  </ul>

  <hr id="scripts" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 14 -->
  <h2 style="color: #0f172a;">📜 14. Available scripts</h2>
  <pre style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace;">
<b>Frontend</b>
<li>  npm run dev     - Starts local Vite server</li>
<li>  npm run build   - Transpiles production asset bundle</li>
<li>  npm run preview - Previews production build</li>

<b>Backend</b>
<li>  npm run dev     - Starts Nodemon development lifecycle</li>
<li>  npm start       - Starts production server</li>
  </pre>

  <hr id="errors-ui" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- ERROR HANDLING & UI ENHANCEMENT -->
  <h2 style="color: #0f172a;">⚠️ Handling Errors & Codebase Polish</h2>
  <h3 style="color: #1e293b; margin-top: 20px;">Error Handling Mechanics:</h3>
  <ul>
    <li><b>Backend Exceptions:</b> Managed heavily using try/catch blocks. Errors log exhaustively to the Server Console (accessible via Render/Vercel dashboards) but safely return mapped 500 status messages to retain API security.</li>
    <li><b>Frontend Intercepts:</b> HTTP errors are caught seamlessly by Axios and displayed instantly to the user utilizing <b>React Hot Toast</b> (alert notifications). Hard console logs exist for verbose browser-level debugging.</li>
  </ul>
  <h3 style="color: #1e293b; margin-top: 20px;">UI Enhancements & Clean Architecture:</h3>
  <ul>
    <li><b>Aesthetics:</b> Built strictly mobile-responsive, prioritizing fluid Card Layouts. Ample Tailwind spacing generates clean breathing room.</li>
    <li><b>Smoothness:</b> Incorporating Framer Motion adds structural transitions reducing cognitive load during page shifts.</li>
    <li><b>Codebase Cleanup:</b> The underlying system emphasizes strict removal of unused files and optimized imports avoiding bloated chunks and keeping deployment incredibly compact.</li>
  </ul>
  <hr id="contact" style="border: 0; height: 1px; background-color: #e2e8f0; margin: 40px 0;">

  <!-- SECTION 15 -->
<h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
  📬 15. Contact
</h2>

<div style="margin-top: 20px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: linear-gradient(135deg, #f8fafc, #eef2ff); box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.3s ease;">

  <p style="font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 10px;">
    👨‍💻 Aman Gupta
  </p>

  <p style="color: #475569; margin-bottom: 15px;">
    Passionate Full Stack Developer focused on building scalable, real-world applications using modern technologies like MERN, AI integrations, and cloud services.
  </p>

  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0; width: 30%; font-weight: bold; background-color: #f1f5f9;">
        🌐 GitHub
      </td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">
        <a href="https://github.com/amangupta9454" style="color: #2563eb; text-decoration: none; font-weight: 500;">
          github.com/amangupta9454
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; background-color: #f1f5f9;">
        📧 Email
      </td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">
        <a href="mailto:ag0567688@gmail.com" style="color: #2563eb; text-decoration: none; font-weight: 500;">
          ag0567688@gmail.com
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; background-color: #f1f5f9;">
        💬 Availability
      </td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">
        Open for collaborations, freelance projects, and innovative ideas 🚀
      </td>
    </tr>
  </table>

  <p style="margin-top: 15px; font-size: 14px; color: #64748b;">
    💡 Feel free to reach out for feedback, suggestions, or contributions. Let's build something amazing together!
  </p>

</div>

