import { View, SafeAreaView, Text, Pressable, ScrollView, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {icon_suhrud, background} from '../assets';


const AnswerQnA = ({route}) => {

  const [newMessage, setNewMessage] = useState('');

  const {questionItem} = route.params;
  console.log("ashmita pageeeeee: ", questionItem);

  const [answers,setAnswers] = useState([
    {answerId:1,answer:"Talk to a friend"},
    {answerId:2, answer:"Watch cat videos or pet any animal"},
    {answerId:3, answer:"Write and vent it out"},
   ]);  


   const getAnswers = async () => {

    const loginURL = webServerUrl+"/suhrud/forum/getAnswerPatient";

        const method='GET';

        const data=null;

        const params={qId:1}
        
        try{

        const sessionData = await AsyncStorage.getItem('patientData');
        const parsedSessionData = JSON.parse(sessionData);

        const bearerToken = parsedSessionData.token;

        console.log("bearer token: ", bearerToken);

        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
        };
        
        const response=await HttpService(method,loginURL,data, headers);
        console.log(response.status)
        
        if(response.status===200){
                
            console.log("Successful");
            console.log(response.data);

            setAllFilterContent(response.data);
            
            try{
                console.log("from storage");

            }catch(error){
                console.log("error while saving data");
                console.log(error);
            }
        }
        
        else{
            alert("error1");

        }
        }catch(error){
            alert(error.data);
            console.log(error);
        }
  };

  useEffect(() => {
    getAnswers();
  },[]);

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
                  <Text className="mt-2 mb-2 justify-center text-sm font-semibold text-black self-start">{questionItem.queryContent}</Text>
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
