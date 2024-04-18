
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, ImageBackground, ScrollView, StyleSheet, Pressable, Animated, useWindowDimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import NavigationBar from "../components/NavigationBar";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';




const Moodlift = (props) => {

    const navigation = useNavigation();
    
    useLayoutEffect(() => {
            navigation.setOptions({
            headerShown: false,
        })
    },[])

    let [fontsLoaded] = useFonts({
      Pangolin_400Regular,
    });

    const [playing, setPlaying] = useState(false);
    
    const scrollX = useRef(new Animated.Value(0)).current;

    const {width: windowWidth} = useWindowDimensions();

  
    let [videoUrl, setVideoUrl] = useState("0sZCzu0D4kI");
    const [videod, setVideoId] = useState([
      {title:"Meditation", item: "0sZCzu0D4kI" },
      {title:"Relaxation", item: "4m8RxRMhMSw" },
      {title:"Oddly Satisfying", item: "TTXcHEMfLb4" },
    ]);
    const onSelectType = (item) => {
      console.log(item);
      setVideoUrl(item);
      
    };

    let [content , setContent] = useState("What do you wanna listen");
    

    const getJokes= (item)=>{
      console.log(item);
      try {
        fetch(
          'https://jokeapi-v2.p.rapidapi.com/joke/Any', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-RapidAPI-Key':'af584bc362msh037839860dbfb36p1a1584jsna4d1e52a4e90',
              'X-RapidAPI-Host':'jokeapi-v2.p.rapidapi.com',
            },
          }).then(response => response.json())
          .then(json => {
            
            console.log(json.joke);
            setContent(json.joke);
          });
      } catch (error) {
        console.error(error);
      }
    }
    
   const getMotivation=(item)=>{
      console.log(item);
      try {
        fetch(
          'https://olato-quotes.p.rapidapi.com/motivation', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-RapidAPI-Key':'af584bc362msh037839860dbfb36p1a1584jsna4d1e52a4e90',
              'X-RapidAPI-Host':'olato-quotes.p.rapidapi.com',
            },
          }).then(response => response.json())
          .then(json => {
            console.log(json.quote);
            setContent(json.quote);
          });
      } catch (error) {
        console.error(error);
      }
    }
    
    const onPressMore = () => {
      console.log("Pressed more");
      props.navigation.navigate("Meditation");
    };
  
    // const navigateback = () => {
    //   props.navigation.navigate("Profile");
    // };
  
    useEffect(() => {
      const interval = setInterval(() => {
        
      }, 3500);
      return () => clearInterval(interval);
    }, []);
  
    
   
  return (

    
    <SafeAreaView className="  bg-white flex-1 relative">
      <View className=" bg-sky-950 bg-opacity-10 flex-1 text-white pt-2 p-5 mt-2 ml-2 mr-2 mb-2 shadow-lg rounded-lg">
                <View className = "p-4 flex-row items-center">
                    {/* <Icon name="angle-left" color="grey" size={25} onPress={()=>navigateback()}/> */}
                    <Text style={styles.title}>
                      Your space ! 
                    </Text>
                </View>
                <Text style={styles.subtitle}>
                  Sit back, Calm down and let us help you... 
                </Text>
   
                <View className=" bg-slate-50 bg-opacity-60 max-w-m rounded overflow-hidden shadow-lg text-black pt-2 p-2 mt-10 ml-0 mr-0 mb-0 border-solid border-slate-950">
                  <View className='flex flex-row p-3'>
                  {videod.map((item, index) => (
                      <Pressable
                        onPress={() => onSelectType(item.item)}
                        style={({pressed})=>[
                          styles.type, 
                          {
                            backgroundColor: pressed?'#D3D3D3' : '#E5E4E2',
                            margin:5,
                            height:30,
                            padding:5,
                            borderRadius:10,
                          },
                        ]}
                        key={index}
                      >
                        <Text style={styles.dayText}>{item.title}</Text>
                      </Pressable>
                    ))}
                    </View>
                  <YoutubePlayer key={videoUrl} play={playing} videoId={videoUrl}/>
                  <View className='flex items-end mt-2'>
                      <Pressable onPress={()=> onPressMore()}>
                          <Text style={styles.linkText}>See more..</Text>
                      </Pressable>
                  </View>
                </View>


                <View className='flex-col mt-10'>
                  <View className='flex flex-row p-3 justify-evenly'>
                    <Pressable style={styles.taskButton}  onPress={()=>getJokes('Jokes')}>
                      <Text style={styles.text}>Have a laugh</Text>
                    </Pressable>
                    <Pressable style={styles.taskButton} onPress={()=>getMotivation('Motivation')} >         
                      <Text style={styles.text}>Motivation Pump</Text>
                    </Pressable>
                  </View>
                    <View className='bg-white bg-blend-hue flex flex-row justify-center items-center p-5 max-w-md mt-10 h-1/2 border-2 border-dotted border-red-400'> 
                          <Text style={styles.beautyText}>{content}</Text>     
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontFamily:"Pangolin_400Regular",
  },
  beautyText: {
    color: 'blue',
    fontSize: 16,
    fontFamily:"Pangolin_400Regular",
  },
  linkText: {
    color: 'blue',
    fontSize: 14,
    fontFamily:"Pangolin_400Regular",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  title:{
    fontFamily:"Pangolin_400Regular",
    fontSize:30,
    color:'white',
  },
  subtitle:{
    fontFamily:"Pangolin_400Regular",
    fontSize:15,
    color:'white',
    marginLeft:10,
  },
  dayText:{
    fontFamily:"Pangolin_400Regular",
    fontSize:15,
    color:'black',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    height:30,
    width:50,
  },
  taskButton: {
    borderRadius: 20,
    padding: 2,
    height:40,
    width:115,
    opacity:0.9,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonOpen: {
    backgroundColor: '#839192',
  },
  buttonClose: {
    backgroundColor: '#aeb6bf',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  modalView: {
    margin: 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    fontSize: 12,
    color: 'black',
    fontFamily:"Pangolin_400Regular",
  },
});

export default Moodlift