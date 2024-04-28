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
import { useTranslation } from "react-i18next";


const MeditationPage = (props) => {

  const { t, i18n } = useTranslation();

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
                    {t("meditationPage.title")}
                    </Text>
                </View>
                    <View style={styles.container}>
                    <ImageBackground source={image1} resizeMode="cover" style={styles.image}>
                        <View style={styles.ImageContainer}>
                        <Text style={styles.subtitle}>{t("meditationPage.subTitle")} </Text>
                        <Text style={styles.dayText}>
                          {t("meditationPage.paraLine1")}
                          {t("meditationPage.paraLine2")}
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
                                <Text style={styles.subtitle}>{t("meditationPage.heading1")}</Text></Pressable>
                            <View disabled={visibleState} style={styles.textContainer}>
                            <Text style={styles.dayText}>
                                {t("meditationPage.step1")}</Text>
                            <Text style={styles.dayText}>
                                {t("meditationPage.step2")} </Text>
                            <Text style={styles.dayText}>
                                {t("meditationPage.step3")} </Text>
                            <Text style={styles.dayText}>
                                {t("meditationPage.step4")} </Text>
                            <Text style={styles.dayText}>
                                {t("meditationPage.step5")}
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