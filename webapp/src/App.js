import './App.css';
//components import
import SideNavigationMenu from './components/SideNavigationMenu';
import { useState, useEffect } from 'react';
import TopNavigationMenu from './components/TopNavigationMenu';
import ChatPage from './components/ChatPage';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import QnaForum from './components/QnaForum';
import DoctorOnboarding from './components/DoctorOnboarding';
import SetPassword from './components/SetPassword';
import ForgotPasswordMail from './components/ForgotPasswordMail';
import QnaForumQuestion from './components/QnaForumQuestion';

function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Track initial loading

  const navigate = useNavigate();
  // Check if there is any localStorage entry on initial render and page refresh
  useEffect(() => {
    const data = window.localStorage.getItem('Data');
    if (data) {
      setAuthenticated(true);
    }
    setLoading(false); // Set loading to false after initial render
  },);

  // // If loading, show loading indicator
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // If not authenticated and not on the login page, redirect to login
  if (!authenticated && location.pathname !== '/login'&& location.pathname !== '/setPassword' && location.pathname !== '/forgotPasswordMail') {
    return <Navigate to="/login" />;

  }

  return (
    <div className="bg-cyan-100 p-5 h-screen">
      <div className={`${location.pathname !== '/login' ? "ml-5 flex h-full" : "h-full"} `}>
        {(location.pathname !== '/login' && location.pathname !== '/setPassword' && location.pathname !== '/forgotPasswordMail') && (
          <SideNavigationMenu
            open={open}
            setOpen={setOpen}
          />
        )}
        <div className={` ${location.pathname !== '/login' ? "ml-5 flex flex-col w-full h-full" : "h-full"} `}>
          {(location.pathname !== '/login' && location.pathname !== '/setPassword' && location.pathname !== '/forgotPasswordMail') && (
            <TopNavigationMenu
              open={open}
              setOpen={setOpen}
            />
          )}
          <Routes>
            <Route path='chatpage' element={< ChatPage />} />
            <Route path='patients' element={<Patients />} />
            <Route path='appointments' element={<Appointments />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='login' element={<Login />} />
            <Route path='forgotPasswordMail' element={<ForgotPasswordMail />} />
            <Route path='setPassword' element={<SetPassword />} />
            <Route path='/doctorOnboarding' element={<DoctorOnboarding />} />
            <Route path='/qnaForum' element={<QnaForumQuestion />} />
            <Route path='/qnaForumQuestion' element={<QnaForum />} />
          </Routes>
        </div>
      </div>
  </div>

  );
}

export default App;
