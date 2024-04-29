import React, { useState, useRef } from 'react';
import { Pressable, Animated, Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import {progImage,smileysImage} from '../assets';
import { useNavigation } from '@react-navigation/native'
import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';


const { width } = Dimensions.get('window').width;
const height = 320;

export default function Day({route}) {

  const { t, i18n } = useTranslation();

  const {week} = route.params;
    let day;
    const [items, setItems] = useState([
      { item: `${t("day.day1")}` },
      { item: `${t("day.day2")}` },
      { item: `${t("day.day3")}` }
    ]);

    const navigation = useNavigation();

    console.log("Week", week);

    const onPressDay = async (item) => {

      if(item==="Day 1"){
        day = 1;
      }
      else if (item === "Day 2"){
        day = 2;
      }
      else{
        day = 3;
      }

      const loginURL = webServerUrl+"/suhrud/patient/getquestionnaire";
      const method='GET';
      
      const sessionData = await AsyncStorage.getItem('patientData')
      const data=JSON.parse(sessionData);
      const bearerToken = data.token;

      console.log("bearer token: ", bearerToken);

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


      navigation.navigate("Questionnaire", {week:week, day:day});
    };
  
    const scrollY = useRef(new Animated.Value(0)).current;

  const imageAnimatedStyle = [
    {
      translateY: scrollY.interpolate({
        inputRange:[-height,0,height],
        outputRange:[-height/2,0,height*0.75],
        extrapolate:'clamp',
      }),
    },
    {
      scale: scrollY.interpolate({
        inputRange: [-height,0,height],
        outputRange: [2,1,1],
        extrapolate: 'clamp',
      })
    }
  ]
  
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Animated.Image
            style={[styles.parallaxHeader, {transform: imageAnimatedStyle}]}
            source={progImage}
          />
          <View style={styles.scrollViewContent}>
            <Image
                source={smileysImage}
                style={styles.smiley}
            />
            {items.map((item, index) => (
              <Pressable
                onPress={() => onPressDay(item.item)}
                style={({pressed})=>[
                  styles.dayBtn, 
                  {
                    backgroundColor: pressed?'#2A9396' : '#B8FAFF',
                    transform: [{scale: pressed?0.96:1}]
                  },
                ]}
                key={index}
              >
                <Text style={styles.dayText}>{item.item}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'row',
    },
    parallaxHeader: {
      width,
      height:height,
      resizeMode: 'cover',
    },
    smiley: {
      width: width,
      height: 50,
      resizeMode: 'contain',
    },
    scrollViewContent: {
      flex: 1,
      backgroundColor: '#F2FFFE',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
      padding: 16,
      height:'100%',
      paddingTop: 40,
      marginTop:-10,
    },
    dayBtn: {
      width: "100%",
      backgroundColor: "#3AB4BA",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      marginBottom: 10,
      opacity: 0.9,
      // borderColor: 'blue',
      // borderWidth: 2,
      borderRadius: 20,
    },
    dayText: {
      color: "black",
      fontSize: 20,
    },
  });