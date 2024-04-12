import { SafeAreaView, View, Image, Pressable, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { contactImage} from '../assets'
import ProfileMenuItems from '../components/ProfileMenuItems'
import { pencilImage} from '../assets'
import NavigationBar from '../components/NavigationBar'
import { useNavigation } from '@react-navigation/native';
import webServerUrl from '../configurations/WebServer'
import HttpService from '../services/HttpService'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation(); // Get navigation object
  const [patientData,setPatientData]=useState(null);

  const handleEditProfile = () => {
      navigation.navigate("Edit Profile",{patientData}); // Navigate to the specified screen

  };

  useEffect(()=>{
    const fetchDetails=async()=>{
      const patientInfoURL=webServerUrl+"/suhrud/patient/patientInfo";
      const method='GET';
      const sessionData = await AsyncStorage.getItem('patientData')
      const data=JSON.parse(sessionData);
      const bearerToken = data.token;
           
      const headers = {
        'Authorization': `Bearer ${bearerToken}`, // Include your token here
        'Content-Type': 'application/json', // Specify the content type if needed
      };
      
      try{
        const response=await HttpService(method,patientInfoURL,null,headers);
        console.log("my response"+response.status);
        if(response.status===200){
          setPatientData(response.data);
          console.log(patientData);
        }
        else{
          alert(response.data);
        }
      }catch(error){
        alert(response.data);
      }
    };
    fetchDetails();
  },[])  

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {patientData &&
      <>
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
              menuItemContent={patientData.ptFullname}
            />

          {/*Email */}
            <ProfileMenuItems 
              menuItemLabel="Email"
              menuItemContent={patientData.ptEmail}
            />

          {/*Address */}
            <ProfileMenuItems 
              menuItemLabel="Address"
              menuItemContent={patientData.ptAddr}
            />

          {/*Date of birth */}
            <ProfileMenuItems 
              menuItemLabel="Date of Birth"
              menuItemContent={patientData.ptDOB}
            />

          {/*Phone Number*/}
            <ProfileMenuItems 
              menuItemLabel="Phone Number"
              menuItemContent={patientData.ptPhone}
            />
        </ScrollView>
        </View>
        <Pressable onPress={handleEditProfile} className="absolute bottom-20 right-5">
          <Image
            source={pencilImage}
            className="w-[75px] h-[75px]" // Adjust size as needed
          />
        </Pressable>
      </>
      }
            {/* <NavigationBar /> */}
    </SafeAreaView>
  )
}

export default Profile