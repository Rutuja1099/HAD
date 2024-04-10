import { SafeAreaView, View, Image, Pressable, TextInput, Text, ScrollView, ImageBackground, StyleSheet} from 'react-native'
import React, { useState } from 'react';
import { contactImage} from '../assets'
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {

    let [fontsLoaded] = useFonts({ Pangolin_400Regular,});

    const [name, onChangeName] = useState('Rutuja');
    const [email, onChangeEmail] = useState('rutuja@iiitb.ac.in');
    const [address, onChangeAddress] = useState('IIIT Bangalore');
    const [age, onChangeAge] = useState('24');
    const [phone, onChangePhone] = useState('6778788');
    const [dob, setDob] = useState(new Date()); // Date of Birth
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

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

    const navigation=useNavigation();

    const navigateback = () => {
        navigation.navigate("Settings");
    }

    return (
        <ImageBackground source={background} style={styles.imagebackground}>
        <View className='flex-row mt-10 p-2 justify-between'>
            <Icon name="angle-left" size={30} onPress={navigateback}/>
            <Image  style={styles.tinyLogo} source={icon_suhrud}/>
        </View>
        <SafeAreaView className=" flex-1 justify-center items-center relative">
        
        {/* User profile picture */}
        <View className="  justify-center  w-[100px] h-[100px] rounded-full">
            
            <Image
            source={contactImage}
            className="w-[100px] h-[100px] object-cover rounded-full"
            />
        </View>
        {/**User Information */}{/**Add validations for age and other fields */}
            <View className="flex-1 relative mt-5 ml-4">
            <ScrollView>
            {/**Name */}
                <View>
                    <Text style={{ fontFamily: 'Pangolin_400Regular', fontSize:20}} className=" text-black ml-5">
                        Name
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center bg-white opacity-80 w-120 h-[44px] rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'Pangolin_400Regular' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={onChangeName}
                            value={name}                   
                        />
                    </View>
                </View>
            {/**Email */}
                <View>
                    <Text style={{ fontFamily: 'Pangolin_400Regular', fontSize:20 }} className=" text-black ml-5">
                        Email
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center  w-[258px] h-[44px]  bg-white opacity-80 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'Pangolin_400Regular' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={onChangeEmail}
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
                    <View  className="mt-2 ml-5 mb-5 justify-center  w-[258px] h-[44px]  bg-white opacity-80 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'Pangolin_400Regular' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={onChangeAddress}
                            value={address}                  
                        />
                    </View>
                </View>

            {/**Phone number */}
                <View>
                    <Text style={{ fontFamily: 'Pangolin_400Regular', fontSize:20 }} className=" text-black ml-5">
                        Phone Number
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 justify-center  w-[258px] h-[44px]  bg-white opacity-80 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'Pangolin_400Regular' }} 
                            className="ml-2 text-lg text-[#544C4C] "
                            onChangeText={onChangePhone}
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
                    <View className="mt-2 ml-5 justify-center  w-[258px] h-[44px]  bg-white opacity-80 rounded-lg" >
                        <Pressable onPress={() => showMode("date")}>
                            <TextInput
                                className="text-lg ml-2 text-[#544C4C] "
                                value={dob.toDateString()} // Display selected date in the input field
                                editable={false} // Make the input field non-editable
                            />
                        </Pressable>
                            {show && (
                                <DateTimePicker
                                    value={dob}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                    </View>
                </View>
            </ScrollView>
            </View>
        {/**Save Button */}
        <Pressable onPress={() => console.log('Simple Button pressed')}>
            <View className=" mb-20 ml-10 w-[150px] h-[41px] items-center justify-center rounded-lg bg-[#116fdf]">
                <Text className=" text-white font-bold text-xl">Save Changes</Text>
            </View>
        </Pressable>       
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