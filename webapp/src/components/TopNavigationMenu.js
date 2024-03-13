import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";

import boyImage from "../assests/boy.png";

const TopNavigationMenu = ({open, setOpen}) => {


    return (
        <>

            <div className={`bg-white relative w-full h-14 rounded-2xl mb-5`} >
                <div className="flex justify-between items-center p-2">

                    <div className="flex-1 rounded-3xl ml-8">
                        <input placeholder="Search" className="bg-gray-100 self-start pl-10 p-2 rounded-3xl w-2/4"/>

                    </div>

                    <div className="flex self-end items-center justify-between">
                        <IoNotificationsOutline size={25}/>
                        <RxDividerVertical size={40}/>
                        <p>Dr. Saurabh</p>
                        <img src={boyImage} className = "w-10 h-10 rounded-full mx-4" />

                    </div>
                </div>
            </div>
        
        </>
    );
}

export default TopNavigationMenu;