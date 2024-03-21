import { SafeAreaView, View, Image, Pressable, ScrollView} from 'react-native'
import React from 'react'
import { contactImage} from '../assets'
import ProfileMenuItems from '../components/ProfileMenuItems'
import { pencilImage} from '../assets'
import NavigationBar from '../components/NavigationBar'
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleEditProfile = () => {
      navigation.navigate("Edit Profile"); // Navigate to the specified screen
  };

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View className=" mt-10 ml-28 justify-center bg-[#DDD4D4] w-[100px] h-[100px] rounded-full">
        <Image
          source={contactImage}
          className="w-[100px] h-[100px] object-cover rounded-full"
        />
      </View>

      {/*user profile details */}
      <View className="flex-1 bg-white relative mt-10 ml-4">
        <ScrollView>
        {/*Name */}
          <ProfileMenuItems 
            menuItemLabel="Name"
            menuItemContent="Rutuja"
          />

        {/*Email */}
          <ProfileMenuItems 
            menuItemLabel="Email"
            menuItemContent="rutuja@iiitb.ac.in"
          />

        {/*Address */}
          <ProfileMenuItems 
            menuItemLabel="Address"
            menuItemContent="IIIT Bangalore"
          />

        {/*Date of birth */}
          <ProfileMenuItems 
            menuItemLabel="Age"
            menuItemContent="24"
          />

        {/*Phone Number*/}
          <ProfileMenuItems 
            menuItemLabel="Phone Number"
            menuItemContent="6778788"
          />
      </ScrollView>
      </View>
        <Pressable onPress={handleEditProfile} className="absolute bottom-20 right-5">
          <Image
              source={pencilImage}
              className="w-[75px] h-[75px]" // Adjust size as needed
          />
        </Pressable>
      <NavigationBar />
    </SafeAreaView>
  )
}

export default Profile