import React from 'react'
import { useState } from 'react';



const DoctorDeleteModal = ({showDeleteConfirm, selectedDoctor, setShowDeleteConfirm, setSelectedDoctor}) => {
    
    if(!showDeleteConfirm) return null;


    const handleDeleteConfirm = () => {
        
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