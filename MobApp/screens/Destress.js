import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text,SafeAreaView, ImageBackground, ScrollView, Modal,  StyleSheet, Pressable, Dimensions, Button, Animated, useWindowDimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {image1, image2} from '../assets';
import NavigationBar from "../components/NavigationBar";
import Icon from "react-native-vector-icons/FontAwesome";


const Destress = (props) => {

    const navigation = useNavigation();
    const [playing, setPlaying] = useState(false);
    const [visibleState, setVisibleState] = useState(true);


    useLayoutEffect(() => {
            navigation.setOptions({
            headerShown: false,
        })
    },[])

    const navigateback = () => {
        navigation.navigate("Meditation");
    }

    return (

    
        <SafeAreaView className="  bg-white flex-1 relative">
          <View className="bg-sky-950 flex-1 text-white p-2">
                <View className = "p-4 flex-row items-center">
                    <Icon name="angle-left" color="grey" size={25} onPress={navigateback}/>
                    <Text className="text-xl ml-5 mt-4 mb-3 text-slate-50 font-extrabold ">
                      Let us help you to de-Stress
                    </Text>
                </View>
                    <View style={styles.container}>
                    <ImageBackground source={image2} resizeMode="cover" style={styles.image}>
                        <View style={styles.ImageContainer}>
                        <Text className="text-xl ml-5 mt-5 mb-3 text-slate-50 font-extrabold">What is Meditation? </Text>
                        <Text className="m-5 text-l ml-5 mt-5 mb-3 text-slate-50 font-extrabold">
                                Meditation can be defined as a set of techniques that are intended to encourage a heightened state of awareness and focused attention. 
                                Meditation is also a consciousness-changing technique shown to have many benefits on psychological well-being
                                </Text>
                        <View style={styles.videoContainer}>
                                <YoutubePlayer play={playing} videoId={"W19PdslW7iw"}/>
                                <View className='flex items-end mt-2'>
                                </View>
                        </View>
                        <View style={styles.innercontainer}>
                           
                            <Pressable disabled={!visibleState} onPress={()=>setVisibleState(false)}>
                                <Text className='m-5 text-l ml-5 mt-5 mb-3 text-slate-50 font-extrabold'>Know the steps</Text></Pressable>
                            <View disabled={visibleState} style={styles.textContainer}>
                            <Text className="text-l text-slate-50 font-extrabold">
                                1. Choose a quite spot.</Text>
                            <Text className="text-l text-slate-50 font-extrabold">
                                2. Play the video above. </Text>
                            <Text className="text-l text-slate-50 font-extrabold">
                                3. Pay attention towards your breathing. </Text>
                            <Text className="text-l  text-slate-50 font-extrabold">
                                4. Notice your thoughts. </Text>
                            <Text className="text-l text-slate-50 font-extrabold">
                                5. You may set a timer.
                                </Text>
                            </View>
                            
                        </View>
                        </View>
                        </ImageBackground>
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
    },
    innercontainer: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        alignContent:'space-around',
        overflow:'hidden',
        padding:1,
      },
    ImageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderCurve:20,
      margin:2,
      padding:2,
      width:'100%',
      height:'100%',
      backgroundColor:'rgba(0,0,0, 0.7)',
    },
    image: {
      borderRadius: 20,
      overflow: 'hidden',
      height:'100%',
      width:'100%',
      justifyContent:'flex-end',
      alignItems:'center',
    },
    textContainer: {
      backgroundColor: 'rgba(222,233,246, 0.1)',
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 5,
      width:300,
      height:'80%',
      justifyContent:'center',
      alignItems:'flex-start',
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


export default Destress