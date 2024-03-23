import { View, Text, SafeAreaView, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar'

const PasswordManager = () => {
    const [currentPassword, onChangeCurrentPassword] = useState('');
    const [newPassword, onChangeNewPassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');

  return (
    <SafeAreaView className="bg-white flex-1 relative">
        <ScrollView>
            <View className="flex-1 bg-white relative mt-10 ml-4">
                <ScrollView>
                    <View>
                        <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                            Current Password
                        </Text>
                        <View  className="mt-2 ml-5 mb-5 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                            <TextInput 
                                style={{ fontFamily: 'System' }} 
                                className="ml-2 text-lg text-[#544C4C] "
                                onChangeText={onChangeCurrentPassword}
                                value={currentPassword}    
                                secureTextEntry={true}               
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                            New Password
                        </Text>
                        <View  className="mt-2 ml-5 mb-5 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                            <TextInput 
                                style={{ fontFamily: 'System' }} 
                                className="ml-2 text-lg text-[#544C4C] "
                                onChangeText={onChangeNewPassword}
                                value={newPassword}    
                                secureTextEntry={true}               
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
                            Confirm New Password
                        </Text>
                        <View  className="mt-2 ml-5 mb-5 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                            <TextInput 
                                style={{ fontFamily: 'System' }} 
                                className="ml-2 text-lg text-[#544C4C] "
                                onChangeText={onChangeConfirmPassword}
                                value={confirmPassword}    
                                secureTextEntry={true}               
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
                <Pressable onPress={() => console.log('Simple Button pressed')}>
                <View className="mt-4 mb-4 ml-16 w-[221px] h-[41px] items-center justify-center rounded-lg bg-[#4DD8CF]">
                    <Text className=" text-white font-bold text-xl">Change Password</Text>
                </View>
            </Pressable> 
        </ScrollView>    
        {/**Navigation bar */}
        {/* <NavigationBar /> */}
    </SafeAreaView>
  )
}

export default PasswordManager