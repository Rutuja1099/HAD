import { View, Image } from 'react-native'
import React from 'react'

const NavigationMenuItems = ({ menuItemImage, classProp }) => {
    return (
        <View className="justify-center">
          <Image
            source={menuItemImage}
            className={classProp}
          />
        </View>
    );
}

export default NavigationMenuItems