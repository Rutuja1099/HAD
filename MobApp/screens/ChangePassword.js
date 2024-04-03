import { Pressable, ScrollView, TextInput, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import webServerUrl from '../configurations/WebServer';
import {LoginInputValidation} from '../services/InputValidation';
import HttpService from '../services/HttpService';

export default function ChangePassword(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [generatedPassword,setGeneratedPassword]=useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSecure, setIsSecure] = useState(true);
    const toggleShowPassword = () => {
        setIsSecure(!isSecure);
    };

    const onPressLogin = async() => {
      const isValid=LoginInputValidation({userName,password})
      if(!isValid)
          return;

      if(!generatedPassword.trim()){
        alert('Please enter the password sent in mail');
        return;
      }

        if(!confirmPassword.trim()){
            alert('Please Enter Confirm Password');
            return;
        }
        if(password!==confirmPassword){
            alert('Password do not match');
            return;
        }
        console.log(userName);
        console.log(password);

        const changePasswordURL = webServerUrl+"/auth/forgotPassword/patient";
        const method='POST';
        const data={
          username:userName,
          currentPassword:generatedPassword,
          newPassword:password
        }

        try{
          const response=await HttpService(method,changePasswordURL,data);
          console.log(response.status)
          if(response.status===200){
            console.log("Successful");
            console.log(response.data);
            props.navigation.navigate("Login");
          }
          else{
              alert(response.data.message);
              setUserName("");
              setPassword("");
          }
        }catch(error){
          alert(error.data.message);
          console.log(error);
          setUserName("");
          setPassword("");
          props.navigation.navigate("Login");
      }

    }
    return (
      <ScrollView contentContainerStyle={styles.containerContent}
        style={styles.container}>
        <StatusBar style='auto'/>
        <Text style={styles.title}>Change Password</Text>
        <Text style={{color:'red'}}>Every field is Required*</Text>
        <ScrollView contentContainerStyle={styles.logContent}
        style={styles.logbox}>
          <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder='Username (sent on mail)'
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setUserName(text)}
                />
            </View>
            <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                secureTextEntry
                placeholder='Password (sent on mail)'
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setGeneratedPassword(text)}
            />
          </View>
            <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                secureTextEntry
                placeholder='Password (min length 6)'
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setPassword(text)}
            />
          </View>
        <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                secureTextEntry={isSecure}
                placeholder='Confirm Password'
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setConfirmPassword(text)}
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
                  backgroundColor: pressed ? '#2A9396' : '#3AB4BA',
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                  }
              ]}
              >
              <Text style={styles.loginText}>Change</Text>
          </Pressable>
        </ScrollView>
      </ScrollView>
    )
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    paddingTop:100,
    position:'relative',
  },
  title:{
    fontWeight:"bold",
    fontFamily:'System',
    fontSize:40,
    color:"black",
    marginBottom:40,
    width:'80%',
  },
  containerContent:{
      alignItems:'center',
      justifyContent:'center',
  },
  title:{
    fontWeight:'bold',
    fontFamily:'System',
    fontSize:50,
    marginTop:20,
    marginBottom:20,
  },
  inputView:{
    width:'80%',
    backgroundColor:'#3AB4BA',
    borderRadius:20,
    borderColor:'blue',
    borderWidth:2,
    height:50,
    marginBottom:13,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    padding:20,
    // flex:1,
  },
  inputText:{
    flex:1,
    height:50,
    color:'white',
    flexDirection:'row',
  },
  LoginBtn:{
    width:"40%",
    backgroundColor:"#3AB4BA",
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginTop:'5%',
    marginBottom:'5%',
    borderColor:'blue',
    borderWidth:2,
    borderRadius:15,
  },
  loginText:{
    color:"black",
    fontSize:20,
    alignItems:'center',
    justifyContent:'center'
  },
  logbox:{
    flex:1,
    backgroundColor:'#F1E9E9',
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
  iconTouchableArea:{
    position:'absolute',
    right:10,
    height:50,
    width:50,
    justifyContent:'center',
    alignItems:'center',
  },
  icon:{
    position:'absolute',
  },
})