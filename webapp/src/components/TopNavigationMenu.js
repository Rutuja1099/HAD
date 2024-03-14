import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";

import logoImage from "../assets/favicon.png";

const TopNavigationMenu = ({open, setOpen}) => {


    return (
        <>

            <div className={`bg-white relative w-full h-14 rounded-2xl mb-5`} >
                <div className="flex justify-between items-center p-2">
                    <div>
                        {!open && <img src={logoImage} className = "w-10 h-10 rounded-full ml-8 cursor-pointer"/> }
                    </div>

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
                </div>
            </div>
        
        </>
    );
}

export default TopNavigationMenu;