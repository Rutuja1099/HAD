import { Pressable, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";
import webServerUrl from '../configurations/WebServer';
import {LoginInputValidation} from '../services/InputValidation';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isSecure, setIsSecure] = useState(true);

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
                props.navigation.navigate("Week");
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
    <ScrollView contentContainerStyle={styles.containerContent}
    style={styles.container}>
        <StatusBar style="auto" />
      <Text style={styles.title}>LOG IN</Text>
      <ScrollView contentContainerStyle={styles.logContent} style={styles.logbox}>
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
        <Pressable onPress={onPressForgotPassword}>
            <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>
        <Pressable
            onPress={onPressLogin}
            style={({pressed})=>[styles.LoginBtn,
                {
                backgroundColor: pressed ? '#2A9396' : '#3AB4BA',
                transform: [{ scale: pressed ? 0.96 : 1 }],
                }
            ]}
            >
            <Text style={styles.loginText}>Login</Text>
        </Pressable>
        <Text>Do not have an Account?</Text>
        <Pressable
            onPress={onPressSignUp}>
            <Text style={styles.inputSignUp}>SignUp</Text>
        </Pressable>
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        paddingTop:'40%',
        position:'relative',
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
    logbox:{
        flex:1,
        backgroundColor:'#F1E9E9',
        flexDirection:"column",
        paddingTop:25,
        paddingBottom:10,
        borderRadius:30,
        position:'relative',
        width:'70%',
        height:'100%',
    },
    logContent:{
        alignItems: 'center',
    },
    title:{
        fontWeight:"bold",
        fontFamily:'System',
        fontSize:50,
        // color:'#000000',
        marginBottom:40,
    },
    inputView:{
        width:"80%",
        backgroundColor:"#F1E9E9",
        borderRadius:20,
        borderColor:'blue',
        borderWidth:2,
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
        color:"white"
    },
    LoginBtn:{
        width:"40%",
        backgroundColor:"#3AB4BA",
        height:'15%',
        alignItems:"center",
        justifyContent:"center",
        marginTop:'5%',
        marginBottom:'5%',
        borderColor:'blue',
        borderWidth:2,
        borderRadius:15,
    },
    inputSignUp:{
        color:"black",
        fontSize:11,
        marginBottom:'5%',
    },
    forgot:{
        color:"black",
        fontSize:11,
    },
    loginText:{
        color:"black",
        fontSize:20,
        alignItems:'center',
        justifyContent:'center'
    },
})