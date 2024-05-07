import React,{useState, useEffect} from 'react';

import doctorProfile from '../assets/doctorprofile.jpg';
import HttpService from "../services/HttpService.js";
import webServerUrl from "../configurations/WebServer";
import { useNavigate } from "react-router-dom";
  


function DoctorProfile() {
    const [RegNo,setRegNo]=useState('');
    const [drFullName, setDrFullName]=useState('');
    const [drPhone, setDrPhone] =useState('');
    const [drDegree, setDrDegree]=useState('');
    const [drExperience, setDrExperience] =useState();
    const [drAddress, setDrAddress] =useState('');
    const [drGender, setDrGender] =useState('');
    const [drSpecialization, setDrSpecialization] =useState('');
    const [drPatientLimit, setDrPatientLimit] =useState();
    const [drActivePatients, setDrActivePatients] =useState();
    const [isEdit, setIsEdit] = useState(false);
    
      const handleEdit=()=>{
        console.log("Handles Edit");
        setIsEdit(true);
      }

      useEffect(()=>{
        getInfo();
      },[]);

    

      const getIsFormValid = () => { 
        return ( 
          drFullName && drGender  && allnumeric(drPhone) && drDegree && drSpecialization && drExperience && drAddress
        ); 
      }; 
      function allnumeric(uzip)
        { 
            var numbers = /^[0-9]+$/;
            if(drPhone.match(numbers))
            {
                return true;
            }
            else
            {
                alert("Please Enter All Numeric 10 digit no");
            }
        }
    
        const handleSubmit = async(e) => { 
            if(getIsFormValid())
            {
                e.preventDefault(); 
        
                const drRegistrationURL= webServerUrl+"/suhrud/doctor/editDoctor";
        
                const method='PUT';
                const data={
                  drFullName:drFullName,
                  drPhone:drPhone,
                  drAddr:drAddress,
                  drExperience:drExperience,
                  drPatientLimit:drPatientLimit,
                  drActivePatients:drActivePatients,
                  drGender:drGender,
                  drSpecialization:drSpecialization,
                  drDegree:drDegree
                };
        
                
                const sessionData = JSON.parse(window.localStorage.getItem('Data'));
                const bearerToken = sessionData.token;
        
                const headers = {
                  'Authorization': `Bearer ${bearerToken}`, 
                  'Content-Type': 'application/json',
                  'ngrok-skip-browser-warning': 'true',
                };
        
                try{
                  const response=await HttpService(method,drRegistrationURL,data,headers);
                  console.log(response.status)
                  if(response.status===200){
                      console.log("Successful");
                      console.log(response.data);
                      alert("Doctor Profile edited");
                  }
                  else{
                      console.log("else part error:");
                      alert(response.data.message);
                  }
                }catch(error){
                  console.log("catch block of error");
                  alert(error.data.message);                   
              } 
            }
            else
            {
              alert("All fields are mandatory. Please provide valid input for them");
                e.preventDefault(); 
        
            }
            
          }; 
        
      const getInfo = async() => { 
       
    
            const drGetURL= webServerUrl+"/suhrud/doctor/doctorInfo";
    
            const method='GET';
    
            const sessionData = JSON.parse(window.localStorage.getItem('Data'));
            const bearerToken = sessionData.token;
    
            const headers = {
              'Authorization': `Bearer ${bearerToken}`,     
              'Content-Type': 'application/json', // Specify the content type if needed
              'ngrok-skip-browser-warning': 'true'
            };
    
            try{
              const response=await HttpService(method,drGetURL,null,headers);
              console.log(response.status)
              if(response.status===200){
                const responseData=await response.data;
                console.log(responseData);
                setData(responseData);
              }
              else{
                  console.log("Error occured in fetching profile");
                  alert(response.data.message);
              }
            }catch(error){
              console.log("catch block of error");
              alert(error.data.message);                   
          } 
        
        }
        

      const setData=(responseData)=>{
        setRegNo(responseData.drRegNo);
        setDrFullName(responseData.drFullName);
        setDrPhone(responseData.drPhone);
        setDrAddress(responseData.drAddr);
        setDrSpecialization(responseData.drSpecialization);
        setDrExperience(responseData.drExperience);
        setDrDegree(responseData.drDegree);
        setDrExperience(responseData.drExperience);
        setDrGender(responseData.drGender);
        setDrPatientLimit(responseData.drPatientLimit);
        setDrActivePatients(responseData.drActivePatients);
      }
    



  return (
    <> 
        <div className='flex justify-center h-70 rounded-3xl mb-4'>
            <div className='flex flex-row bg-white w-full rounded-3xl mb-4'>
                
                <div className='flex flex-col flex-grow m-5'>
                    <div className='flex h-full p-5 items-center justify-center bg-slate-100 rounded-2xl'>
                    
                        <div className='flex flex-row bg-white w-full rounded-3xl mb-4 justify-items-center'>
                            <div className='flex flex-col w-1/2 items-center'>
                                <div className='flex h-85'>
                                    <img className='w-full m-5 rounded-3xl' src={doctorProfile} alt='Doctor'/>
                                </div>
                                <div className='flex items-center justify-center h-full w-full p-5 mb-5 ml-5 mr-5'>
                                    <div className='flex flex-col  font-bold rounded-xl items-center justify-center bg-white w-full p-5'>
                                        <h2 className='pb-1 text-2xl'>Registration number : {RegNo}</h2>
                                        <div className='flex flex-row  font-bold rounded-xl items-center justify-center bg-slate-200 w-2/3 p-5 m-2'>
            
                                        <h2 className='pb-1 text-xl'>Patient Limit: </h2>
                                        <input 
                                            className="rounded-xl w-1/3 h-10 mb-5 bg-slate200 text-black placeholder-black p-5 border-2 border-slate-200 mt-5 ml-2"
                                            value={drPatientLimit} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setDrPatientLimit(e.target.value); 
                                            }
                                            } 
                                            placeholder="Patient Limit" 
                                        />
                                        </div>
                                        <div className='flex flex-row  font-bold rounded-xl items-center justify-center bg-slate-200 w-2/3 p-5'>
                                        <h2 className='pb-1 text-xl'>Active Patients:</h2>
                                        <input 
                                            className="rounded-xl w-1/3 h-10 mb-5 bg-slate200 text-black placeholder-black p-5 border-2 border-slate-200 mt-5 ml-2"
                                            value={drActivePatients} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setDrActivePatients(e.target.value); 
                                            }
                                            } 
                                            placeholder="Active Patients" 
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col m-5 flex-grow'>
                                <div className='flex  flex-col h-full p-5 m-10 items-start justify-center bg-slate-100 rounded-2xl'>
                                    <div className='flex flex-row w-full mt-5 justify-center items-start'>
                                        <h2 className='text-black pr-7  font-bold text-3xl'>Personal details</h2>
                                        <button 
                                        className='h-8 w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl'
                                        onClick={handleEdit}
                                        >
                                        Edit Details
                                        </button>
                                    </div> 
                                    <div className="flex flex-col w-full justify-items-center pt-10 pl-10 pr-10"> 
                                        <input 
                                            className="rounded-xl w-100 h-12 mb-5 bg-white text-black placeholder-black p-5 border-2 border-slate-200"
                                            value={drFullName} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setDrFullName(e.target.value); 
                                            }
                                            } 
                                            placeholder="Full Name" 
                                        />
                                        <div className="w-1/2">
                                            <div className="relative flex flex-col"> 
                                            <select
                                        className="form-select appearance-auto block w-30 h-16 px-5 py-2.5
                                    text-base font-normal text-black bg-white bg-clip-padding bg-no-repeat border -2 border-solid border-slate-200 
                                    rounded-xl transition ease-in-out m-0 focus:text-black focus:bg-white focus:border-slate-300 focus:outline-none"
                                        aria-label="Default select example"
                                                disabled={!isEdit}
                                                value={drGender} onChange={(e) => setDrGender(e.target.value)}  name="gender">
                                                <option defaultValue={drGender}>Choose your gender</option>
                                                <option value="Female">Female</option> 
                                                <option value="Male">Male</option> 
                                                <option value="Other">Other</option> 
                                                </select>
                                            </div>
                                        </div>
                                       
                                        <div className='flex flex-row'>
                                        <div className='w-1/2 pt-5'> 
                                        <input 
                                            className="rounded-xl w-100 h-12  bg-white text-black placeholder-black p-5 border-2 border-slate-200"
                                            value={drDegree} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setDrDegree(e.target.value); 
                                            }
                                            } 
                                            placeholder="Degree" 
                                        /> 
                                        </div>
                                        <div className='w-1/2 p-5'>
                                        <input 
                                            className="rounded-xl w-100 h-12  bg-white text-black placeholder-black p-5 border-2 border-slate-200"
                                            value={drSpecialization} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setDrSpecialization(e.target.value); 
                                            }
                                            } 
                                            placeholder="Doctor Specialization" 
                                        /> 
                                        </div>
                                        
                                        </div>
                                        <div className='w-1/2 pt-5'> 
                                        <input 
                                            className="rounded-xl w-100 h-12 mb-5 bg-white text-black placeholder-black p-5 border-2 border-slate-200"
                                            value={drExperience} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setDrExperience(e.target.value); 
                                            }
                                            } 
                                            placeholder="Experience" 
                                        /> 
                                        </div>
                                        
                                        <input 
                                            className="rounded-xl w-100 h-12 mb-5 bg-white text-black placeholder-black p-5 border-2 border-slate-200"
                                            value={drPhone} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setDrPhone(e.target.value); 
                                            }
                                            } 
                                            placeholder="Phone" 
                                        /> 

                                        <input 
                                            className="rounded-xl w-100 h-15 bg-white text-black placeholder-black p-5 border-2 border-slate-200"
                                            value={drAddress} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setDrAddress(e.target.value); 
                                            }
                                            } 
                                            placeholder="Address" 
                                        /> 
                                        <div className='flex justify-items-center items-center'>
                                        <button 
                                        className='h-12 w-40 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl'
                                        onClick={handleSubmit}
                                        >
                                        Submit
                                        </button>
                                        </div>
                                    </div>     
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </>
)
}

export default DoctorProfile