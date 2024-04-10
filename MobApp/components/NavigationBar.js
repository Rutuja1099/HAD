import { View, Text } from 'react-native'
import React from 'react'
import NavigationMenuItems from './NavigationMenuItems'
import { homeImage, progressImage, moodliftImage, messageImage, settingsImage} from '../assets'

import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


import { useNavigation, useRoute } from '@react-navigation/native';


const NavigationBar = () => {

    const navigation = useNavigation();
    const route = useRoute();

    console.log("route nameeeee:",route.name);

  return (
    <View className="flex-row relative py-3 px-6 bg-white justify-between items-center">        
            {/* <NavigationMenuItems 
                menuItemImage={homeImage} // home widget
                classProp="w-[62px] h-[52px] object-contain m-2" 
                navigateto = "Dashboard"
            />
            <NavigationMenuItems 
                menuItemImage={progressImage} // progress widget
                classProp="w-[41px] h-[32px] object-contain m-2" 
                navigateto = "Week"
            />
            <NavigationMenuItems 
                menuItemImage={moodliftImage} // moodlift widget
                classProp="w-[42px] h-[37px] object-contain m-2" 
                navigateto = "Wellness Hub"
            />
            <NavigationMenuItems 
                menuItemImage={messageImage} // message widget
                classProp="w-[62px] h-[52px] object-contain m-2" 
                navigateto = "ChatList"
            />  
            <NavigationMenuItems 
                menuItemImage={settingsImage} // settings widget
                classProp="w-[41px] h-[34px] object-contain m-2" 
                navigateto = "Settings"
            />              */}

            
            {
                route.name === "Dashboard" 
            ? 
                (
                    <Entypo name="home" size={26} color="black" />
                )
            :
                (
                    <AntDesign name="home" size={26} color="black" onPress={() => navigation.navigate("Dashboard")}/>
                )
            }
            

            <MaterialCommunityIcons name="progress-clock" size={26} color="black" onPress={() => navigation.navigate("Week")}/>

            {/* this is for Meditation vala page */}
            {/* <MaterialIcons name="mood" size={24} color="black" /> */}


            {/* this is for forum */}
            <AntDesign name="questioncircleo" size={26} color="black" onPress={() => navigation.navigate("Wellness Hub")}/>



            {
                route.name === "ChatList" 
            ? 
                (
                    <Ionicons name="chatbox" size={24} color="black" />
                )
            :
                (
                    <Ionicons name="chatbox-outline" size={26} color="black" onPress={() => navigation.navigate("ChatList")}/>
                )
            }


{
                route.name === "Settings" 
            ? 
                (
                    <Ionicons name="settings" size={26} color="black" />
                )
            :
                (
                    <Ionicons name="settings-outline" size={26} color="black" onPress={() => navigation.navigate("Settings")}/>
                )
            }



    </View>
  )
}

export default NavigationBar