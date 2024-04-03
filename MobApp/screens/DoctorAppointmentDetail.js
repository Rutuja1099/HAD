import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Button, FlatList, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const DoctorAppointmentDetails=({route})=>{
    const {name, profilePhoto, Days} = route.params;
    const navigation=useNavigation();
    const windowWidth = useWindowDimensions().width;
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
        
        <View classname="flex bg-blue-500">
             <View className = "p-4 flex-row items-center border-b border-gray-300">
                
                <Icon name="angle-left" size={25} onPress={navigateback}/>
            
                <Text className = "font-bold text-lg ml-4 text-center" >Doctor's Profile</Text>
            
            </View>
            <SafeAreaView className=" bg-blue-950 ml-6 mr-6 mt-3 rounded-3xl">
            <SafeAreaView className=" justify-center items-center mt-20">
                <View className="relative w-48 h-48 rounded-full bg-black ">
                <Image source={{ uri: profilePhoto }} className = "w-full h-full rounded-full" />
                <Text className=" text-center text-lg font-bold mt-2 text-white" size={25}>{name}</Text>
                </View>
            </SafeAreaView>
            <SafeAreaView className="bg-white rounded-3xl mt-20">
            <Text className=" text-lg font-bold mt-5 ml-8" size={25}>Select Date :</Text>
            <View className="flex flex-row flex-wrap w-1/5 ml-5">
                 {/* Map over the chunkedDays array to create rows with three elements each */}
                 {chunkedDays.map((row, rowIndex) => (
                        <View key={rowIndex} className="flex flex-row justify-between p-2 space-x-4">
                            {row.map((day, index) => (
                                <Text key={index}  className="text-gray-500 rounded-full bg-gray-300 text-center p-2 w-12 h-12 ">{day}</Text>
                            ))}
                        </View>
                    ))}
            </View>
            <Text className=" text-lg font-bold ml-8" size={25}>Select Slot :</Text>
            <View className="flex flex-row flex-wrap w-1/5 ml-5 mb-5">
                 {/* Map over the chunkedDays array to create rows with three elements each */}
                 {chunkedDays.map((row, rowIndex) => (
                        <View key={rowIndex} className="flex flex-row justify-between p-2 space-x-4">
                            {row.map((day, index) => (
                                <Text key={index}  className="text-gray-500 rounded-full bg-gray-300 text-center p-2 w-12 h-12 ">{day}</Text>
                            ))}
                        </View>
                    ))}
            </View>
            <View className="relative bottom-0 left-0 right-0 p-4 bg-blue-500 px-0 py-4 rounded-3xl w-full"> 
                    {/* <TouchableOpacity onPress={nextQuestion} className={`bg-blue-500 px-0 py-4 rounded-md w-full ${selectedOption === null ? 'opacity-50' : ''}`} disabled={selectedOption === null}> */}
                        <Text className="text-white text-center font-bold">
                            Schedule Appointment
                        </Text>
                    {/* </TouchableOpacity> */}
            </View>
            </SafeAreaView>
            </SafeAreaView>
            
        </View>
        
    )
}
export default DoctorAppointmentDetails;