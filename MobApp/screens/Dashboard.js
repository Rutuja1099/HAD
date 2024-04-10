import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, ImageBackground,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import NavigationBar from "../components/NavigationBar";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';


const Dashboard = () => {


    let [fontsLoaded] = useFonts({
        Pangolin_400Regular,
      });
    const navigation=useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
    })
    },[])

    const callHelpline = () => {

    };

    return(
        <>
            
            <ScrollView className="flex-1 h-full">
            <ImageBackground source={background} style={styles.imagebackground}>
            
            <ScrollView contentContainerStyle={styles.containerContent} style={styles.container}>
                    <View className = "flex flex-row p-2 justify-between mt-4">
                        <View className='flex flex-row justify-items-start'>
                            <Image  style={styles.tinyLogo} source={icon_suhrud}/>
                            <View className='flex flex-col ml-2'>
                                <Text style={styles.title}>Hello Rutu</Text>
                                <Text style={styles.inputText}>Weclome to our safe space</Text>
                            </View>
                        </View>
                        <View className="flex flex-row justify-center items-center">
                            <View className="mr-4">
                                <Feather name="phone-call" size={24} color="black" />
                            </View>
                            <View className="border-2 rounded-full p-1">
                                <Feather name="user" size={24} color="black" />
                            </View>  
                        </View>
                    </View>
                    
                    <View className = "flex flex-col p-4 mb-1 justify-between border-b-2 border-dashed">

                        <View className = "flex flex-row justify-between mb-2">
                            <Text style={styles.pickerText}>Ask our experts</Text>
                            <Feather name="arrow-right" size={24} color="black" />
                        </View>

                        <View className="flex flex-row px-4 py-3  bg-white opacity-80 rounded-3xl justify-between">
                            <TextInput className=" w-72" placeholder="Type your question"/>
                            <MaterialIcons  name="send" size={24} color="black"/>                          
                        </View>
                        
                    </View>


                    {/* Third Section */}
                    <View className = "flex flex-col p-4 mb-2 border-b-2 border-dashed">

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

                    {/* Fourth Section */}
                    <View className = "flex flex-row p-4 mb-2 border-b-2 border-dashed">

                        <View className = "flex h-28 w-28 items-center justify-center mr-4">
                            <Text style={styles.pickerText}>Good Morning Rutuja!!</Text>
                        </View>
        
                        <View className="bg-white opacity-70 rounded-3xl p-3 flex-shrink">
                            <Text style={styles.inputText}>Nothing is impossible, the word itself says I'm possible.</Text>
                        </View>

                    </View>

                    {/* Fifth Section */}
                    <View className = "flex flex-col p-4 mb-2">
                        
                        <View className="mb-4">
                            <Text style={styles.pickerText}>Shortcuts</Text>
                        </View>
                        
                        <ScrollView horizontal className="flex-1">
                            <View className="flex flex-row">
                                <View className="bg-cyan-300 h-40 w-28 mr-4 text-xl rounded-3xl flex justify-center items-center">
                                    <Text>Book appointment</Text>
                                </View>

                                <View className="bg-red-400 h-40 w-28 mr-4 text-xl rounded-3xl flex justify-center items-center">
                                    <Text>Moodlift</Text>
                                </View>

                                <View className="bg-amber-400 h-40 w-28 mr-4 text-xl rounded-3xl flex justify-center items-center">
                                    <Text>Forum</Text>
                                </View>

                                <View className="bg-lime-400 h-40 w-28 mr-4 text-xl rounded-3xl flex justify-center items-center">
                                    <Text></Text>
                                </View>

                            </View>
                        </ScrollView>

                    </View>

            </View>
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
    title:{
        marginTop:20,
        fontFamily:'Pangolin_400Regular',
        fontSize:30,
    },
    pickerText:{
    fontFamily:'Pangolin_400Regular',
    fontSize:20,
    },
    
  })

export default Dashboard;

