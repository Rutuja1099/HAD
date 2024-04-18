import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { LiaSearchSolid } from "react-icons/lia";
import { BsChevronCompactDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import DoctorStatusModal from './DoctorStatusModal';
import DoctorDeleteModal from './DoctorDeleteModal';
import webServerUrl from '../../configurations/WebServer';
import HttpService from '../../services/HttpService';

const DoctorStatus = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [allDoctorDetails, setAlldoctorDetails] = useState([]);

  const toggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const doctorDetails = [
    {doctorName: "Saurabh", title: "Doctor", gender: "male", email: "sau@gmail.com", isDeactivated: "false"},
    {doctorName: "Asmita", title: "Doctor", gender: "female", email: "asmi@gmail.com", isDeactivated: "true"},
    {doctorName: "Ifrah", title: "Doctor", gender: "female", email: "ifrah@gmail.com", isDeactivated: "false"},
    {doctorName: "Aman", title: "Doctor", gender: "male" , email: "aman@gmail.com", isDeactivated: "false"},
    {doctorName: "Rushi", title: "Doctor", gender: "male" , email: "rushi@gmail.com", isDeactivated: "false"},
]


const getAllDoctors = async () => {
      
  const loginURL = webServerUrl+"/suhrud/getAllDoctorsInfo";

  const method='GET';
  
  const data=null;
      
  try{

    const sessionData = JSON.parse(window.localStorage.getItem('Data'));
    const bearerToken = sessionData.token;

      console.log("bearer token: ", bearerToken);

      const headers = {
        'Authorization': `Bearer ${bearerToken}`, // Include your token here
        'Content-Type': 'application/json', // Specify the content type if needed
      };
      
      const response=await HttpService(method,loginURL,data, headers);
      console.log(response.status)
      
      if(response.status===200){
            
        console.log("Successful");
        console.log(response.data);
        
        setAlldoctorDetails(response.data);
        console.log("hihiihiihhi", allDoctorDetails);
    
        try{
            console.log("from storage");

        }catch(error){
            console.log("error while saving data");
            console.log(error);
        }
      }
      
      else{
          alert(response.data);

      }
    }catch(error){
        alert(error.data);
        console.log(error);
    }

}


  useEffect(() => {

    getAllDoctors();
  },[])

  const handleSearch = (e) => {

    var text = e.target.value;
    setSearchText(text);
    
    text = text.toString();

    if (searchText.trim() === '') {
        setSearchResults([]);
        return;
    }
    
    const regex = new RegExp(text, 'i'); // i means Case-insensitive regular expression
    const filteredResults = allDoctorDetails.filter(doctor => regex.test(doctor.doctorName));

    setSearchResults(filteredResults);

  }

  const navigateBack = () => {
    setSearchText("");
  }

  const openDeactivateBox = (doctor) => {
    setShowDeactivateConfirm(true);
    setSelectedDoctor(doctor);
  }

  const openDeleteBox = (doctor) => {
    setShowDeleteConfirm(true);
    setSelectedDoctor(doctor);
  }

  const handleDeactivateConfirm = () => {
    // Add logic here to deactivate the selected doctor
    setShowDeactivateConfirm(false);
  };

  const handleDeleteConfirm = () => {
    // Add logic here to delete the selected doctor
    setShowDeleteConfirm(false);
  };


  const renderAppointments = (allDoctorDetails)=>{
    return (
        <div className='m-4 flex-col bg-white rounded-2xl border-2 border-gray-300 overflow-y-auto'>
            <div className='m-4 flex items-center font-bold text-gray-400 gap-40'>
                <div className='mr-60'>NAME</div>
                <div>Active Patients</div>
                <div>Status</div>
            </div>
            <div className='flex-grow'>
                {renderAppointmentAccordianList(allDoctorDetails)}
            </div>
            <div className='flex flex-grow overflow-y-auto bg-white '>
            </div>
        </div>
    );
  }

  const renderAppointmentAccordianList = (allDoctorDetails)=>{
    return (
        <div>
            {allDoctorDetails.map((doctor,index)=>(
                <div key={index}
                className={`w-full p-4 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}> 
                    
                <div className="flex justify-between items-center">
            <div className="m-4 flex flex-row gap-40">
              <div className="font-bold w-80">{doctor.drFullName}</div>
              <div className="text-sm text-gray-600 font-semibold mr-12">{doctor.drActivePatients}</div>
              <div className="text-sm">{doctor.isDeactivated === true ? "Deactivated": "Activated"}</div>
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
                 Gender: <span className='text-gray-600'>{doctor.drGender}</span>
               </div>
               <div className="font-bold flex-grow text-sm">
                 Contact: <span className='text-gray-600'>{doctor.drPhone}</span>
               </div>
               <div className="font-bold flex-grow text-sm">
                 Address: <span className='text-gray-600'>{doctor.drAddr}</span>
               </div>
               <div className="font-bold flex-grow text-sm">
                 Email: <span className='text-gray-600'>{doctor.drId}</span>
               </div>
             </div>
         
             {/* Buttons : here add navigate to functionality for the required buttons*/}
             <div className="flex bg-[#D6EEFF] gap-96">
               <button 
                    className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-xl ml-10 mb-4 mr-auto text-center ${doctor.isDeactivated === true ? "bg-green-500" : "bg-red-500"}`}
                    onClick={() => openDeactivateBox(doctor)}
                >
                {doctor.isDeactivated === true ? "Activate": "Deactivate"}
               </button>
               <button 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-xl mr-10 mb-4 ml-auto"
                    onClick={() => openDeleteBox(doctor)}
                >
                Delete
               </button>
             </div>

             <DoctorStatusModal
                showDeactivateConfirm = {showDeactivateConfirm}
                selectedDoctor = {selectedDoctor}
                setShowDeactivateConfirm = {setShowDeactivateConfirm}
                setSelectedDoctor = {setSelectedDoctor}
                doctorId = {doctor.drId}
            />

            <DoctorDeleteModal
                showDeleteConfirm = {showDeleteConfirm}
                selectedDoctor = {selectedDoctor}
                setShowDeleteConfirm = {setShowDeleteConfirm}
                setSelectedDoctor = {setSelectedDoctor}
                doctorId = {doctor.drId}
            />

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
                (renderAppointments(allDoctorDetails)):
                (renderAppointments(searchResults))
                }
            </div>



        </div>

    </>
  )
}

export default DoctorStatus;