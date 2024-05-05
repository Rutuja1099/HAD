import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image, Modal, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import NavigationBar from "../components/NavigationBar";
import { Icon } from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';
import STORE_LANGUAGE_KEY from '../configurations/Multilingual';

import {image1} from "../assets";
// import { useTranslation } from "react-i18next";

import i18n from '../localization/i18n';

const ChatList = () => {

    // const { t, i18n } = useTranslation();

    //the text in the search bar
    const [searchText, setSearchText] = useState('');

    //results accroding to the search text will be saved here
    const [searchResults, setSearchResults] = useState([]);

    //selected chat
    const [selectedDoctorName, setSelectedDoctorName] = useState("");
    const [selectedDoctorId, setSelectedDoctorId] = useState("");

    //room for chat which is required by firebase
    const [room, setRoom] = useState("");

    //logged in user information
    const [user, setUser] = useState("");

    // //all the people with whom the user had a chat with
    // const [chats, setChats] = useState([
    //     { id: 1, name: 'Saurabh', profilePhoto: 'assets/boy.png' },
    //     { id: 2, name: 'Asmita', profilePhoto: 'assets/boy.png' },
    //     { id: 3, name: 'Vikram', profilePhoto: 'assets/boy.png' },
    //     { id: 4, name: 'Ifrah', profilePhoto: 'assets/boy.png' },
    //     { id: 5, name: 'Rutuja', profilePhoto: 'assets/boy.png' },
    // ]);

    // //all doctors present in the database for search functionality
    // const [allDoctorInfo, setAllDoctorInfo] = useState([
    //     { id: 1, name: 'Saurabh', profilePhoto: 'assets/boy.png' },
    //     { id: 2, name: 'Sauvay', profilePhoto: 'assets/boy.png' },
    //     { id: 3, name: 'Asmita', profilePhoto: 'assets/boy.png' },
    //     { id: 4, name: 'Asthitha', profilePhoto: 'assets/boy.png' },
    // ]);

    const [allDoctorsInfo, setAllDoctorsInfo] = useState([]);
    const [ptId, setPtId] = useState();


    const navigation=useNavigation();
    
    useLayoutEffect(() => {
            navigation.setOptions({
            headerShown: false,
        })
    },[])


    // const getPtId = async () => {
        

    // }

    const getAllDoctors = async (drId) => {


        let method='GET';
        let sessionData = await AsyncStorage.getItem('patientData');
        let data=JSON.parse(sessionData);
        let bearerToken = data.token;
        setUser(data.ptUsername);
        let URL = webServerUrl + "/suhrud/patient/getPtId";

        let headers = {
            'Authorization': `Bearer ${bearerToken}`, // token here
            'Content-Type': 'application/json', // content type
        };

        let ptId_response;

        try{
            const response=await HttpService(method,URL,null,headers);
            console.log(response.status)

            if(response.status===200){
                const patientProgress=await response.data;
                console.log(patientProgress);

                ptId_response = response.data;
            }else{
                console.log("error");
                alert("Failed to fetch the patient records");
            }

        }catch(error){
            console.log("error:");
            console.log(error);
        }




        method='GET';
        sessionData = await AsyncStorage.getItem('patientData')
        data=JSON.parse(sessionData);
        bearerToken = data.token;

        URL = webServerUrl + `/suhrud/chat/getMappedDoctors?pId=${ptId_response}`;
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

                setAllDoctorsInfo(response.data);
            }else{
                console.log("error");
                alert("Failed to fetch the patient records");
            }

        }catch(error){
            console.log("error:");
            console.log(error);
        } 
    }


    const handleSearch = (text) => {

        setSearchText(text);
        
        text = text.toString();

        if (searchText.trim() === '') {
            setSearchResults([]);
            return;
        }

        const regex = new RegExp(text, 'i'); // i means Case-insensitive regular expression
        const filteredResults = allDoctorsInfo.filter(doctor => regex.test(doctor.name));
        // const filteredResults = allDoctorInfo.filter(doctor => doctor.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(filteredResults);

    }

    const enterChat = (doctorName, doctorId, chatId) => {

        setSearchText("");
        setSelectedDoctorName(doctorName);

        // const room = user+doctorName; 
        setRoom(chatId);
        console.log("chattttt: ",chatId);

        navigation.navigate("Chat", { doctorName, doctorId, chatId, user});
    }

    const navigateBack = () => {
        setSearchText("");
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
        // getPtId();
        retrieveLanguage();
        getAllDoctors();
        
    },[]);


    return (
        <View className="flex-1 bg-rose-100 p-2 py-0">

            {/* top view box with all conversations name*/}
            <View className = "justify-center items-center m-2">
                <Text className="text-2xl">
                {i18n.t("chatList.title")} 
                </Text>
            </View>
            

            {/* full block */}
            <View className="flex-1 bg-white rounded-t-3xl">
            
                {/* search bar */}

                        
                        <View className = "p-4 flex-row item-centered">

                            {searchText.trim() != '' ?

                                (
                                    <Pressable onPress={navigateBack}>
                                        <Text style={{ marginRight: 10 }} className="self-center text-2xl">←</Text>
                                    </Pressable>
                                )

                                :

                                (
                                    <View></View>
                                )
                            }
                            
                            <TextInput
                                className="flex-auto bg-gray-100 p-2 rounded-lg"
                                placeholder={i18n.t("chatList.search")} 

                                value={searchText}
                                onChangeText={handleSearch}
                                // onSubmitEditing={showResults}
                            />
                        </View>
                
                

                {searchText.trim() === '' ?
                    
                    (
                        <FlatList
                            data={allDoctorsInfo}
                            keyExtractor={(item) => item.drId.toString()}
                            renderItem={({ item }) => {
                                
                                return (
                                    <Pressable 
                                        className="flex-row item-centered p-4 hover:bg-sky-700 active:bg-slate-500" 
                                        onPress={() => enterChat(item.drName, item.drId, item.chatId)}
                                    >

                                        <Image source={image1 } className = "w-12 h-12 rounded-full mr-4" />
                                        <View className = "flex-1 self-center"> 
                                            <Text className = "text-lg" >{item.drName}</Text>
                                        </View>
                                        
                                    </Pressable>
                                )}
                            }
                        />
                    )

                    :

                    (
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.drId.toString()}
                            renderItem={({ item }) => {
                                
                                return (
                                    <Pressable 
                                        className="flex-row item-centered p-4 hover:bg-sky-700 active:bg-slate-500"
                                        onPress={() => enterChat(item.drName, item.drId, item.chatId)}
                                    >

                                        <Image source={image1 } className = "w-12 h-12 rounded-full mr-4" />
                                        <View className = "flex-1 self-center"> 
                                            <Text className = "text-lg" >{item.drName}</Text>
                                        </View>
                                        
                                    </Pressable>
                                )}
                            }
                        />
                    )
                }



                {/* chat list */}
                {/* <FlatList
                    data={chats}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        
                        return (
                            <TouchableOpacity 
                                className={`flex-row item-centered p-4 hover:bg-sky-700 active:bg-slate-500`} 
                                onPress={() => enterChat(item.name, item.id)}
                            >

                                <Image source={{ uri: item.profilePhoto }} className = "w-12 h-12 rounded-full mr-4" />
                                <View className = "flex-1 self-center"> 
                                    <Text className = "text-lg" >{item.name}</Text>
                                </View>
                                
                            </TouchableOpacity>
                        )}
                    }
                /> */}


                {/* <TouchableOpacity className="absolute bottom-8 right-8 bg-blue-600 p-3 rounded-full">
                    <Icon name="plus" size={25} color="white" />
                </TouchableOpacity> */}


            </View>

            <NavigationBar />

        </View>
    );
};

export default ChatList;