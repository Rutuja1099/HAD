import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import NavigationBar from "../components/NavigationBar";

const ChatList = () => {
    const [searchText, setSearchText] = useState('');
    
    const [chats, setChats] = useState([
        { id: 1, name: 'Dr. Saurabh', profilePhoto: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Dr. Asmita', profilePhoto: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Dr. Vikram', profilePhoto: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Dr. Ifrah', profilePhoto: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Dr. Rutuja', profilePhoto: 'https://via.placeholder.com/150' },
    ]);

    const navigation=useNavigation();
    
    useLayoutEffect(() => {
            navigation.setOptions({
            headerShown: false,
        })
    },[])

    const handleSearch = (text) => {
        setSearchText(text);
    }

    const enterChat = (doctorName, doctorId) => {
        console.log("chatlist", doctorName, doctorId);

        navigation.navigate("Chat", { doctorName, doctorId });
    }

    return (
        <View className="flex-1 bg-rose-100 p-2 py-0">
            <View className = "justify-center items-center m-2">
                <Text className="text-lg">
                    All conversations
                </Text>
            </View>
            
            <View className="flex-1 bg-white rounded-t-3xl">
                <View className="p-4">
                    <TextInput
                        className="bg-gray-100 p-2 rounded-lg"
                        placeholder="Search"
                        value={searchText}
                        onChangeText={handleSearch}
                        // onFocus={() => setFilteredChats([])}
                    />
                    {/* <Icon name="search" size={20} color="black" style={{ marginRight: 10 }} /> */}
                </View>
                
                <FlatList
                    data={chats}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {

                        console.log("Item:", item.name);
                        
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
                />


                {/* <TouchableOpacity className="absolute bottom-8 right-8 bg-blue-600 p-3 rounded-full">
                    <Icon name="plus" size={25} color="white" />
                </TouchableOpacity> */}



            </View>
            <NavigationBar />

        </View>
    );
};

export default ChatList;