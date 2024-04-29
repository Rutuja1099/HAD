import { View, Text, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {icon_suhrud, background} from '../assets';
import { useTranslation } from 'react-i18next';


const PrivacyNotice = () => {

  const { t, i18n } = useTranslation();

  const navigation = useNavigation();
  
  const navigateback = () => {
    navigation.navigate("SecurityPrivacy");
  };

  return (
    <ImageBackground source={background} style={styles.imagebackground}>
    <SafeAreaView className="flex-1 relative">
      <View className="flex flex-row mt-12 mx-5 items-center pb-4">
        <Icon name="angle-left" size={30} onPress={navigateback}/>
            
        <Text className = "font-bold text-lg ml-6 text-center" >{t("privacyNotice.title")}</Text>
      </View>

      <View className="flex-1 text-black pt-2 p-4 mt-4 ml-5 mr-5 mb-4 shadow-lg rounded-lg">
        <ScrollView>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            {t("privacyNotice.subTitle")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
            {t("privacyNotice.heading1")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            {t("privacyNotice.para1")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
            {t("privacyNotice.heading2")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            {t("privacyNotice.para2")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
            {t("privacyNotice.heading3")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            {t("privacyNotice.para3")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
            {t("privacyNotice.heading4")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            {t("privacyNotice.para4")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
            {t("privacyNotice.heading5")}
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
          {t("privacyNotice.para5")}
          </Text>
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


export default PrivacyNotice