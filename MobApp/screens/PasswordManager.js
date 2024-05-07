import { View, Text, SafeAreaView, TextInput, Pressable, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar'
import webServerUrl from '../configurations/WebServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {icon_suhrud, background} from '../assets';
// import { useTranslation } from 'react-i18next';

import i18n from '../localization/i18n';

import STORE_LANGUAGE_KEY from '../configurations/Multilingual';

const PasswordManager = () => {

    // const { t, i18n } = useTranslation();

    const [currentPassword, onChangeCurrentPassword] = useState('');
    const [newPassword, onChangeNewPassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');
    const [isSecure1, setIsSecure1] = useState(true);
    const [isSecure2, setIsSecure2] = useState(true);
    const [isSecure3, setIsSecure3] = useState(true);



    const navigateback = () =>{
        navigation.navigate("SecurityPrivacy");
      }

      const toggleShowPassword = () => {
        setIsSecure1(!isSecure1);
    };

    const toggleShowNewPassword = () => {
        setIsSecure2(!isSecure2);
    }

    const toggleShowNewPasswordConfirm = () => {
        setIsSecure3(!isSecure3);
    }


    const navigation = useNavigation();
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
        retrieveLanguage();
    },[])

    const onPressChangePassword=async()=>{
        if (!newPassword.trim()) {
            alert('Please Enter Password');
            return false;
        }
        if(newPassword.length<6){
            alert('Password Length is less than 6')
            return false;
        }
        if (!newPassword.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/)) {
            alert('Password must contain at least one letter, one number, and one special character');
            return false;
        }
        if(!confirmPassword.trim()){
            alert('Please Enter Confirm Password');
            return false;
        }
        if(newPassword!==confirmPassword){
            alert('Password\'s do not match');
            return false;
        }

        const changePasswordURL=webServerUrl+"/suhrud/patient/passwordUpdation"
        const sessionData = await AsyncStorage.getItem('patientData')
        const localData=JSON.parse(sessionData);
        const bearerToken = localData.token;
        const ptUsername = localData.ptUsername;
        const method='POST';
        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
        };
        const data={
            username:ptUsername,
            currentPassword:currentPassword,
            newPassword:newPassword
        }
        try{
            const response=await HttpService(method,changePasswordURL,data,headers);
            console.log(response.status)
            if(response.status===200){
              console.log("Successful");
              console.log(response.data);
              alert(response.data+". Please Login again with new credentials!!");
              try{
                logout();
              }catch(error){
                console.log("error:"+error);
              }
              navigation.replace("Login");
            }else{
                alert(response.data);
                onChangeConfirmPassword('');
                onChangeCurrentPassword('');
                onChangeNewPassword('');
            }           
        }catch(error){
            alert(error.data);
            onChangeConfirmPassword('');
            onChangeCurrentPassword('');
            onChangeNewPassword('');
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
            'ngrok-skip-browser-warning': 'true'
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

 
  return (
    <ImageBackground source={background} style={styles.imagebackground}>
    <SafeAreaView className="flex relative">

      <View className="flex flex-row mt-12 mx-5 items-center pb-4">
        <Icon name="angle-left" size={30} onPress={navigateback}/>
            
        <Text className = "font-bold text-lg ml-6 text-center" >{i18n.t("passwordManager.title")}</Text>
      </View>

        <ScrollView>
            <View className="flex-1 relative mt-10 justify-center items-center px-3">
                    <View className="w-full">
                        <View  className="mt-2 mb-5 justify-center border-b-2 h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                            <TextInput 
                                style={{ fontFamily: 'System' }} 
                                className="ml-2 text-lg text-black "
                                onChangeText={onChangeCurrentPassword}
                                value={currentPassword}    
                                secureTextEntry={isSecure1}  
                                placeholder={i18n.t("passwordManager.currentPassword")}             
                            />

                            <Pressable 
                                onPress={toggleShowPassword}
                                className="absolute right-1 h-14 w-14 justify-center items-center"
                            >
                                <MaterialCommunityIcons 
                                    name={isSecure1 ? 'eye-off' : 'eye'} 
                                    size={24} 
                                    color="#aaa"
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View className="w-full">
                        {/* <Text style={{ fontFamily: 'System' }} className="text-lg text-black self-center">
                            New Password
                        </Text> */}
                        <View  className="mt-2 mb-5 justify-center border-b-2 h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                            <TextInput 
                                style={{ fontFamily: 'System' }} 
                                className="ml-2 text-lg text-black"
                                onChangeText={onChangeNewPassword}
                                value={newPassword}    
                                secureTextEntry={isSecure2}
                                placeholder={i18n.t("passwordManager.newPassword")}             
                            />

                            <Pressable 
                                onPress={toggleShowNewPassword}
                                className="absolute right-1 h-14 w-14 justify-center items-center"
                            >
                                <MaterialCommunityIcons 
                                    name={isSecure2 ? 'eye-off' : 'eye'} 
                                    size={24} 
                                    color="#aaa"
                                />
                            </Pressable>

                        </View>
                    </View>
                    <View className="w-full">
                        {/* <Text style={{ fontFamily: 'System' }} className="text-lg text-black self-center">
                            Confirm New Password
                        </Text> */}
                        <View  className="mt-2 mb-5 justify-center border-b-2 h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                            <TextInput 
                                style={{ fontFamily: 'System' }} 
                                className="ml-2 text-lg text-black"
                                onChangeText={onChangeConfirmPassword}
                                value={confirmPassword}    
                                secureTextEntry={isSecure3}     
                                placeholder={i18n.t("passwordManager.confirmPassword")}          
                            />
                            <Pressable 
                                onPress={toggleShowNewPasswordConfirm}
                                className="absolute right-1 h-14 w-14 justify-center items-center"
                            >
                                <MaterialCommunityIcons 
                                    name={isSecure3 ? 'eye-off' : 'eye'} 
                                    size={24} 
                                    color="#aaa"
                                />
                            </Pressable>
                        </View>
                    </View>
            </View>
            <Pressable onPress={() => onPressChangePassword()}>
                <View className="mt-4 mb-4 mx-10 h-[41px] items-center justify-center rounded-3xl bg-[#3C3FFF]">
                    <Text className=" text-white font-bold text-xl">{i18n.t("passwordManager.changeBtn")} </Text>
                </View>
            </Pressable> 
        </ScrollView>    
        {/**Navigation bar */}
        {/* <NavigationBar /> */}
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

export default PasswordManager