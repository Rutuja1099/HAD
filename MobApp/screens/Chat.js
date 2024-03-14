import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'


const Chat = ({route}) => {
    
    const {doctorName, doctorId} = route.params;

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

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })  
    },[])

    const [newMessage, setNewMessage] = useState('');

    const navigation=useNavigation();

    const handleSend = () => {
        if (newMessage.trim() === '') return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedMessages = [...messages, { text: newMessage, time: currentTime, sender: 'patient' }];
        
        setMessages(updatedMessages);
        setNewMessage('');
    };

    const navigateback = () => {
        navigation.navigate("ChatList");
    }

    useEffect(() => {
        // Scroll to the bottom when messages change
        scrollViewRef.current.scrollToEnd({ animated: false });
    }, [messages]);


    return (
        <View className = "flex-1 bg-white">
                
                <View className = "p-4 flex-row items-center border-b border-gray-300">
                
                    <Icon name="angle-left" size={25} onPress={navigateback}/>
                
                    <Text className = "font-bold text-lg ml-4" >{doctorName}</Text>
                
                </View>

                <ScrollView 
                    className = "flex-1 p-4 pb-20"
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
                        
                            <View key={index} className={`p-4 mb-3 rounded-lg ${message.sender === 'patient' ? 'bg-gray-200 self-end' : 'bg-blue-200 self-start'}`} style={{ maxWidth: width }}>
                                <Text>{message.text}</Text>
                                <Text className = "mt-2 text-xs text-gray-500 self-end">{message.time}</Text>
                            </View>
                            
                        );
                    }
                    
                    )}

                </ScrollView>
            
                <View className = "absolute bottom-0 left-0 right-0 flex-row items-center border-t border-gray-300 p-4 bg-white">
                    
                    <TextInput
                        className = "flex-1 border border-gray-300 rounded-full px-4 py-2 mr-4"
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
