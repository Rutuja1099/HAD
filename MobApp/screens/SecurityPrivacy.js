import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { useNavigation } from '@react-navigation/native';

const SecurityPrivacy = () => {
  const navigation = useNavigation();
  const handleSecurityPrivacy = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View className="flex-1">
        <Pressable onPress={() => handleSecurityPrivacy('Password Manager')}>
          <View className="mt-10 ml-5 mb-5 justify-center w-[348px] h-[100px] shadow-lg bg-[#DDD4D4] rounded-lg">
                <Text style={{ fontFamily: 'System' }} className="ml-10 text-xl text-black ">Password Manager</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => handleSecurityPrivacy('Privacy Notice')}>
          <View className="mt-4 ml-5 mb-5 justify-center w-[348px] h-[100px] shadow-lg bg-[#DDD4D4] rounded-lg">
                <Text style={{ fontFamily: 'System' }} className="ml-10 text-xl text-black ">Privacy Notice</Text>
          </View>
        </Pressable>
      </View>
      <NavigationBar />
    </SafeAreaView>  
  )
}

export default SecurityPrivacy

