import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text,SafeAreaView, ImageBackground, ScrollView, Modal,  StyleSheet, Pressable, Dimensions, Button, Animated, useWindowDimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {image1,image2,image3,image4} from '../assets';
import NavigationBar from "../components/NavigationBar";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';

const Meditation = (props) => {

    const navigation = useNavigation();
    const [playing, setPlaying] = useState(false);

    let [fontsLoaded] = useFonts({
      Pangolin_400Regular,
    });

    useLayoutEffect(() => {
            navigation.setOptions({
            headerShown: false,
        })
    },[]);

    const onPressMeditation = () => {
        console.log("Clicked on meditation");
        props.navigation.navigate("MeditationPage");
    };

    const onDeStress = () => {
      console.log("Clicked on destress");
      props.navigation.navigate("Destress");
  };

    const navigateback = () => {
        navigation.navigate("Moodlift");
    };

    return (

    
        <SafeAreaView className="  bg-white flex-1 relative">
          <View className="bg-sky-950 flex-1 text-white p-2">
                <View className = "p-4 flex-row items-center">
                    <Icon name="angle-left" color="white" size={25} onPress={navigateback}/>
                    <Text style={styles.title}>
                      Your space ! 
                    </Text>
                </View>
                    <View style={styles.container}>
                        <Text style={styles.subtitle}>What do you wish to do?</Text>
                        <View style={styles.innercontainer}>
                            <View style={styles.ImageContainer}>
                                    <Pressable onPress={onPressMeditation}>
                                            <ImageBackground source={image1} resizeMode="cover" style={styles.image}>
                                            <View style={styles.textContainer}><Text style={styles.dayText}>Meditate</Text></View>
                                            </ImageBackground>
                                    
                                    </Pressable>
                            </View>
                            <View style={styles.ImageContainer}>
                                    <Pressable onPress={onDeStress}>
                                        
                                            <ImageBackground source={image2} resizeMode="cover" style={styles.image}>
                                            <View style={styles.textContainer}><Text style={styles.dayText}>De-Stress</Text></View>
                                            </ImageBackground>
                                    
                                    </Pressable>
                            </View>
                        </View>
                        <View style={styles.innercontainer}>
                            <View style={styles.ImageContainer}>
                                    <Pressable>
                                            <ImageBackground source={image3} resizeMode="cover" style={styles.image}>
                                            <View style={styles.textContainer}><Text style={styles.dayText}>Serenity</Text></View>
                                            </ImageBackground>
                                    
                                    </Pressable>
                            </View>
                            <View style={styles.ImageContainer}>
                                    <Pressable>
                                        
                                            <ImageBackground source={image4} resizeMode="cover" style={styles.image}>
                                                    <View style={styles.textContainer}><Text style={styles.dayText}>Sleep On</Text></View>
                                            </ImageBackground>
                                    
                                    </Pressable>
                            </View>
                        </View>
                    </View>
            </View>
            <NavigationBar />
        </SafeAreaView>

    )  
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      width:'auto',
      alignContent:'center',
      overflow:'hidden',
      padding:1,
      backgroundColor:'rgba(0,0,1,0.2)',
    },
    innercontainer: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        alignContent:'space-around',
        overflow:'hidden',
        padding:1,
      },
    ImageContainer: {
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
      width:200,
      borderCurve:20,
      margin:2,
      padding:2,
    },
    title:{
      fontFamily:"Pangolin_400Regular",
      fontSize:30,
      color:'white',
      marginLeft:20,
    },
    subtitle:{
      fontFamily:"Pangolin_400Regular",
      fontSize:20,
      color:'white',
      marginLeft:10,
      marginTop:10,
    },
    dayText:{
      fontFamily:"Pangolin_400Regular",
      fontSize:15,
      color:'white',
    },
    image: {
      borderRadius: 20,
      overflow: 'hidden',
      width:180,
      height:240,
      justifyContent:'flex-end',
      alignItems:'center',
    },
    textContainer: {
      backgroundColor: 'rgba(0,0,0, 0.7)',
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 5,
      width:120,
    },
    text: {
      fontSize: 15,
      color: 'white',
      fontWeight:"700",
    },
    videoContainer:{
        backgroundColor:'rgba(222,233,246,0.3)',
        width:'auto',
        overflow:'hidden',
        padding:2,
        margin:2,
        borderRadius:2,
        border:'solid, lavender',
    }
  });


export default Meditation