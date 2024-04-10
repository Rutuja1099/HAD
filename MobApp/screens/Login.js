import { Pressable, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, ImageBackground, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";
import webServerUrl from '../configurations/WebServer';
import {LoginInputValidation} from '../services/InputValidation';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';


export default function Login(props) {
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isSecure, setIsSecure] = useState(true);

    let [fontsLoaded] = useFonts({
        Pangolin_400Regular,
      });

    const toggleShowPassword = () => {
        setIsSecure(!isSecure);
    };

    const onPressLogin = async () => {
        const isValid=LoginInputValidation({userName,password})
        if(!isValid)
            return;

        const loginURL = webServerUrl+"/auth/login/patient";
        const method='POST';
        const data={
            username:userName,
            password:password
        }
        
        try{
            const response=await HttpService(method,loginURL,data);
            console.log(response.status)
            if(response.status===200){
                console.log("Successful");
                console.log(response.data);
                try{
                    await AsyncStorage.setItem('patientData',JSON.stringify(response.data));

                    console.log("from storage");
                    console.log(await AsyncStorage.getItem('patientData'));

                }catch(error){
                    console.log("error while saving data");
                    console.log(error);
                }
                props.navigation.navigate("Questionnaire");
            }
            else{
                alert(response.data.message);
                setUserName('');
                setPassword('');
            }
        }catch(error){
            alert(error.data.message);
            console.log(error);
            setUserName('');
            setPassword('');
        }
    }

    const onPressForgotPassword = () => {
        console.log("Forgot Password");
        props.navigation.navigate("ForgotPassword");
    }

    const onPressSignUp = () => {
        console.log("Sign Up");
        props.navigation.navigate("SignUp");
    }

    return (
    <ImageBackground source={background} style={styles.imagebackground}>
    <ScrollView contentContainerStyle={styles.containerContent} style={styles.container}>
    <ScrollView contentContainerStyle={styles.logContent} style={styles.logbox}>    
        <Image  style={styles.tinyLogo} source={icon_suhrud}/>
            <Text style={styles.title}>Log In</Text>
      
        <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                placeholder='User Name'
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setUserName(text)}
            />
        </View>
        <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                secureTextEntry={isSecure}
                placeholder='Password'
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setPassword(text)}
            />
            <Pressable 
                onPress={toggleShowPassword}
                style={styles.iconTouchableArea}>
                <MaterialCommunityIcons 
                    name={isSecure ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                />
            </Pressable>
        </View>
        
        <Pressable
            onPress={onPressLogin}
            style={({pressed})=>[styles.LoginBtn,
                {
                backgroundColor: pressed ? '#0619bb' : '#116fdf',
                // transform: [{ scale: pressed ? 0.96 : 1 }],
                }
            ]}>
            <Text style={styles.loginText}>Login</Text>
        </Pressable>
        <Pressable onPress={onPressForgotPassword}>
            <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>
        <View className='flex flex-row'>
        <Text style={styles.inputSignUp}>Do not have an Account?  </Text>
        <Pressable
            onPress={onPressSignUp}>
            <Text style={styles.inputSignUp}>SignUp</Text>
        </Pressable>
        </View>
      </ScrollView>
      
    </ScrollView>
    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:'30%',
        position:'relative',
    },
    imagebackground:{
        flex:1,
        width:'100%',
        height:'100%',
    },
    iconTouchableArea: {
        position: 'absolute',
        right: 10,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },    
    containerContent:{
        alignItems:'center',
        justifyContent:'center',
    },
    icon: { 
        position:'absolute',
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
    logbox:{
        flex:1,
        flexDirection:"column",
        paddingTop:15,
        paddingBottom:10,
        borderRadius:30,
        position:'relative',
        width:'90%',
        height:'100%',
    },
    logContent:{
        alignItems: 'center',
    },
    title:{
        fontFamily:"Pangolin_400Regular",
        fontSize:50,
        color:'#116fdf',
        marginBottom:20,
    },
    inputView:{
        width:"80%",
        backgroundColor:"#F1E9E9",
        borderRadius:20,
        height:50,
        marginBottom:25,
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        padding:20,
        
    },
    inputText:{
        flex:1,
        height:50,
        color:"black",
        marginBottom:2,
        fontFamily:'Pangolin_400Regular',
    },
    LoginBtn:{
        width:"40%",
        backgroundColor:"#116fdf",
        alignItems:"center",
        justifyContent:"center",
        padding:2,
        borderRadius:20,
        marginBottom:10,
    },
    inputSignUp:{
        color:"black",
        fontSize:11,
        marginTop:8,
        fontFamily:'Pangolin_400Regular',
        marginBottom:1,
    },
    forgot:{
        color:"black",
        fontSize:11,
        fontFamily:'Pangolin_400Regular',
        marginBottom:1,
    },
    loginText:{
        color:"white",
        fontSize:25,
        marginBottom:5,
        alignItems:'center',
        justifyContent:'center',
        fontFamily:'Pangolin_400Regular',  
    },
})