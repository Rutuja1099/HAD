import React, { useEffect, useState } from 'react';
import profilePhoto from '../assets/boy.png';
import Scrollbars from 'rc-scrollbars';
import '../styles/ChatPage.css';
import { FaArrowLeft } from "react-icons/fa";
import Chat from './Chat';
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';


const ChatPage = () => {

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPatientName, setSelectedPatientName] = useState("");
    const [selectedPatientId, setSelectedPatientId] = useState("");

    // const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState(null);

    //logged in user information
    const [user, setUser] = useState("");
    
    const [allPatientsInfo, setAllPatientsInfo] = useState([]);
    const [drId, setDrId] = useState();


    // const [chats, setChats] = useState([
    //     { id: 1, name: 'Saurabh', profilePhoto:  profilePhoto},
    //     { id: 2, name: 'Asmita', profilePhoto: profilePhoto },
    //     { id: 3, name: 'Vikram', profilePhoto: profilePhoto },
    //     { id: 4, name: 'Ifrah', profilePhoto: profilePhoto },
    //     { id: 5, name: 'Rutuja', profilePhoto: profilePhoto },
    //     { id: 6, name: 'Rutuja', profilePhoto: profilePhoto },
    //     { id: 7, name: 'Rutuja', profilePhoto: profilePhoto },
    //     { id: 8, name: 'Rutuja', profilePhoto: profilePhoto },
    //     { id: 9, name: 'Rutuja', profilePhoto: profilePhoto },

    // ]);

    // const [allDoctorInfo, setAllDoctorInfo] = useState([
    //     { id: 1, name: 'Saurabh', profilePhoto: profilePhoto },
    //     { id: 2, name: 'Sauvay', profilePhoto: profilePhoto },
    //     { id: 3, name: 'Asmita', profilePhoto: profilePhoto },
    //     { id: 4, name: 'Asthitha', profilePhoto: profilePhoto },
    // ]);

    // const getDrId = async () => {
        

    // }

    const getAllPatients = async () => {


        let method='GET';
        let sessionData = JSON.parse(window.localStorage.getItem('Data'));
        let bearerToken = sessionData.token;
        setUser(sessionData.username);

        let URL = webServerUrl + "/suhrud/doctor/getDrId";

        let headers = {
            'Authorization': `Bearer ${bearerToken}`, // token here
            'Content-Type': 'application/json', // content type
        };

        let drId_response;

        try{
            const response=await HttpService(method,URL,null,headers);
            console.log(response.status)

            if(response.status===200){
                const patientProgress=await response.data;
                console.log(patientProgress);

                setDrId(response.data);
                drId_response = response.data;
            }else{
                console.log("error");
                alert("Failed to fetch the patient records");
            }

        }catch(error){
            console.log("error:");
            console.log(error);
        }



        method='GET';
        sessionData = JSON.parse(window.localStorage.getItem('Data'));
        bearerToken = sessionData.token;

        URL = webServerUrl + `/suhrud/chat/getMappedPatients?drId=${drId_response}`;
        console.log("URLLLL", URL);

        headers = {
            'Authorization': `Bearer ${bearerToken}`, // token here
            'Content-Type': 'application/json', // content type
        };

        try{
            const response=await HttpService(method,URL,null,headers);
            console.log(response.status)

            if(response.status===200){
                console.log("yohoyohoyoho",response.data);

                setAllPatientsInfo(response.data);
            }else{
                console.log("error");
                alert("Failed to fetch the patient records");
            }

        }catch(error){
            console.log("error:");
            console.log(error);
        } 
    }
    
    const handleSearch = (e) => {

        var text = e.target.value;
        setSearchText(text);
        
        text = text.toString();

        // if (searchText.trim() === '') {
        //     setSearchResults([]);
        //     return;
        // }
        
        const regex = new RegExp(text, 'i'); // i means Case-insensitive regular expression
        const filteredResults = allPatientsInfo.filter(doctor => regex.test(doctor.ptName));
        // const filteredResults = allDoctorInfo.filter(doctor => doctor.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(filteredResults);

    }

    const enterChat = (patientName, patientId, chatId) => {

        setSearchText("");
        setSelectedPatientName(patientName);
        setRoom(chatId);
        console.log(room);
    }

    const navigateBack = () => {
        setSearchText("");
    }

    useEffect (() => {
        // getDrId();
        getAllPatients(drId);
    },[]);

    return (
        <>

            {/* main full box */}
            <div className="h-full rounded-3xl flex">

                {/* side panel full box*/}
                <div className="p-5 w-80 h-full rounded-l-3xl border-r-2 border-stone-600">
                    
            
                    <p className="text-xl font-semibold">Chats</p>

                    <div className="bg-gray-100 flex items-center my-5 rounded-3xl">

                        {searchText && <FaArrowLeft className="ml-3 absolute text-stone-700 cursor-pointer" onClick={() => navigateBack()}/> }

                        <input 
                            placeholder="Search" 
                            className="bg-gray-100 w-full pl-10 p-2 rounded-3xl hover:bg-gray-200 hover:text-black"
                            value={searchText}
                            onChange={(e) => handleSearch(e)}
                        />

                    </div>


                    <div className="max-h-[calc(100vh-18rem)] overflow-y-auto scrollbar">
                    
                    {searchText.trim() === '' ?
                    
                    (
                        
                        allPatientsInfo.map((item, index) => (
                            <div
                                key={index}
                                className={`p-3 flex item-centered hover:bg-slate-100 rounded-3xl cursor-pointer ${item.ptName === selectedPatientName ? 'bg-slate-100' : ''}`} 
                                onClick={() => enterChat(item.ptName, item.ptId, item.chatId)}
                            >

                                <img src ={profilePhoto } className = "w-10 h-10 rounded-full mr-4" />
                                <div className = "flex-1 self-center"> 
                                    <p className = "text-2sm text-black" >{item.ptName}</p>
                                </div>
                                            
                            </div>
                                ))

                    )
                    
                    :

                    (
                        searchResults.map((item, index) => (
                            <div
                                key={index}
                                className={`p-3 flex item-centered hover:bg-slate-100 rounded-3xl ${item.ptName === selectedPatientName ? 'bg-slate-100' : ''}`}
                                onClick={() => enterChat(item.name, item.id, item.chatId)}
                            >

                                <img src ={item.profilePhoto } className = "w-10 h-10 rounded-full mr-4" />
                                <div className = "flex-1 self-center"> 
                                    <p className = "text-2sm text-black" >{item.name}</p>
                                </div>
                                            
                            </div>
                        
                        ))

                    )
                    }

                    </div>

                </div>

                
                {/* chat */}
                
                {selectedPatientName &&
                <div className="h-full flex-grow rounded-r-3xl relative">
                    
                    <div className="flex h-16 items-center border-b-2 border-stone-950/75">
                        
                        <img src={profilePhoto} className="w-12 h-12 ml-5"/>
                        <p className="text-black ml-5 cursor-pointer">{selectedPatientName}</p>
                    
                    </div>

                    <Chat 
                        selectedPatientName = {selectedPatientName}
                        selectedPatientId = {selectedPatientId}
                        room = {room}
                        user = {user}
                    />
                </div>
                }

                    

            </div>
        </>
    )
    

}


export default ChatPage;
 