import { Image, View, Text, SafeAreaView, Pressable, StyleSheet, ScrollView, Alert} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, View, Text, SafeAreaView, Pressable, StyleSheet, ScrollView, ImageBackground} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { contactImage, accountImage, securityImage, notificationImage, logoutImage, trashImage} from '../assets'
import NavigationBar from '../components/NavigationBar'
import webServerUrl from '../configurations/WebServer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService'
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';

const Settings = () => {

    let [fontsLoaded] = useFonts({ Pangolin_400Regular,});
    const navigation=useNavigation();
    const [username, setUserName] = useState("");

    useEffect(()=>{
        const fetchUsername=async()=>{
            const sessionData = await AsyncStorage.getItem('patientData');
            const localData=JSON.parse(sessionData);
            setUserName("Hi "+localData.ptUsername+"!!");
        };
        fetchUsername();
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
            'Content-Type': 'String', // Specify the content type if needed
        };
        try{
            const response=await HttpService(method,logoutURL,data=null,headers);
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

    const menuItems = [
        { 
            menuItemImage: accountImage,
            menuItemName: "Your profile",
            imageWidth: 18,
            imageHeight: 27,
            navigateTo: "Profile"
        },
        {
            menuItemImage: securityImage,
            menuItemName: "Security and Privacy",
            imageWidth: 35,
            imageHeight: 30,
            navigateTo: "SecurityPrivacy"
        },
        {
            menuItemImage: logoutImage,
            menuItemName: "Log out",
            imageWidth: 23,
            imageHeight: 23,
            navigateTo: "Logout"
        },
        {
            menuItemImage: trashImage,
            menuItemName: "Delete Account",
            imageWidth: 24,
            imageWidth: 24,
            navigateTo: "Account Deletion"
        },
    ];

    return (
        <ImageBackground source={background} style={styles.imagebackground}>
        <SafeAreaView className="flex-1 relative">
        and 
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
                    {menuItems.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => handlePress(item.navigateTo, item.menuItemName)}
                            >
                                <View style={styles.container}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={item.menuItemImage}
                                            style={[styles.image, { width: item.imageWidth, height: item.imageHeight, tintColor: 'grey'}]}
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