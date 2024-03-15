import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import '../styles/ChatPage.css';
import { IoMdSend } from "react-icons/io";


const Chat = ({selectedChat, selectedPatientId}) => {


    const [messages, setMessages] = useState([
        { text: 'Hello!', time: '10:00 AM', sender: 'doctor' },
        { text: 'Hi thereeeeeeeeeeeeeeeeeeeeweeeeeeeeeeeeeee!', time: '10:05 AM', sender: 'patient' },
        { text: 'Hello!', time: '10:00 AM', sender: 'doctor' },

      ]);


    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim() === '') return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedMessages = [...messages, { text: newMessage, time: currentTime, sender: 'doctor' }];
        
        setMessages(updatedMessages);
        setNewMessage('');
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

                        const messageLength = message.text.length;
                        const timeLength = message.time.length;
                        const totalLength = messageLength + timeLength;
                        const width = Math.min(totalLength * 8, 600);
                        
                        return (
                        
                            <div
                                key={index} 
                                className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                            >
                            
                                <div 
                                    key={index} 
                                    className={`flex-col p-4 mb-3 rounded-xl grid ${message.sender === 'doctor' ? 'bg-gray-200' : 'bg-blue-200'}`} 
                                    style={{ maxWidth: width }}
                                >
                                
                                    <p className="text-sm overflow-hidden overflow-ellipsis">{message.text}</p>
                                    <div className={`flex justify-end`}>
                                        <p className = "text-xs text-gray-500">{message.time}</p>
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
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex items-center border-t border-gray-300 bg-white rounded-br-3xl"
                >


                    {/* <div className = "flex items-center border-t border-gray-300 bg-white rounded-br-3xl"> */}
                        
                        <input
                            className = "flex-1 p-2 pl-8"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onSubmit={() => handleSend()}
                        />

                        <IoMdSend 
                            className="mx-4 rounded-br-3xl cursor-pointer" 
                            size={25}
                            onClick={() => handleSend()}    
                        />

                    {/* </div> */}

                </form>
                </div>
        </>
    )
}

export default Chat;
