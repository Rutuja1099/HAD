import { SafeAreaView, View, Image, Pressable, TextInput, Text, ScrollView} from 'react-native'
import React, { useState } from 'react';
import { contactImage} from '../assets'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import webServerUrl from '../configurations/WebServer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService'

const EditProfile = () => {

    const route = useRoute(); // Get route object
    const { patientData } = route.params; // Access patientData from route parameters
    const navigation = useNavigation();

    const [name, onChangeName] = useState(patientData.ptFullname);
    const [email, onChangeEmail] = useState(patientData.ptEmail);
    const [address, onChangeAddress] = useState(patientData.ptAddr);
    const [phone, onChangePhone] = useState(patientData.ptPhone);
    const [dob, setDob] = useState(new Date(patientData.ptDOB)); // Date of Birth
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

    const showMode = (modeToShow) => {
        setShow(true);
        setMode(modeToShow);
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
        <SafeAreaView className="bg-white flex-1 relative">
        {/* User profile picture */}
        <View className=" mt-10 ml-28 justify-center bg-[#DDD4D4] w-[100px] h-[100px] rounded-full">
            <Image
            source={contactImage}
            className="w-[100px] h-[100px] object-cover rounded-full"
            />
        </View>
        {/**User Information */}{/**Add validations for age and other fields */}
            <View className="flex-1 bg-white relative mt-10 ml-4">
            <ScrollView>
            {/**Name */}
                <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Name
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'System' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={(name)=>onChangeName(name)}
                            value={name}                   
                        />
                    </View>
                </View>
            {/**Email */}
                <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Email
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'System' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={(email)=>onChangeEmail(email)}
                            value={email}   
                            inputMode="email"                
                        />
                    </View>
                </View>
            {/**Address */}
                <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Address
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'System' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={(address)=>onChangeAddress(address)}
                            value={address}                  
                        />
                    </View>
                </View>

            {/**Phone number */}
                <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Phone Number
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'System' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={(phone)=>onChangePhone(phone)}
                            value={phone}  
                            inputMode="numeric"                
                        />
                    </View>
                </View>
            
            {/**DOB */}
                <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Date of Birth
                    </Text>
                    <View className="mt-2 ml-5 mb-5 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg" >
                        <Pressable onPress={() => showMode("date")}>
                            <TextInput
                                className="text-lg text-[#544C4C] "
                                value={dob.toLocaleDateString()} // Display selected date in the input field
                                editable={false} // Make the input field non-editable
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
        <Pressable onPress={onPressSave}>
            <View className="mt-2 mb-4 ml-16 w-[221px] h-[41px] items-center justify-center rounded-lg bg-[#4DD8CF]">
                <Text className=" text-white font-bold text-xl">Save Changes</Text>
            </View>
        </Pressable>       
        {/**Navigation bar */}
        {/* <NavigationBar /> */}
        </SafeAreaView>
    )
}

export default EditProfile