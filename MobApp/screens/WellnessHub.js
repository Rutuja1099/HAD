import { View, SafeAreaView, Text, Pressable, ScrollView, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService'
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';
import webServerUrl from '../configurations/WebServer';

const WellnessHub = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filters = ["All", "My Queries"];
  const [newMessage, setNewMessage] = useState('');

 
  const [allFilterContent, setAllFilterContent] = useState([]);
  const [myQueriesContent, setMyQueriesContent] = useState([]);


  const scrollViewRef = useRef(null);

  const navigation = useNavigation();



  const getAllQuestions = async () => {

    const loginURL = webServerUrl+"/suhrud/forum/getAllQuestion";

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

  const getMyQuestions = async () => {
    
    const loginURL = webServerUrl+"/suhrud/forum/getMyQuestions";

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
        };
        
        const response=await HttpService(method,loginURL,data, headers);
        console.log(response.status)
        
        if(response.status===200){
                
            console.log("Successful");
            console.log(response.data);

            setMyQueriesContent(response.data);
            
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

  const postQuestion = async () => {

    const loginURL = webServerUrl+`/suhrud/forum/postQuestion?question=${newMessage}`;

        const method='POST';

        const data = newMessage;

        try{

          const sessionData = await AsyncStorage.getItem('patientData');
          const parsedSessionData = JSON.parse(sessionData);
  
          const bearerToken = parsedSessionData.token;

            console.log("bearer token: ", bearerToken);

            const headers = {
                'Authorization': `Bearer ${bearerToken}`, // Include your token here
                'Content-Type': 'text/plain', // Specify the content type if needed
            };
            const response=await HttpService(method, loginURL, data, headers);
            console.log(response.status)
            
            if(response.status===200){
                    
                console.log("Successful");
                console.log(response.data);
            }
            
            else{
                alert("response not 200");
            }
        }
        catch(error){
            alert(error.data);
            console.log(error);
        }
  };


  const openQuestion = (item) => {
    navigation.navigate("AnswerQnA", {item});
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollViewRef.current.scrollToEnd({ animated: false });
}, [newMessage]);

  useEffect(() => {
    getAllQuestions();
    getMyQuestions();
  },[]);

  // Function to render questions based on selected filter
  const renderQuestions = () =>{
    let filteredContent = selectedFilter === "All" ? allFilterContent : myQueriesContent;
    
    if (newMessage.trim() !== '') {
      // If search query is not empty, filter the content based on the search query
      const regex = new RegExp(newMessage, 'i'); 
      filteredContent = filteredContent.filter(item => regex.test(item.queryContent)
      );
    }

    //if search result is empty
    if (filteredContent.length === 0) {
      return (
        <View className='flex-row border-b-2 border-[#F4F2F1] border-opacity-5 m-5 h-auto'style={{ maxWidth: '80%' }}>
          <Text className='mb-2 justify-center text-sm font-semibold text-[#573926]'>No matching queries found</Text>
        </View>
      );
    }

    return filteredContent.map((item, index) =>(
        // Enter <Pressable> element here=> provide the navigate to function for next page
        <Pressable onPress={(item) => openQuestion(item)}>
          <View key={index} className='flex-row border-opacity-5 h-auto mb-5 pb-3 bg-[#EDEFFF] p-2 rounded-3xl'>
            <Icon
              name='user-circle'
              size={50}
              color='#4DD8CF'
            />
            <View className='flex-col ml-4' style={{ marginLeft: 10, maxWidth: '70%'}}>
              <Text className="mt-2 mb-2 justify-center text-sm font-semibold text-black self-start">{item.queryContent}</Text>
              <View className='flex-row mb-2 mt-1'>
                  <Icon name='envelope-o' color='gray' size={20} />
                  <Text className="ml-1">{item.answers}</Text>
                  <Text className="ml-10 mt-1 mr-1 text-xs text-gray-500 self-start text-right">{calculateTimeDifference(item.questionTimestamp)}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      ));
  } 

  //handle filter click
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  }

  // sending queries
  const [messages, setMessages] = useState([
    { text: 'Hello!', time: '10:00 AM'},
    { text: 'Hi there!', time: '10:05 AM'},
  ]);

  const calculateTimeDifference = (messageTime) => {
    const currentTime = new Date();
    const messageDate = new Date(messageTime);

    const differenceInMilliseconds = Math.abs(currentTime - messageDate);
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } if(seconds===0){
      return `now`;
    }
    else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
};


  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const currentTime = new Date().toString(); // Get current time in ISO format
    const newQuestion = {
      queryId: allFilterContent.length + 1, // Increment questionId for each new question
      queryContent: newMessage,
      answers: '0 replies', // initially there are no replies
      questionTimestamp: currentTime,
    };

    //*****Later this will go as a body in database so json post request should be constructed
    setAllFilterContent([...allFilterContent, newQuestion]);
    setMyQueriesContent([...myQueriesContent, newQuestion]);
    setNewMessage('');


    postQuestion();


};

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
      
      <View className="flex-row justify-between px-3 rounded-lg mt-4 mb-4">
        {/* filters */}
        {filters.map((filter, index) => (
          <Pressable key={index} onPress={() => handleFilterClick(filter)}>
            <View key={index} style={{ margin: '2%', marginHorizontal: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: selectedFilter === filter ? '#373BFD': '#F3F4FF', borderRadius: 8, width: 170, height:50 }}>
              <Text style={{ fontFamily: 'System', color: selectedFilter === filter ? 'white':'#8A8A8A', fontSize: 18, fontWeight:selectedFilter === filter ? 'bold':null}}>
                {filter}
              </Text>
          </View>
          </Pressable>
        ))}
      </View>
      {/* Rendering Content based on selected filter */}
      <ScrollView
        className = "flex-1 p-4 pb-20"
        ref={scrollViewRef}
        contentOffset={{ y: 1000000 }}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
      >
        <View className="flex-1 pb-20">
          {renderQuestions()}
        </View>
      </ScrollView>

      {/* Sending Message: Message box */}
      <View className = "absolute bottom-0 left-0 right-0 flex-row items-center border-t border-gray-300 p-4 bg-white">             
        <TextInput
          className = "flex-1 border border-gray-300 rounded-full px-4 py-2 mr-4"
          placeholder="Type your query..."
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          onSubmitEditing={() => handleSend()}
        />          
        <Icon
          name="send" // Use the send icon from FontAwesome
          size={25}
          color="#192CFF"
          onPress={handleSend} // Handle sending message on button press
        />          
      </View>
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

export default WellnessHub;
