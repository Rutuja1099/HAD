import './App.css';
import SideNavigationMenu from './components/SideNavigationMenu';
import { useState } from 'react';
import TopNavigationMenu from './components/TopNavigationMenu';
import ChatPage from './components/ChatPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import DoctorOnboarding from './components/DoctorOnboarding';
import SetPassword from './components/SetPassword';

function App() {

  const [open, setOpen] = useState(false);
  const location = useLocation();


  return (
    <div className="bg-cyan-100 p-5 h-screen">

        <div className={`${location.pathname !== '/login' ? "ml-5 flex h-full" : "h-full"} `}>
          
        {location.pathname !== '/login' && (
          <SideNavigationMenu
            open = {open}
            setOpen = {setOpen}
          />
        )}

          <div className={` ${location.pathname !== '/login' ? "ml-5 flex flex-col w-full h-full" : "h-full"} `}>
            
          {location.pathname !== '/login' && (
            <TopNavigationMenu
              open={open}
              setOpen={setOpen}
            />
          )}


            <Routes>
              
              {/* enter the path in small caps. refer to the sidenavigationmenu component, see what src i have written. write that or change them according to your choice. make corresponding changes below as well */}
              <Route path='chatpage' element={< ChatPage/>
            
            
            } />

            <Route path='patients' element={<Patients/>} />

            <Route path='appointments' element={<Appointments/>} />

            <Route path='/doctorOnboarding' element={<DoctorOnboarding/>} />
            {/* <Route path='/' element={<Dashboard/>} /> */}
              <Route path='login' element={<Login/>} />
              <Route path='setPassword' element={<SetPassword/>} />

            </Routes>

          </div>
        </div>

    </div>
  );
}

export default App;
