import logo from './logo.svg';
import './App.css';
import SideNavigationMenu from './components/SideNavigationMenu';
import { useState } from 'react';
import TopNavigationMenu from './components/TopNavigationMenu';
import ChatPage from './components/ChatPage';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-cyan-200 p-5 h-screen">

        <div className="flex h-full">
          
          <SideNavigationMenu
            open = {open}
            setOpen = {setOpen}
          />

          <div className='flex flex-col ml-5 w-full h-full'>
            
            <TopNavigationMenu
              open={open}
              setOpen={setOpen}
            />


            <Routes>
              
              {/* enter the path in small caps. refer to the sidenavigationmenu component, see what src i have written. write that or change them according to your choice. make corresponding changes below as well */}
              <Route path='chatpage' element={< ChatPage/>
            
            
            } />
              <Route path='/' element={<Dashboard/>} />


            </Routes>

          </div>
        </div>

    </div>
  );
}

export default App;
