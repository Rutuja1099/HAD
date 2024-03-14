import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import NavigationBar from "../components/NavigationBar";
import { Icon } from "react-native-vector-icons/FontAwesome";

const ChatList = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const [chats, setChats] = useState([
        { id: 1, name: 'Dr. Saurabh', profilePhoto: 'assets/boy.png' },
        { id: 2, name: 'Dr. Asmita', profilePhoto: 'assets/boy.png' },
        { id: 3, name: 'Dr. Vikram', profilePhoto: 'assets/boy.png' },
        { id: 4, name: 'Dr. Ifrah', profilePhoto: 'assets/boy.png' },
        { id: 5, name: 'Dr. Rutuja', profilePhoto: 'assets/boy.png' },
    ]);

    const [allDoctorInfo, setAllDoctorInfo] = useState([
        { id: 1, name: 'Dr. Saurabh', profilePhoto: 'assets/boy.png' },
        { id: 2, name: 'Dr. Sauvay', profilePhoto: 'assets/boy.png' },
        { id: 3, name: 'Dr. Asmita', profilePhoto: 'assets/boy.png' },
        { id: 4, name: 'Dr. Asthitha', profilePhoto: 'assets/boy.png' },
    ]);


    const navigation=useNavigation();
    
    useLayoutEffect(() => {
            navigation.setOptions({
            headerShown: false,
        })
    },[])

    const handleSearch = (text) => {

        setSearchText(text);
        
        text = text.toString();

        if (searchText.trim() === '') {
            setSearchResults([]);
            return;
        }
        
        const filteredResults = allDoctorInfo.filter(doctor => doctor.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(filteredResults);

    }

    const enterChat = (doctorName, doctorId) => {

        setSearchText("");
        navigation.navigate("Chat", { doctorName, doctorId });
    }

    const navigateBack = () => {
        setSearchText("");
    }


    return (
        <View className="flex-1 bg-rose-100 p-2 py-0">

            {/* top view box with all conversations name*/}
            <View className = "justify-center items-center m-2">
                <Text className="text-2xl">
                    Chats
                </Text>
            </View>
            

            {/* full block */}
            <View className="flex-1 bg-white rounded-t-3xl">
            
                {/* search bar */}

                        
                        <View className = "p-4 flex-row item-centered">

                            {searchText.trim() != '' ?

                                (
                                    <TouchableOpacity onPress={navigateBack}>
                                        <Text style={{ marginRight: 10 }} className="self-center text-2xl">←</Text>
                                    </TouchableOpacity>
                                )

                                :

                                (
                                    <View></View>
                                )
                            }
                            
                            <TextInput
                                className="flex-auto bg-gray-100 p-2 rounded-lg"
                                placeholder="Search"
                                value={searchText}
                                onChangeText={handleSearch}
                                // onSubmitEditing={showResults}
                            />
                        </View>
               
                

                {searchText.trim() === '' ?
                    
                    (
                        <FlatList
                            data={chats}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                
                                return (
                                    <TouchableOpacity 
                                        className="flex-row item-centered p-4 hover:bg-sky-700 active:bg-slate-500" 
                                        onPress={() => enterChat(item.name, item.id)}
                                    >

                                        <Image source={{ uri: item.profilePhoto }} className = "w-12 h-12 rounded-full mr-4" />
                                        <View className = "flex-1 self-center"> 
                                            <Text className = "text-lg" >{item.name}</Text>
                                        </View>
                                        
                                    </TouchableOpacity>
                                )}
                            }
                        />
                    )

                    :

                    (
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                
                                return (
                                    <TouchableOpacity 
                                        className="flex-row item-centered p-4 hover:bg-sky-700 active:bg-slate-500"
                                        onPress={() => enterChat(item.name, item.id)}
                                    >

                                        <Image source={{ uri: item.profilePhoto }} className = "w-12 h-12 rounded-full mr-4" />
                                        <View className = "flex-1 self-center"> 
                                            <Text className = "text-lg" >{item.name}</Text>
                                        </View>
                                        
                                    </TouchableOpacity>
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