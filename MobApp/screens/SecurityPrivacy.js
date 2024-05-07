import { View, Text, SafeAreaView, Pressable, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { useNavigation } from '@react-navigation/native';
import {icon_suhrud, background} from '../assets';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { useTranslation } from 'react-i18next';
import i18n from '../localization/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import STORE_LANGUAGE_KEY from '../configurations/Multilingual';


const SecurityPrivacy = () => {

  // const { t, i18n } = useTranslation();

  const navigation = useNavigation();
  const handleSecurityPrivacy = (screenName) => {
    navigation.navigate(screenName);
  };

  const navigateback = () =>{
    navigation.navigate("Settings");
  }

  const retrieveLanguage = async () => {
    try {
        const lang = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
        if (lang) {
            // i18n.changeLanguage(lang);
            i18n.locale = lang;
        }
    } catch (error) {
        console.log("Error retrieving language:", error);
    }
  };

  useEffect(() => {
    retrieveLanguage();
  },[])

  return (
    <ImageBackground source={background} style={styles.imagebackground}>
    <SafeAreaView className="flex-1 relative">
      <View className="flex flex-row mt-12 mx-5 items-center pb-4">
        <Icon name="angle-left" size={30} onPress={navigateback}/>
            
        <Text className = "font-bold text-lg ml-6 text-center" >{i18n.t("securityPrivacy.security")}</Text>
      </View>
      <View className="flex-1">
        <Pressable onPress={() => handleSecurityPrivacy('Password Manager')}>
          <View className="mt-10 ml-5 mb-5 justify-center w-[348px] h-[80px] shadow-lg bg-white rounded-3xl">
                <Text style={{ fontFamily: 'System' }} className="ml-10 text-xl text-black ">{i18n.t("securityPrivacy.passwordManager")}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => handleSecurityPrivacy('PrivacyNotice')}>
          <View className="mt-4 ml-5 mb-5 justify-center w-[348px] h-[80px] shadow-lg bg-white rounded-3xl">
                <Text style={{ fontFamily: 'System' }} className="ml-10 text-xl text-black ">{i18n.t("securityPrivacy.privacyNotice")}</Text>
          </View>
        </Pressable>
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

export default SecurityPrivacy

