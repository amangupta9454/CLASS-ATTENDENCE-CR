# DEPLOYMENT GUIDE

This document provides a comprehensive, step-by-step guide on how to deploy the **CR-ATTENDANCE SYSTEM** to modern cloud hosting platforms like **Vercel** and **Render**.

---

## 1. FRONTEND DEPLOYMENT (Vercel)

Vercel is the recommended platform for deploying the React (Vite) frontend.

### Steps:
1. Push your entire codebase to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
3. Import your GitHub repository.
4. **Configure Project Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** Set this to `FRONTEND` (if deploying a monorepo, or leave empty if the standalone frontend repo is used).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. **Add Environment Variables:**
   - Key: `VITE_BACKEND_URL`
   - Value: `https://your-deployed-backend-url.onrender.com` *(You will get this URL in Step 2)*
6. Click **Deploy**.

---

## 2. BACKEND DEPLOYMENT (Render / Railway / Vercel)

Render is highly recommended for hosting the Node/Express backend seamlessly.

### Steps for Render:
1. Log in to [Render](https://render.com/).
2. Click **New** > **Web Service**.
3. Connect your GitHub repository.
4. **Configure Service:**
   - **Root Directory:** `BACKEND`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` (Make sure your `package.json` has `"start": "node index.js"`)
5. **Add Environment Variables:**
   - `PORT`: `5000` (Optional, Render assigns its own port)
   - `MONGO_URI`: `mongodb+srv://...` (Your MongoDB Atlas connection string)
   - `JWT_SECRET`: A long secure random string.
   - `EMAIL_USER`: Your Gmail address.
   - `EMAIL_PASS`: Your Gmail App Password.
   - `FRONTEND_URL`: `https://your-deployed-frontend.vercel.app` (Crucial for CORS).
6. Click **Create Web Service**. Wait for the logs to say `Server running`.
7. **Enable CORS:** Ensure your backend `index.js` CORS settings accept requests from your exact `FRONTEND_URL`.

---

## 3. IMPORTANT: REPLACE LOCALHOST URLS

Before finalizing your deployment, you absolutely **must** replace all `http://localhost` references:
- **In the Frontend:** Do not hardcode API requests to `http://localhost:5000`. Use `import.meta.env.VITE_BACKEND_URL` universally via the Axios instance.
- **In the Backend:** Set your `FRONTEND_URL` env variable to match your Vercel URL so CORS allows traffic.

---

## 4. MONGODB SETUP

For production, you must use a remote database cluster.

### Steps:
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (the Free tier is fine).
3. Under **Database Access**, create a new user with a secure password.
4. Under **Network Access**, Add an IP Address and select **Allow Access From Anywhere** (`0.0.0.0/0`).
5. Go back to your Cluster, click **Connect** > **Connect your application**, and copy the connection string.
6. Use this string as your `MONGO_URI` in the Backend environment variables.

---

## 5. EMAIL SETUP (Nodemailer)

To allow the backend to send automated absence warnings, you must configure Google App Passwords.

### Steps:
1. Go to your Google Account Settings.
2. Select **Security**.
3. Enable **2-Step Verification** (required).
4. Search for **App passwords**.
5. Create a new App Password (name it "Attendance App" or similar).
6. Copy the generated 16-character password and use it as `EMAIL_PASS` in your backend `.env`. Use your Gmail address as `EMAIL_USER`.

---

## 6. COMMON ERRORS

### CORS Error
- **Symptom:** `Blocked by CORS policy` in the browser console.
- **Fix:** Ensure the `FRONTEND_URL` in the backend environment exactly matches your deployed Vercel URL (e.g., `https://my-app.vercel.app` — no trailing slashes).

### API Not Found (404)
- **Symptom:** API requests return 404.
- **Fix:** Ensure your Frontend's `VITE_BACKEND_URL` is pointing to the exact Render URL. Make sure it doesn't accidentally have `/api` added twice. 

### Environment Variable Not Working
- **Symptom:** Undefined values internally.
- **Fix:** Remember that frontend env variables must be prefixed with `VITE_` (e.g., `VITE_BACKEND_URL`) to be exposed to the browser. Backend variables do not need this prefix.

---

## 7. FINAL CHECKLIST

Before handing off the system to end-users, ensure the following are validated:

- [ ] **Frontend Connected:** The deployed Vercel application successfully hits the deployed Render API.
- [ ] **APIs Working:** You can login, fetch records, and submit data without 500 errors.
- [ ] **Emails Working:** The Nodemailer setup triggers successful warning emails for "Absent" students.
- [ ] **Codebase Polished:** Unused layout components, messy inline scripts, and excessive console logs have been removed for a clean production build.
- [ ] **Security:** MongoDB Network access is secured, and JWT Secrets are long and complex.
