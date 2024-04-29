import React from 'react'
import { View, Text, SafeAreaView, ScrollView, ImageBackground, StyleSheet} from 'react-native'
import { Feather } from '@expo/vector-icons';
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {icon_suhrud, background} from '../assets';
import { useTranslation } from 'react-i18next';

const EmergencyContact = () => {

  const { t, i18n } = useTranslation();

  const navigation = useNavigation();
  
  const navigateback = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <ImageBackground source={background} style={styles.imagebackground}>
    <SafeAreaView className="flex-1 relative">
    <View className="flex flex-row mt-12 mx-5 items-center pb-4">
        <Icon name="angle-left" size={30} onPress={navigateback}/>
            
        <Text className = "font-bold text-lg ml-6 text-center" >{t("emergencyContacts.title")}</Text>
      </View>
      <View className="flex-1 text-black pt-50 p-4 mt-20 ml-5 mr-5 mb-4 shadow-lg rounded-lg justify-center items-center">
        <ScrollView>
          <Text style={{ fontFamily: 'System'}} className="text-lg mt-2">
            {t("emergencyContacts.subTitle")}
          </Text>

          <View className="flex-col">
            <View className="flex-row gap-4 mt-4 ml-2">
              <Feather name="phone-call" size={24} color="black" />
              <Text style={{ fontFamily: 'System'}} className="text-lg">
                {t("emergencyContacts.number1")}
              </Text>
            </View>
            <View className="flex-row gap-4 ml-2">
            <Text style={{ fontFamily: 'System'}} className=" text-base font-bold">
              {t("emergencyContacts.heading1")}
              </Text>
            </View>
          </View>
          

          <View className="flex-col">
            <View className="flex-row gap-4 mt-4 ml-2">
              <Feather name="phone-call" size={24} color="black" />
              <Text style={{ fontFamily: 'System'}} className="text-lg">
                {t("emergencyContacts.number2")}
              </Text>
            </View>
            <View className="flex-row gap-4 ml-2">
            <Text style={{ fontFamily: 'System'}} className=" text-base font-bold">
              {t("emergencyContacts.heading2")}
              </Text>
            </View>
          </View>

          <View className="flex-col">
            <View className="flex-row gap-4 mt-4 ml-2">
              <Feather name="phone-call" size={24} color="black" />
              <Text style={{ fontFamily: 'System'}} className="text-lg">
                {t("emergencyContacts.number3")} 
              </Text>
            </View>
            <View className="flex-row gap-4 ml-2">
            <Text style={{ fontFamily: 'System'}} className=" text-base font-bold">
              {t("emergencyContacts.heading3")}
              </Text>
            </View>
          </View>
          
        </ScrollView>
      </View>
      {/* <NavigationBar /> */}
    </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4%',
    width: '100%', 
    height: 70, 
    marginBottom:'2%',
    marginTop:'2%',
  },
  imageContainer: {
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  textContainer: {
    justifyContent: 'center',
    width:'100%',
    marginLeft:'8%',
  },
  text: {
    fontFamily: 'Pangolin_400Regular',
    color: 'black',
    fontSize: 20,
  },
  imagebackground:{
      height:'100%',
      resizeMode:'cover',
    },
    tinyLogo: {
      width: 50,
      height: 50,
      marginTop:5,
    },
});


export default EmergencyContact