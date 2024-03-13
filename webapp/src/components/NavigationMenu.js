import React, { useState } from "react";


const NavigationMenu = () => {

    const [open, setOpen] = useState(true);

    const Menus = [
        {title: "Dashboard", src: ""},
        {title: "Patients", src: ""},
        {title: "Appointments", src: ""},        
        {title: "Messages", src: ""},
        {title: "Q/A", src: ""},
    ]

    const AccountMenus = [
        {title: "Profile", src: ""},
        {title: "Logout", src: ""},
    ]


    return (
        <>

            <div className={`bg-cyan-400 h-screen relative ${open ? "w-72" : "w-20"} `} >

            </div>        
        </>
    );
}

export default NavigationMenu;