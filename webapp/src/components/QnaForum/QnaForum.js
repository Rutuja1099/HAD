import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/ChatPage.css';
import boy from '../../assets/boy.png';

import { BiUpvote } from "react-icons/bi";
import { IoFlagOutline } from "react-icons/io5";
import { IoFlagSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

import webServerUrl from '../../configurations/WebServer';
import HttpService from '../../services/HttpService';
import QnaForumAnswerModal from './QnaForumAnswerModal';

const QnaForum = () => {

    const navigate = useNavigate();

    // const [questions, setQuestions] = useState({
    //     "Question1":["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."],
    //     "Question2":["answer1", "answer2"],
    //     "Question3":["answer1", "answer2"],
    //     "Question4":["answer1", "answer2"],
    //     "Question5":["answer1", "answer2"],
    //     "Question6":["answer1", "answer2"],
    //     "Question7":["answer1", "answer2"],   
    //     "Question8":["answer1", "answer2"],   
    //     "Question9":["answer1", "answer2"],       
    // })

    const [allQuestions, setAllQuestions] = useState([]);
    const [allFlagQuestions,setAllFlagQuestions] = useState([]);
    const [openAnswerBox, setOpenAnswerBox] = useState(false);

    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [selectedQuestionId, setSelectedQuestionId] = useState(0);
    
    const [flagSelected, setFlagSelected] = useState(false);


    const getAllQuestions = async () => {

        const loginURL = webServerUrl+"/suhrud/forum/getAllQuestion";

        const method='GET';

        const data=null;
        
        try{

        const sessionData = JSON.parse(window.localStorage.getItem('Data'));
        const bearerToken = sessionData.token;

        console.log("bearer token: ", bearerToken);

        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
        };
        
        const response=await HttpService(method,loginURL,data, headers);
        console.log(response.status)
        
        if(response.status===200){
                
            console.log("Successful");
            console.log(response.data);

            setAllQuestions(response.data);
            
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

    const getAllFlagQuestions = async () => {

        const loginURL = webServerUrl+"/suhrud/forum/getTrendingQuestions";

        const method='GET';

        const data=null;
        
        try{

        const sessionData = JSON.parse(window.localStorage.getItem('Data'));
        const bearerToken = sessionData.token;

        console.log("bearer token: ", bearerToken);

        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
        };
        
        const response= await HttpService(method,loginURL,data, headers);
        console.log(response.status)
        
        if(response.status===200){
                
            console.log("Successful");
            console.log(response.data);

            setAllFlagQuestions(response.data);
            
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
        getAllQuestions();
        getAllFlagQuestions();
    },[]);


    const openAnswer = (question, questionId) => {
        setOpenAnswerBox(true);
        setSelectedQuestion(question);
        setSelectedQuestionId(questionId);
    }

    const navigateToQuestion = (questioniD, questionContent) => {
        navigate("/qnaForumQuestion", { state: {questioniD: questioniD, questionContent: questionContent}});
    }

    return (
        <>
            <div className="flex h-screen">
                
                    {/* Ask & Answer Section */}
                    <div className="flex-1 mr-4 rounded-3xl max-h-[calc(100vh-7.5rem)] overflow-y-auto scrollbar">
                        {Array.isArray(allQuestions) && allQuestions.map((question, index) => (
                        
                            // wraps both questions and answers for a single item
                            <div key={index} className="bg-white p-4 border border-gray-300 mb-4 rounded-3xl">
                                
                                {/* question part */}
                                <div className='flex flex-col border-b-2 mb-3'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 className="text-lg font-semibold mb-2">{question.queryContent}</h2>
                                        
                                        {/* <IoFlagOutline 
                                            className='mr-4'
                                            onClick={() => flagCountChange(question.queryId)}    
                                        /> */}
                                        {/* <IoFlagSharp className='mr-2'/> */}
                                    </div>

                                    <div className='flex flex-row justify-between mb-4'>
                                        <button 
                                            className="bg-gray-200 rounded-3xl px-5"
                                            onClick={() => openAnswer(question.queryContent, question.queryId)}
                                        >
                                            answer
                                        </button>
                                        <p>29 March 2024</p>
                                    </div>
                                    
                                    <QnaForumAnswerModal
                                        openAnswerBox = {openAnswerBox}
                                        setOpenAnswerBox = {setOpenAnswerBox}
                                        questionContent = {selectedQuestion}
                                        questionId = {selectedQuestionId}
                                        answerContent=""
                                        answerId = {0}
                                        method = "POST"

                                    />

                                </div>

                                <div className='flex flex-row'>
                                    <p 
                                        className="cursor-pointer hover:text-blue-600 hover:underline underline-offset-2" 
                                        onClick={() => navigateToQuestion(question.queryId, question.queryContent)}
                                    >
                                        {question.countAns} replies
                                    </p>

                                    {/* <p>**</p>
                                    <p>3 flags</p> */}
                                </div>
                                
                                {/* <div>

                                    {answers.map((answer, index) => (
                                        
                                        <div className='border-b-2 mb-4'>
                                            
                                            <div className='flex flex-row justify-between'>

                                                <div className='flex flex-row'>
                                                        
                                                    <img src ={boy} className = "w-10 h-10 rounded-full mr-2" />
                                                    <div className = "flex-1 self-center"> 
                                                        <p className = "text-2sm text-black" >Saurabh</p>
                                                    </div>

                                                </div>

                                                <div className='flex flex-row items-center justify-between'>
                                                    <BiUpvote className='mr-4'/>
                                                    <IoFlagOutline className='mr-4'/>
                                                    <IoFlagSharp className='mr-2'/>
                                                    <BsThreeDots className='mr-4'/>

                                                </div>
                                            </div>

                                            <p key={index}>
                                                
                                                {answer.slice(0, 100)}...            
                                            </p>

                                            <p 
                                                    className="cursor-pointer text-blue-600 hover:underline underline-offset-2" 
                                                    onClick={() => navigateToQuestion(question , answers)}
                                                >
                                                    read more
                                                    
                                                </p>
                                
                                        </div>
                                
                                    ))}
                                
                                </div> */}

                        
                            </div>
                        ))}
                    </div>
                    
                    {/* Trending Questions Section */}
                    <div className="bg-white p-4 rounded-3xl w-1/3">
                        <h2 className="text-lg font-semibold mb-4 border-b-2 border-b-black">Trending Questions</h2>
                        {allFlagQuestions.map((question, index) => (
                            <p key={index} onClick={() => navigateToQuestion(question.queryId, question.queryContent)} className="block mb-4 bg-white hover:text-blue-700 hover:underline blur-link hover:bg-gray-50">
                                {question.queryContent}
                            </p>
                        ))}
                    </div>
            </div>
        </>
    )
    

}


export default QnaForum;
 