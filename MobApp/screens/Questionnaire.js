import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'


const Questionnaire = ({route}) => {
    
    const[count,setCount]= useState(0);
    const[question,setQuestion]= useState([]);

    const {day, response} = route.params;
    console.log("response: ", response);
    setQuestion(response.data);

    const [questions, setQuestions] = useState([
        {   questionId: "1",
            question: "Feeling down, depressed or hopeless",
            option1:"Not at all",
            option2:"Several days",
            option3:"More than half the days",
            option4:"Nearly every day" },
        {   questionId: "2",
            question: "Poor apetite or overeating",
            option1:"Not at all",
            option2:"Several days",
            option3:"More than half the days",
            option4:"Nearly every day" },
        {   questionId: "3",
            question: "feeling tired or having little energy",
            option1:"Not at all",
            option2:"Several days",
            option3:"More than half the days",
            option4:"Nearly every day" },
     ]);

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })  
    },[])

    
    const navigation=useNavigation();
   
    const nextQuestion = () => {
        if (count < questions.length - 1) {
            setCount(count + 1);

        } else {
            navigation.navigate("Appointment");
        }
    };

    useEffect(()=>{
        setQuestion(questions[count]);
    },[count])
    
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <SafeAreaView className = "flex-1 bg-white p-2 py-0 relative">
            <SafeAreaView className = "justify-center items-left m-2 border-b border-spacing-8 border-dashed pb-2">
                <View className="flex-row px-2 space-x-4 mt-2">
                    <Icon name="angle-left" size={25}/>
                    <Text className="text-xl font-semibold">
                    hey Rutuja
                    </Text>
                </View>
                
                <Text className="text-base px-8">
                    We are here for you
                </Text>
            </SafeAreaView>
            
            <View className = "items-left container my-8 px-4 relative flex-grow">
                <h1 className="text-2xl font-bold mb-4">{question.question}</h1>
                    <View className="flex flex-col space-y-4 h-full relative">
                        {/* Render options here */}
                        {/* For example, you can map through options and display them */}
                        {/* Replace this with your code */}
                        <View className="bg-gray-200 p-2 my-1 rounded-md">
                            <TouchableOpacity><Text className="text-base font-bold text-gray-800">{question.option1}</Text></TouchableOpacity>
                        </View>
                        <View className="bg-gray-200 p-2 my-1 rounded-md">
                            <TouchableOpacity><Text className="text-base font-bold text-gray-800">{question.option2}</Text></TouchableOpacity>
                        </View>
                        <View className="bg-gray-200 p-2 my-1 rounded-md">
                            <TouchableOpacity><Text className="text-base font-bold text-gray-800">{question.option3}</Text></TouchableOpacity>
                        </View>
                        <View className="bg-gray-200 p-2 my-1 rounded-md">
                            <TouchableOpacity><Text className="text-base font-bold text-gray-800">{question.option4}</Text></TouchableOpacity>
                        </View>
                       
                    </View>
                    <View className="absolute bottom-10 left-0 right-0 p-4"> 
                    <TouchableOpacity onPress={nextQuestion} className="bg-blue-500 px-0 py-4 rounded-md w-full">
                        <Text className="text-white text-center font-bold">{count === questions.length - 1 ? 'Next' : 'Continue'}
                        </Text>
                    </TouchableOpacity>
                    </View>

            </View>
           

        </SafeAreaView>
    )
}

export default Questionnaire;