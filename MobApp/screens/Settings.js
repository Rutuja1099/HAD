import { Image, View, Text, SafeAreaView} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { contactImage, accountImage, securityImage, notificationImage, logoutImage} from '../assets'
import SettingMenuItems from '../components/SettingMenuItems'
import NavigationBar from '../components/NavigationBar'

const Settings = () => {
    const navigation=useNavigation();

    // useLayoutEffect(() => {
    //         navigation.setOptions({
    //         headerShown: false,
    //     })
    // },[])
    return (
        <SafeAreaView className="bg-white flex-1 relative">
            {/* Settings Heading
            <View className="flex-row px-20 justify-center w-258 h-35">
                <Text style={{ fontFamily: 'System' }} className="text-black text-4xl basis-full justify-center pl-2 pt-10">
                    Settings
                </Text>
            </View> */}

            {/* Settings Container for name and profile picture*/}
            <View className="flex-row gap-3 p-2 rounded-2xl shadow-lg ml-4 mr-12 mt-6 w-200 h-81 bg-[#DDD4D4]">
                {/* profile picture*/}
                <View className="m-2 relative items-center justify-center bg-white rounded-full">
                    <Image
                        source={contactImage}
                        className="w-[60px] h-[60px] object-cover rounded-full"
                    />
                </View>
                {/* Username */}
                <View className="items-center justify-center">
                    <Text style={{ fontFamily: 'System' }} className="text-black text-2xl justify-center">
                        Hi Rutuja!! {/* username should be provided here*/}
                    </Text> 
                </View>
            </View>

            {/*Components*/}
            <View className="flex-1 relative rounded-2xl shadow-lg ml-4 mr-12 mt-5 p-3 w-367 h-700 bg-[#DDD4D4]">
                <SettingMenuItems 
                    menuItemImage={accountImage} // Provide the image source
                    menuItemName="Your profile" 
                    classProp="w-[18px] h-[27px] object-contain"
                    navigateTo="Profile"
                /> 
                <SettingMenuItems
                    menuItemImage={notificationImage} // Provide the image source
                    menuItemName="Notifications" // Pass the username as a prop
                    classProp="w-[23px] h-[23px] object-contain"
                    navigateTo="Notifications"
                /> 
                <SettingMenuItems
                    menuItemImage={securityImage} // Provide the image source
                    menuItemName="Security and Privacy" // Pass the username as a propwidth="18px"
                    classProp="w-[18px] h-[26px] object-contain"
                    navigateTo="Security and Privacy"
                /> 
                <SettingMenuItems
                    menuItemImage={logoutImage} // Provide the image source
                    menuItemName="Log out" // Pass the username as a propwidth="18px"
                    classProp="w-[23px] h-[23px] object-contain"
                    navigateTo=""
                />          
            </View>
            <NavigationBar />
        </SafeAreaView>
    )
}

export default Settings