import { Pressable, ScrollView, TextInput, StyleSheet, Text, View , Image, ImageBackground} from 'react-native'
import React, {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';
// import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import STORE_LANGUAGE_KEY from '../configurations/Multilingual';

import i18n from '../localization/i18n';

export default function ForgotPassword(props) {

  // const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  let [fontsLoaded] = useFonts({ Pangolin_400Regular,});

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

  useEffect(()=> {
    retrieveLanguage();
  },[])


  const onPressLogin = async() => {
    console.log(email);
    if(!email.trim()){
      alert(`${i18n.t("forgotPassword.enterEmailError")}`);
      return;
    }
    if(!/\S+@\S+\.\S+/.test(email.trim())){
      alert(`${i18n.t("forgotPassword.emailInvalid")}`);
      return;
    }

    const forgotPasswordURL = webServerUrl+"/auth/email/patient?mail="+email;
    const method='POST';
    const headers={'ngrok-skip-browser-warning': 'true',}
    try{
      const response=await HttpService(method,forgotPasswordURL,date=null,headers);
      console.log(response.status)
      if(response.status===200){
        console.log("Successful");
        alert(`${i18n.t("forgotPassword.checkEmail")} `+` `+ `${email}`+` `+ `${i18n.t("forgotPassword.forId")}`);
        props.navigation.navigate("ChangePassword");
      }else{
        alert(response.data);
        setEmail("");
      }
    }catch(error){
        alert(error.data);
        console.log(error);
        setEmail("");
    }  
  }

  return (
    <ImageBackground source={background} style={styles.imagebackground}>
    <ScrollView contentContainerStyle={styles.containerContent}
      style={styles.container}>
      <StatusBar style='auto'/>
      <Image  style={styles.tinyLogo} source={icon_suhrud}/>
      <Text style={styles.title}>{i18n.t("forgotPassword.forgotPassword")}</Text>
      <ScrollView contentContainerStyle={styles.logContent}
      style={styles.logbox}>
        <View style={styles.inputView}>
          <TextInput
              style={styles.inputText}
              placeholder={i18n.t("forgotPassword.emailId")}
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Text style={styles.inputText}> {i18n.t("forgotPassword.enterEmail")}</Text>
  
        <Pressable
            onPress={onPressLogin}
            style={({pressed})=>[styles.LoginBtn,
                {
                backgroundColor: pressed ? '#0619bb' : '#116fdf',
                transform: [{ scale: pressed ? 0.96 : 1 }],
                }
            ]}
            >
            <Text style={styles.loginText}>{i18n.t("forgotPassword.send")}</Text>
        </Pressable>
      </ScrollView>
    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:200,
    position:'relative',
  },
  title:{
    fontSize:40,
    color:"black",
    marginBottom:20,
    marginLeft:40,
    width:'80%',
    fontFamily:"Pangolin_400Regular",
  },
  containerContent:{
      alignItems:'center',
      justifyContent:'center',
      
  },
  inputView:{
    width:"100%",
    backgroundColor:"white",
    borderRadius:20,
    height:50,
    marginBottom:15,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    padding:20,
  },
  inputText:{
    flex:1,
    height:50,
    color:"white",
    fontFamily:"Pangolin_400Regular",
  },
  LoginBtn:{
    width:"40%",
    height:45,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:'5%',
    borderRadius:15,
  },
  loginText:{
    color:"white",
    fontSize:20,
    alignItems:'center',
    justifyContent:'center',
    fontFamily:"Pangolin_400Regular",
  },
  logbox:{
    flex:1,
    flexDirection:"column",
    paddingTop:25,
    paddingBottom:10,
    borderRadius:25,
    position:'relative',
    width:'70%',
    height:'100%',
  },
  logContent:{
    alignItems: 'center',
  },
  imagebackground:{
    height:'100%',
    resizeMode:'cover',
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
})