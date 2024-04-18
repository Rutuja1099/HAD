import React,{useState} from 'react';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
Tooltip,
Legend,
LineElement,
PointElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import doctorProfile from '../assets/doctorprofile.jpg';
  
ChartJS.register(
CategoryScale,
LinearScale,
LineElement,
PointElement,
Tooltip,
Legend
)



function DoctorProfile() {
    const [RegNo,setRegNo]=useState('DR10234');
    const [FullName, setFullName]=useState('Viki');
    const [Phone, setPhone] =useState('9326494421');
    const [Degree, setDegree]=useState('MBBS');
    const [Experience, setExperience] =useState('2');
    const [email, setEmail]=useState('asm@gmail.com');
    const [Address, setAddress] =useState('9326494421');
    const [gender, setGender] =useState('M');
    const [limit, setLimit] =useState(10);
    
      const addContent=()=>{
        console.log("Add Content");
        alert("Add Content for Patients");
      }
    



  return (
    <> 
        <div className=' bg-blue-300 flex justify-center h-full rounded-3xl mb-4'>
            <div className='flex flex-row bg-white w-full rounded-3xl mb-4'>
                
                <div className='flex flex-col flex-grow m-5'>
                    <div className='flex h-full p-5 items-center justify-center bg-slate-100 rounded-2xl'>
                    
                        <div className='flex flex-row bg-white w-full rounded-3xl mb-4'>
                        <div className='flex flex-col w-1/2 items-center'>
                            <div className='flex h-full'>
                                <img className='w-full m-5 rounded-3xl' src={doctorProfile} alt='Doctor'/>
                            </div>
                            <div className='flex items-center justify-center h-full w-full p-5 mb-5 ml-5 mr-5'>
                                <div className='flex flex-col  font-bold rounded-xl items-center justify-center bg-white w-full p-5'>
                                    <h2 className='pb-1 text-2xl'>Registration number : {RegNo}</h2>
                                    <div className='flex flex-col  font-bold rounded-xl items-center justify-center bg-slate-200 w-1/2 p-5 m-2'>
                                    <h2 className='pb-1 text-xl'>Patients Limit: {limit}</h2>
                                    </div>
                                    <div className='flex flex-col  font-bold rounded-xl items-center justify-center bg-slate-200 w-1/2 p-5'>
                                    <h2 className='pb-1 text-xl'>Patients Limit: {limit}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col m-5 flex-grow'>
                        <div className='flex  flex-col h-full p-5 m-20 items-start justify-center bg-slate-100 rounded-2xl'>
                            <div className='flex flex-row w-full justify-center items-start mb-32'>
                                <h2 className='text-black pr-7  font-bold text-3xl'>Personal details</h2>
                                <button 
                                className='h-8 w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl'
                                onClick={addContent}
                                >
                                Edit Details
                                </button>
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