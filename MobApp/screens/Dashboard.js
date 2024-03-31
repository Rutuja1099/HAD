import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import NavigationBar from "../components/NavigationBar";



const Dashboard = () => {

    const navigation=useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
    })
    },[])

    return(
        <>
            Dashboard

            <NavigationBar />
        </>

    )
}

export default Dashboard;

