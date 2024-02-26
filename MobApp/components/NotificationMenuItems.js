import { View, Text } from 'react-native'
import React from 'react'

const NotificationMenuItems = ({ menuItemLabel, menuItemContent}) => {
  return (
        <View  className="mt-2 ml-5 mb-5 p-4 justify-center border-2 w-[300px] h-[100px] bg-slate-200 border-[#544C4C] border-opacity-10 rounded-lg">
            <Text style={{ fontFamily: 'System' }} className="font-bold text-lg text-black">
                {menuItemLabel}
            </Text>
            <Text style={{ fontFamily: 'System' }} className="text-lg text-[#544C4C] ">
                {menuItemContent}
            </Text>
        </View>
  )
}

export default NotificationMenuItems