import { SafeAreaView, View, Image, Pressable, TextInput, Text, ScrollView, ImageBackground, StyleSheet} from 'react-native'
import React, { useState } from 'react';
import { contactImage, pencilImage} from '../assets'
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import webServerUrl from '../configurations/WebServer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService'
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';


const EditProfile = ({route}) => {

    let [fontsLoaded] = useFonts({ Pangolin_400Regular,});
    const [editable, setEditable] = useState(false);
    const { sessionData} = route.params;


    const [name, onChangeName] = useState(sessionData.ptFullname);
    const [email, onChangeEmail] = useState(sessionData.ptEmail);
    const [address, onChangeAddress] = useState(sessionData.ptAddr);
    const [phone, onChangePhone] = useState(sessionData.ptPhone);
    const [dob, setDob] = useState(new Date(sessionData.ptDOB)); // Date of Birth
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setDob(selectedDate);
        }
    }

    const onEdit = () =>{
        setEditable(true);
    }

    const showMode = (modeToShow) => {
        if(editable)
        {
            setShow(true);
            setMode(modeToShow);
        }
    }

    const navigation=useNavigation();

    const navigateback = () => {
        navigation.navigate("Settings");
    }


    const onPressSave=async()=>{
        if (!name.trim()) {
            alert('Please Enter your Name');
            return false;
        }
        if (!email.trim()) {
            alert('Please Enter your email');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email.trim())) {
            alert('Email is Invalid');
            return false;
        }
        if (!address.trim()) {
            alert('Please Enter your address');
            return false;
        }
        if (!phone.trim()) {
            alert('Please Enter Phone Number');
            return false;
        }
        
        const phoneRegex = /^\d{10}$/;
        
        if (!phoneRegex.test(phone.trim())) {
            alert('Phone number should be numeric and should contain 10 digits');
            return false;
        }
        
        const editProfileURL=webServerUrl+"/suhrud/patient/updatePatient"
        const method='PUT';
        const data={
        ptFullname:name,
        ptPhone:phone,
        ptAddr: address,
        ptDOB: dob.toLocaleDateString(),
        ptEmail: email
        }
        const sessionData = await AsyncStorage.getItem('patientData')
        const localData=JSON.parse(sessionData);
        const bearerToken = localData.token;
           
      const headers = {
        'Authorization': `Bearer ${bearerToken}`, // Include your token here
        'Content-Type': 'application/json', // Specify the content type if needed
      };
        try{
            const response=await HttpService(method,editProfileURL,data,headers);
            console.log(response.status)
            if(response.status===200){
              console.log("Successful");
              alert(response.data);
              navigation.replace("Profile");
            }
            else{
              alert(response.data);
              alert(response);
              console.log(response.data);
            }
          }catch(error){
              alert(error);
              console.log(error);
            }
    }

    return (
        <ImageBackground source={background} style={styles.imagebackground}>
        <View className='flex-row mt-10 p-2 justify-between'>
            <Icon name="angle-left" size={30} onPress={navigateback}/>
            <Image  style={styles.tinyLogo} source={icon_suhrud}/>
        </View>
        <SafeAreaView className=" flex-1 justify-center items-stretch relative">
        
        {/* User profile picture */}
        <View className = "flex flex-row items-end justify-end">
        
        <View className="justify-center  w-[100px] h-[100px] rounded-full mr-28">
            
            <Image
            source={contactImage}
            className="w-[100px] h-[100px] object-cover rounded-full"
            />
        </View>

        <View>
        <Pressable onPress={onEdit} className="bottom-2 right-5">
                <Image
                    source={pencilImage}
                    className="w-10 h-10" // Adjust size as needed
                />
        </Pressable>
        </View>
        
        </View>
        {/**User Information */}{/**Add validations for age and other fields */}
            <View className="flex-1 relative mt-5 ml-4">
            <ScrollView>
            {/**Name */}
                <View>
                    <Text style={{ fontFamily: 'Pangolin_400Regular', fontSize:20}} className=" text-black ml-5">
                        Name
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center bg-white opacity-80 w-80 h-[44px] rounded-lg">
                        <TextInput 
                            readOnly={!editable}
                            style={{ fontFamily: 'Pangolin_400Regular' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={(name)=>onChangeName(name)}
                            value={name}                   
                        />
                    </View>
                </View>
            {/**Email */}
                <View>
                    <Text style={{ fontFamily: 'Pangolin_400Regular', fontSize:20 }} className=" text-black ml-5">
                        Email
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center  w-80 h-[44px]  bg-white opacity-80 rounded-lg">
                        <TextInput 
                            readOnly={!editable}
                            style={{ fontFamily: 'Pangolin_400Regular' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={(email)=>onChangeEmail(email)}
                            value={email}   
                            inputMode="email"                
                        />
                    </View>
                </View>
            {/**Address */}
                <View>
                    <Text style={{ fontFamily: 'Pangolin_400Regular', fontSize:20 }} className=" text-black ml-5">
                        Address
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center  w-80 h-[44px]  bg-white opacity-80 rounded-lg">
                        <TextInput 
                            readOnly={!editable}
                            style={{ fontFamily: 'Pangolin_400Regular' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={(address)=>onChangeAddress(address)}
                            value={address}                  
                        />
                    </View>
                </View>

            {/**Phone number */}
                <View>
                    <Text style={{ fontFamily: 'Pangolin_400Regular', fontSize:20 }} className=" text-black ml-5">
                        Phone Number
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center  w-80 h-[44px]  bg-white opacity-80 rounded-lg">
                        <TextInput 
                            readOnly={!editable}
                            style={{ fontFamily: 'Pangolin_400Regular' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={(phone)=>onChangePhone(phone)}
                            value={phone}  
                            inputMode="numeric"                
                        />
                    </View>
                </View>
            
            {/**DOB */}
                <View>
                    <Text style={{ fontFamily: 'Pangolin_400Regular', fontSize:20 }} className=" text-black ml-5">
                        Date of Birth
                    </Text>
                    <View className="mt-2 ml-5 justify-center  w-80 h-[44px]  bg-white opacity-80 rounded-lg" >
                        <Pressable onPress={() => showMode("date")}>
                            <TextInput
                                className="text-lg text-[#544C4C] "
                                value={dob.toLocaleDateString()} // Display selected date in the input field
                                readOnly={!editable}
                                // editable={false} // Make the input field non-editable
                            />
                        </Pressable>
                            {show && (
                                <DateTimePicker
                                    value={dob}
                                    mode={mode}
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={setDob}
                                    maximumDate={maxDate}
                                    minimumDate={new Date(1950, 0, 1)}
                                />
                            )}
                    </View>
                </View>
                
            </ScrollView>
            </View>
        {/**Save Button */}
        <View className="flex justify-center items-center">
        <Pressable onPress={() => console.log('Simple Button pressed')}>
            <View className=" mb-20 ml-2 w-[150px] h-[41px] items-center justify-center rounded-lg bg-[#116fdf]">
                <Text className=" text-white font-bold text-xl">Save Changes</Text>
            </View>
        </Pressable> 
        </View>      
        </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imagebackground:{
        height:'100%',
      resizeMode:'cover',
      },
      tinyLogo: {
        width: 40,
        height: 40,
      },
    inputText:{
      height:50,
      color:'black',
      fontFamily:'Pangolin_400Regular',
    },
    title:{
        marginTop:20,
        fontFamily:'Pangolin_400Regular',
        fontSize:30,
    },
    pickerText:{
    fontFamily:'Pangolin_400Regular',
    fontSize:20,
    },
    
  })
export default EditProfile