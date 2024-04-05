import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Button, FlatList,Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import DoctorAppointmentBox from '../components/DoctorAppointmentBox';


const Appointment = ({route}) => {
    
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allDoctorInfo, setAllDoctorInfo] = useState([
        { id: 1, name: 'Dr. Saurabh', profilePhoto: 'assets/doctor.png', Days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']},
        { id: 2, name: 'Dr. Sauvay', profilePhoto: 'assets/doctor.png' , Days:['Mon','Tue','Wed','Thu','Fri']},
        { id: 3, name: 'Dr. Asmita', profilePhoto: 'assets/doctor.png' , Days:['Mon','Wed','Thu','Fri','Sat']},
        { id: 4, name: 'Dr. Asthitha', profilePhoto: 'assets/doctor.png' , Days:['Mon','Tue','Sat','Sun']},
    ]);
    const navigation=useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false,
        })  
    },[])

    const navigateBack = () => {
        setSearchText("");
    } 

    useEffect(() => {
        // Scroll to the bottom when messages change
        // scrollViewRef.current.scrollToEnd({ animated: false });
    }, [allDoctorInfo]);

    const handleSearch = (text) => {

        setSearchText(text);
        
        text = text.toString();

        if (searchText.trim() === '') {
            setSearchResults([]);
            return;
        }
        
        const filteredResults = allDoctorInfo.filter(doctor => doctor.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(filteredResults);

    }

    const navigateDashboard = () => {
        navigation.navigate("Dashboard");
    }

    const scrollViewRef = useRef(); 

    return(    
    <SafeAreaView className="flex-1">
        <SafeAreaView className = "m-2 border-b border-spacing-8 border-dashed pb-2 px-2 mt-2 flex-row justify-between">
            
            <View className="flex-row space-x-4">
                <Icon name="angle-left" size={25}/>
         
                <Text className="flex text-xl font-semibold ml-2">
                    Suggested Doctors
                </Text>
            </View>
            <SafeAreaView className="mr-0">
                <Text onPress={() => navigateDashboard()} className="text-center rounded-xl bg-white w-full h-full p-1">Skip</Text>
            </SafeAreaView>
           
        </SafeAreaView>

        <SafeAreaView className="flex-1">
            {/* Search */}
            <View className = "p-4 flex-row item-centered">
                {searchText.trim() != '' ?

                    (
                        <Pressable onPress={navigateBack}>
                            <Text style={{ marginRight: 10 }} className="self-center text-2xl">←</Text>
                        </Pressable>
                    )

                    :

                    (
                        <View></View>
                    )
                }

                <TextInput
                    className="flex-auto bg-white p-2 rounded-2xl ml-2 mr-2"
                    placeholder="Search"
                    value={searchText}
                    onChangeText={handleSearch}
                    // onSubmitEditing={showResults}
                />
            </View>
        
            {searchText.trim() === '' ?
                    
                    (
                        <FlatList
                            data={allDoctorInfo}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                
                                return (
                                    
                                        <DoctorAppointmentBox 
                                        item={item}
                                            navigation={navigation}
                                        />
                                
                                    
                                    
                                )}
                            }
                        />
                    )

                    :

                    (
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                
                                return (
                                    <DoctorAppointmentBox 
                                        item={item}
                                            navigation={navigation}
                                        />
                                )}
                            }
                        />
                    )
                }

        </SafeAreaView>
    </SafeAreaView>
    )
}
export default Appointment;