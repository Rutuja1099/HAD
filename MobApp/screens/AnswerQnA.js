import { View, SafeAreaView, Text, Pressable, ScrollView, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {icon_suhrud, background} from '../assets';


const AnswerQnA = () => {

  const [newMessage, setNewMessage] = useState('');

  const [answers,setAnswers] = useState([
    {answerId:1,answer:"Talk to a friend"},
    {answerId:2, answer:"Watch cat videos or pet any animal"},
    {answerId:3, answer:"Write and vent it out"},
   ]);  

  const scrollViewRef = useRef(null);

  const navigation = useNavigation();


      const renderAnswers = () =>{
       
    
        return answers.map((item, index) =>(
            // Enter <Pressable> element here=> provide the navigate to function for next page
            <Pressable>
              <View key={index} className='flex-row border-opacity-5 h-auto mb-5 pb-3 bg-[#EDEFFF] p-2 rounded-3xl'>
                <Icon
                  name='check'
                  size={50}
                  color='#4DD8CF'
                />
                <View className='flex-col ml-4' style={{ marginLeft: 10, maxWidth: '70%'}}>
                  <Text className="mt-2 mb-2 justify-center text-sm font-semibold text-black self-start">{item.answer}</Text>
                </View>
              </View>
            </Pressable>
          ));
      } 

    const navigateback = () => {
    navigation.navigate("Dashboard");
    };


  return (
    <ImageBackground source={background} style={styles.imagebackground}>

    <SafeAreaView className="flex-1">
      <View className = "flex flex-row mt-12 mx-5 items-center pb-4 justify-between">
        <View className="flex flex-row items-center">
          <Icon name="angle-left" size={30} onPress={navigateback}/>
              
          <Text className = "font-bold text-lg ml-6 text-center" >Q&A Forum</Text>
        </View>
        <Image style={styles.tinyLogo} source={icon_suhrud}/>
      </View>
      <ScrollView
        className = "flex-1 p-4 pb-20"
        ref={scrollViewRef}
        contentOffset={{ y: 1000000 }}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
      >
        <View className="flex-1">
        <Pressable>
              <View className='flex-row border-opacity-5 h-auto bg-[#EDEFFF] p-2 rounded-3xl'>
                <Icon
                  name='tick'
                  size={50}
                  color='#4DD8CF'
                />
                <View className='flex-col ml-4' style={{ marginLeft: 10, maxWidth: '70%'}}>
                  <Text className="mt-2 mb-2 justify-center text-sm font-semibold text-black self-start">How do I deal with depression</Text>
                </View>
              </View>
            </Pressable>
        </View>

        <View className="flex-1 pb-20">
          {renderAnswers()}
        </View>
      </ScrollView>

      
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imagebackground:{
      height:'100%',
      resizeMode:'cover',
    },
    tinyLogo: {
      width: 40,
      height: 40,
      marginTop:5,
    },
});

export default AnswerQnA;
