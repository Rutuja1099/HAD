import { Image, View, Text, SafeAreaView, Pressable, StyleSheet, ScrollView, Alert, ImageBackground} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { contactImage, accountImage, securityImage, notificationImage, logoutImage, trashImage} from '../assets'
import NavigationBar from '../components/NavigationBar'
import webServerUrl from '../configurations/WebServer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService'
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';
// import { useTranslation } from 'react-i18next'

import i18n from '../localization/i18n';

const Settings = () => {

    // const { t, i18n } = useTranslation();

    let [fontsLoaded] = useFonts({ Pangolin_400Regular,});
    const navigation=useNavigation();
    const [username, setUserName] = useState("");
    const [patientData,setPatientData]=useState(null);


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
    
    useEffect(()=>{
        const fetchUsername=async()=>{
            const sessionData = await AsyncStorage.getItem('patientData');
            const localData=JSON.parse(sessionData);
            setUserName(`${i18n.t("settings.hi")}` +" "+localData.ptUsername+"!!");
        };
        fetchUsername();

        

        const fetchDetails=async()=>{
          const patientInfoURL=webServerUrl+"/suhrud/patient/patientInfo";
          const method='GET';
          const patientData = await AsyncStorage.getItem('patientData')
          const data=JSON.parse(patientData);
          const bearerToken = data.token;
               
          const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
          };
          
          try{
            const response=await HttpService(method,patientInfoURL,null,headers);
            console.log("my response"+response.status);
            if(response.status===200){
              setPatientData(response.data);
              console.log(patientData);
            }
            else{
              alert(response.data);
            }
          }catch(error){
            alert(response.data);
          }
        };
        fetchDetails();
        retrieveLanguage();
      },[])  
    

    const deleteAccount=async()=>{
        const deleteAccountURL=webServerUrl+"/suhrud/patient/deletePatient";  
        const sessionData = await AsyncStorage.getItem('patientData');
        const localData=JSON.parse(sessionData);
        const method='DELETE';
        const bearerToken = localData.token;
        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'String', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
        };
        try{
            const response=await HttpService(method,deleteAccountURL,data=null,headers);
            console.log(response.status)
            if(response.status===200){
              console.log("Successful");
              console.log(response.data);
              alert(response.data+". Your Account is Deleted");
              logout();
            }else{
                alert(response.data);
            }  
        }catch(error){
            alert(error.data);
        }
    }

    const logout=async()=>{
        const logoutURL=webServerUrl+"/suhrud/patient/logout";  
        const sessionData = await AsyncStorage.getItem('patientData');
        const localData=JSON.parse(sessionData);
        const method='POST';
        const bearerToken = localData.token;
        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'String', // Specify the content type if needed,
            'ngrok-skip-browser-warning': 'true',
        };
        try{
            const response=await HttpService(method,logoutURL,null,headers);
            console.log(response.status)
            if(response.status===200){
              console.log("Successful");
              console.log(response.data);
              //alert(response.data);
              AsyncStorage.removeItem('patientData');
              navigation.replace("Login");
            }else{
                alert(response.data);
            }  
        }catch(error){
            alert(error.data);
        }
    }

    const handlePress = async(navigateTo, menuItemName) => {
        if(navigateTo==="Logout"){
            logout();
        }
        else if(navigateTo==="Account Deletion"){
            deleteAccount();
        }else{
            navigation.navigate(navigateTo); // Navigate to the specified screen
        }
    };

    const handleEdit = () => {
       
            navigation.navigate("EditProfile", {patientData:patientData}); 
    };

    const menuItems = [
        {
            menuItemImage: securityImage,
            menuItemName: `${i18n.t("settings.securityAndPrivacy")}`,
            imageWidth: 25,
            imageHeight: 25,
            navigateTo: "SecurityPrivacy"
        },
        {
            menuItemImage: logoutImage,
            menuItemName: `${i18n.t("settings.logOut")}`,
            imageWidth: 23,
            imageHeight: 23,
            navigateTo: "Logout"
        },
        {
            menuItemImage: trashImage,
            menuItemName: `${i18n.t("settings.deleteAccount")}`,
            imageWidth: 24,
            imageWidth: 24,
            navigateTo: "Account Deletion"
        },
    ];

    return (
        <ImageBackground source={background} style={styles.imagebackground}>
        <SafeAreaView className="flex-1 relative">
            {/* Settings Container for name and profile picture*/}
            <View className="flex-row p-2 rounded-2xl shadow-lg justify-between mt-10">
                {/* profile picture*/}
                <View className='flex flex-row justify-start'>
                    <View className="m-2 relative items-center justify-center bg-white rounded-full">
                        <Image source={contactImage} className="w-[60px] h-[60px] object-cover rounded-full"/>
                    </View>
                    {/* Username */}
                    <View className="items-center justify-center">
                        <Text style={{ fontFamily: 'Pangolin_400Regular' }} className="text-black text-2xl justify-center">
                            {username}{/* username should be provided here*/}
                        </Text> 
                    </View>
                </View>
                <Image  style={styles.tinyLogo} source={icon_suhrud}/>
            </View>

            {/*Components*/}
            <View className="flex-1 relative rounded-2xl shadow-lg ml-4 mr-12 mt-5 p-3 w-367 h-700">   
                <ScrollView>    
                <Pressable
                               
                                onPress={() => handleEdit()}>
                                <View style={styles.container}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={accountImage}
                                            style={[{ width: 25, height: 25}]}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>
                                            {i18n.t("settings.editProfile")} 
                                        </Text> 
                                    </View>
                                </View>
                            </Pressable>   
                    {menuItems.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => handlePress(item.navigateTo, item.menuItemName)}
                            >
                                <View style={styles.container}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={item.menuItemImage}
                                            style={[{ width: item.imageWidth, height: item.imageHeight}]}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>
                                            {item.menuItemName}
                                        </Text> 
                                    </View>
                                </View>
                            </Pressable>
                    ))}
                </ScrollView>    
            </View>
            <NavigationBar />
        </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: '4%',
      width: '100%', 
      height: 70, 
      marginBottom:'2%',
      marginTop:'2%',
    },
    imageContainer: {
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      width: null,
      height: null,
      opacity:0.8,
    },
    textContainer: {
      justifyContent: 'center',
      width:'100%',
      marginLeft:'8%',
    },
    text: {
      fontFamily: 'Pangolin_400Regular',
      color: 'black',
      fontSize: 20,
    },
    imagebackground:{
        height:'100%',
        resizeMode:'cover',
      },
      tinyLogo: {
        width: 50,
        height: 50,
        marginTop:5,
      },
  });
  
export default Settings