import React from 'react'
import { useState } from 'react';
import webServerUrl from '../../configurations/WebServer';
import HttpService from '../../services/HttpService';


const DoctorDeleteModal = ({showDeleteConfirm, selectedDoctor, setShowDeleteConfirm, setSelectedDoctor, doctorId, setReloadPage, reloadPage}) => {
    
    if(!showDeleteConfirm) return null;


    const handleDeleteConfirm = async () => {
    
            const loginURL = webServerUrl+"/suhrud/deleteDoctor";
    
            const method='DELETE';
            
            // const data = {
            //     doctorID: doctorId
            // };
    
            const data = doctorId;
                
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
            }
            catch(error){
                alert(error.data);
                console.log(error);
            }
            setShowDeleteConfirm(false);
            setReloadPage(!reloadPage);
        }
    
    return (

            // Deactivate confirmation modal
            <div className="p-4 rounded-md fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
                <div className='bg-white px-28 py-16 border-2 border-stone-500'>
                <p>Are you sure you want to Delete {selectedDoctor?.doctorName}?</p>
                <div className="flex justify-center mt-4">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mr-2" onClick={() => handleDeleteConfirm()}>
                    Yes
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md" onClick={() => { setShowDeleteConfirm(false); }}>
                    No
                    </button>
                </div>
                </div>
            </div>
        
    )
};

export default DoctorDeleteModal;