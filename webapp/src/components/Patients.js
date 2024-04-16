import React from 'react';
import { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { LiaSearchSolid } from "react-icons/lia";
import  patientProfile from '../assets/patient.png';
import { Link, useNavigate } from "react-router-dom";

const Patients = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const navigate = useNavigate();
  //CurrentSession not part of table
  const patientDetails=[
    {patientName:"Vikram", currentSeverity:7, Gender:"Male", Contact:8990000598,Address:"Bangalore", Email:"viki@gmail.com", currentWeek:2, currentSession:1},
    {patientName:"Rutuja", currentSeverity:5, Gender:"Female", Contact:8990000598,Address:"Bangalore", Email:"rutuja@gmail.com", currentWeek:3, currentSession:6},
    {patientName:"Asmita", currentSeverity:7, Gender:"Female", Contact:8990000598,Address:"Bangalore", Email:"asmita@gmail.com", currentWeek:1, currentSession:3}
  ];

  const handleSearch = (e) => {

    var text = e.target.value;
    setSearchText(text);
    
    text = text.toString();

    if (searchText.trim() === '') {
        setSearchResults([]);
        return;
    }
    
    const filteredResults = patientDetails.filter(patient => patient.patientName.toLowerCase().includes(searchText.toLowerCase()));
    setSearchResults(filteredResults);

  }

  const navigateBack = () => {
    setSearchText("");
  }

  const goToPatientDetails = () => {
    navigate('/PatientDetail');
  }

  const renderPatient = (patientDetails) =>{
    return(
      <div>
        {patientDetails.map((patient,index)=>(
          <div key={index} className='flex-col'>
            <div className='flex-row mt-6 bg-[#A2E0FB] rounded-lg border-2 border-gray-400'>
              <div className='flex flex-row gap-20'>
                <img src={patientProfile} className='w-20 h-20 rounded-lg ml-40 mt-2 mb-2 border border-black' alt='Patient Profile' />
                <p className='mt-2 p-6 text-[#1E6AFF] text-xl'>
                  {patient.patientName}
                </p>
                <div className='flex-col flex-grow mt-4 mb-2 mr-40 text-[#1E6AFF]'>
                  <div> Current Severity </div>
                  <div className="w-full bg-[#FFBEBE] rounded-full h-5">
                    <div className="bg-[#FE0000] h-5 rounded-full" style={{ width: `${(patient.currentSeverity / 10) * 100}%` }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-col bg-[#FFFFFF] rounded-lg'>
              <div className='flex-row'>
                <div className='flex row gap-4 ml-10'>
                  <div className='font-bold text-black text-sm p-2'> Gender:<span className='ml-2 text-gray-400'>{patient.Gender}</span></div>             
                  <div className='font-bold text-black text-sm p-2'> Contact:<span className='ml-2 text-gray-400'>{patient.Contact}</span></div>  
                  <div className='font-bold text-black text-sm p-2'> Address:<span className='ml-2 text-gray-400'>{patient.Address}</span></div>             
                  <div className='font-bold text-black text-sm p-2'> Email:<span className='ml-2 text-gray-400'>{patient.Email}</span></div>                        
                </div>
              </div>
              <div className='flex flex-row gap-14 ml-10'>
                <div className='flex-col mt-4 mb-2'>
                  <div className='font-bold text-black text-sm'> Current Week: </div>
                  <div className="w-52 bg-[#B7D8FF] rounded-full h-5">
                    <div className="bg-[#6dabf7] h-5 rounded-full" style={{ width: `${(patient.currentWeek / 4) * 100}%` }}></div>
                  </div>
                  <div className='ml-20 text-black text-sm font-bold items-center justify-center'>{patient.currentWeek}</div>
                </div> 

                <div className='flex-col mt-4 mb-2'>
                  <div className='font-bold text-black text-sm'> CurrentSession: </div>
                  <div className="w-52 bg-[#B7D8FF] rounded-full h-5">
                    <div className="bg-[#6dabf7] h-5 rounded-full" style={{ width: `${(patient.currentSession / 10) * 100}%` }}></div>
                  </div>
                  <div className='ml-20 text-black text-sm font-bold items-center justify-center'>{patient.currentSession}</div>
                </div>  

                {/* Add the navigate to part here in order to navigate to specific patient details */}
                <button className='bg-[#B5B5B5] rounded-md mb-4 mt-4' onClick={goToPatientDetails}>
                  <p className='text-black font-bold text-sm p-4'>More Patient Details</p>
                </button>  

              </div>
            </div>
          </div>
        ))}
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
          (renderPatient(patientDetails)):
          (renderPatient(searchResults))
        }
        </div>
      </div>
      
    </>
  )
}

export default Patients