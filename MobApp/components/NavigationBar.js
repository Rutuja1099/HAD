import { View, Text } from 'react-native'
import React from 'react'
import NavigationMenuItems from './NavigationMenuItems'
import { homeImage, progressImage, moodliftImage, messageImage, settingsImage} from '../assets'

const NavigationBar = () => {
  return (
    <View className="flex-initial basis-20 relative p-3 bg-white">           {/*removed "rounded-2xl w-345 h-52 mt-5 ml-2 mr-10" by saurabh*/}
        <View className="flex-row gap-1 mr-4">
            <NavigationMenuItems 
                menuItemImage={homeImage} // home widget
                classProp="w-[62px] h-[52px] object-contain m-2 ml-1" 
                navigateto = "Home"
            />
            <NavigationMenuItems 
                menuItemImage={progressImage} // progress widget
                classProp="w-[41px] h-[32px] object-contain m-2" 
                navigateto = "Progress"
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
                classProp="w-[41px] h-[34px] object-contain" 
                navigateto = "Settings"
            />             
        </View>
    </View>
  )
}

export default NavigationBar