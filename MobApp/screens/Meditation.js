import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text,SafeAreaView, ImageBackground, ScrollView, Modal,  StyleSheet, Pressable, Dimensions, Button, Animated, useWindowDimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {image1,image2,image3,image4} from '../assets';
import NavigationBar from "../components/NavigationBar";
import Icon from "react-native-vector-icons/FontAwesome";


const Meditation = (props) => {

    const navigation = useNavigation();
    const [playing, setPlaying] = useState(false);


    useLayoutEffect(() => {
            navigation.setOptions({
            headerShown: false,
        })
    },[])

    const navigateback = () => {
        navigation.navigate("Moodlift");
    }

    return (

    
        <SafeAreaView className="  bg-white flex-1 relative">
          <View className="bg-sky-950 flex-1 text-white p-2">
                <View className = "p-4 flex-row items-center">
                    <Icon name="angle-left" color="grey" size={25} onPress={navigateback}/>
                    <Text className="text-xl ml-5 mt-4 mb-3 text-slate-50 font-extrabold ">
                      Your space ! 
                    </Text>
                </View>
                    <View style={styles.container}>
                        <Text className="text-l ml-5 mt-5 mb-3 text-slate-50 font-extrabold">What do you wish to do?</Text>
                        <View style={styles.innercontainer}>
                            <View style={styles.ImageContainer}>
                                    <Pressable>
                                            <ImageBackground source={image1} resizeMode="cover" style={styles.image}>
                                            <View style={styles.textContainer}><Text style={styles.text}>Meditate</Text></View>
                                            </ImageBackground>
                                    
                                    </Pressable>
                            </View>
                            <View style={styles.ImageContainer}>
                                    <Pressable>
                                        
                                            <ImageBackground source={image2} resizeMode="cover" style={styles.image}>
                                            <View style={styles.textContainer}><Text style={styles.text}>De-Stress</Text></View>
                                            </ImageBackground>
                                    
                                    </Pressable>
                            </View>
                        </View>
                        <View style={styles.innercontainer}>
                            <View style={styles.ImageContainer}>
                                    <Pressable>
                                            <ImageBackground source={image3} resizeMode="cover" style={styles.image}>
                                            <View style={styles.textContainer}><Text style={styles.text}>Serenity</Text></View>
                                            </ImageBackground>
                                    
                                    </Pressable>
                            </View>
                            <View style={styles.ImageContainer}>
                                    <Pressable>
                                        
                                            <ImageBackground source={image4} resizeMode="cover" style={styles.image}>
                                                    <View style={styles.textContainer}><Text style={styles.text}>Sleep On</Text></View>
                                            </ImageBackground>
                                    
                                    </Pressable>
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.videoContainer}>
                      <YoutubePlayer play={playing} videoId={"0sZCzu0D4kI"}/>
                      <View className='flex items-end mt-2'>
                      </View>
                    </View> */}
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