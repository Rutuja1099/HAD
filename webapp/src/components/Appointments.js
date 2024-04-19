import React from 'react'
import { useState,useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { LiaSearchSolid } from "react-icons/lia";
import { BsChevronCompactDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import webServerUrl from "../configurations/WebServer";
import HttpService from "../services/HttpService.js";

const Appointments = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [expandedIndex, setExpandedIndex] = useState(null);

    const fetchCurrentAppointmentsURL=webServerUrl+"/suhrud/doctor/viewAppointments/current";
    const fetchUpcomingAppointmentsURL=webServerUrl+"/suhrud/doctor/viewAppointments/upcoming";
    const fetchPreviousAppointmentsURL=webServerUrl+"/suhrud/doctor/viewAppointments/previous";

    const [tab, setTab] = useState('current');

    const [appointmentDetails, setAppointmentDetails] = useState([]);

    const toggleAccordion = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const slots={
        1:"10:00 AM",
        2:"11:00 AM",
        3:"12:00 PM",
        4:"1:00 PM",
        5:"2:00 PM",
        6:"3:00 PM",
        7:"4:00 PM",
        8:"5:00 PM"
    }

  //for severity apply switch statement and then classify it as low,medium, high severity
//   const appointmentDetails = [
//     {patientName:"XYZ",date:"28/01/2024",severity:"HIGH",time:"12:00PM",gender:"Female",contact:8990000598,address:"Bangalore", email:"xyz@gmail.com"},
//     {patientName:"ABC",date:"28/01/2024",severity:"LOW",time:"12:00PM",gender:"Male",contact:8990000598,address:"Bangalore", email:"abc@gmail.com"},
//     {patientName:"GHI",date:"28/01/2024",severity:"LOW",time:"12:00PM",gender:"Male",contact:8990000598,address:"Bangalore", email:"ghi@gmail.com"}
//    ];

    useEffect(() => {
        // Fetch current appointments when the component mounts
        fetchAppointments(fetchCurrentAppointmentsURL);
    }, []);

    const handleSearch = (e) => {

        var text = e.target.value;
        setSearchText(text);
        
        text = text.toString();

        // if (searchText.trim() === '') {
        //     setSearchResults([]);
        //     return;
        // }

        const regex = new RegExp(text, 'i'); // i means Case-insensitive regular expression
        const filteredResults = appointmentDetails.filter(appointment => regex.test(appointment.ptFullName));
        
        // const filteredResults = appointmentDetails.filter(appointment => appointment.patientName.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(filteredResults);

    }

    const navigateBack = () => {
        setSearchText("");
    }

    const fetchAppointments=async(fetchAppointmentsURL)=>{
        const method='GET';
        const sessionData = JSON.parse(window.localStorage.getItem('Data'));
        const bearerToken = sessionData.token;

        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // token here
            'Content-Type': 'application/json', // content type
        };

        try{
            const response=await HttpService(method,fetchAppointmentsURL,null,headers);
            console.log(response.status)
            if(response.status===200){
                const fetchedAppointments=await response.data;
                console.log(fetchedAppointments);
                setAppointmentDetails(fetchedAppointments);
            }else{
                console.log("error");
                alert("Failed to fetch all the current appointments");
            }

        }catch(error){
            console.log("error:");
            console.log(error);
        } 
    }

    const handleTabClick = async (tabName) => {
        setTab(tabName);
        if(tabName === 'current')
            await fetchAppointments(fetchCurrentAppointmentsURL);

        else if(tabName === 'upcoming')
            await fetchAppointments(fetchUpcomingAppointmentsURL);

        else
            await fetchAppointments(fetchPreviousAppointmentsURL);
    };

    const renderAppointments = (appointmentDetails)=>{
        const hasContent=appointmentDetails.length>0;
        return (
            <div>
                <div className="flex mt-4">
                    <button className={`ml-10  bg-white rounded-3xl p-4 border-2 border-gray-300 text-xl font-bold text-center ${tab === 'current' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handleTabClick('current')}>Current</button>
                    <button className={`ml-8  bg-white rounded-3xl p-4 border-2 border-gray-300 text-xl font-bold text-center ${tab === 'upcoming' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handleTabClick('upcoming')}>Upcoming</button>
                    <button className={`ml-8  bg-white rounded-3xl p-4 border-2 border-gray-300 text-xl font-bold text-center ${tab === 'previous' ? 'text-blue-500' : 'text-gray-400'}`} onClick={() => handleTabClick('previous')}>Previous</button>
                </div>

                {
                hasContent && (
                        <div className='m-4 flex-col bg-white rounded-2xl border-2 border-gray-300 overflow-y-auto'>
                        {/* Appointments List */}
                            <div className='m-4 flex items-center font-bold text-gray-400 gap-44'>
                                <div className='mr-52 ml-4'>NAME</div>
                                <div>DATE</div>
                                <div>TIME</div>                
                            </div>
                            <div className='flex-grow'>
                                {renderAppointmentAccordianList(appointmentDetails)}
                            </div>
                            <div className='flex flex-grow overflow-y-auto bg-white '>
                            </div>
                        </div>
                    )
                }
                {
                    !hasContent && (
                        <div className='m-4 flex-col bg-white rounded-2xl border-2 border-gray-300 overflow-y-auto'>
                        {/* No appointments message*/}
                            <div className='m-4 flex items-center font-bold text-gray-600 text-lg justify-center'>
                                There are no appointments for you 😊
                            </div>
                        </div>
                    )
                }
                
            </div>
        );
    }

  const renderAppointmentAccordianList = (appointmentDetails)=>{
    return (
        <div>
            {appointmentDetails.map((appointment,index)=>(
                <div key={index}
                className={`w-full p-4 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}> 
                    
                <div className="flex justify-between items-center">
            <div className="m-4 flex flex-row gap-32">
              <div className="font-bold w-72 mr-2">{appointment.ptFullName}</div>
              <div className="text-sm text-gray-600 mr-3 w-20 font-semibold">{appointment.date}</div>
              {/* <div className={`text-base font-bold ${appointment.severity === 'HIGH' ? 'text-red-500':'text-green-500'}`}>
                {appointment.severity}
              </div> */}
              <div className="text-sm text-gray-600 mr-2 w-20 font-semibold">{slots[appointment.slot]}</div>
            </div>
            <button
              className="focus:outline-none text-xl"
              onClick={() => toggleAccordion(index)} 
            >
              {expandedIndex === index ? <BsChevronUp size={25} className='mr-10'/> : <BsChevronCompactDown size={25} className='mr-10'/>}
            </button>
          </div>
          {expandedIndex === index && (
             <>
             {/* Appointment details */}
             <div className="flex flex-grow justify-between mt-2 p-6 rounded-lg bg-[#D6EEFF]">
               <div className="font-bold flex-grow text-sm">
                 Gender: <span className='text-gray-600'>{appointment.ptGender}</span>
               </div>
               {/* <div className="font-bold flex-grow text-sm">
                 Contact: <span className='text-gray-600'>{appointment.ptPhone}</span>
               </div>
               <div className="font-bold flex-grow text-sm">
                 Address: <span className='text-gray-600'>{appointment.ptAddress}</span>
               </div> */}
               <div className="font-bold flex-grow text-sm">
                 Email: <span className='text-gray-600'>{appointment.ptEmail}</span>
               </div>
             </div>
         
             {/* Buttons : here add navigate to functionality for the required buttons*/}
             <div className="flex bg-[#D6EEFF] gap-96">
               {/* <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-xl ml-10 mb-4 mr-auto text-center">
                Accept
               </button> */}
               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-xl mr-10 mb-4 ml-auto">
                More info
               </button>
             </div>
           </>
          )}

                </div>
            ))

            }
        </div>
    );
  }

  return (
    <>
        <div className='flex-1'>
            <div className="bg-gray-100 flex items-center my-5 rounded-3xl max-w-sm relative">

                {searchText && <FaArrowLeft className="ml-3 absolute text-stone-700 cursor-pointer" onClick={() => navigateBack()} />}

                <input
                    placeholder="Search"
                    className="bg-gray-100 w-full pl-10 p-2 rounded-3xl hover:bg-gray-200 hover:text-black"
                    value={searchText}
                    onChange={(e) => handleSearch(e)} />
                <LiaSearchSolid className='absolute right-0 mr-4 text-stone-700 cursor-pointer font-bold text-2xl' onClick={(e) => handleSearch(e)}/>
            </div>
            <div className='max-h-[calc(100vh-15rem)] overflow-y-auto scrollbar'>
                {searchText.trim() === '' ?
                    (renderAppointments(appointmentDetails)):(renderAppointments(searchResults))
                }
            </div>
        </div>

    </>
  )
}

export default Appointments