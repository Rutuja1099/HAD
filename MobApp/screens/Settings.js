import { Image, View, Text, SafeAreaView, Pressable, StyleSheet, ScrollView} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { contactImage, accountImage, securityImage, notificationImage, logoutImage} from '../assets'
import NavigationBar from '../components/NavigationBar'

const Settings = () => {
    const navigation=useNavigation();
    const handlePress = (navigateTo, menuItemName) => {
        if (navigateTo) {
            navigation.navigate(navigateTo); // Navigate to the specified screen
        }
    };

    // useLayoutEffect(() => {
    //         navigation.setOptions({
    //         headerShown: false,
    //     })
    // },[])

    const [username, setUserName] = useState("Hi Rutuja!!");
    const menuItems = [
        { 
            menuItemImage: accountImage,
            menuItemName: "Your profile",
            imageWidth: 18,
            imageHeight: 27,
            navigateTo: "Profile"
        },
        {
            menuItemImage: notificationImage,
            menuItemName: "Notifications",
            imageWidth: 23,
            imageHeight: 23,
            navigateTo: "Notifications"
        },
        {
            menuItemImage: securityImage,
            menuItemName: "Security and Privacy",
            imageWidth: 18,
            imageHeight: 26,
            navigateTo: "Security and Privacy"
        },
        {
            menuItemImage: logoutImage,
            menuItemName: "Log out",
            imageWidth: 23,
            imageHeight: 23,
            navigateTo: ""
        }
    ];

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
                        {username}{/* username should be provided here*/}
                    </Text> 
                </View>
            </View>

            {/*Components*/}
            <View className="flex-1 relative rounded-2xl shadow-lg ml-4 mr-12 mt-5 p-3 w-367 h-700 bg-[#DDD4D4]">   
                <ScrollView>       
                    {menuItems.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => handlePress(item.navigateTo, item.menuItemName)}
                            >
                                <View style={styles.container}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={item.menuItemImage}
                                            style={[styles.image, { width: item.imageWidth, height: item.imageHeight }]}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>
                                            {item.menuItemName}
                                        </Text> 
                                    </View>
                                </View>
                            </Pressable>
                    ))}
                </ScrollView>    
            </View>
            <NavigationBar />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginVertical: 8,
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
      fontFamily: 'System',
      color: 'black',
      fontSize: 20,
    },
  });
  
export default Settings