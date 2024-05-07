import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import HttpService from '../services/HttpService';
import webServerUrl from '../configurations/WebServer';
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

    const[sevType,setSevType] = useState([]);
    const[countSev,setCountSev]=useState([]);
    // /suhrud/doctor/doctorDashboardGraph
    const DashboardURL=webServerUrl+`/suhrud/doctor/doctorDashboardGraph`;

    useEffect(()=>{
      dashboardGraph(DashboardURL);
    },[]);

    const dashboardGraph=async(DashboardURL)=>{
      const method='GET';
      const sessionData=JSON.parse(window.localStorage.getItem('Data'));
      const bearerToken=sessionData.token;

      const headers={
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      };

      try{
        const response=await HttpService(method,DashboardURL,null,headers);
        console.log(response.status);
        if(response.status==200){
          const graphData=await response.data;
          console.log(graphData);
          setGraphData(graphData);
        }
      }catch(error){
        console.log("error:");
        console.log(error);
      }
    };

    const setGraphData=(graphData)=>{
      const sevT=graphData.map((item,index)=> `${item.severity}`);
      setSevType(sevT);
      const sevc=graphData.map(item => item.count);
      setCountSev(sevc);
    }

    // const datas=[3, 1, 9, 10, 8, 11, 7];
    const datas=countSev;

    const sum = datas.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    // const labels=Array.from({length:datas.length},(_,index)=>`Week ${index+1}`);
    const labels=sevType;

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Severity wise no. of Patients Treated',
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
 