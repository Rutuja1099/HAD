import React, { useState, useRef, useEffect } from 'react';
import { Pressable, Animated, Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import {progImage,smileysImage} from '../assets';
import webServerUrl from '../configurations/WebServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../services/HttpService';
// import { useTranslation } from 'react-i18next';
import i18n from '../localization/i18n';
import STORE_LANGUAGE_KEY from '../configurations/Multilingual';

const { width } = Dimensions.get('window').width;
const height = 320;
export default function Week(props) {


  const[weekAndDay,setWeekAndDay]=useState({ currentWeek: 7, currentDay: 1 });
  // const[weekAndDay,setWeekAndDay]=useState({ currentWeek: null, currentDay: null });

    
    // const { t, i18n } = useTranslation();
  
    // let week;
    // const [items, setItems] = useState([
    //   { item: `${i18n.t("week.week1")}` },
    //   { item: `${i18n.t("week.week2")}` },
    //   { item: `${i18n.t("week.week3")}` },
    //   { item: `${i18n.t("week.week4")}` },
    //   { item: `${i18n.t("week.week5")}` },
    // ]);
    
    // const onPressWeek = (item) => {
    //   if(item==="Week 1"){
    //     week = 1;
    //   }
    //   else if(item==="Week 2"){
    //     week = 2; 
    //   }
    //   else if(item==="Week 3"){
    //     week = 3; 
    //   }
    //   else if(item==="Week 4"){
    //     week = 4;
    //   }
    //   else {
    //     week = 5;
    //   }
    //   console.log("Week is :", week);
    //   props.navigation.navigate("Day",{week:week});
    // };
  
  // useEffect(()=>{
  //   getWeeks();
  // },[]);

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

  useEffect(() => {
    retrieveLanguage();
  },[])

  const getWeeks=async()=>{
    const WeekUrl=webServerUrl+"/suhrud/patient/currentWeekAndDay";
    const method='GET';
    const sessionData=await AsyncStorage.getItem('patientData')
    const data=JSON.parse(sessionData);
    const bearerToken=data.token;
    console.log("bearer Token: ", bearerToken);
      
    const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    };

    let response;
    try{
      response=await HttpService(method,WeekUrl,null,headers);
      console.log(response.status);
      if(response.status===200){
        console.log("Successful");
        const thisData=await response.data;
        console.log(thisData);
        setWeekAndDay(thisData);
        console.log("Hello",thisData);
      }
      else{
        console.log(response.status);
        alert(response.data);
      }
    }catch(error){
      alert(error.data);
      console.log(error);
    }
  };

    let week;
    const thisWeek=weekAndDay.currentWeek;
    const activeWeek= `Week ${thisWeek}`;
    const minWeek=Math.floor(thisWeek/5)*5;
    console.log(minWeek);
    const [items, setItems] = useState([
      { item: `${i18n.t("week.week")} ${minWeek+1}` },
      { item: `${i18n.t("week.week")} ${minWeek+2}` },
      { item: `${i18n.t("week.week")} ${minWeek+3}` },
      { item: `${i18n.t("week.week")} ${minWeek+4}` },
      { item: `${i18n.t("week.week")} ${minWeek+5}` },
    ]);
    const onPressWeek=(item)=>{
      console.log("Week is : ",item);
      props.navigation.navigate("Day",{week:week, currentDay:weekAndDay.currentDay});
    }
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
                onPress={() => onPressWeek(item.item)}
                disabled={item.item!==activeWeek}
                style={({pressed})=>[
                  styles.dayBtn, 
                  {
                    backgroundColor: item.item===activeWeek? pressed?'#2A9396' : '#B8FAFF' :'#A52A2A',
                    opacity: item.item===activeWeek? 1 : 0.5,
                    transform:[{scale: pressed && item.item===activeWeek?0.96:1}]
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
      paddingTop: 20,
      marginTop:-30,
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