import { View, Text, SafeAreaView, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {icon_suhrud, background} from '../assets';


const PrivacyNotice = () => {

  const navigation = useNavigation();
  
  const navigateback = () => {
    navigation.navigate("SecurityPrivacy");
  };

  return (
    <ImageBackground source={background} style={styles.imagebackground}>
    <SafeAreaView className="flex-1 relative">
      <View className="flex flex-row mt-12 mx-5 items-center border-b-2 border-dashed pb-4">
        <Icon name="angle-left" size={30} onPress={navigateback}/>
            
        <Text className = "font-bold text-lg ml-6 text-center" >Privacy Notice</Text>
      </View>

      <View className="flex-1 text-black pt-2 p-4 mt-4 ml-5 mr-5 mb-4 shadow-lg rounded-lg">
        <ScrollView>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            Your privacy matters. Here's a summary of how we handle your data:
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
            What We Collect:
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            Personal details, usage data, and insights into your mental health.
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
            How We Use Your Data:
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            To personalize your experience, improve our services, and enhance treatment outcomes.
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
              Data Sharing:
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            We do not sell your data. We may share it with service providers or for legal compliance.      </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
            Your Rights:
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            Access, modify, or delete your data. By using our app, you consent to our privacy practices.
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
            Contact Us:
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg">
            If you have any questions or concerns about your privacy, please reach out to us.
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