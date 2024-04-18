import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, ScrollView, StyleSheet, ImageBackground,Image,Animated, useWindowDimensions, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import NavigationBar from "../components/NavigationBar";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background, therapy} from '../assets';


const Dashboard = () => {

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


    return(
        <>
            
            <ScrollView className="flex-1 h-full">
            <ImageBackground source={background} style={styles.imagebackground}>
            
            <ScrollView contentContainerStyle={styles.containerContent} style={styles.container} className="px-2">
                    <View className = "flex flex-row px-2 pt-2 justify-between mt-4">
                        <View className='flex flex-row justify-items-start'>
                            <Image  style={styles.tinyLogo} source={icon_suhrud}/>
                            <View className='flex flex-col ml-2'>
                                <Text style={styles.title}>Hello Rutu</Text>
                                <Text style={styles.inputText}>Weclome to our safe space</Text>
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

                    <View className = "flex flex-row">
                        
                        <ImageBackground source={therapy} style={styles.therapy}>
                       
                        </ImageBackground>

                    </View>

                    <View className = "flex flex-col p-2 mt-1 mb-1 justify-between">

                        <View className="flex flex-row px-4 py-3  bg-white opacity-80 rounded-3xl justify-between">
                        <Text style={styles.pickerText}>Seeking help? Book an appointment </Text>                  
                        </View>
                        
                    </View>


                    {/* Third Section */}
                    <View className = "flex flex-col p-4 ">

                        <View className="mb-4">
                            <Text style={styles.pickerText}>Patient Progress</Text>
                        </View>

                        <View className="flex flex-row">
                            <View className = "flex rounded-full h-28 w-28 bg-white opacity-70 items-center justify-center mr-4">
                                <Text className="text-3xl">25%</Text>
                            </View>

                            <View className="bg-white opacity-70 p-2 flex flex-grow overflow-hidden rounded-3xl">
                                <Text>Graph</Text>
                            </View>
                        </View>

                    </View>


                    {/* Fifth Section */}
                    <View className = "flex flex-col p-4 mb-2">
                        
                        <View className="mt-1">
                            <Text style={styles.pickerText}>Jokes to lighten up your mood</Text>
                        </View>

                    </View>

            <View style={styles.scrollContainer}>
                            <ScrollView
                            horizontal={true}
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event([
                                {
                                nativeEvent: {
                                    contentOffset: {
                                    x: scrollX,
                                    },
                                },
                                
                                },
                            ],{ useNativeDriver: true } )}
                            scrollEventThrottle={1}>
                            {jokes.map((image, imageIndex) => {
                                        return (
                                        <View style={{width: windowWidth, height: 200}} key={imageIndex}>
                                            <Image source={{uri: image}} style={styles.card}>
                                            </Image>
                                            
                                        </View>
                                        );
                            })}
                            </ScrollView>
                            <View style={styles.indicatorContainer}>
                            {jokes.map((image, imageIndex) => {
                                const width = scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1),
                                ],
                                outputRange: [8, 16, 8],
                                extrapolate: 'clamp',
                                });
                                return (
                                <Animated.View
                                    key={imageIndex}
                                    style={[styles.normalDot, {width}]}
                                    
                                />
                                );
                            })}
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </ScrollView>
            
            <NavigationBar />
            
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
      height:180,
      width:400,
      opacity:'100%',
      },
  })

export default Dashboard;

