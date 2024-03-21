import { View, Text } from 'react-native'
import React from 'react'

const ProfileMenuItems = ({ menuItemLabel, menuItemContent}) => {
  return (
    <View>
        <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black ml-5">
            {menuItemLabel}
        </Text>
        <View  className="mt-2 ml-5 mb-5 justify-center border-2 w-[258px] h-[44px] border-[#544C4C] border-opacity-10 rounded-lg">
            <Text style={{ fontFamily: 'System' }} className="ml-2 text-lg text-[#544C4C] ">{menuItemContent}</Text>
        </View>
    </View>
  )
}

export default ProfileMenuItems