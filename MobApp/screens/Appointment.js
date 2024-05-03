import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Image, ImageBackground, FlatList,Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import DoctorAppointmentBox from '../components/DoctorAppointmentBox';
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';
import STORE_LANGUAGE_KEY from '../configurations/Multilingual';
// import { useTranslation } from "react-i18next";

import i18n from '../localization/i18n';

const Appointment = ({route}) => {
    
    // const { t, i18n } = useTranslation();

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    let [fontsLoaded] = useFonts({
        Pangolin_400Regular,
    });

    const [allDoctorInfo, setAllDoctorInfo] = useState([]);

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

        const getDoctorsList = async () => {
            
            const loginURL = webServerUrl+"/suhrud/patient/viewSuggestedDoctorsList";
            const method='GET';
            
            const sessionData = await AsyncStorage.getItem('patientData')
            const data=JSON.parse(sessionData);
            const bearerToken = data.token;
            // setUserName(data.ptUsername);
            console.log("bearer Token: ", bearerToken);
      
            const headers = {
              'Authorization': `Bearer ${bearerToken}`, // Include your token here
              'Content-Type': 'application/json', // Specify the content type if needed
            };
      
            let response;
            try{

                response=await HttpService(method,loginURL, null, headers);
                console.log(response.status)
                
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
      
            setAllDoctorInfo(response.data);
            // console.log(response.data[0]);
            //setQuestion(response.data[0]);
        }
        
            console.log()
            getDoctorsList();
            // getSelectedOptions();
            retrieveLanguage();

    },[]);

    const navigation=useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })  
    },[])

    const navigateBack = () => {
        setSearchText("");
    } 

    // useEffect(() => {
    //     // Scroll to the bottom when messages change
    //     // scrollViewRef.current.scrollToEnd({ animated: false });
    // }, [allDoctorInfo]);

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

    const navigateDashboard = () => {
        navigation.navigate("Dashboard");
    }

    const scrollViewRef = useRef(); 

    return(   
    <ImageBackground source={background} style={styles.imagebackground}> 
    <SafeAreaView className="flex-1">
        <SafeAreaView className = "m-2 border-b border-spacing-8 border-dashed pb-2 px-2 mt-14 flex-row justify-between">
            
            <View className="flex-row space-x-4">
                {/* <Icon name="angle-left" size={25}/> */}
         
                <Text className="flex text-xl font-semibold ml-2">
                    {i18n.t("appointment.suggestDoctor")}
                </Text>
            </View>
            <SafeAreaView className="mr-0">
                <Text onPress={() => navigateDashboard()} className="text-center rounded-xl bg-white w-full p-1">{i18n.t("appointment.skip")}</Text>
            </SafeAreaView>
           
        </SafeAreaView>

        <SafeAreaView className="flex-1">
            {/* Search */}
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
                    className="flex-auto bg-white p-2 rounded-2xl ml-2 mr-2"
                    placeholder={i18n.t("appointment.search")}
                    value={searchText}
                    onChangeText={handleSearch}
                    // onSubmitEditing={showResults}
                />
            </View>
        
            {searchText.trim() === '' ?
                    
                    (
                        <FlatList
                            data={allDoctorInfo}
                            keyExtractor={(item) => item.drId.toString()}
                            renderItem={({ item }) => {
                                
                                return (
                                    
                                        <DoctorAppointmentBox 
                                        item={item}
                                            navigation={navigation}
                                        />
                                
                                    
                                    
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
                                    <DoctorAppointmentBox 
                                        item={item}
                                            navigation={navigation}
                                        />
                                )}
                            }
                        />
                    )
                }

        </SafeAreaView>
    </SafeAreaView>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imagebackground:{
        height:'100%',
      resizeMode:'cover',
      },
    
  })
export default Appointment;