import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/ChatPage.css';
import boy from '../../assets/boy.png';


import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { IoFlagOutline } from "react-icons/io5";
import { IoFlagSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

import webServerUrl from '../../configurations/WebServer';
import HttpService from '../../services/HttpService';
import QnaForumAnswerModal from './QnaForumAnswerModal';
import DeleteModal from './DeleteModal';
import DeleteModalQuestion from './DeleteModalQuestion';

const DropdownMenu = ({ onEdit, onDelete }) => (
    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
      <ul>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={onEdit}>Edit</li>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={onDelete}>Delete</li>
      </ul>
    </div>
  );

const DropdownMenuQuestion = ({ onDelete }) => (
    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
      <ul>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={onDelete}>Delete</li>
      </ul>
    </div>
  );

const QnaForumQuestion = () => {

    const location = useLocation();
    
    const {questioniD, questionContent} = location.state;

    console.log("yohoyohoyoho", questioniD, questionContent);

    const [relatedQuestions, setRelatedQuestions] = useState([
        "I'm depressed almost every day and have been for years. My life feels empty and meaningless and almost nothing makes me truly happy. What could I do to fix it? I am on antidepressants, they help but don't do enough.",
        "I am deeply unhappy. I am always depressed about my life, and I feel like every year my life gets worse and worse. I feel like a failure. What can do?",
        "I'm worried that I'm going to be depressed forever and always struggle through life and not enjoy it. Is there no hope for me?",
        "Does life ever get better? Or am I going to be depressed forever?",
        "At what age does life seem to get better?"
    ])

    const [openAnswerBox, setOpenAnswerBox] = useState(false);
    const [openDeleteBox, setOpenDeletBox] = useState(false);
    const [openDeleteBoxQuestion, setOpenDeletBoxQuestion] = useState(false);
    
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownQuestion, setShowDropdownQuestion] = useState(false);
    
    const [flagSelected, setFlagSelected] = useState(false);
    const [flagSelectedAnswer, setFlagSelectedAnswer] = useState(false);
    const [upvoteSelected, setUpvoteSelected] = useState(false);

    const [allAnswers, setAllAnswers] = useState([]);
    const [selectedAnswerId, setSelectedAnswerId] = useState();
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const [role, setRole] = useState(false);


    const toggleDropdown = (answerId) => {
        setShowDropdownQuestion(false);
        setSelectedAnswerId(answerId);
        setShowDropdown(!showDropdown);
    };

    const toggleDropdownQuestion = (questionId) => {
        // setSelectedAnswerId(answerId);
        setShowDropdown(false);
        setShowDropdownQuestion(!showDropdownQuestion);
    };

    const handleEdit = (answer) => {
        // Logic for handling edit action
        setSelectedAnswer(answer);
        setShowDropdown(false); // Hide dropdown after performing action
        setOpenAnswerBox(true);
        
      };
    
      const handleDelete = (answer) => {
        // Logic for handling delete action
        setSelectedAnswer(answer);
        setShowDropdown(false); // Hide dropdown after performing action
        setOpenDeletBox(true);
      };

      const handleDeleteQuestion = (questionContent) => {
        setShowDropdownQuestion(false); 
        setOpenDeletBox(true);
      };


    const getAllAnswers = async (questioniD) => {
        const loginURL = webServerUrl+`/suhrud/forum/getAnswerDoctor?qId=${questioniD}`;

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
            setAllAnswers(response.data);
            
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

    };

    const flagCountChange = async (queryId) => {

        const loginURL = webServerUrl+`/suhrud/forum/flagQuestion?queryId=${queryId}`;

        const method='PUT';

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
            setFlagSelected(true);
            
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
    };

    const flagCountChangeAnswer = async (answerId) => {

        const loginURL = webServerUrl+`/suhrud/forum/flagAnswer?answerId=${answerId}`;

        const method='PUT';

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
            setFlagSelectedAnswer(true);
            
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
    };
    
    const upvoteCountChange = async (answerId) => {

        const loginURL = webServerUrl+`/suhrud/forum/upVoteAnswer?answerId=${answerId}`;

        const method='PUT';

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
            setUpvoteSelected(true);
            
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
        getAllAnswers(questioniD);

        const sessionData = JSON.parse(window.localStorage.getItem('Data'));
        setRole(sessionData.isModerator);
    }, []);

    const openAnswer = (question, questionId) => {
        setOpenAnswerBox(true);
    }


    return (
        <>
            <div className="flex h-screen">
                
                    {/* Ask & Answer Section */}
                    <div className="flex-1 mr-4 rounded-3xl max-h-[calc(100vh-7.5rem)] overflow-y-auto scrollbar">

                            {/* wraps both questions and answers for a single item */}
                            <div key={questionContent} className="bg-white p-4 border border-gray-300 mb-4 rounded-3xl">
                                
                                {/* question part */}
                                <div className='flex flex-col border-b-2 mb-3'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 className="text-lg font-semibold mb-2">{questionContent}</h2>
                                        <div className='flex flex-row'>
                                            {!flagSelected 
                                            
                                            ? 
                                            (
                                                <IoFlagOutline 
                                                className='mr-4 cursor-pointer'
                                                onClick={() => flagCountChange(questioniD)}    
                                            />
                                            ) 
                                            :
                                            (
                                                <IoFlagSharp className='mr-4'/>

                                            )}

                                            {role === true && 
                                            (
                                            <>
                                                <div className="relative">
                                                    <BsThreeDots className="cursor-pointer" onClick={() => toggleDropdownQuestion(questioniD)} />
                                                    {showDropdownQuestion &&
                                                    (
                                                        <DropdownMenuQuestion onDelete={() => handleDeleteQuestion(questionContent)} />
                                                    )}
                                                </div>

                                                <DeleteModalQuestion
                                                    openDeleteBox = {openDeleteBoxQuestion}
                                                    setOpenDeletBox = {setOpenDeletBoxQuestion}
                                                    id = {questioniD}
                                                    content = {questionContent}
                                                />
                                            </>
                                            )
                                            }
                                        </div>
                                    </div>

                                    <div className='flex flex-row justify-between mb-4'>
                                        <button 
                                            className="bg-gray-200 rounded-3xl px-5"
                                            onClick={() => openAnswer(questionContent, questioniD)}
                                        >
                                            answer
                                        </button>
                                        <p>29 March 2024</p>
                                    </div>

                                    <QnaForumAnswerModal
                                        openAnswerBox = {openAnswerBox}
                                        setOpenAnswerBox = {setOpenAnswerBox}
                                        questionContent = {questionContent}
                                        questionId = {questioniD}
                                        answerContent = ""
                                        answerId = {0}
                                        method = "POST"
                                    />
                                    
                                </div>
                                
                                <div>

                                    {allAnswers.map((answer, index) => (
                                        
                                        <div className='border-b-2 mb-5'>
                                            
                                            <div className='flex flex-row justify-between'>
                                                <div className='flex flex-row mb-3'>
                                                        
                                                    <img src ={boy} className = "w-10 h-10 rounded-full mr-2" />
                                                    <div className = "flex-1 self-center"> 
                                                        <p className = "text-2sm text-black" >{answer.doctorName}</p>
                                                    </div>

                                                </div>

                                                <div className='flex flex-row items-center justify-between'>

                                                    {!upvoteSelected 
                                            
                                                    ? 
                                                    (
                                                        <BiUpvote 
                                                        className='mr-4 cursor-pointer'
                                                        onClick={() => upvoteCountChange(answer.answerId)}    
                                                        />
                                                    ) 
                                                    :
                                                    (
                                                        <BiSolidUpvote className='mr-4'/>

                                                    )}

                                                    {!flagSelectedAnswer
                                        
                                                    ? 
                                                    (
                                                        <IoFlagOutline 
                                                        className='mr-4 cursor-pointer'
                                                        onClick={() => flagCountChangeAnswer(answer.answerId)}    
                                                    />
                                                    ) 
                                                    :
                                                    (
                                                        <IoFlagSharp className='mr-4'/>

                                                    )}
                                                    
                                                    {role === true && 
                                                    (
                                                    <>
                                                        <div className="relative">
                                                            <BsThreeDots className="cursor-pointer" onClick={() => toggleDropdown(answer.answerId)} />
                                                            {showDropdown && selectedAnswerId === answer.answerId &&
                                                            (
                                                            <DropdownMenu onEdit={() => handleEdit(answer.answerContent)} onDelete={() => handleDelete(answer.answerContent)} />
                                                            )}
                                                        </div>

                                                        <DeleteModal
                                                            openDeleteBox = {openDeleteBox}
                                                            setOpenDeletBox = {setOpenDeletBox}
                                                            id = {selectedAnswerId}
                                                            content = {selectedAnswer}
                                                        />
                                                    </>
                                                    )}    
                                                        
                                                </div>

                                                <QnaForumAnswerModal
                                                    openAnswerBox = {openAnswerBox}
                                                    setOpenAnswerBox = {setOpenAnswerBox}
                                                    questionContent = {questionContent}
                                                    questionId = {questioniD}
                                                    answerContent={selectedAnswer}
                                                    answerId = {selectedAnswerId}
                                                    method = "PUT"
                                                />

                                                
                                                
                                            </div>

                                            <p key={index}>{answer.answerContent}</p>
                                
                                
                                        </div>
                                
                                    ))}
                                
                                </div>

                        
                            </div>
                    </div>
                    
                    {/* Related Questions Section */}
                    <div className="bg-white p-4 rounded-3xl w-1/3">
                        <h2 className="text-lg font-semibold mb-4 border-b-2 border-b-black">Related Questions</h2>
                        {relatedQuestions.map((question, index) => (
                            <Link key={index} to={{pathname: `/question`, state: {question}}} className="block mb-4 bg-white hover:text-blue-700 hover:underline blur-link hover:bg-gray-50">
                                {question}
                            </Link>
                        ))}
                    </div>
            </div>
        </>
    )
    

}


export default QnaForumQuestion;
 