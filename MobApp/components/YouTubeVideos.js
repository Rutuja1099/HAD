import { View, Text, SafeAreaView, useCallback, Image ,useWindowDimensions,style, Button, Pressable, Alert , ScrollView} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { homeImage, progressImage, moodliftImage, messageImage, settingsImage} from '../assets'
import YoutubePlayer from "react-native-youtube-iframe";

import webServerUrl from '../configurations/WebServer';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { YouTubePlaylist } from "@codesweetly/react-youtube-playlist";
// import { YOUTUBE_API_KEY } from "../apikay";

YOUTUBE_API_KEY="AIzaSyC2XOVKIoD14clP0YJAdoo1FStFv57340s"

const YOUTUBE_PLAYLIST_ITEMS_API ='https://www.googleapis.com/youtube/v3/playlistItems';
// const YOUTUBE_PLAYLIST_ID =`UC49EQI8wRaKG9xap2aL7Trg`;
const YOUTUBE_PLAYLIST_ID =`PLONX6yhUyIKfXn6JFdYuRDaH_DvcRg-6P`;

// const YOUTUBE_PLAYLIST_ID=`inpok4MKVLM`;
const YouTubeVideos = ({  }) => {
  const [youtubedata, setYouTubeData]=useState([]);
  const [playing, setPlaying] = useState(false);

  // const onStateChange = useCallback((state) => 
  // {   if (state === "ended") 
  //     {      
  //       setPlaying(false);      
  //       Alert.alert("video has finished playing!");    
  //     }  
  // }, []);

  // const togglePlaying = useCallback(() => {    setPlaying((prev) => !prev);  }, []);
   let data;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`);
        data = await res.json();
        console.log("rutuja",data);
        setYouTubeData(data.items);
        // Handle data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    }

    fetchData();
    console.log("hihihi",data);
  }, []); // Run once on component mount

  useEffect (() => {
    console.log("in tututututut",youtubedata );
}, [youtubedata]);
  return (
    // <View></View>
    // <View className = "flex flex-row">

    
    //    <YouTubePlaylist
    //     apiKey={YOUTUBE_API_KEY}
    //     playlistId={YOUTUBE_PLAYLIST_ID}
    //     uniqueName="THIS_PLAYLIST_INSTANCE_NAME"
    //     className="flex-row text-center"
    //   />
   
    // </View>
    <View className="bg-gray-400 rounded-xl" >
    <ScrollView horizontal>
      {youtubedata && youtubedata.map((item, index) => (
        <View key={index} style={{ marginRight: 10 }} className="p-2">
          <YoutubePlayer
            height={200}
            width={327}
            play={playing}
            videoId={item.snippet.resourceId.videoId}
            // onChangeState={onStateChange}
          />
          <Text className="text-center font-semibold text-sm" >{item.snippet.title}</Text>
         
        </View>
      ))}
    </ScrollView>
    </View> 
  );
}

  
  export default YouTubeVideos