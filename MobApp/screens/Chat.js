import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';

const Chat = () => {
    const docterName = "Dr. Saurabh";
    const scrollViewRef = useRef();

    const [messages, setMessages] = useState([
        { text: 'Hello!', time: '10:00 AM', sender: 'doctor' },
        { text: 'Hi thereeeeeeeeeeeeeeeeeeeeweeeeeeeeeeeeeee!', time: '10:05 AM', sender: 'patient' },
        { text: 'Hello!', time: '10:00 AM', sender: 'doctor' },
        { text: 'Hi thereeeeeeeeeeeeeeeeeeeeweeeeeeeeeeeeeee!', time: '10:05 AM', sender: 'patient' },
        { text: 'Hello!', time: '10:00 AM', sender: 'doctor' },
        { text: 'Hi thereeeeeeeeeeeeeeeeeeeeweeeeeeeeeeeeeee!', time: '10:05 AM', sender: 'patient' },
        { text: 'Hello!', time: '10:00 AM', sender: 'doctor' },
        { text: 'Hi thereeeeeeeeeeeeeeeeeeeeweeeeeeeeeeeeeee!', time: '10:05 AM', sender: 'patient' },
      ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim() === '') return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedMessages = [...messages, { text: newMessage, time: currentTime, sender: 'patient' }];
        
        setMessages(updatedMessages);
        setNewMessage('');
    };

    useEffect(() => {
        // Scroll to the bottom when messages change
        scrollViewRef.current.scrollToEnd({ animated: false });
    }, [messages]);


    return (
        <View style={tw`flex-1 bg-white`}>
                
                <View style={tw`p-4 flex-row items-center border-b border-gray-300`}>
                
                    <Icon name="angle-left" size={25} style={tw`mr-2 pr-3`} />
                
                    <Text style={tw`font-bold text-lg`} >{docterName}</Text>
                
                </View>

                <ScrollView 
                    style={tw`flex-1 p-4 pb-20`}
                    ref={scrollViewRef}
                    contentOffset={{ y: 1000000 }}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
                >

                    {messages.map((message, index) => {

                        const messageLength = message.text.length;
                        const timeLength = message.time.length;
                        const totalLength = messageLength + timeLength;
                        const width = Math.min(totalLength * 8, 300);
                        
                        return (
                        
                            <View key={index} style={[tw`p-4 mb-3 flex row justify-between rounded-lg`, { maxWidth: width } , message.sender === 'patient' ? tw`bg-gray-200 self-end` : tw`bg-blue-200 self-start`]}>
                                <Text>{message.text}</Text>
                                <Text style={tw`mt-2 text-xs text-gray-500`}>{message.time}</Text>
                            </View>
                            
                        );
                    }
                    
                    )}

                </ScrollView>
            
                <View style={tw`absolute bottom-0 left-0 right-0 flex-row items-center border-t border-gray-300 p-4 bg-white`}>
                    
                    <TextInput
                        style={tw`flex-1 border border-gray-300 rounded-full px-4 py-2 mr-4`}
                        placeholder="Type a message..."
                        value={newMessage}
                        onChangeText={text => setNewMessage(text)}
                        onSubmitEditing={handleSend}
                    />
                    
                    <Icon
                        name="send" // Use the send icon from FontAwesome
                        size={25}
                        color="blue"
                        onPress={handleSend} // Handle sending message on button press
                    />
                
                </View>


        </View>
    )
}

export default Chat;
