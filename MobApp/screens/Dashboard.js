import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, ScrollView, StyleSheet, ImageBackground,Image,Animated, useWindowDimensions, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import NavigationBar from "../components/NavigationBar";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background, therapy} from '../assets';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';
import {
    LineChart
  } from "react-native-chart-kit";

// import { useTranslation } from "react-i18next";

import i18n from '../localization/i18n';
import STORE_LANGUAGE_KEY from "../configurations/Multilingual";

const Dashboard = () => {
    
    // const { t, i18n } = useTranslation();

    const [username, setUserName] = useState("");
    
    const [severity, setSeverity]=useState([]);
    const [week,setWeek]=useState([]);
    const [newMessage, setNewMessage] = useState('');

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

    useEffect(()=>{
        const fetchUsername=async()=>{
            const sessionData = await AsyncStorage.getItem('patientData');
            const localData=JSON.parse(sessionData);
            setUserName(localData.ptUsername+"!!");
        };
        fetchUsername();
        retrieveLanguage();
        graph();
    },[])

    const graph=async()=>{
        const DashboardUrl = webServerUrl+"/suhrud/patient/dashboardGraph";
        const method='GET';
      
        const sessionData = await AsyncStorage.getItem('patientData')
        const data=JSON.parse(sessionData);
        const bearerToken = data.token;
        console.log("bearer token: ", bearerToken);
        const headers = {
            'Authorization': `Bearer ${bearerToken}`, // Include your token here
            'Content-Type': 'application/json', // Specify the content type if needed
            'ngrok-skip-browser-warning': 'true',
        };
        let response;
        try{
            response=await HttpService(method,DashboardUrl,null,headers);
            console.log(response.status)
            if(response.status===200){
                const patientGraph=await response.data;
                console.log(patientGraph);
                setData(patientGraph);
                console.log("Hereeeeeeeee", patientGraph);
            }
            else{
                alert(response.data);
  
            }
        }catch(error){
            alert(error.data);
            console.log(error);
        }
    };

    const jokes = new Array();
    jokes[0]='https://www.champak.in/wp-content/uploads/2019/02/c84.jpg';
    jokes[1]='https://www.champak.in/wp-content/uploads/2019/03/c97-633x422.jpg';
    jokes[2]='https://www.champak.in/wp-content/uploads/2019/01/c52.jpg';
    jokes[3]='https://www.champak.in/wp-content/uploads/2019/04/c125-min.jpg';
    jokes[4]='https://www.champak.in/wp-content/uploads/2019/01/Untitled-6-633x422.jpg';
    jokes[5]='https://www.champak.in/wp-content/uploads/2018/12/c30-633x422.jpg';
    jokes[6]='https://www.champak.in/wp-content/uploads/2019/01/c66-633x422.jpg';
    jokes[7]='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROBEKsKrFf_MDkjruL6oTKigFJdMWrn9LBLjl3dORNy-EgoZmRrsPjL7SmIZnCxyCjvZY&usqp=CAU';

    let [fontsLoaded] = useFonts({
        Pangolin_400Regular,
      });
    const navigation=useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;

    const {width: windowWidth} = useWindowDimensions();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
    })
    },[])

    const callHelpline = () => {

    };

    const navigateMoodlift=()=>{
        navigation.navigate('Moodlift');
    }
    const navigateForum = () => {
        navigation.navigate("Wellness Hub");
    };

    const navigateAppointment = () => {
        navigation.navigate("Appointment");
    };

    const minValue = 0;

    function* yLabel() {
    yield* [0, 25, 50, 75, 100];
    }

    const yLabelIterator = yLabel();
    const setData=(patientGraph)=>{
        const weeks=patientGraph.map((item, index) => `Week ${item.week}`);
        setWeek(weeks);
        const sev=patientGraph.map(item => item.avgSeverity);
        setSeverity(sev);
    }

    const sum = severity.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const avg=sum/severity.length;
    console.log(avg);
    const avgWithTwoDecimals = avg.toFixed(2);
    console.log(avgWithTwoDecimals);

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
                    'ngrok-skip-browser-warning': 'true'
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

    const handleSend = () => {
        if (newMessage.trim() === '') return;
    
        postQuestion();
        setNewMessage('');
    };

    return(
        <>
            <ImageBackground source={background} style={styles.imagebackground}>
            <ScrollView className="flex-1 h-full">
            
            
                <ScrollView className="px-2">
                    <View className = "flex flex-row px-2 pt-2 justify-between mt-4">
                        <View className='flex flex-row justify-items-start'>
                            <Image  style={styles.tinyLogo} source={icon_suhrud}/>
                            <View className='flex flex-col ml-2'>
                                <Text style={styles.title}>{i18n.t("dashboard.hello")} {username} </Text>
                                <Text style={styles.inputText}>{i18n.t("dashboard.welcomeMessage")}</Text>
                            </View>
                        </View>
                        <View className="flex flex-row justify-center items-center">
                            <Pressable onPress={() => navigation.navigate("Emergency Contacts")}>
                                <View className="mr-4">
                                    <Feather name="phone-call" size={24} color="black" />
                                </View>
                            </Pressable>
                            
                        </View>
                        
                    </View>

                    <View className = "flex flex-col">
                        
                        <Image source={therapy} style={styles.therapy}/>
                        <View className="flex flex-row px-2 bg-white opacity-80 rounded-3xl items-center justify-between p-2">
                        <Text className="pl-5" style={styles.pickerText}>{i18n.t("dashboard.seekingHelp")}</Text>   
                        <Pressable
                            onPress={navigateAppointment}
                            style={({pressed})=>[styles.signUpBtn,
                                {
                                backgroundColor: pressed ? '#0619bb' : '#116fdf',
                                transform: [{ scale: pressed ? 0.96 : 1}],
                                }
                            ]}
                            >
                            <Text style={styles.signUp}>{i18n.t("dashboard.bookAppointment")}</Text>
                        </Pressable>               
                        </View>
                    </View>

                    <View className = "flex flex-col mt-5">

                        <View className = "flex flex-row justify-between mb-2">
                            <Text style={styles.pickerText}>{i18n.t("dashboard.askExperts")}</Text>
                            <Feather name="arrow-right" size={24} color="black" onPress={navigateForum}/>
                        </View>

                        <View className="flex flex-row px-4 py-3 bg-white opacity-80 rounded-3xl justify-between">
                            <TextInput 
                                className=" w-72" 
                                placeholder={i18n.t("dashboard.TypeQuestion")}
                                value={newMessage}
                                onChangeText={text => setNewMessage(text)}
                            />
                            <MaterialIcons  
                                name="send" 
                                size={24} 
                                color="black"
                                onPress={() => handleSend()}
                            />                          
                        </View>
                        
                    </View>

                    {/* <View className = "flex flex-col p-4 ">

                        <View className="mb-4">
                            <Text style={styles.pickerText}>{i18n.t("dashboard.patientProgress")}</Text>
                        </View>

                        <View className="flex flex-row">
                            <View className = "flex rounded-full h-28 w-28 bg-white opacity-70 items-center justify-center mr-4">
                                <Text className="text-3xl">{avgWithTwoDecimals*4}%</Text>
                            </View>

                            <View className="bg-white opacity-70 p-1 flex flex-grow overflow-hidden rounded-3xl">
                                <Text className="text-center font-bold">Week Wise Severity Percentage</Text>
                                <LineChart
                                    data={{
                                        labels: week,
                                        datasets: [
                                            {
                                                data: severity,
                                                color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                                borderColor: 'rgba(54, 162, 235)',
                                                borderWidth: 1,
                                            }
                                        ]
                                        }}
                                    height={116}
                                    width={228}
                                    yAxisInterval={5}
                                    fromZero="true"
                                    formatYLabel={ () => yLabelIterator.next().value}                                    withVerticalLabels="true"
                                    chartConfig={{
                                    backgroundGradientFrom: "#1DE3DD",
                                    backgroundGradientTo: "#BFFAF9",
                                    decimalPlaces: 0,
                                    // yAxisInterval:{5},
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                    }}
                                    bezier
                                    style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                    }}
                                />
                            </View>
                        </View> 

                     </View> */}


                    {/* Fifth Section */}
                    <View className="flex flex-row px-4 py-3 items-center justify-between">
                        
                        <View className="mt-1">
                            <Text style={styles.pickerText}>{i18n.t("dashboard.jokeText")}</Text>
                        </View>

                    </View>

            {/* <View style={styles.scrollContainer}> */}
                            <ScrollView
                            horizontal={true}
                            >
                            {jokes.map((image, imageIndex) => {
                                        return (
                                        <View style={{width: windowWidth, height: 200}} key={imageIndex}>
                                            <Image source={{uri: image}} style={styles.card}>
                                            </Image>
                                            
                                        </View>
                                        );
                            })}
                            </ScrollView>
                        {/* </View> */}
                    </ScrollView>
                
            </ScrollView>
            <NavigationBar />
            </ImageBackground>
            
            
            
        </>

    )
}

