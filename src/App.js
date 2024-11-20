import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/shared/components/Sidebar';
import MySpace from './components/home/tabs/MySpace';
import LeaveTracker from './components/leavetracker/LeaveTracker';
import Login from './core/components/Login';
import ForgotPassword from './core/components/ForgotPassword';
import ResetPassword from './core/components/ResetPassword';

const ComingSoon = () => {
  return (
    <div>
      <h3>Coming Soon</h3>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Sidebar Layout for Protected Routes */}
        <Route element={<Sidebar />}>
          <Route path="myspace" element={<MySpace />} />
          <Route path="dashboard" element={<ComingSoon />} />
          <Route path="calendar" element={<ComingSoon />} />
          <Route path="settings" element={<ComingSoon />} />
          <Route path="leavetracker/*" element={<LeaveTracker />} />
        </Route>
        {/* <Route path="leavetracker/*" element={<LeaveTracker />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
