import React from 'react'
import { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { LiaSearchSolid } from "react-icons/lia";
import { BsChevronCompactDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";

const Appointments = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  //for severity apply switch statement and then classify it as low,medium, high severity
  const appointmentDetails = [
    {patientName:"XYZ",date:"28/01/2024",severity:"HIGH",time:"12:00PM",gender:"Female",contact:8990000598,address:"Bangalore", email:"xyz@gmail.com"},
    {patientName:"ABC",date:"28/01/2024",severity:"LOW",time:"12:00PM",gender:"Male",contact:8990000598,address:"Bangalore", email:"abc@gmail.com"},
    {patientName:"GHI",date:"28/01/2024",severity:"LOW",time:"12:00PM",gender:"Male",contact:8990000598,address:"Bangalore", email:"ghi@gmail.com"}
   ];

  const handleSearch = (e) => {

    var text = e.target.value;
    setSearchText(text);
    
    text = text.toString();

    if (searchText.trim() === '') {
        setSearchResults([]);
        return;
    }
    
    const filteredResults = appointmentDetails.filter(appointment => appointment.patientName.toLowerCase().includes(searchText.toLowerCase()));
    setSearchResults(filteredResults);

  }

  const navigateBack = () => {
    setSearchText("");
  }

  const renderAppointments = (appointmentDetails)=>{
    return (
        <div className='m-4 flex-col bg-white rounded-2xl border-2 border-gray-300 overflow-y-auto'>
            <div className='m-4 flex items-center font-bold text-gray-400 gap-40'>
                <div className='mr-60'>NAME</div>
                <div>DATE</div>
                <div>SEVERITY</div>
                <div>TIME</div>                
            </div>
            <div className='flex-grow'>
                {renderAppointmentAccordianList(appointmentDetails)}
            </div>
            <div className='flex flex-grow overflow-y-auto bg-white '>
            </div>
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
            <div className="m-4 flex flex-row gap-40">
              <div className="font-bold mr-60">{appointment.patientName}</div>
              <div className="text-sm text-gray-600 font-semibold">{appointment.date}</div>
              <div className={`text-base font-bold ${appointment.severity === 'HIGH' ? 'text-red-500':'text-green-500'}`}>
                {appointment.severity}
              </div>
              <div className="text-sm">{appointment.time}</div>
            </div>
            <button
              className="focus:outline-none text-xl"
              onClick={() => toggleAccordion(index)} 
            >
              {expandedIndex === index ? <BsChevronCompactDown size={25} className='mr-10'/> : <BsChevronUp size={25} className='mr-10'/>}
            </button>
          </div>
          {expandedIndex === index && (
             <>
             {/* Appointment details */}
             <div className="flex flex-grow justify-between mt-2 p-6 rounded-lg bg-[#D6EEFF]">
               <div className="font-bold flex-grow text-sm">
                 Gender: <span className='text-gray-600'>{appointment.gender}</span>
               </div>
               <div className="font-bold flex-grow text-sm">
                 Contact: <span className='text-gray-600'>{appointment.contact}</span>
               </div>
               <div className="font-bold flex-grow text-sm">
                 Address: <span className='text-gray-600'>{appointment.address}</span>
               </div>
               <div className="font-bold flex-grow text-sm">
                 Email: <span className='text-gray-600'>{appointment.email}</span>
               </div>
             </div>
         
             {/* Buttons : here add navigate to functionality for the required buttons*/}
             <div className="flex bg-[#D6EEFF] gap-96">
               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-xl ml-10 mb-4 mr-auto text-center">
                Accept
               </button>
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
                (renderAppointments(appointmentDetails)):
                (renderAppointments(searchResults))
                }
            </div>
        </div>

    </>
  )
}

export default Appointments