const styles = StyleSheet.create({
    imagebackground:{
        height:'100%',
      resizeMode:'cover',
      },
      tinyLogo: {
        width: 50,
        height: 50,
        marginTop:35,
      },
    inputText:{
      height:50,
      color:'black',
      fontFamily:'Pangolin_400Regular',
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow:'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      },
      infoText: {
        color: 'white',
        fontSize: 16,
        fontFamily:"Pangolin_400Regular",
      },
      beautyText: {
        color: 'blue',
        fontSize: 16,
        fontFamily:"Pangolin_400Regular",
      },
      linkText: {
        color: 'blue',
        fontSize: 14,
        fontFamily:"Pangolin_400Regular",
      },
      normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'silver',
        marginHorizontal: 4,
      },
    
    title:{
        marginTop:20,
        fontFamily:'Pangolin_400Regular',
        fontSize:30,
    },
    pickerText:{
    fontFamily:'Pangolin_400Regular',
    fontSize:20,
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      therapy:{
      height:200,
      width:350,

      },
      signUpBtn:{
        width:140,
        height:50,
        paddingTop:7,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
      },
      signUp:{
        flex:1,
        color:'white',
        fontSize:15,
        fontFamily:'Pangolin_400Regular',
      },
  })

export default Dashboard;

