import { View, Text, SafeAreaView, TextInput, Pressable, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {icon_suhrud, background} from '../assets';



const PasswordManager = () => {
    const [currentPassword, onChangeCurrentPassword] = useState('');
    const [newPassword, onChangeNewPassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');
    const [isSecure1, setIsSecure1] = useState(true);
    const [isSecure2, setIsSecure2] = useState(true);
    const [isSecure3, setIsSecure3] = useState(true);


    const navigation = useNavigation();

    const navigateback = () =>{
        navigation.navigate("SecurityPrivacy");
      }

      const toggleShowPassword = () => {
        setIsSecure1(!isSecure1);
    };

    const toggleShowNewPassword = () => {
        setIsSecure2(!isSecure2);
    }

    const toggleShowNewPasswordConfirm = () => {
        setIsSecure3(!isSecure3);
    }


  return (
    <ImageBackground source={background} style={styles.imagebackground}>
    <SafeAreaView className="flex relative">

      <View className="flex flex-row mt-12 mx-5 items-center pb-4">
        <Icon name="angle-left" size={30} onPress={navigateback}/>
            
        <Text className = "font-bold text-lg ml-6 text-center" >Change password</Text>
      </View>

        <ScrollView>
            <View className="flex-1 relative mt-10 justify-center items-center px-3">
                    <View className="w-full">
                        <View  className="mt-2 mb-5 justify-center border-b-2 h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                            <TextInput 
                                style={{ fontFamily: 'System' }} 
                                className="ml-2 text-lg text-black "
                                onChangeText={onChangeCurrentPassword}
                                value={currentPassword}    
                                secureTextEntry={isSecure1}  
                                placeholder='Current Password'             
                            />

                            <Pressable 
                                onPress={toggleShowPassword}
                                className="absolute right-1 h-14 w-14 justify-center items-center"
                            >
                                <MaterialCommunityIcons 
                                    name={isSecure1 ? 'eye-off' : 'eye'} 
                                    size={24} 
                                    color="#aaa"
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View className="w-full">
                        {/* <Text style={{ fontFamily: 'System' }} className="text-lg text-black self-center">
                            New Password
                        </Text> */}
                        <View  className="mt-2 mb-5 justify-center border-b-2 h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                            <TextInput 
                                style={{ fontFamily: 'System' }} 
                                className="ml-2 text-lg text-black"
                                onChangeText={onChangeNewPassword}
                                value={newPassword}    
                                secureTextEntry={isSecure2}
                                placeholder='New Password'               
                            />

                            <Pressable 
                                onPress={toggleShowNewPassword}
                                className="absolute right-1 h-14 w-14 justify-center items-center"
                            >
                                <MaterialCommunityIcons 
                                    name={isSecure2 ? 'eye-off' : 'eye'} 
                                    size={24} 
                                    color="#aaa"
                                />
                            </Pressable>

                        </View>
                    </View>
                    <View className="w-full">
                        {/* <Text style={{ fontFamily: 'System' }} className="text-lg text-black self-center">
                            Confirm New Password
                        </Text> */}
                        <View  className="mt-2 mb-5 justify-center border-b-2 h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
                            <TextInput 
                                style={{ fontFamily: 'System' }} 
                                className="ml-2 text-lg text-black"
                                onChangeText={onChangeConfirmPassword}
                                value={confirmPassword}    
                                secureTextEntry={isSecure3}     
                                placeholder='Confirm New Password'          
                            />
                            <Pressable 
                                onPress={toggleShowNewPasswordConfirm}
                                className="absolute right-1 h-14 w-14 justify-center items-center"
                            >
                                <MaterialCommunityIcons 
                                    name={isSecure3 ? 'eye-off' : 'eye'} 
                                    size={24} 
                                    color="#aaa"
                                />
                            </Pressable>
                        </View>
                    </View>
            </View>
            <Pressable onPress={() => console.log('Simple Button pressed')}>
                <View className="mt-4 mb-4 mx-10 h-[41px] items-center justify-center rounded-3xl bg-[#3C3FFF]">
                    <Text className=" text-white font-bold text-xl">Change Password</Text>
                </View>
            </Pressable> 
        </ScrollView>    
        {/**Navigation bar */}
        {/* <NavigationBar /> */}
    </SafeAreaView>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: '4%',
      width: '100%', 
      height: 70, 
      marginBottom:'2%',
      marginTop:'2%',
    },
    imageContainer: {
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      width: null,
      height: null,
    },
    textContainer: {
      justifyContent: 'center',
      width:'100%',
      marginLeft:'8%',
    },
    text: {
      fontFamily: 'Pangolin_400Regular',
      color: 'black',
      fontSize: 20,
    },
    imagebackground:{
        height:'100%',
        resizeMode:'cover',
      },
      tinyLogo: {
        width: 50,
        height: 50,
        marginTop:5,
      },
  });

export default PasswordManager