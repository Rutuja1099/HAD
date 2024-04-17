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

    const datas=[3, 1, 9, 10, 8, 11, 7];

    const sum = datas.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const labels=Array.from({length:datas.length},(_,index)=>`Week ${index+1}`);
    
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'No. of Patients treated per Week',
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
            max: sum,
            ticks: {
              stepSize: Math.round(sum/10)
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
              <div className='w-full h-full bg-white rounded-2xl'>
                  <Line data={data} options={options} className='p-5'></Line>
              </div>
            </div>
        </>
    )
    

}


export default Dashboard;
 