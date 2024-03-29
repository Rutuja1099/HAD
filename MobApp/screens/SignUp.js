import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import webServerUrl from '../configurations/WebServer';

export default function SignUp(props) {

  const [isSecure, setIsSecure] = useState(true);

  const toggleShowPassword = () => {
      setIsSecure(!isSecure);
  };

  const onPressSignUp = async () =>{
    if(!name.trim()){
      alert('Please Enter your Name');
      return;
    }
    if(!email.trim()){
      alert('Please Enter your email');
      return;
    }
    if(!/\S+@\S+\.\S+/.test(email.trim())){
      alert('Email is Invalid');
      return;
    }
    if(!address.trim()){
      alert('Please Enter your address');
      return;
    }
    if(!phoneNo.trim()){
      alert('Please Enter Phone Number');
      return;
    }
    if(!userName.trim()){
      alert('Please Enter Username');
      return;
    }
    if(!gender.trim())
    {
      alert('Please Select Gender');
      return;
    }
    if(userName.trim().length<4)
    {
      alert('Username Length is less than 4');
      return;
    }
    if(!password.trim()){
      alert('Please Enter Password');
      return;
    }
    if(password.length<6){
      alert('Password Length is less than 6');
      return;
    }
    if(!confirmPassword.trim()){
      alert('Please Enter Confirm Password');
      return;
    }
    if(password!==confirmPassword){
      alert('Passwords do not match');
      return
    }
    // alert('Success');
    console.log(name);
    console.log(email);
    console.log(address);
    console.log(phoneNo);
    console.log(date.toLocaleDateString());
    console.log(userName);
    console.log(password);
    console.log(gender);
    console.log("Sign Up");
    try{
      const  register=webServerUrl+"/auth/register/patient";
      const response = await axios.post(register,{
        ptUsername:userName,
        ptPassword:password,
        ptFullname:name,
        ptPhone:phoneNo,
        ptAddr: address,
        ptDOB: date.toLocaleDateString(),
        ptEmail: email,
        ptGender:gender
      });
      console.log(response.data);
      props.navigation.navigate("Week");
    }
    catch(error){
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
    // props.navigation.navigate("Week");
  }
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [address,setAddress]=useState('');
  const [phoneNo,setPhoneNo]=useState('');
  const [date, setDate] = useState(new Date());
  const [userName, setUserName]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const[mode,setMode]=useState("date");
  const[show,setShow] =useState(false);
  const [gender,setGender] =useState('Male');

  const onChangeDate = (e,selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  }

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  }

  return (
    <ScrollView contentContainerStyle={styles.containerContent}
    style={styles.container}>
      <StatusBar style='auto'/>
      <Text style={styles.title}>SIGN UP</Text>
      <Text style={{color:'red'}}>Every field is Required*</Text>
      <ScrollView contentContainerStyle={styles.signContent} style={styles.signBox}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Full Name'
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Email Id'
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Address'
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Phone Number'
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPhoneNo(text)}
          />
        </View>
        <View style={styles.inputView}>
        <Text style={styles.inputText} className="mt-8">
                DOB: {date.toLocaleDateString()}
                </Text>
            <Pressable onPress={() => showMode('date')} style={styles.iconTouchableArea}>
                <MaterialCommunityIcons
                name="calendar-month"
                size={24}
                color="black"
                style={styles.calendarIcon}
                />
            </Pressable>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="spinner"
                onChange={onChangeDate}
                maximumDate={new Date()}
                minimumDate={new Date(1950, 0, 1)}
                />
            )}
            </View>
        {/* ========== */}
        <View style={styles.inputView}>
          <RNPickerSelect
            onValueChange={(value) => setGender(value)} // Replace with your setGender function
            items={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
            ]}
            style={styles.inputText}
            placeholder={{ label: "Select your gender", value: "Male" }}
            Icon={() => <MaterialCommunityIcons name="gender-male-female" size={24} color="gray" />}
          />
        </View>
        {/* ======= */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Username (min length 4)'
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setUserName(text)}
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
            onPress={onPressSignUp}
            style={({pressed})=>[styles.signUpBtn,
                {
                backgroundColor: pressed ? '#2A9396' : '#3AB4BA',
                transform: [{ scale: pressed ? 0.96 : 1 }],
                }
            ]}
            >
            <Text style={styles.signUp}>Sign Up</Text>
        </Pressable>
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    paddingTop:'10%',
    // position:'absolute',
  },
  containerContent:{
    alignItems:'center',
    justifyContent:'center',
  },
  signBox:{
    flex:1,
    backgroundColor:'#F1E9E9',
    flexDirection:"column",
    paddingTop:25,
    paddingBottom:10,
    borderRadius:30,
    position:'relative',
    width:'70%',
    height:'100%',
    // alignItems: 'center',
  },
  signContent:{
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
  signUpBtn:{
    width:'40%',
    backgroundColor:'#3AB4BA',
    height:'5%',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'5%',
    marginBottom:'5%',
    borderColor:'blue',
    borderWidth:2,
    borderRadius:15,
  },
  dateView: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3AB4BA',
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 2,
    height: 50,
    marginBottom: 15,
    padding: 20,
    flex: 1, 
  },
  dateText: {
    color: 'white',
    marginLeft: 10, 
  },
})