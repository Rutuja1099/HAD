import { View, Text, SafeAreaView, Image ,useWindowDimensions,style } from 'react-native'
import React from 'react'
import { homeImage, progressImage, moodliftImage, messageImage, settingsImage} from '../assets'
import Icon from 'react-native-vector-icons/FontAwesome';
const DoctorAppointmentBox=({item, navigation})=>{

    const {id, name, profilePhoto, Days} = item;
    const windowWidth = useWindowDimensions().width;
    
    
    const navigateNext = () => {
        navigation.navigate("DoctorAppointmentDetail", { name, profilePhoto, Days });
    }

 
    return (
        <SafeAreaView className="relative mr-12 justify-between flex-row">
            <SafeAreaView className="flex container bg-gray-200 rounded-3xl m-6 h-48" >
            
            <View className="absolute bottom-0 bg-blue-400 rounded-3xl w-full z-10 h-28" >
            
            <View className="absolute bottom-2 right-2  rounded-full bg-gray-600 text-center px-4 py-2.5 w-14 h-14 ">
                       
                <Icon name="arrow-right" size={30} color="white" className="font-normal" onPress={() => navigateNext()}/>
                        
            </View>
            </View>
            <View className="flex-row justify-between z-10">
                <View className="mt-2 ml-6">
                    <h3><Text className="text-lg">{name}</Text></h3>
                </View>
                <View className="items-end mr-4">
                    <View className="absolute bg-gray-100 w-32 h-32 mt-4 mr-0 rounded-3xl ">
                        <Image source={{ uri: item.profilePhoto }} className = "w-full h-full rounded-3xl" />
                    </View>
                </View>
            </View>
            
          
            
            </SafeAreaView>
        </SafeAreaView>
        
    )

}
export default DoctorAppointmentBox;