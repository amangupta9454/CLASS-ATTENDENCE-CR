const nodemailer = require('nodemailer');

const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

/**
 * Send absence notification email to a student.
 */
const sendAbsenceEmail = async ({ studentName, studentEmail, date, lectureNumber, subjectName }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Attendance System" <${process.env.EMAIL_USER}>`,
    to: studentEmail,
    subject: `Absence Notification – ${subjectName} (Lecture ${lectureNumber})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #1e3a5f; padding: 24px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">Attendance Notification</h2>
        </div>
        <div style="padding: 28px 32px;">
          <p style="font-size: 16px; color: #333;">Dear <strong>${studentName}</strong>,</p>
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            You have been marked <strong style="color: #e53e3e;">Absent</strong> for the following lecture:
          </p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr style="background: #f7fafc;">
              <td style="padding: 10px 14px; font-weight: 600; color: #444; border: 1px solid #e2e8f0;">Date</td>
              <td style="padding: 10px 14px; color: #333; border: 1px solid #e2e8f0;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: 600; color: #444; border: 1px solid #e2e8f0;">Lecture</td>
              <td style="padding: 10px 14px; color: #333; border: 1px solid #e2e8f0;">Lecture ${lectureNumber}</td>
            </tr>
            <tr style="background: #f7fafc;">
              <td style="padding: 10px 14px; font-weight: 600; color: #444; border: 1px solid #e2e8f0;">Subject</td>
              <td style="padding: 10px 14px; color: #333; border: 1px solid #e2e8f0;">${subjectName}</td>
            </tr>
          </table>
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            If this is a mistake, please contact your <strong>Class Coordinator</strong>.<br/>
            If you believe your attendance was incorrectly recorded, please contact your <strong>CR</strong>.
          </p>
          <p style="font-size: 13px; color: #999; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 16px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Send presence correction email to a student.
 */
const sendPresentCorrectionEmail = async ({ studentName, studentEmail, date, lectureNumber, subjectName }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Attendance System" <${process.env.EMAIL_USER}>`,
    to: studentEmail,
    subject: `Attendance Correction – ${subjectName} (Lecture ${lectureNumber})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #38a169; padding: 24px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">Attendance Correction Notification</h2>
        </div>
        <div style="padding: 28px 32px;">
          <p style="font-size: 16px; color: #333;">Dear <strong>${studentName}</strong>,</p>
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            Your attendance has been updated. You are now marked <strong style="color: #38a169;">Present</strong> for the following lecture:
          </p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr style="background: #f7fafc;">
              <td style="padding: 10px 14px; font-weight: 600; color: #444; border: 1px solid #e2e8f0;">Date</td>
              <td style="padding: 10px 14px; color: #333; border: 1px solid #e2e8f0;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: 600; color: #444; border: 1px solid #e2e8f0;">Lecture</td>
              <td style="padding: 10px 14px; color: #333; border: 1px solid #e2e8f0;">Lecture ${lectureNumber}</td>
            </tr>
            <tr style="background: #f7fafc;">
              <td style="padding: 10px 14px; font-weight: 600; color: #444; border: 1px solid #e2e8f0;">Subject</td>
              <td style="padding: 10px 14px; color: #333; border: 1px solid #e2e8f0;">${subjectName}</td>
            </tr>
          </table>
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            This correction was made by your CR. If you have any further doubts, please coordinate with your class representative.
          </p>
          <p style="font-size: 13px; color: #999; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 16px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendAbsenceEmail, sendPresentCorrectionEmail };
