import React, { useState, useRef } from 'react';
import { Pressable, Animated, Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import {progImage,smileysImage} from '../assets';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window').width;
const height = 320;
export default function Week(props) {
    
    const { t, i18n } = useTranslation();
  
    let week;
    const [items, setItems] = useState([
      { item: `${t("week.week1")}` },
      { item: `${t("week.week2")}` },
      { item: `${t("week.week3")}` },
      { item: `${t("week.week4")}` },
      { item: `${t("week.week5")}` },
    ]);
    
    const onPressWeek = (item) => {
      if(item==="Week 1"){
        week = 1;
      }
      else if(item==="Week 2"){
        week = 2; 
      }
      else if(item==="Week 3"){
        week = 3; 
      }
      else if(item==="Week 4"){
        week = 4;
      }
      else {
        week = 5;
      }
      console.log("Week is :", week);
      props.navigation.navigate("Day",{week:week});
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
                onPress={() => onPressWeek(item.item)}
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