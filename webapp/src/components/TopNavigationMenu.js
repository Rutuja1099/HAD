import React, { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";


import logoImage from "../assets/favicon.png";

const TopNavigationMenu = ({open, setOpen}) => {

    const [role, setRole] = useState("");
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const data = JSON.parse(window.localStorage.getItem('Data'));
        setRole(data.role);
    },[]); 

    const navigateOnboarding = () => {
        navigate("doctorOnboarding");
    };

    const navigateStatus = () => {
        navigate("doctorStatus");
    };

    return (
        <>

            <div className={`bg-white relative w-full h-14 rounded-2xl mb-5`} >
                <div className="flex justify-between items-center p-2">
                    <div>
                        {!open && <img src={logoImage} className = "w-10 h-10 rounded-full ml-8 cursor-pointer"/> }
                    </div>

                    {role === "admin" ? (
                        <div className="flex items-center w-full">

                            {/* two buttons */}
                            <div className="rounded-3xl ml-12 self-start">
                                
                                <button 
                                    className={`hover:bg-cyan-100 rounded-3xl px-4 py-2 ${location.pathname === "/doctorOnboarding" ? "bg-cyan-200 text-black font-semibold" : ""}`}
                                    onClick={() => navigateOnboarding()}
                                >
                                    Doctor Onboarding
                                </button>
                                <button 
                                    className={`hover:bg-cyan-100 rounded-3xl px-4 py-2 ml-4 ${location.pathname === "/doctorStatus" ? "bg-cyan-200 text-black font-semibold" : ""}`}
                                    onClick={() => navigateStatus()}
                                >
                                    Doctor Status
                                </button>
                            
                            </div>
                            
                            {/* profile ame and profile image */}
                            <div className="flex self-end items-center justify-between">
                                <p className="font-semibold">Admin</p>
                                <img src={logoImage} className = "w-10 h-10 rounded-full mx-4 cursor-pointer" />

                            </div>
                        </div>
                    )
                    
                    :

                    (
                        <>
                        <div className="flex-1 rounded-3xl ml-8">
                        <input placeholder="Search" className="bg-gray-100 self-start pl-10 p-2 rounded-3xl w-2/4 hover:bg-gray-200 hover:text-black"/>

                        </div>

                        <div className="flex self-end items-center justify-between">
                            <IoNotificationsOutline 
                                size={25} 
                                className="cursor-pointer"/>

                            <RxDividerVertical size={40}/>
                            <p>Dr. Saurabh</p>
                            <img src={logoImage} className = "w-10 h-10 rounded-full mx-4 cursor-pointer" />

                        </div>
                        </>
                    )
                
                    }

                    
                </div>
            </div>
        
        </>
    );
}

export default TopNavigationMenu;