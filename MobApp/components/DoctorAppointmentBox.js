import { View, Text, SafeAreaView, Image ,useWindowDimensions,style, Button, Pressable, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { homeImage, progressImage, moodliftImage, messageImage, settingsImage} from '../assets'
import Icon from 'react-native-vector-icons/FontAwesome';
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {profilePhoto} from '../assets';
import {Octicons} from '@expo/vector-icons';

import i18n from '../localization/i18n';


const DoctorAppointmentBox=({item, navigation})=>{

    // const { t, i18n } = useTranslation();

    // console.log(item);
    const {drId,drFullName, drSpecialization, drExperience,drGender} = item;
    const [chooseDocStatus, setchooseDocStatus]=useState(false);
    
    //const windowWidth = useWindowDimensions().width;
    
    const navigateNext = () => {
        navigation.navigate("DoctorAppointmentDetail", { drId, drFullName, drSpecialization, drExperience,drGender,profilePhoto});
    }
    const openChooseDoctorPopup=()=>{
        Alert.alert(
            "Do you want to select this Doctor ? ",
            "Click OK to chat with " + drFullName,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Choosing doctor canceled"),
                    style: "cancel",
                    className: "bg-red-500 text-white",
                },
                {
                    text: "OK",
                    onPress: () =>handleStatusChange(drId),
                    className: "bg-green-500 text-white",
                    
                }
            ],
            { cancelable: false } // To prevent dismissing the alert by tapping outside
        );
        
       

    }
    const handleStatusChange = async (drId) => {
    
        setchooseDocStatus(true);
        const loginURL = webServerUrl+"/suhrud/patient/chooseDoctor";

        const method='POST';
        
        // const data = {
        //     doctorID: doctorId
        // };

        const data = drId;
            
        try{

            const sessionData = await AsyncStorage.getItem('patientData');
            const localData=JSON.parse(sessionData);
            const bearerToken = localData.token;

            console.log("bearer token: ", bearerToken);

            const headers = {
                'Authorization': `Bearer ${bearerToken}`, // Include your token here
                'Content-Type': 'application/json', // Specify the content type if needed
                'ngrok-skip-browser-warning': 'true',
            };
            
            const response=await HttpService(method, loginURL, data, headers);
            console.log(response.status)
            
            if(response.status===200){
                    
                console.log("Successful");
                console.log(response.data);
            }
            
            else{
                alert("response not 200");
            }
        }
        catch(error){
            alert(error.data);
            console.log(error);
        }
        
       
    }

    return (
        <SafeAreaView>
            
        <SafeAreaView className="relative mr-12 justify-between flex-row">
            <SafeAreaView className="flex container bg-gray-200 rounded-3xl m-6 h-52" >
            
            <View className="absolute bottom-0 bg-blue-400 rounded-3xl w-full z-10 h-32" >
            <View className="mt-2 ml-6">
                <Text className="text-sm">{i18n.t("appointmentBox.gender")} : {drGender}</Text>
                <Text className="text-sm">{drSpecialization}</Text>
                <Text className="text-sm">{i18n.t("appointmentBox.experience")} : {drExperience}</Text>
                
            </View>
            <View className="flex-row space-x-6 mt-4 ml-2"> 
            {!chooseDocStatus?
            
                    <Pressable onPress={()=> openChooseDoctorPopup()}>
                            <Text className="text-white text-base bg-blue-700 w-32 h-10 text-center rounded-3xl pt-1.5">
                                {i18n.t("appointmentBox.chooseBtn")}
                            </Text>
                    </Pressable>
                    :
                    <View className="flex-row rounded-3xl items-center w-32 h-10 justify-center bg-green-600 space-x-2">
                        {/* <Icon name='check' size={20}>
                        </Icon> */}
                        <Octicons name="check-circle" size={17} color="white"/>

                        <Text className="text-white text-base">
                                Selected
                        </Text>
                    </View>

            }
                    <Pressable onPress={() => navigateNext()}>
                    <Text className="text-white text-base bg-blue-700 w-40 h-10 text-center rounded-3xl pt-2" >
                        {i18n.t("appointmentBox.bookBtn")}
                    </Text>
                    </Pressable>
                
            </View>
            
            {/* <View className="absolute bottom-2 right-2  rounded-full bg-gray-600 text-center px-4 py-2.5 w-14 h-14 ">
                       
                <Icon name="arrow-right" size={30} color="white" className="font-normal" />
                        
            </View> */}
            </View>
            <View className="flex-row justify-between z-10">
                <View className="mt-2 ml-6">
                    <Text className="text-lg">{drFullName}</Text>
                </View>
                <View className="items-end mr-4">
                    <View className="absolute bg-gray-100 w-28 h-28 mt-4 mr-0 rounded-3xl border-cyan-950">
                        <Image source={profilePhoto } className = " rounded-3xl w-full h-full items-center" />
                    </View>
                </View>
            </View>
            
          
            
            </SafeAreaView>
            
           
     
        </SafeAreaView>
        
        </SafeAreaView>
        
    )

}
export default DoctorAppointmentBox;