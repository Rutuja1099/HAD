import { Pressable, ScrollView, TextInput, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';

export default function ForgotPassword(props) {

  const [email, setEmail] = useState('');

  const onPressLogin = async() => {
    console.log(email);
    if(!email.trim()){
      alert('Please Enter Email');
      return;
    }
    if(!/\S+@\S+\.\S+/.test(email.trim())){
      alert('Email is Invalid');
      return;
    }

    const forgotPasswordURL = webServerUrl+"/auth/email/patient?mail="+email;
    const method='POST';
    try{
      const response=await HttpService(method,forgotPasswordURL);
      console.log(response.status)
      if(response.status===200){
        console.log("Successful");
        alert(`Please check Email ${email} for id and password`);
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
    <ScrollView contentContainerStyle={styles.containerContent}
      style={styles.container}>
      <StatusBar style='auto'/>
      <Text style={styles.title}>Forgot Password</Text>
      <ScrollView contentContainerStyle={styles.logContent}
      style={styles.logbox}>
        <View style={styles.inputView}>
          <TextInput
              style={styles.inputText}
              placeholder='Email Id'
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setEmail(text)}
          />
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
            <Text style={styles.loginText}>Send</Text>
        </Pressable>
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    paddingTop:200,
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
  inputView:{
    width:"80%",
    backgroundColor:"#3AB4BA",
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
})