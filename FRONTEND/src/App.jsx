import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CrLogin from './pages/CrLogin';
import CrDashboard from './pages/CrDashboard';
import FacultyLogin from './pages/FacultyLogin';
import FacultyDashboard from './pages/FacultyDashboard';

const RedirectIfAuthed = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'CR' ? '/cr-dashboard' : '/faculty-dashboard'} replace />;
  }
  return children;
};

const AppRoutes = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/cr-login"
          element={
            <RedirectIfAuthed>
              <CrLogin />
            </RedirectIfAuthed>
          }
        />

        <Route
          path="/faculty-login"
          element={
            <RedirectIfAuthed>
              <FacultyLogin />
            </RedirectIfAuthed>
          }
        />

        <Route
          path="/cr-dashboard"
          element={
            <ProtectedRoute role="CR">
              <CrDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute role="Coordinator">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#fff',
            color: '#1a202c',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
