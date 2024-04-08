import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Button, FlatList, useWindowDimensions, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const DoctorAppointmentDetails=({route})=>{
   
    const {drId, drFullName, drSpecialization, drExperience,drGender,profilePhoto} = route.params;

    const navigation=useNavigation();
    const windowWidth = useWindowDimensions().width;  
    
    const [pressedDay, setPressedDay] = useState(null);
    const [pressedSlot, setPressedSlot] = useState(null);

    const DayandDate=[{day:'Mon',date: 8},
                      {day:'Tue',date: 9},
                      {day:'Wed',date: 10},
                      {day:'Thu',date: 11},
                      {day:'Fri',date: 12},
                      {day:'Sat',date: 13},
                      {day:'Sun',date: 14}];

    const [selectedDay, setSelectedDay] = useState(DayandDate[0].day);
    //const Slots=['10:00 am','11:00 am','12:00 pm','1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm'];
    const Slots={1:'10:00 am',2:'11:00 am',3:'12:00 pm',4:'1:00 pm',5:'2:00 pm',6:'3:00 pm',7:'4:00 pm',8:'5:00 pm'};
    const [selectedDaySlots, setSelectedDaySlots] = useState({});
    
    useEffect (()=>{
        setSelectedDaySlots(Object.values(Slots));        
    }, []);

     // Set a maximum chunk size based on the available width
     let maxChunkSize = 8; // Default maximum chunk size
     if (windowWidth < 348) {
         maxChunkSize = 2; // Adjust maximum chunk size for smaller screens
     }
     else if (windowWidth < 442) {
         maxChunkSize = 3; // Adjust maximum chunk size for smaller screens
     }
     else if (windowWidth < 540) {
         maxChunkSize = 4; // Adjust maximum chunk size for smaller screens
     }
     else if (windowWidth < 632) {
         maxChunkSize = 5; // Adjust maximum chunk size for smaller screens
     }
     else if (windowWidth < 730) {
         maxChunkSize = 6; // Adjust maximum chunk size for smaller screens
     }
 
     // Calculate the chunk size based on the number of days and maximum chunk size
     const chunkSize = Math.max(Math.ceil(selectedDaySlots.length / 3), maxChunkSize);
     const numChunks = Math.ceil(selectedDaySlots.length / chunkSize);
 
     // Calculate the desired total height for the row
     const totalHeight = 110 * numChunks; // Assuming each chunk has a height of 44
     const totalHeightGray=totalHeight+100;
     // Split the Days array into chunks of the calculated size
     const chunkedSlots = [];
     for (let i = 0; i < selectedDaySlots.length; i += chunkSize) {
        chunkedSlots.push(selectedDaySlots.slice(i, i + chunkSize));
     }
    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })  
    },[])

    const loadSlots = (day) => {
        // Logic to load slots for the selected day
        console.log("Loading slots for", day);
        
        setSelectedDay(day);
        setSelectedDaySlots(Object.values(Slots));
        setPressedDay(day); // Change color on press
        setPressedSlot(null);
    }

    const navigateback = () => {
        navigation.navigate("Appointment");
    }
    const OpenDashborad=()=>{
        navigation.navigate("Dashboard");
    }
    return(   
        
        <View classname="flex bg-blue-500">
             <View className = "p-4 flex-row items-center border-b border-gray-300">
                
                <Icon name="angle-left" size={25} onPress={navigateback}/>
            
                <Text className = "font-bold text-lg ml-4 text-center" >Doctor's Profile</Text>
            
            </View>
           
                <SafeAreaView className="flex-grow bg-blue-950 ml-6 mr-6 mt-3 rounded-3xl">
                    
                    <SafeAreaView className=" justify-center items-center mt-20">
                        <View className="relative w-32 h-32 rounded-full bg-black ">
                            <Image source={{ uri: profilePhoto }} className = "w-full h-full rounded-full" />
                            <Text className=" text-center text-lg font-bold mt-2 text-white" size={25}>{drFullName}</Text>
                            <Text className=" text-center text-base font-bold mt-2 text-white" size={25}>{drSpecialization}</Text>
                        
                        </View>
                    </SafeAreaView>
                    <View overflow-scroll flex-1>
                    <SafeAreaView className=" bg-white rounded-3xl mt-20 ">
                    <Text className=" text-lg font-semibold ml-8 mt-4" size={25}>Date :</Text>
                    <View className="flex flex-row flex-wrap ml-5 mb-5">
                        {/* Map over the chunkedDays array to create rows with three elements each */}
                        {/* {Days.map((row, rowIndex) => ( */}
                        
                        <ScrollView horizontal>
                            <View className="flex flex-row justify-between p-2 space-x-2">
                        
                            {DayandDate.map((item, index) => (
                                <Pressable key={`${item.day}-${index}`}  onPress={() => loadSlots(item.day)}>
                                    <View key={index} className={`flex flex-col items-center m-2 rounded-xl text-center p-2 w-12 h-16 ${pressedDay === item.day ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                                        <Text  className={`text-gray-500 `} >{item.day}</Text>
                                        <Text className=" text-gray-500 ">{item.date}</Text>
                                    </View>
                                </Pressable>
                            ))}
                            </View>
                        </ScrollView>
                        
                            
                            {/* ))} */}
                    </View>
                    <Text className=" text-lg font-semibold ml-8" size={25}>Time :</Text>
                    <View className="flex flex-row flex-wrap w-1/5 ml-5">
                        {/* Map over the chunkedDays array to create rows with three elements each */}
                        {chunkedSlots.map((row, rowIndex) => (
                           
                                <View key={rowIndex} className="flex flex-row justify-between p-2 space-x-4">
                                    {selectedDay && row.map((slot, index) => (
                                         <Pressable key={index} onPress={()=>setPressedSlot(slot)}>
                                        <Text key={index} className={`text-gray-500 rounded-xl bg-gray-300 text-center p-2 w-20 h-12 ${pressedSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>{slot}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            
                                
                            ))}
                    </View>
                
                    <View className="flex-grow relative bottom-0 left-0 right-0 p-4 mt-2 bg-blue-500 px-0 py-4 rounded-3xl w-full"> 
                            {/* <TouchableOpacity onPress={nextQuestion} className={`bg-blue-500 px-0 py-4 rounded-md w-full ${selectedOption === null ? 'opacity-50' : ''}`} disabled={selectedOption === null}> */}
                            <Pressable onPress={OpenDashborad}>
                                <Text className="text-white text-center font-bold">
                                    Schedule Appointment
                                </Text>
                                </Pressable>
                            {/* </TouchableOpacity> */}
                    </View>
                    </SafeAreaView>
                    </View>
                   
                  
                </SafeAreaView>
            
            
        </View>
        
    )
}
export default DoctorAppointmentDetails;