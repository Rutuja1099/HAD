import React, { useEffect, useState } from 'react'
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';


const QnaForumAnswerModal = ({openAnswerBox, setOpenAnswerBox, questionContent, questionId}) => {
    
    const [answer, setAnswer] = useState();


    if(!openAnswerBox) return null;

    const handleAnswerSubmit = async (answer, questionId) => {
    
        const loginURL = webServerUrl+`/suhrud/forum/postAnswer?queryId=${questionId}`;

        const method='POST';

        const data = answer;
            
        try{

            const sessionData = JSON.parse(window.localStorage.getItem('Data'));
            const bearerToken = sessionData.token;

            console.log("bearer token: ", bearerToken);

            const headers = {
                'Authorization': `Bearer ${bearerToken}`, // Include your token here
                'Content-Type': 'text/plain', // Specify the content type if needed
            };
            
            const response=await HttpService(method, loginURL, data, headers);
            console.log(response.status)
            
            if(response.status===200){
                    
                console.log("Successful");
                console.log(response.data);
            }
            
            else{
                alert("reponse not 200");
            }
        }
        catch(error){
            alert(error.data);
            console.log(error);
        }
        setOpenAnswerBox(false);
    }
    
    return (

            // Deactivate confirmation modal
            <div className="p-4 rounded-md fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
                <div className='bg-white border-2 w-1/2 h-1/2 border-stone-500 flex flex-col p-10'>
                
                <p className='mb-6'>{questionContent}</p>
                
                <textarea 
                    className="h-80 border-2 p-2" 
                    placeholder='Type your answer here...'
                    onChange={(e) => setAnswer(e.target.value)}
                />
                
                <div className="flex flex-row justify-center mt-4">
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mr-2" 
                        onClick={() => { handleAnswerSubmit(answer, questionId); }}
                    >
                        Submit
                    </button>
                    
                    <button 
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md" 
                        onClick={() => { setOpenAnswerBox(false); }}
                    >
                        Cancel
                    </button>
                
                </div>
                </div>
            </div>
        
    )
};

export default QnaForumAnswerModal;