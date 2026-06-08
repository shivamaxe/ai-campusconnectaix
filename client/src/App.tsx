import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './providers/AuthProvider';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { AnimatePresence } from 'framer-motion';
// Pages
import LandingPage from './pages/landing/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import JobBoard from './pages/placement/JobBoard';
import CareerCoach from './pages/ai/CareerCoach';
import DigitalTwin from './pages/ai/DigitalTwin';
import MockInterview from './pages/ai/MockInterview';
import Courses from './pages/academic/Courses';
import Analytics from './pages/analytics/Analytics';

// Layout
import Layout from './components/layout/Layout';

const App = () => {
  const { isLoading } = useAuthContext();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[var(--color-background)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />
          
          {/* Protected Routes inside Layout */}
          <Route path="/dashboard" element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="jobs" element={<JobBoard />} />
            <Route path="ai/coach" element={<CareerCoach />} />
            <Route path="ai/twin" element={<DigitalTwin />} />
            <Route path="ai/interview" element={<MockInterview />} />
            <Route path="courses" element={<Courses />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
