import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Button, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const DoctorAppointmentDetails=({route})=>{
    const {name, profilePhoto, Days} = route.params;
    const navigation=useNavigation();
     // Set a maximum chunk size based on the available width
     let maxChunkSize = 7; // Default maximum chunk size
     if (windowWidth < 200) {
         maxChunkSize = 2; // Adjust maximum chunk size for smaller screens
     }
     else if (windowWidth < 310) {
         maxChunkSize = 3; // Adjust maximum chunk size for smaller screens
     }
     else if (windowWidth < 410) {
         maxChunkSize = 4; // Adjust maximum chunk size for smaller screens
     }
     else if (windowWidth < 420) {
         maxChunkSize = 5; // Adjust maximum chunk size for smaller screens
     }
     else if (windowWidth < 460) {
         maxChunkSize = 6; // Adjust maximum chunk size for smaller screens
     }
 
     // Calculate the chunk size based on the number of days and maximum chunk size
     const chunkSize = Math.max(Math.ceil(Days.length / 2), maxChunkSize);
     const numChunks = Math.ceil(Days.length / chunkSize);
 
     // Calculate the desired total height for the row
     const totalHeight = 110 * numChunks; // Assuming each chunk has a height of 44
     const totalHeightGray=totalHeight+100;
     // Split the Days array into chunks of the calculated size
     const chunkedDays = [];
     for (let i = 0; i < Days.length; i += chunkSize) {
         chunkedDays.push(Days.slice(i, i + chunkSize));
     }
    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })  
    },[])

    const navigateback = () => {
        navigation.navigate("Appointment");
    }
    return(   
        
        <View classname="flex-1 bg-blue-500">
             <View className = "p-4 flex-row items-center border-b border-gray-300">
                
                <Icon name="angle-left" size={25} onPress={navigateback}/>
            
                <Text className = "font-bold text-lg ml-4 text-center" >Doctor's Profile</Text>
            
            </View>
            <SafeAreaView className=" bg-blue-950 ml-6 mr-6 mt-3 rounded-3xl">
            <SafeAreaView className="justify-center items-center mt-20">
                <View className="relative w-48 h-48 rounded-full bg-black ">
                <Image source={{ uri: profilePhoto }} className = "w-full h-full rounded-full" />
                <Text className="text-center text-lg font-bold mt-2" size={25}>{name}</Text>
                </View>
            </SafeAreaView>
            
            <View className="flex flex-row flex-wrap w-1/5 mt-10 ml-5">
                 {/* Map over the chunkedDays array to create rows with three elements each */}
                 {chunkedDays.map((row, rowIndex) => (
                        <View key={rowIndex} className="flex flex-row justify-between p-2 space-x-2">
                            {row.map((day, index) => (
                                <Text key={index}  className="text-black rounded-full bg-white text-center p-2 w-12 h-12 ">{day}</Text>
                            ))}
                        </View>
                    ))}
            </View>
            </SafeAreaView>
        </View>
        
    )
}
export default DoctorAppointmentDetails;