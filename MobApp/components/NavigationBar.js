import { View, Text } from 'react-native'
import React from 'react'
import NavigationMenuItems from './NavigationMenuItems'
import { homeImage, progressImage, moodliftImage, messageImage, settingsImage} from '../assets'

const NavigationBar = () => {
  return (
    <View className="flex-row relative p-3 bg-white justify-center justify-between items-center">        
            <NavigationMenuItems 
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
                navigateto = "moodlift"
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
            />             
    </View>
  )
}

export default NavigationBar