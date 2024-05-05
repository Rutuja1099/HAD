import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Image, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'

import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore';
import { db } from "../configurations/firebase-config";
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';
// import { useTranslation } from "react-i18next";

import AsyncStorage from '@react-native-async-storage/async-storage';
import STORE_LANGUAGE_KEY from '../configurations/Multilingual';
import i18n from '../localization/i18n';

const Chat = ({route}) => {

    // const { t, i18n } = useTranslation();
    
    const {doctorName, doctorId, chatId, user} = route.params;
    console.log(doctorName, chatId, user);

    const scrollViewRef = useRef();

    let [fontsLoaded] = useFonts({
        Pangolin_400Regular,
    });

    //all the messages present in the firebase database according to the query will be saved here
    const [messages, setMessages] = useState([]);

    //the message which is sent by the user will be saved here
    const [newMessage, setNewMessage] = useState('');

    //connection to the firebase collection named "chatApplication"
    const messageRef = collection(db, "chatApplication");

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })  
    },[])


    const navigation=useNavigation();

    const handleSend = async () => {
        if (newMessage.trim() === '') return;

        // const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // const updatedMessages = [...messages, { text: newMessage, time: currentTime, sender: 'patient' }];
        
        //add the message sent by the user to the firebase database
        await addDoc(messageRef, {
            text: newMessage,
            createdAt: new Date(),
            user: user,
            room: chatId
        });

        // setMessages(updatedMessages);
        setNewMessage('');
    };

    const navigateback = () => {
        navigation.navigate("ChatList");
    }

    const retrieveLanguage = async () => {
        try {
            const lang = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
            if (lang) {
                // i18n.changeLanguage(lang);
                i18n.locale = lang;
            }
        } catch (error) {
            console.log("Error retrieving language:", error);
        }
    };

    useEffect(() => {

        retrieveLanguage();
        //applying the query to the firebase database as per need
        const queryMessages = query(
            messageRef, 
            where("room", "==", chatId), 
            orderBy("createdAt")
        );

        //onSnapshot function allows us to listen to the changes in the database. 
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });

            setMessages(messages);
            setNewMessage('');
            
        });

        //cleaning the useeffect which is important
        return () => unsubscribe();

    },[]);

    useEffect(() => {
        // Scroll to the bottom when messages change
        scrollViewRef.current.scrollToEnd({ animated: false });
    }, [messages]);


    return (
        <ImageBackground source={background} style={styles.imagebackground}>
        <View className = "flex-1">
                
                <View className = "p-4 mt-5 flex-row items-center justify-between border-b border-gray-300">
                
                    <Icon name="angle-left" size={25} onPress={navigateback}/>
                
                    <Text className = "font-bold text-lg ml-4" >{doctorName}</Text>

                    <Image  style={styles.tinyLogo} source={icon_suhrud}/>
                
                </View>

                <ScrollView 
                    className = "flex-1 p-4 pb-20"
                    ref={scrollViewRef}
                    contentOffset={{ y: 1000000 }}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
                >

                    {messages.map((message, index) => {

                        //code to calculate the length of the message text box
                        const messageLength = message.text.length;
                        
                        const createdAtDate = new Date(message.createdAt.seconds * 1000); // Convert seconds to milliseconds
                        const timeString = createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const timeLength = timeString.length;

                        const totalLength = messageLength + timeLength;
                        const width = Math.min(totalLength * 8, 300);
                        
                        return (
                        
                            <View key={index} className={`p-4 mb-3 rounded-lg ${message.user === user ? 'bg-gray-200 self-end' : 'bg-blue-200 self-start'}`} style={{ maxWidth: width }}>
                                <Text>{message.text}</Text>
                                <Text className = "mt-2 text-xs text-gray-500 self-end">{timeString}</Text>
                            </View>
                            
                        );
                    }
                    
                    )}

                </ScrollView>
            
                <View className = "absolute bottom-0 left-0 right-0 flex-row items-center border-t border-gray-300 p-4 bg-white">
                    
                    <TextInput
                        className = "flex-1 border border-gray-300 rounded-full px-4 py-2 mr-4"
                        placeholder={i18n.t("chat.type")} 

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
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imagebackground:{
        height:'100%',
      resizeMode:'cover',
      },
      tinyLogo: {
        width: 40,
        height: 40,
        marginTop:5,
      },
    inputText:{
      height:50,
      color:'black',
      fontFamily:'Pangolin_400Regular',
    },
    title:{
        marginTop:20,
        fontFamily:'Pangolin_400Regular',
        fontSize:30,
    },
    pickerText:{
    fontFamily:'Pangolin_400Regular',
    fontSize:20,
    },
    
  })

export default Chat;
