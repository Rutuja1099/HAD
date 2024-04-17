import { View, Text, SafeAreaView, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar'
import webServerUrl from '../configurations/WebServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService'
import { useNavigation } from '@react-navigation/native';

const PasswordManager = () => {
    const [currentPassword, onChangeCurrentPassword] = useState('');
    const [newPassword, onChangeNewPassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');

    const navigation = useNavigation();

    const onPressChangePassword=async()=>{
        if (!newPassword.trim()) {
            alert('Please Enter Password');
            return false;
        }
        if(newPassword.length<6){
            alert('Password Length is less than 6')
            return false;
        }
        if (!newPassword.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/)) {
            alert('Password must contain at least one letter, one number, and one special character');
            return false;
        }
        if(!confirmPassword.trim()){
            alert('Please Enter Confirm Password');
            return false;
        }
        if(newPassword!==confirmPassword){
            alert('Password\'s do not match');
            return false;
        }

        const changePasswordURL=webServerUrl+"/suhrud/patient/passwordUpdation"
        const sessionData = await AsyncStorage.getItem('patientData')
        const localData=JSON.parse(sessionData);
        const bearerToken = localData.token;
        const ptUsername = localData.ptUsername;
        const method='POST';
        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
        };
        const data={
            username:ptUsername,
            currentPassword:currentPassword,
            newPassword:newPassword
        }
        try{
            const response=await HttpService(method,changePasswordURL,data,headers);
            console.log(response.status)
            if(response.status===200){
              console.log("Successful");
              console.log(response.data);
              alert(response.data+". Please Login again with new credentials!!");
              try{
                logout();
              }catch(error){
                console.log("error:"+error);
              }
              navigation.replace("Login");
            }else{
                alert(response.data);
                onChangeConfirmPassword('');
                onChangeCurrentPassword('');
                onChangeNewPassword('');
            }           
        }catch(error){
            alert(error.data);
            onChangeConfirmPassword('');
            onChangeCurrentPassword('');
            onChangeNewPassword('');
        }
    }

    const logout=async()=>{
        const logoutURL=webServerUrl+"/suhrud/patient/logout";  
        const sessionData = await AsyncStorage.getItem('patientData');
        const localData=JSON.parse(sessionData);
        const method='POST';
        const bearerToken = localData.token;
        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'String', // Specify the content type if needed
        };
        try{
            const response=await HttpService(method,logoutURL,data=null,headers);
            console.log(response.status)
            if(response.status===200){
              console.log("Successful");
              console.log(response.data);
              //alert(response.data);
              AsyncStorage.removeItem('patientData');
              navigation.replace("Login");
            }else{
                alert(response.data);
            }  
        }catch(error){
            alert(error.data);
        }
    }

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
                                    onChangeText={(currentPassword)=>onChangeCurrentPassword(currentPassword)}
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
                                    onChangeText={(newPassword)=>onChangeNewPassword(newPassword)}
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
                                    onChangeText={(confirmPassword)=>onChangeConfirmPassword(confirmPassword)}
                                    value={confirmPassword}    
                                    secureTextEntry={true}               
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                    <Pressable onPress={onPressChangePassword}>
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