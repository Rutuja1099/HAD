import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Button, FlatList, useWindowDimensions, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';


const DoctorAppointmentDetails=({route})=>{

    let [fontsLoaded] = useFonts({ Pangolin_400Regular,});
   
    const {drId, drFullName, drSpecialization, drExperience,drGender,profilePhoto} = route.params;

    const navigation=useNavigation();
    const windowWidth = useWindowDimensions().width;  
    
    const [pressedDay, setPressedDay] = useState();
    const [pressedSlot, setPressedSlot] = useState(null);
    const [currentDay, setCurrentDay]=useState(null);
    const [currentMonth,setCurrentMonth]=useState(null);
    const [currentDateOfMonth ,setCurrentDateOfMonth]=useState(null);
    const [currentTime,setCurrentTime]=useState(null);
    const [currentDate,setCurrentDate]=useState(null);
    const [currentSlot, setCurrentSlot]=useState(null);
    const DayandDate=[];
    const [selectedDayandDate, setSelectedDayandDate] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDaySlots, setSelectedDaySlots] = useState({});
    const [bookedSlots, setBookedSlots] = useState({});
    const [myBookedSlots, setMyBookedSlots] = useState([]);
    const [formattedDate,setFormattedDate ]=useState(null);
    const [pressedSlotindex,setPressedSlotindex]=useState(1);
    const [noOfEleInRow, SetNoOfEleInRow]=useState(null); 
    // const [showAlert, setShowAlert] = useState(false);

    // const handlePress = () => {
    //     setShowAlert(false); // Close the alert
    // };
    //const [maxChunk, setmaxChunk]=useState(); 
    const currentMoment = moment();

    const Slots={1:'10:00 am',2:'11:00 am',3:'12:00 pm',4:'1:00 pm',5:'2:00 pm',6:'3:00 pm',7:'4:00 pm',8:'5:00 pm'};

    // Set a maximum chunk size based on the available width
    let maxChunkSize = 8;
    
     // Default maximum chunk size
    if (windowWidth < 348) {
        maxChunkSize = 2; 

    }
    else if (windowWidth < 442) {
        maxChunkSize = 3; 
    }
    else if (windowWidth < 540) {
        maxChunkSize = 4; 
    }
    else if (windowWidth < 632) {
        maxChunkSize = 5; 
    }
    else if (windowWidth < 730) {
        maxChunkSize = 6; 
    }
    
   

    // Calculate the chunk size based on the number of days and maximum chunk size
    const chunkSize = Math.max(Math.ceil(selectedDaySlots.length / 4), maxChunkSize);
    const numChunks = Math.ceil(selectedDaySlots.length / chunkSize);

    // Calculate the desired total height for the row
    const totalHeight = 110 * numChunks; // Assuming each chunk has a height of 44
    const totalHeightGray=totalHeight+100;
    // Split the Days array into chunks of the calculated size
    const chunkedSlots = [];
    for (let i = 0; i < selectedDaySlots.length; i += chunkSize) {
        chunkedSlots.push(selectedDaySlots.slice(i, i + chunkSize));
    }

    useEffect (()=>{
        SetNoOfEleInRow(maxChunkSize);
        
        setSelectedDaySlots(Object.values(Slots));

        SetParams(currentMoment);        
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })  
    },[]);

    const loadSlots = (day,date) => {
        // Logic to load slots for the selected day
        console.log("Loading slots for", day);
        const dateObj = moment().set({
            'date': date, // Set the day to 10
            'month': currentMonth, // Set the month to April (0-indexed, so 3 represents April)
            'year': moment().year() // Set the year to the current year
        });
        console.log("dateobj in loadSlots", dateObj);
        // Format the date as yyyy-mm-dd
        const sendDateobj = dateObj.format('YYYY-MM-DD');
        if(sendDateobj>formattedDate){
            setCurrentSlot(1);
        }
        console.log("in LoadSlots",currentSlot);
        setSelectedDay(sendDateobj);

        fetchBookedDays(sendDateobj,currentSlot)
        console.log("while loading slot",myBookedSlots);
        setSelectedDaySlots(Object.values(Slots));
        setPressedDay(day); // Change color on press
        setPressedSlot(null);//currentDate
    }

    const navigateback = () => {
        navigation.navigate("Appointment");
    }
    const OpenDashborad=()=>{
        navigation.navigate("Dashboard");
    }

    const SetParams = async (currentMoment) => {
        setCurrentDate(currentMoment);
        // Get the current date
       //console.log("Current date:", currentDate);

       // Format the date as yyyy-MM-dd
       //const formattedDate = moment().format('YYYY-MM-DD')
       setFormattedDate(moment().format('YYYY-MM-DD'));
       //console.log("formatted date:", formattedDate);
       
       //const currentDay = currentDate.format('ddd'); // Format as abbreviated day name (e.g., 'Mon', 'Tue')
       //console.log("Current day:", currentDay);
       setCurrentDay(currentMoment.format('ddd')); //Mon

       //const currentDayOfMonth = currentDate.date();
       //console.log("Current day of the month:", currentDayOfMonth);
       setCurrentDateOfMonth(currentMoment.date()); //8/9

       //const currentTime = currentDate.format('HH:mm:ss');
       //console.log("Current time:", currentTime);
       setCurrentTime(currentMoment.format('HH:mm:ss'));//To identify current slot

       //const currentMonth = currentDate.format('MMMM'); // getMonth() returns a zero-based index, so we add 1
       //console.log("Current month:", currentMonth);
       setCurrentMonth(currentMoment.format('MMMM')); //March
       

       // Generate dates for the next 7 days
       for (let i = 0; i < 7; i++) {
           const date = currentMoment.clone().add(i, 'days');
           const day=date.format('ddd');
           const dateofMonth=date.date();
           DayandDate.push({ day: day, date: dateofMonth });
       }

       console.log(DayandDate);
       setSelectedDayandDate(DayandDate);
       //console.log("viviv", DayandDate[0]);
       setPressedDay(DayandDate[0].day);
       setPressedSlot(currentSlot);
       setSelectedDay(formattedDate);
       console.log("formattedDate",formattedDate);
       console.log(currentSlot);
    }

    const onScheduleAppointment=(selectedDay,pressedSlotindex)=>{
        console.log("onScheduleAppointment", selectedDay);
        console.log(pressedSlotindex);
        //setShowAlert(true);
        
        bookAppoinment(selectedDay,pressedSlotindex);
        Alert.alert(
            "You have booked an appointment  ",
            "Details : " + drFullName + " on " + selectedDay +" at "+ pressedSlot,
            [
              {
                text: "OK",
                onPress: () => OpenDashborad()
              }
            ]
          );
        
    }

    const OnSlotClick=(pressedSlot)=>{
        setPressedSlot(pressedSlot);
        let slotindex=null;

        for (const index in Slots) {
            if (Slots[index] === pressedSlot) {
                slotindex= parseInt(index); // Convert index to integer if needed
            }
        }

        setPressedSlotindex(slotindex);
        
    }
    const bookAppoinment=async(selectedDay,pressedSlotindex) =>{
        
        console.log("in book appointment",selectedDay);
        console.log("in book appointment",pressedSlotindex);
        
        const loginURL = webServerUrl + "/suhrud/patient/bookAppointment";
        console.log("login url", loginURL);
        
        const method='POST';
        const data=JSON.stringify({         
            "requestedDate":selectedDay,
            "requestedSlots":pressedSlotindex,
            "drId":drId,
        });
        console.log("data",data);

        const sessionData = await AsyncStorage.getItem('patientData');
        const localData=JSON.parse(sessionData);
        const bearerToken = localData.token;
        // setUserName(data.ptUsername);
        //console.log("bearer Token: ", bearerToken);
  
        const headers = {
          'Authorization': `Bearer ${bearerToken}`, // Include your token here
          'Content-Type': 'application/json', // Specify the content type if needed
        };
  
        let response;
        
        try{

            response=await HttpService(method,loginURL, data, headers);
            console.log(response.status);
            
            if(response.status===200){
            
                console.log("Successful");
                console.log(response.data);
            
                try{
                    console.log("from storage");
  
                }catch(error){
                    console.log("error while saving data");
                    console.log(error);
                }
            }
            
            else{
                alert(response.data);
  
            }
        }catch(error){
            alert(error.data);
            console.log(error);
        }
        
       
    };


    const fetchBookedDays = async (formattedDate,currentSlot) => {
        // const loginURL = `${webServerUrl}/suhrud/patient/fetchBookedDays${queryParams}`;

        const loginURL = webServerUrl + "/suhrud/patient/fetchAllBookedSlots";
        console.log("login url", loginURL);
        const method='POST';
        const data=JSON.stringify({         
            "requestedDate":formattedDate,
            "requestedSlots":currentSlot,
            "drId":drId,
        });
        console.log("data",data);

        const sessionData = await AsyncStorage.getItem('patientData');
        const localData=JSON.parse(sessionData);
        const bearerToken = localData.token;
        // setUserName(data.ptUsername);
        //console.log("bearer Token: ", bearerToken);
  
        const headers = {
          'Authorization': `Bearer ${bearerToken}`, // Include your token here
          'Content-Type': 'application/json', // Specify the content type if needed
        };
  
        let response;
        try{

            response=await HttpService(method,loginURL, data, headers);
            console.log(response.status);
            
            if(response.status===200){
            
                console.log("Successful");
                console.log(response.data);
            
                try{
                    console.log("from storage");
  
                }catch(error){
                    console.log("error while saving data");
                    console.log(error);
                }
            }
            
            else{
                alert(response.data);
  
            }
        }catch(error){
            alert(error.data);
            console.log(error);
        }
        const myBookedSlotRes=response.data.myBookedSlots;
        //console.log("huihuihui",myBookedSlotRes);
        setMyBookedSlots(myBookedSlotRes);
        //console.log("in fetchbookdays",myBookedSlots);
        const bookedSlotsRes=response.data.bookedSlots;
        //console.log(bookedSlotsRes);
        setBookedSlots(bookedSlotsRes);
        //console.log("in fetchbookdays",bookedSlots);
    }

    useEffect (() => {
        //console.log("in tututututut",myBookedSlots);
    }, [bookedSlots, myBookedSlots]);

    useEffect(() => {   
        let currentSlot = null;

        for (const slot in Slots) {
            const slotTime = moment(Slots[slot], 'h:mm a');
            
            // Compare current time with the slot time
            if (currentMoment.isBefore(slotTime)) {
                currentSlot = slot - 1; // Slot starts from 1, so subtracting 1 to get correct index
                break;
            }
        }

        if (currentSlot === null) {
            currentSlot = Object.keys(Slots).length; // If current time is after all slots, set to last slot
        }

        console.log("Current Slot:", currentSlot);
        setCurrentSlot(currentSlot); 

       
        fetchBookedDays(moment().format('YYYY-MM-DD'),currentSlot);
        //console.log("in jajajajaja",myBookedSlots);
    // getSelectedOptions();
    },[]);

    // const Alert = ({ message, onPress }) => {
    //     return (
    //       <TouchableOpacity onPress={onPress} className={`bg-gray-200 fixed inset-0 bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-md shadow-md`}>
    //         <Text className={`text-black`}>{message}</Text>
    //       </TouchableOpacity>
    //     );
    // };

    return(   
        <ImageBackground source={background} style={styles.imagebackground}>
        <View classname="flex bg-blue-500">
             <View className = "p-4 flex flex-row items-center border-b border-gray-300 mt-4">
                
                <Icon name="angle-left" size={25} onPress={navigateback}/>
            
                <Text className = "font-bold text-lg ml-4 mt-4 text-center" >Doctor's Profile</Text>
            
            </View>
           
                <SafeAreaView className="flex-grow bg-blue-950 ml-6 mr-6 mt-3 rounded-3xl">
                    
                    <View className=" justify-center items-center mt-10">
                        <View className="relative w-32 h-32 rounded-full bg-black ">
                            <Image source={profilePhoto} className = "w-full h-full rounded-full" />
                            <Text className=" text-center text-lg font-bold mt-2 text-white w-36 self-center" size={25}>{drFullName}</Text>
                            <Text className=" text-center text-base font-bold mt-2 text-white w-56 self-center" size={25}>{drSpecialization}</Text>
                        
                        </View>
                    </View>

                    <View className = "flex-grow overflow-scroll">
                    <SafeAreaView className=" bg-white rounded-3xl mt-20 ">
                     <Text className="flex self-end pr-4 text-lg font-semibold ml-8 mt-4 text-left" size={25}>{currentMonth}</Text>
                    <Text className=" text-lg font-semibold ml-4 mt-4" size={25}>Date :</Text>
                    <View className="flex flex-row flex-wrap ml-3 mb-5">
                        {/* Map over the chunkedDays array to create rows with three elements each */}
                        {/* {Days.map((row, rowIndex) => ( */}
                        
                        <ScrollView horizontal>
                            <View className="flex flex-row justify-between p-2 space-x-2">
                        
                            {selectedDayandDate.map((item, index) => (
                                
                                <Pressable key={`${item.day}-${index}`} onPress={() => loadSlots(item.day,item.date)}>
                                    {/* <Text>{item.day}</Text> */}
                                    <View key={index} className={`flex flex-col items-center m-2 rounded-xl text-center p-2 w-12 h-16 ${pressedDay === item.day ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        <Text  className={`text-gray-500 ${pressedDay === item.day ? ' text-white' : ' text-gray-500'}`}>{item.day}</Text>
                                        <Text className={`text-gray-500 ${pressedDay === item.day ? ' text-white' : ' text-gray-500'}`}>{item.date}</Text>
                                    </View>
                                </Pressable>
                            ))}
                            </View>
                            </ScrollView>
                            <ScrollView horizontal>      
                            
                        </ScrollView>
                        {/* <ScrollView horizontal>      
                            <View className="flex flex-row justify-between p-2 space-x-2">
                        
                            {Object.entries(bookedSlots).map(([key, value]) => (
                                    <View key={key} className={`flex flex-col items-center m-2 rounded-xl text-center p-2 w-12 h-16`}>
                                        <Text  className="text-gray-500" >{key}</Text>
                                        <Text className=" text-gray-500 ">{value.toString()}</Text>
                                    </View>
                              
                            ))}
                            </View>
                        </ScrollView> */}
                        
                            
                            {/* ))} */}
                    </View>
                    <Text className=" text-lg font-semibold ml-4" size={25}>Time :</Text>
                    <View className="flex flex-row flex-wrap w-1/5 ml-5">
                        {/* Map over the chunkedDays array to create rows with three elements each */}
                        {chunkedSlots.map((row, rowIndex) => (
                           
                                <View key={rowIndex} className="flex flex-row justify-between p-2 space-x-4">
                                    {row.map((slot, index) => (
                                    //    ${bookedSlots[rowIndex*3+(index+1)] ? 'bg-gray-600 text-black border-none cursor-not-allowed':'bg-gray-100 text-gray-500 border-gray-700 cursor-pointer'}
                                        <Pressable key={index} onPress={()=>OnSlotClick(slot)} disabled={bookedSlots[rowIndex*noOfEleInRow+(index+1)]}>
                                        <Text key={index} className={`rounded-xl text-center p-2 w-20 h-12 
                                        
                                        ${
                                            pressedSlot === slot
                                             ? ('bg-blue-500 text-white border-none' )
                                                :(bookedSlots[rowIndex*noOfEleInRow+(index+1)] 
                                                    ?(myBookedSlots && myBookedSlots.length > 0 && myBookedSlots.includes(parseInt((rowIndex * noOfEleInRow) + (index + 1)))
                                                        ?('bg-green-400 text-black border-none cursor-not-allowed')
                                                        :'bg-gray-400 text-black border-none cursor-not-allowed')
                                                    :'bg-gray-100 text-gray-500 border-gray-700 cursor-pointer' )
                                        }`}>{slot}</Text>
                                    {/* }`}>{rowIndex*noOfEleInRow+(index+1)}</Text> */}
                                        </Pressable>
                                    ))}
                                </View>
                            
                                
                            ))}
                    </View>
                
                    <Pressable onPress={() => onScheduleAppointment(selectedDay,pressedSlotindex)} disabled={pressedSlot === null}>
                        <View className={`flex-grow relative bottom-0 left-0 right-0 p-4 mt-2 bg-blue-500 px-0 py-4 rounded-3xl w-full ${pressedSlot==null ? 'opacity-50':''}`}> 
                                {/* <TouchableOpacity onPress={nextQuestion} className={`bg-blue-500 px-0 py-4 rounded-md w-full ${selectedOption === null ? 'opacity-50' : ''}`} disabled={selectedOption === null}> */}
                                    <Text className="text-white text-center font-bold">
                                        Schedule Appointment
                                    </Text>
                                {/* </TouchableOpacity> */}
                        </View>
                    </Pressable>
                    </SafeAreaView>
                    </View>
                   
                  
                </SafeAreaView>
            
            
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
        width: 50,
        height: 50,
        marginTop:35,
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
export default DoctorAppointmentDetails;