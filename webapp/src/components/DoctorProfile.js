import React,{useState, useEffect} from 'react';

import doctorProfile from '../assets/doctorprofile.jpg';
import HttpService from "../services/HttpService.js";
import webServerUrl from "../configurations/WebServer";
import { useNavigate } from "react-router-dom";
  


function DoctorProfile() {
    const [RegNo,setRegNo]=useState('');
    const [FullName, setFullName]=useState('');
    const [Phone, setPhone] =useState('');
    const [Degree, setDegree]=useState('');
    const [Experience, setExperience] =useState();
    const [Address, setAddress] =useState('');
    const [gender, setGender] =useState('');
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
          FullName && gender  && allnumeric(Phone) && Degree && drSpecialization && Experience && Address
        ); 
      }; 
      function allnumeric(uzip)
        { 
            var numbers = /^[0-9]+$/;
            if(Phone.match(numbers))
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
        
                const method='POST';
                const data={
                  drRegNo:RegNo,
                  drFullName:FullName,
                  drPhone:Phone,
                  drAddr:Address,
                  drExperience:Experience,
                  drPatientLimit:5,
                  drActivePatients:0,
                  drGender:gender,
                  drSpecialization:drSpecialization,
                  drDegree:Degree
                };
        
                
                const sessionData = JSON.parse(window.localStorage.getItem('Data'));
                const bearerToken = sessionData.token;
        
                const headers = {
                  'Authorization': `Bearer ${bearerToken}`, // Include your token here
                  'Content-Type': 'application/json', // Specify the content type if needed
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
            };
    
            try{
              const response=await HttpService(method,drGetURL,headers);
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
        setFullName(responseData.drFullname);
        setPhone(responseData.drPhone);
        setAddress(responseData.drAddr);
        setDrSpecialization(responseData.drSpecialization);
        setExperience(responseData.drExperience);
        setAddress(responseData.drAddr);
        setDegree(responseData.degree);
        setExperience(responseData.experience);
        setGender(responseData.drGender);
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
                                        <div className='flex flex-col  font-bold rounded-xl items-center justify-center bg-slate-200 w-1/2 p-5 m-2'>
                                        <h2 className='pb-1 text-xl'>Patients Limit: {drPatientLimit}</h2>
                                        </div>
                                        <div className='flex flex-col  font-bold rounded-xl items-center justify-center bg-slate-200 w-1/2 p-5'>
                                        <h2 className='pb-1 text-xl'>Active Patients Limit: {drActivePatients}</h2>
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
                                            value={FullName} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setFullName(e.target.value); 
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
                                                value={gender} onChange={(e) => setGender(e.target.value)}  name="gender">
                                                <option defaultValue={gender}>Choose your gender</option>
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
                                            value={Degree} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setDegree(e.target.value); 
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
                                            value={Experience} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setExperience(e.target.value); 
                                            }
                                            } 
                                            placeholder="Experience" 
                                        /> 
                                        </div>
                                        
                                        <input 
                                            className="rounded-xl w-100 h-12 mb-5 bg-white text-black placeholder-black p-5 border-2 border-slate-200"
                                            value={Phone} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setPhone(e.target.value); 
                                            }
                                            } 
                                            placeholder="Phone" 
                                        /> 

                                        <input 
                                            className="rounded-xl w-100 h-15 bg-white text-black placeholder-black p-5 border-2 border-slate-200"
                                            value={Address} 
                                            disabled={!isEdit}
                                            onChange={(e) => { 
                                            setAddress(e.target.value); 
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