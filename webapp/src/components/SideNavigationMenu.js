import React, { useState } from "react";


const SideNavigationMenu = ({open, setOpen}) => {


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

            <div className={`bg-white relative ${open ? "w-96" : "w-20"} h-full rounded-3xl`} >

            </div>
        
        </>
    );
}

export default SideNavigationMenu;