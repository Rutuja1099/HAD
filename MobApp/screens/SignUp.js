import { Pressable, StyleSheet, Text, TextInput, ScrollView, View, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import webServerUrl from '../configurations/WebServer';
import { SignupInputValidation } from '../services/InputValidation';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';

export default function SignUp(props) {

  let [fontsLoaded] = useFonts({
    Pangolin_400Regular,
  });

  const [isSecure, setIsSecure] = useState(true);

  const toggleShowPassword = () => {
      setIsSecure(!isSecure);
  };

  const onPressSignUp = async () =>{
    const isValid=SignupInputValidation({ name, email, address, phoneNo, userName, gender, password, confirmPassword })

    if(!isValid)
      return;

    const signUpURL = webServerUrl+"/auth/register/patient";
    const method='POST';
    const data={
      ptUsername:userName,
      ptPassword:password,
      ptFullname:name,
      ptPhone:phoneNo,
      ptAddr: address,
      ptDOB: date.toLocaleDateString(),
      ptEmail: email,
      ptGender:gender
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
      const response=await HttpService(method,signUpURL,data);
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
        console.log(response.data.message);
      }
    }catch(error){
        alert(error.data.message);
        console.log(error);
      }
  }

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [address,setAddress]=useState('');
  const [phoneNo,setPhoneNo]=useState('');
  const [date, setDate] = useState(maxDate);
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
    <ImageBackground source={background} style={styles.imagebackground}>
      <Image  style={styles.tinyLogo} source={icon_suhrud}/>
    <ScrollView contentContainerStyle={styles.containerContent} style={styles.container}>
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
                maximumDate={maxDate}
                minimumDate={new Date(1950, 0, 1)}
                />
            )}
            </View>
        <View style={styles.inputView}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerText}>
            <Picker.Item label="Select your gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
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
                backgroundColor: pressed ? '#0619bb' : '#116fdf',
                transform: [{ scale: pressed ? 0.96 : 1 }],
                }
            ]}
            >
            <Text style={styles.signUp}>Sign Up</Text>
        </Pressable>
      </ScrollView>
    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imagebackground:{
    flex:1,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    },
    tinyLogo: {
      width: 50,
      height: 50,
      marginTop:'30%',
    },
  container:{
    flex:1,
    position:'relative',
    width:'100%',
  },
  containerContent:{
    alignItems:'center',
    justifyContent:'center',
  },
  signBox:{
    flex:1,
    flexDirection:"column",
    paddingTop:10,
    paddingBottom:10,
    borderRadius:30,
    position:'relative',
    width:'80%',
    height:'100%',
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
    fontFamily:'Pangolin_400Regular',
    fontSize:30,
  },
  pickerText:{
    fontFamily:'Pangolin_400Regular',
    fontSize:30,
  },
  inputView:{
    width:'100%',
    borderRadius:20,
    height:45,
    marginBottom:13,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    padding:20,
    backgroundColor:'rgba(255,255,255,0.5)',
  },
  inputText:{
    flex:1,
    height:50,
    color:'black',
    flexDirection:'row',
    fontFamily:'Pangolin_400Regular',
  },
  signUp:{
    flex:1,
    color:'white',
    marginTop:5,
    fontFamily:'Pangolin_400Regular',
  },
  picker: {
    width:'100%',
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    fontFamily:'Pangolin_400Regular',
  },
  signUpBtn:{
    width:'40%',
    height:'6%',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'5%',
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
    height: 50,
    marginBottom: 15,
    padding: 20,
    flex: 1, 
  },
  dateText: {
    color: 'black',
    marginLeft: 10, 
    fontFamily:'Pangolin_400Regular',
  },
})