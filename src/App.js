import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/shared/components/Sidebar';
// import Home from './components/shared/Home';
// import Myspace from './components/home/MySpace';
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
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
        {/* Sidebar layout route with Outlet for nested routes */}
        <Route path="/" element={<Sidebar />}>
          {/* Render MySpace at "/home/my-space" */}
          {/* <Route path="home/myspace" index element={<MySpace />} /> */}
          <Route path="home/myspace" element={<MySpace />} />
          
          {/* Other routes */}
          <Route path="dashboard" element={<ComingSoon />} />
          <Route path="calendar" element={<ComingSoon />} />
          <Route path="settings" element={<ComingSoon />} />
          <Route path='/leavetracker/*' element={<LeaveTracker/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
