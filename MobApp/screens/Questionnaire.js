import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Questionnaire = ({route}) => {

    const {week, day}=route.params;
    
    const[count,setCount]= useState(0);
    const [color, setColor] = useState({
        0:"bg-cyan-100",
        1:"bg-orange-100",
        2:"bg-lime-100",
        3:"bg-violet-100",
        4:"bg-fuchsia-100"
    })
    const[questions,setQuestions]= useState([]);
    const[question, setQuestion] = useState({});
    const[userName,setUserName]= useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [hoveredOption, setHoveredOption] = useState(null);

    const [options, setOptions] = useState([
        {option1: ["Not at all", 1]},
        {option2: ["Several Days", 2]},
        {option3: ["More than half the days", 3]},
        {option4: ["Nearly every day", 4]},
    ])

    const [selectedOptions, setSelectedOptions] = useState([]);


    
    useEffect(() => {

        const getQuestionnaire = async () => {

            console.log("Day on Q", day);
            console.log("Week on Q", week);

            
            const loginURL = webServerUrl+"/suhrud/patient/getquestionnaire";
            const method='GET';
            
            const sessionData = await AsyncStorage.getItem('patientData')
            const data=JSON.parse(sessionData);
            const bearerToken = data.token;
            setUserName(data.ptUsername);
            console.log("bearer Token: ", bearerToken);
      
            const headers = {
              'Authorization': `Bearer ${bearerToken}`, // Include your token here
              'Content-Type': 'application/json', // Specify the content type if needed
            };
      
            let response;
            try{

                response=await HttpService(method,loginURL, null, headers);
                console.log(response.status)
                
                if(response.status===200){
                
                    console.log("Successful");
                    console.log(response.data);
                
                    try{
                        console.log("from storage");
      
                    }catch(error){
                        console.log("error while saving data");
                        console.log(error);
                    }
                }
                
                else{
                    alert(response.data);
      
                }
            }catch(error){
                alert(error.data);
                console.log(error);
            }
      
            setQuestions(response.data);

            setQuestion(response.data[0]);
        }
        
            getQuestionnaire();
            getSelectedOptions();

    },[]);

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })  
    },[])

    
    const navigation=useNavigation();
   
    const nextQuestion = async () => {

        console.log("colorrrrrrrrrrrrrr",color[count]);

        if (count < questions.length - 1) {
            setCount(count + 1);
            setSelectedOption(null);
            setQuestion(questions[count]);

        } else {

            const loginURL = webServerUrl+"/suhrud/patient/answerquestionnaire";
            const method='POST';
            
            const storedSelectedOptions = await AsyncStorage.getItem('selectedOptions');
                        
            const data = {
                "v1": parseInt(storedSelectedOptions[1]),
                "v2": parseInt(storedSelectedOptions[3]),
                "v3": parseInt(storedSelectedOptions[5]),
                "v4": parseInt(storedSelectedOptions[7]),
                "v5": parseInt(storedSelectedOptions[9])
            }

            // for (let i = 0; i < storedSelectedOptions.length; i++) {
            //     data[`v${i + 1}`] = storedSelectedOptions[i];
            // }

            console.log("data to be passed to backend:", data);
            
            const sessionData = await AsyncStorage.getItem('patientData')
            const data1=JSON.parse(sessionData);
            const bearerToken = data1.token;
      
            console.log("bearer token: ", bearerToken);
      
            const headers = {
              'Authorization': `Bearer ${bearerToken}`, // Include your token here
              'Content-Type': 'application/json', // Specify the content type if needed
            };
      
            let response;
            try{

                response=await HttpService(method,loginURL, data, headers);
                console.log(response.status)
                
                if(response.status===200){
                
                    console.log("Successful");
                    console.log(response.data);
                
                    try{
                        console.log("from storage");
      
                    }catch(error){
                        console.log("error while saving data");
                        console.log(error);
                    }
                }
                
                else{
                    alert(response.data);
      
                }
            }catch(error){
                alert(error.data);
                console.log(error);
            }

            
            navigation.navigate("Appointment");
        }
    };

    const handleOptionSelect = (option) => {
        
        const updatedSelectedOptions = [...selectedOptions];

        updatedSelectedOptions[count] = option[1];

        const optionNo = option[1];
        setSelectedOption(optionNo);

        setSelectedOptions(updatedSelectedOptions);

        saveSelectedOptions(updatedSelectedOptions);

    };
    const handleOptionHover = (option) => {
        setHoveredOption(option);
    };

    const handleOptionLeave = () => {
        setHoveredOption(null);
    };

    const navigateBack = () => {
        navigation.navigate("Day");
    }


    // Function to save the selected options array to local storage
    const saveSelectedOptions = async (selectedOptions) => {
        try {
            await AsyncStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        } catch (error) {
            console.error('Error saving selected options to local storage:', error);
        }
    };

    // Function to retrieve the selected options array from local storage
    const getSelectedOptions = async () => {
        try {
            const storedSelectedOptions = await AsyncStorage.getItem('selectedOptions');
            console.log("optionsssssssssss: ", storedSelectedOptions);
            if (storedSelectedOptions !== null) {
                setSelectedOptions(JSON.parse(storedSelectedOptions));
            }
        } catch (error) {
            console.error('Error retrieving selected options from local storage:', error);
        }
    };
    
    
    return (
        <SafeAreaView className = {`flex-1 bg-white p-2 pt-8 relative ${color[count]}`}>
            <SafeAreaView className = "justify-center items-left m-2 border-b border-spacing-8 border-dashed pb-2">
                <View className="flex-row px-2 space-x-4 mt-2">
                    <Icon onPress={() => navigateBack()} name="angle-left" size={25}/>
                    <Text className="text-xl font-semibold">
                    hey {userName}
                    </Text>
                </View>
                
                <Text className="text-base px-8">
                    We are here for you
                </Text>
            </SafeAreaView>
            
            <View className = "items-left container mt-3 px-4 relative flex-grow">
                <Text className="text-2xl font-bold mb-4">{question.question}</Text>
                    <View className="flex flex-col space-y-4 h-full relative">
                        {/* Render options here */}
                        {/* For example, you can map through options and display them */}
                        {/* Replace this with your code */}
                        <View className={`bg-gray-200 p-2 my-1 rounded-md ${selectedOption === options[0]["option1"][1] ? 'bg-gray-400' : ''} ${hoveredOption === options[0]["option1"][0]  ? 'hover:bg-gray-300' : ''}`}
                            onMouseEnter={() => handleOptionHover(options[0]["option1"][0] )}
                            onMouseLeave={() => handleOptionLeave()}>
                            <TouchableOpacity onPress={() => handleOptionSelect(options[0]["option1"])}>
                                <Text className="text-base font-bold text-gray-800">{options[0]["option1"][0] }</Text>
                            </TouchableOpacity>
                        </View>
                        <View className={`bg-gray-200 p-2 my-1 rounded-md ${selectedOption === options[1]["option2"][1] ? 'bg-gray-400' : ''} ${hoveredOption === options[1]["option2"][0]  ? 'hover:bg-gray-300' : ''}`}
                            onMouseEnter={() => handleOptionHover(options[1]["option2"][0] )}
                            onMouseLeave={() => handleOptionLeave()}>
                            <TouchableOpacity onPress={() => handleOptionSelect(options[1]["option2"] )}>
                                <Text className="text-base font-bold text-gray-800">{options[1]["option2"][0] }</Text>
                            </TouchableOpacity>
                        </View>
                        <View className={`bg-gray-200 p-2 my-1 rounded-md ${selectedOption === options[2]["option3"][1] ? 'bg-gray-400' : ''} ${hoveredOption === options[2]["option3"][0]  ? 'hover:bg-gray-300' : ''}`}
                            onMouseEnter={() => handleOptionHover(options[2]["option3"][0] )}
                            onMouseLeave={() => handleOptionLeave()}>
                            <TouchableOpacity onPress={() => handleOptionSelect(options[2]["option3"] )}>
                                <Text className="text-base font-bold text-gray-800">{options[2]["option3"][0] }</Text>
                            </TouchableOpacity>
                        </View>
                        <View className={`bg-gray-200 p-2 my-1 rounded-md ${selectedOption === options[3]["option4"][1] ? 'bg-gray-400' : ''} ${hoveredOption === options[3]["option4"][0]  ? 'hover:bg-gray-300' : ''}`}
                            onMouseEnter={() => handleOptionHover(options[3]["option4"][0] )}
                            onMouseLeave={() => handleOptionLeave()}>
                            <TouchableOpacity onPress={() => handleOptionSelect(options[3]["option4"] )}>
                                <Text className="text-base font-bold text-gray-800">{options[3]["option4"][0] }</Text>
                            </TouchableOpacity>
                        </View>
                       
                    </View>
                    <View className="absolute bottom-56 left-0 right-0 p-4"> 
                        <TouchableOpacity onPress={nextQuestion} className={`bg-blue-500 px-0 py-4 rounded-md w-full ${selectedOption === null ? 'opacity-50' : ''}`} disabled={selectedOption === null}>
                            <Text className="text-white text-center font-bold">{count === questions.length - 1 ? 'Next' : 'Continue'}
                            </Text>
                        </TouchableOpacity>
                    </View>

            </View>
            

        </SafeAreaView>
    )
}

export default Questionnaire;