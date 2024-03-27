import { SafeAreaView, View, Image, Pressable, TextInput, Text, ScrollView} from 'react-native'
import React, { useState } from 'react';
import { contactImage} from '../assets'
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfile = () => {

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
                            onChangeText={onChangeName}
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
                            onChangeText={onChangeEmail}
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
                            onChangeText={onChangeAddress}
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
                            onChangeText={onChangePhone}
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