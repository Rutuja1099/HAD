import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const SettingMenuItems = ({ menuItemImage, menuItemName, classProp, navigateTo }) => {
  const navigation = useNavigation(); // Get navigation object

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo); // Navigate to the specified screen
    }
  };

  return (
    <Pressable onPress={handlePress}> {/* Wrap in Pressable to make it clickable */}
      <View className="flex-row gap-4 m-2 relative w-[70px] h-[70px]">
        {/* Menu Item Image */}
        <View className="justify-center">
          <Image
            source={menuItemImage}
            className={classProp}
          />
        </View>
        {/* Menu Item Name */}
        <View className="justify-center">
          <Text style={{ fontFamily: 'System' }} className="text-black text-xl">
            {`${menuItemName}`}
          </Text> 
        </View>
      </View>
    </Pressable>
  );
};

export default SettingMenuItems;
