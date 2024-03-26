import React, { useState, useRef } from 'react';
import { Pressable, Animated, Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import {progImage,smileysImage} from '../assets';

const { width } = Dimensions.get('window').width;
const height = 320;
export default function Week(props) {
    const [items, setItems] = useState([
      { item: "Week 1" },
      { item: "Week 2" },
      { item: "Week 3" },
      { item: "Week 4" },
      { item: "Week 5" },
      { item: "Week 6" },
      { item: "Week 7" },
      { item: "Week 8" },
    ]);
    
    const onPressWeek = (item) => {
      console.log(item);
      props.navigation.navigate("Day");
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
                    backgroundColor: pressed?'#2A9396' : '#3AB4BA',
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
      height: 200,
      resizeMode: 'contain',
    },
    scrollViewContent: {
      flex: 1,
      backgroundColor: '#fff',
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
      borderColor: 'blue',
      borderWidth: 2,
      borderRadius: 20,
    },
    dayText: {
      color: "black",
      fontSize: 20,
    },
  });