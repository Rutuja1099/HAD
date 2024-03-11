import { View, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const NavigationMenuItems = ({ menuItemImage, classProp, navigateto }) => {
  
  const navigation=useNavigation();
  
  const handlePress = () => {

      console.log("1", navigateto);
      navigation.navigate(navigateto); // Navigate to the specified screen
    
  };
  
  return (
    <Pressable onPress={handlePress}>
        <View className="justify-center">
          <Image
            source={menuItemImage}
            className={classProp}
          />
        </View>
    </Pressable>
    );
}

export default NavigationMenuItems