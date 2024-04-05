import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import NavigationBar from "../components/NavigationBar";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const Dashboard = () => {

    const navigation=useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
    })
    },[])

    const callHelpline = () => {

    };

    return(
        <>
            <ScrollView className = "flex-1 bg-gray-100">
                <View className = "px-4">

                    {/* First Section */}
                    <View className = "flex flex-row p-4 mb-4 justify-between border-b-2 border-dashed">

                        <View>
                            <Text className="text-2xl">Hello Rutu</Text>
                            <Text>Weclome to our safe space</Text>
                        </View>

                        <View className="flex flex-row justify-center items-center">

                            <View className="mr-4">
                                <Feather name="phone-call" size={24} color="black" />
                            </View>
                            
                            <View className="border-2 rounded-full p-1">
                                <Feather name="user" size={24} color="black" />
                            </View>
                            
                        </View>
                        
                    </View>
                    
                    {/* Second Section */}
                    <View className = "flex flex-col p-4 mb-2 justify-between border-b-2 border-dashed">

                        <View className = "flex flex-row justify-between mb-2">
                            <Text className="text-xl font-semibold">Ask our experts</Text>
                            <Feather name="arrow-right" size={24} color="black" />
                        </View>

                        <View className="flex flex-row px-4 py-3 bg-cyan-400 rounded-3xl justify-between">
                            <TextInput className="w-full" placeholder="Type your question"/>
                            <MaterialIcons className="ml-2" name="send" size={24} color="black" />                        
                        </View>
                        
                    </View>


                    {/* Third Section */}
                    <View className = "flex flex-col p-4 mb-2 border-b-2 border-dashed">

                        <View className="mb-4">
                            <Text className="text-xl font-semibold">Patient Progress</Text>
                        </View>

                        <View className="flex flex-row">
                            <View className = "flex rounded-full h-28 w-28 bg-cyan-300 items-center justify-center mr-4">
                                <Text className="text-3xl">25%</Text>
                            </View>

                            <View className="bg-cyan-500 p-2 flex flex-grow overflow-hidden rounded-3xl">
                                <Text>Graph</Text>
                            </View>
                        </View>

                    </View>

                    {/* Fourth Section */}
                    <View className = "flex flex-row p-4 mb-2 border-b-2 border-dashed">

                        <View className = "flex h-28 w-28 items-center justify-center mr-4">
                            <Text className="text-xl">Good Morning Rutuja!!</Text>
                        </View>
        
                        <View className="bg-cyan-500 rounded-3xl p-3 flex-shrink">
                            <Text className="text-xl">Nothing is impossible, the word itself says I'm possible.</Text>
                        </View>

                    </View>

                    {/* Fifth Section */}
                    <View className = "flex flex-col p-4 mb-2">
                        
                        <View className="mb-4">
                            <Text className="text-xl font-semibold">Shortcuts</Text>
                        </View>
                        
                        <ScrollView horizontal className="flex-1">
                            <View className="flex flex-row">
                                <View className="bg-cyan-300 h-40 w-28 mr-4 text-xl rounded-3xl flex justify-center items-center">
                                    <Text>Book appointment</Text>
                                </View>

                                <View className="bg-red-400 h-40 w-28 mr-4 text-xl rounded-3xl flex justify-center items-center">
                                    <Text>Moodlift</Text>
                                </View>

                                <View className="bg-amber-400 h-40 w-28 mr-4 text-xl rounded-3xl flex justify-center items-center">
                                    <Text>Forum</Text>
                                </View>

                                <View className="bg-lime-400 h-40 w-28 mr-4 text-xl rounded-3xl flex justify-center items-center">
                                    <Text></Text>
                                </View>

                            </View>
                        </ScrollView>

                    </View>


                </View>
            </ScrollView>

            <NavigationBar />
        </>

    )
}

export default Dashboard;

