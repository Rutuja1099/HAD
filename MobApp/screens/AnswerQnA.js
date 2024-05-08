import { View, SafeAreaView, Text, Pressable, ScrollView, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {icon_suhrud, background} from '../assets';
import webServerUrl from '../configurations/WebServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const AnswerQnA = ({route}) => {

  const [newMessage, setNewMessage] = useState('');
  const [upvoteAnswerId, setUpvoteAnswerId] = useState();
  const [flagAnswerId, setFlagAnswerId] = useState();
  const [flagQuestion, setFlagQuestion] = useState();

  const {queId} = route.params;
  console.log("ashmita pageeeeee: ", route.params);

  // const [answers,setAnswers] = useState([
  //   {answerId:1,answer:"Talk to a friend"},
  //   {answerId:2, answer:"Watch cat videos or pet any animal"},
  //   {answerId:3, answer:"Write and vent it out"},
  //  ]); 
   
   const [answers,setAnswers] = useState([]); 


   const getAnswers = async () => {

    const loginURL = webServerUrl+`/suhrud/forum/getAnswerPatient?qId=${queId.queryId}`;

        const method='GET';

        const data=null;
        
        try{

        const sessionData = await AsyncStorage.getItem('patientData');
        const parsedSessionData = JSON.parse(sessionData);

        const bearerToken = parsedSessionData.token;

        console.log("bearer token: ", bearerToken);

        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
        };
        
        const response=await HttpService(method,loginURL,data, headers);
        console.log(response.status)
        
        if(response.status===200){
                
            console.log("Successful");
            console.log(response.data);

            setAnswers(response.data);
            
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
            alert("error.data");
            console.log(error);
        }
  };


  const upvoteCountChange = async (answerId) => {
    const loginURL = webServerUrl+`/suhrud/forum/upVoteAnswer?answerId=${answerId}`;

        const method='PUT';

        const data=null;
        
        try{

        const sessionData = await AsyncStorage.getItem('patientData');
        const parsedSessionData = JSON.parse(sessionData);

        const bearerToken = parsedSessionData.token;

        console.log("bearer token: ", bearerToken);

        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
        };
        
        const response=await HttpService(method,loginURL,data, headers);
        console.log(response.status)
        
        if(response.status===200){
                
            console.log("Successful");
            console.log(response.data);

            setUpvoteAnswerId(answerId);
            
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
            alert("error.data");
            console.log(error);
        }
  }


  const flagCountChange = async (answerId) => {
    const loginURL = webServerUrl+`/suhrud/forum/flagAnswer?answerId=${answerId}`;

        const method='PUT';

        const data=null;
        
        try{

        const sessionData = await AsyncStorage.getItem('patientData');
        const parsedSessionData = JSON.parse(sessionData);

        const bearerToken = parsedSessionData.token;

        console.log("bearer token: ", bearerToken);

        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
        };
        
        const response=await HttpService(method,loginURL,data, headers);
        console.log(response.status)
        
        if(response.status===200){
                
            console.log("Successful");
            console.log(response.data);

            setFlagAnswerId(answerId);
            
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
            alert("error.data");
            console.log(error);
        }
  }

  const flagQuestionCount = async (qId) => {
    const loginURL = webServerUrl+`/suhrud/forum/flagQuestion?queryId=${qId}`;

        const method='PUT';

        const data=null;
        
        try{

        const sessionData = await AsyncStorage.getItem('patientData');
        const parsedSessionData = JSON.parse(sessionData);

        const bearerToken = parsedSessionData.token;

        console.log("bearer token: ", bearerToken);

        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
        };
        
        const response=await HttpService(method,loginURL,data, headers);
        console.log(response.status)
        
        if(response.status===200){
                
            console.log("Successful");
            console.log(response.data);

            setFlagQuestion(true);
            
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
            alert("error.data");
            console.log(error);
        }
  }

  useEffect(() => {
    getAnswers();
  },[]);

  const scrollViewRef = useRef(null);

  const navigation = useNavigation();


      const renderAnswers = () =>{
       
    
        return answers.map((item, index) =>(
            // Enter <Pressable> element here=> provide the navigate to function for next page
            <Pressable key={index}>
              <View key={index} className='flex-row border-opacity-5 h-auto mb-5 pb-3 bg-[#EDEFFF] p-2 rounded-3xl items-center'>
                {/* <Icon
                  name='check'
                  size={50}
                  color='#4DD8CF'
                /> */}

                <Icon name='envelope-o' color='gray' size={20} />

                <View className='flex-col ml-4' style={{ marginLeft: 10, maxWidth: '70%'}}>
                  <Text className="mt-2 mb-2 justify-center text-sm font-semibold text-black self-start">{item.answerContent}</Text>
                </View>

                <View className = "w-full">
                
                  {
                    upvoteAnswerId!== item.answerId
                    ?
                    (
                      <AntDesign name="upcircleo" size={24} color="black" onPress={ () => upvoteCountChange(item.answerId) } />
                    )
                    :
                    (
                      <AntDesign name="upcircle" size={24} color="black"/>
                    )
                  }

                  {
                    flagAnswerId!==item.answerId
                    ?
                    (
                      <Ionicons name="flag-outline" size={24} color="black" onPress={()=>flagCountChange(item.answerId)}/>
                    )
                    :
                    (
                      <Ionicons name="flag" size={24} color="black"/>
                    )
                  }
                  
                  

                  

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
              <View className='flex-row border-opacity-5 h-auto bg-[#EDEFFF] p-2 rounded-3xl mb-5'>
                {/* <Icon
                  name='tick'
                  size={50}
                  color='#4DD8CF'
                /> */}
                <View className='flex-col ml-4' style={{ marginLeft: 10, maxWidth: '80%'}}>
                  <Text className="mt-2 mb-2 justify-center text-sm font-semibold text-black self-start">{queId.queryContent}</Text>
                </View>

                  {
                    !flagQuestion
                    ?
                    (
                      <Ionicons name="flag-outline" size={24} color="black" onPress={()=>flagQuestionCount(queId.queryId)}/>
                    )
                    :
                    (
                      <Ionicons name="flag" size={24} color="black"/>
                    )
                  }


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
