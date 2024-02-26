import { SafeAreaView, View, Image, Pressable, TextInput, Text} from 'react-native'
import React, { useState } from 'react';
import { contactImage} from '../assets'
import NavigationBar from '../components/NavigationBar'

const EditProfile = () => {

    const [name, onChangeName] = useState('Rutuja');
    const [email, onChangeEmail] = useState('rutuja@iiitb.ac.in');
    const [address, onChangeAddress] = useState('IIIT Bangalore');
    const [age, onChangeAge] = useState(24);
    const [phone, onChangePhone] = useState(6778788);
    const [dob, setDob] = useState(null); // Date of Birth

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
            {/**Name */}
                <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Name
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 p-4 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'System' }} 
                            className="text-lg text-[#544C4C] "
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
                    <View  className="mt-2 ml-5 mb-5 p-4 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'System' }} 
                            className="text-lg text-[#544C4C] "
                            onChangeText={onChangeEmail}
                            value={email}   
                            inputMode="email-address"                
                        />
                    </View>
                </View>
            {/**Address */}
                <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Address
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 p-4 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'System' }} 
                            className="text-lg text-[#544C4C] "
                            onChangeText={onChangeAddress}
                            value={address}                  
                        />
                    </View>
                </View>

            {/**Age */}
                <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Age
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 p-4 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'System' }} 
                            className="text-lg text-[#544C4C] "
                            onChangeText={onChangeAge}
                            value={age}  
                            inputMode="numeric"                
                        />
                    </View>
                </View>

            {/**Phone number */}
                <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Phone Number
                    </Text>
                    <View  className="mt-2 ml-5 mb-5 p-4 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                        <TextInput 
                            style={{ fontFamily: 'System' }} 
                            className="text-lg text-[#544C4C] "
                            onChangeText={onChangePhone}
                            value={phone}  
                            inputMode="numeric"                
                        />
                    </View>
                </View>
            
            {/**DOB */}
                {/* <View>
                    <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                        Date of Birth
                    </Text>
                    <View >
                        <DatePicker
                            className="mt-2 ml-5 mb-5 p-4 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg"
                            date={dob}
                            mode="date"
                            placeholder="Select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => setDob(date)}
                        />
                    </View>
                </View> */}
            </View>
        {/**Save Button */}
        <Pressable onPress={() => console.log('Simple Button pressed')}>
            <View className="mb-4 ml-16 w-[221px] h-[41px] items-center justify-center rounded-lg bg-[#4DD8CF]">
                <Text className=" text-white font-bold text-xl">Save Changes</Text>
            </View>
        </Pressable>       
        {/**Navigation bar */}
        <NavigationBar />
        </SafeAreaView>
    )
}

export default EditProfile