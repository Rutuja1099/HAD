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
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
  )


const Dashboard = () => {

    const [name,setName]=useState('Viki V');
    const [gender, SetGender]=useState('Male');
    const [contact, setContact] =useState('9326494421');
    const [dob,setDob]=useState('11/12/2000')

    const datas=[3, 1, 9, 10, 8, 11, 7];
    const labels=Array.from({length:datas.length},(_,index)=>`Week ${index+1}`);

    const chat = () => {
        console.log("Chat");
        alert("Chat with patient");
      }
    
      const addContent=()=>{
        console.log("Add Content");
        alert("Add Content for Patients");
      }
    
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Week wise Severity of Patients',
            data: datas,
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
            borderColor: 'rgba(54, 162, 235)',
            borderWidth: 1,
          }
        ]
      };

      const options = {
        scales: {
          y: {
            min: 0,
            max: 25,
            ticks: {
              stepSize: 2.5
            }
          }
        },
        plugins: {
          legend: {
            display: true,
          }
        },
        maintainAspectRatio: false
      };

    return (
        <>
            <div className=' bg-blue-300 flex justify-center h-full rounded-3xl mb-4'>
                <div className='flex flex-row bg-blue-300 w-full rounded-3xl mb-4'>
                    <div className='flex flex-col w-96 items-center'>
                    <div className='flex h-80'>
                        <img className='w-64 m-5 rounded-3xl' src="https://cdn5.vectorstock.com/i/1000x1000/78/14/tiny-cute-cartoon-patient-man-character-broken-vector-26027814.jpg" alt='Patient'/>
                    </div>
                    <div className='flex items-center justify-center h-full w-full p-5 mb-5 ml-5 mr-5'>
                        <div className='flex flex-col  font-bold rounded-xl items-center justify-center bg-white w-full p-5'>
                        <h2 className='pb-1'>{name}</h2>
                        <h2 className='pb-1'>Gender: {gender}</h2>
                        <h2 className='pb-1'>Contact: {contact}</h2>
                        <h2 className='pb-1'>DOB: {dob}</h2>
                        <button 
                            className='h-10 w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl'
                            onClick={chat}  
                        >
                            Chat with Patient
                        </button>
                        </div>
                    </div>
                    </div>
                    <div className='flex flex-col flex-grow m-5'>
                    <div className='flex h-15 p-5 items-center justify-center bg-white rounded-2xl'>
                        <h2 className='text-black pr-7  font-bold'>Add Personalized Content for Patient</h2>
                        <button 
                        className='h-8 w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-xl'
                        onClick={addContent}
                        >
                        Add Content
                        </button>
                    </div>
                    <div className='mt-5 h-full mb-5 bg-white rounded-2xl'>
                        <Line data={data} options={options} className='p-5'></Line>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
    

}


export default Dashboard;
 