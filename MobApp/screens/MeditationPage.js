import React, { useEffect, useCallback,useLayoutEffect, useState } from "react";
import { View, Text,SafeAreaView, ImageBackground, ScrollView, Modal,  StyleSheet, Pressable, Dimensions, Animated, useWindowDimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {image1} from '../assets';
import NavigationBar from "../components/NavigationBar";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import { useRef } from "react";


const MeditationPage = (props) => {

    const navigation = useNavigation();
    const [playing, setPlaying] = useState(false);
    const [visibleState, setVisibleState] = useState(true);

    let [fontsLoaded] = useFonts({
      Pangolin_400Regular,
    });

    useLayoutEffect(() => {
            navigation.setOptions({
            headerShown: false,
        })
    },[])

    const navigateback = () => {
        navigation.navigate("Meditation");
    }

    
    const onStateChange = useCallback((state) => 
    {    if (state === "ended") {      setPlaying(false);      Alert.alert("video has finished playing!");    }  }, []);
    const togglePlaying = useCallback(() => {    setPlaying((prev) => !prev);  }, []);

    return (

    
        <SafeAreaView className="  bg-white flex-1 relative">
          <View className="bg-sky-950 flex-1 text-white p-2">
                <View className = "p-4 flex-row items-center">
                    <Icon name="angle-left" color="white" size={25} onPress={navigateback}/>
                    <Text style={styles.subtitle}>
                      Relax and Meditate..
                    </Text>
                </View>
                    <View style={styles.container}>
                    <ImageBackground source={image1} resizeMode="cover" style={styles.image}>
                        <View style={styles.ImageContainer}>
                        <Text style={styles.subtitle}>What is Meditation? </Text>
                        <Text style={styles.dayText}>
                                Meditation can be defined as a set of techniques that are intended to encourage a heightened state of awareness and focused attention. 
                                Meditation is also a consciousness-changing technique shown to have many benefits on psychological well-being
                                </Text>
                        <View style={styles.videoContainer}>
                                {/* <YoutubePlayer play={playing} videoId={"W19PdslW7iw"}/> */}
                                
                                  
                                  <YoutubePlayer  
                                  height={200}   
                                  width={350}     
                                  play={playing}       
                                   videoId={"W19PdslW7iw"}        
                                   onChangeState={onStateChange}      />
                                
                                {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />   */}
                        </View>
                        <View style={styles.innercontainer}>
                           
                            <Pressable disabled={!visibleState} onPress={()=>setVisibleState(false)}>
                                <Text style={styles.subtitle}>Know the steps</Text></Pressable>
                            <View disabled={visibleState} style={styles.textContainer}>
                            <Text style={styles.dayText}>
                                1. Choose a quite spot.</Text>
                            <Text style={styles.dayText}>
                                2. Play the video above. </Text>
                            <Text style={styles.dayText}>
                                3. Pay attention towards your breathing. </Text>
                            <Text style={styles.dayText}>
                                4. Notice your thoughts. </Text>
                            <Text style={styles.dayText}>
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
        padding:5,
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
      backgroundColor: 'rgba(222,233,246, 0.2)',
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 5,
      width:300,
      height:'80%',
      justifyContent:'center',
      alignItems:'flex-start',
    },
    title:{
      fontFamily:"Pangolin_400Regular",
      fontSize:30,
      color:'white',
      marginLeft:20,
    },
    subtitle:{
      fontFamily:"Pangolin_400Regular",
      fontSize:25,
      color:'white',
      marginRight:10,
      marginLeft:10,
      marginTop:20,
      marginBottom:20,
    },
    dayText:{
      fontFamily:"System",
      fontSize:15,
      color:'white',
      marginLeft:10,
      marginRight:10,
    },
    videoContainer:{
        backgroundColor:'rgba(222,233,246,0.3)',
        width:'100%',
        overflow:'hidden',
        padding:10,
        margin:10,
        height:'80% ',
        borderRadius:2,
        border:'solid, lavender',
    }
  });


export default MeditationPage