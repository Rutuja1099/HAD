import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import '../styles/ChatPage.css';
import { IoMdSend } from "react-icons/io";

import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore';
import { db } from "../firebase-config";


const Chat = ({selectedChat, selectedPatientId, room, user}) => {


    // const [messages, setMessages] = useState([
    //     { text: 'Hello!', time: '10:00 AM', sender: 'doctor' },
    //     { text: 'Hi thereeeeeeeeeeeeeeeeeeeeweeeeeeeeeeeeeee!', time: '10:05 AM', sender: 'patient' },
    //     { text: 'Hello!', time: '10:00 AM', sender: 'doctor' },

    //   ]);

    
    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState('');

    //refers to the collection messages in the firebase database
    const messageRef = collection(db, "chatApplication");

    useEffect(() => {
        
        //query to retrieve the chats in a room order by createdAt. orderby is enabled after you create an index
        const queryMessages = query(
            messageRef, 
            where("room", "==", room), 
            orderBy("createdAt")
        );

        //onSnapshot function allows us to listen to the changes in the database. 
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });

            setMessages(messages);
            console.log("2222222", messages);
            setNewMessage('');
            

        });
        //cleaning the useeffect which is important
        return () => unsubscribe();

    },[])



    const handleSend = async (e) => {
        e.preventDefault();

        if (newMessage.trim() === '') return;

        // const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // const updatedMessages = [...messages, { text: newMessage, time: currentTime, sender: 'doctor' }];
        
        //here user is the doctor. for  now the value is hard coded
        await addDoc(messageRef, {
            text: newMessage,
            createdAt: new Date(),
            user: user,
            room: room
        });


        // setMessages(updatedMessages);
    };

    const navigateback = () => {
        // navigation.navigate("ChatList");
    }

    return (
        
        <>
        {/* messages and search box div */}
        <div className = "flex-col">

                <div className="flex-col p-4 pb-15 max-h-[calc(100vh-14rem)] overflow-y-auto scrollbar">
                    

                    {messages.map((message, index) => {
                        
                        console.log("1111111")
                        const messageLength = message.text.length;
                        
                        const createdAtDate = new Date(message.createdAt.seconds * 1000); // Convert seconds to milliseconds
                        const timeString = createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const timeLength = timeString.length;

                        // const timeLength = message.createdAt.length;
                        const totalLength = messageLength + timeLength;
                        const width = Math.min(totalLength * 8, 600);
                        
                        return (
                        
                            <div
                                key={index} 
                                className={`flex ${message.user === user ? 'justify-end' : 'justify-start'}`}
                            >
                            
                                <div 
                                    key={index} 
                                    className={`flex-col p-4 mb-3 rounded-xl grid ${message.user === user ? 'bg-gray-200' : 'bg-blue-200'}`} 
                                    style={{ maxWidth: width }}
                                >
                                
                                    <p className="text-sm overflow-hidden overflow-ellipsis">{message.text}</p>
                                    <div className={`flex justify-end`}>
                                        <p className = "text-xs text-gray-500">{timeString}</p>
                                    </div>
                                
                                </div>
                            
                            </div>
                            
                        );
                    }
                    
                    )}

                </div>
            


        </div>


        <div className="place-self-end absolute bottom-0 left-0 w-full">
                <form 
                    onSubmit={(e) => {
                        handleSend(e);
                    }}
                    className="flex items-center border-t border-gray-300 bg-white rounded-br-3xl"
                >


                    {/* <div className = "flex items-center border-t border-gray-300 bg-white rounded-br-3xl"> */}
                        
                        <input
                            className = "flex-1 p-2 pl-8"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onSubmit={(e) => handleSend(e)}
                        />

                        <IoMdSend 
                            className="mx-4 rounded-br-3xl cursor-pointer" 
                            size={25}
                            onClick={(e) => handleSend(e)}    
                        />

                    {/* </div> */}

                </form>
                </div>
        </>
    )
}

export default Chat;
