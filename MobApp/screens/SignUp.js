import { Pressable, StyleSheet, Text, TextInput, ScrollView, View, ImageBackground, Image, Alert, Button, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import webServerUrl from '../configurations/WebServer';
import { SignupInputValidation } from '../services/InputValidation';
import HttpService from '../services/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Pangolin_400Regular } from '@expo-google-fonts/pangolin';
import {icon_suhrud, background} from '../assets';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function SignUp(props) {

  const { t, i18n } = useTranslation();

  let [fontsLoaded] = useFonts({
    Pangolin_400Regular,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [accept, setAccept] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const toggleShowPassword = () => {
      setIsSecure(!isSecure);
  };

  const onPressSignUp = async () =>{
    const isValid=SignupInputValidation({ name, email, address, phoneNo, userName, gender, password, confirmPassword })

    if(!isValid)
      return;

    const signUpURL = webServerUrl+"/auth/register/patient";
    const method='POST';
    const data={
      ptUsername:userName,
      ptPassword:password,
      ptFullname:name,
      ptPhone:phoneNo,
      ptAddr: address,
      ptDOB: date.toLocaleDateString(),
      ptEmail: email,
      ptGender:gender
    }
    
    try{
      const response=await HttpService(method,signUpURL,data);
      console.log(response.status)
      if(response.status===200){
        console.log("Successful");
        console.log(response.data);
        try{
          await AsyncStorage.setItem('patientData',JSON.stringify(response.data));

          console.log("from storage");
          console.log(await AsyncStorage.getItem('patientData'));

        }catch(error){
            console.log("error while saving data");
            console.log(error);
        }
        props.navigation.navigate("Login");
      }
      else{
        alert(response.data.message);
        console.log(response.data.message);
      }
    }catch(error){
        alert(error.data.message);
        console.log(error);
      }
  }

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [address,setAddress]=useState('');
  const [phoneNo,setPhoneNo]=useState('');
  const [date, setDate] = useState(maxDate);
  const [userName, setUserName]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const[mode,setMode]=useState("date");
  const[show,setShow] =useState(false);
  const [gender,setGender] =useState('Male');
  
  const onChangeDate = (e,selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  }

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  }

  const onAccept = () => {
    setAccept(true);
    setModalVisible(!modalVisible);
  }


  return (
    <ImageBackground source={background} style={styles.imagebackground}>
      <Image  style={styles.tinyLogo} source={icon_suhrud}/>
    <ScrollView contentContainerStyle={styles.containerContent} style={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>
      <Text style={{color:'red'}}>{t("signUp.fieldRequired")}</Text>
      <ScrollView contentContainerStyle={styles.signContent} style={styles.signBox}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={t("signUp.fullName")}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={t("signUp.emailId")}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={t("signUp.address")}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={t("signUp.phoneNumber")}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPhoneNo(text)}
          />
        </View>
        <View style={styles.inputView}>
        <Text style={styles.inputText} className="mt-8">
            {t("signUp.dob")}: {date.toLocaleDateString()}
                </Text>
            <Pressable onPress={() => showMode('date')} style={styles.iconTouchableArea}>
                <MaterialCommunityIcons
                name="calendar-month"
                size={24}
                color="black"
                style={styles.calendarIcon}
                />
            </Pressable>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="spinner"
                onChange={onChangeDate}
                maximumDate={maxDate}
                minimumDate={new Date(1950, 0, 1)}
                />
            )}
            </View>
        <View style={styles.inputView}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerText}>
            <Picker.Item label={t("signUp.selectGender")} value="" />
            <Picker.Item label={t("signUp.male")} value="male" />
            <Picker.Item label={t("signUp.female")} value="female" />
            <Picker.Item label={t("signUp.other")} value="other" />
          </Picker>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={t("signUp.usernameLength")}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setUserName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder={t("signUp.passwordLength")}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry={isSecure}
            placeholder={t("signUp.confirmPassword")}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Pressable 
              onPress={toggleShowPassword}
              style={styles.iconTouchableArea}>
              <MaterialCommunityIcons 
                  name={isSecure ? 'eye-off' : 'eye'} 
                  size={24} 
                  color="#aaa"
              />
          </Pressable>
        </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert(`${t("signUp.modalClose")}`);
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{t("signUp.privacyPolicy")}</Text>
            <Text style={styles.modalText}>{t("signUp.privacyPolicy1")}</Text>
            <Text style={styles.modalText}>{t("signUp.privacyPolicy2")}</Text>
            <Text style={styles.modalText}>placeholder={t("signUp.privacyPolicy3")}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onAccept}>
              <Text style={styles.textStyle}>{t("signUp.acceptBtn")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
          <Pressable style={{color: 'blue'}}
                onPress={() => setModalVisible(true)}>
          <Text style={{color:'blue'}}> {t("signUp.termsConditions")}</Text>
          </Pressable>
        <Pressable
            onPress={onPressSignUp}
            disabled={!accept}
            style={({pressed, disabled})=>[disabled ? styles.disabledButton : styles.signUpBtn,
                {
                transform: [{ scale: pressed ? 0.96 : 1 }],
                }
            ]
          }
            >
            <Text style={styles.signUp}>{t("signUp.signUpBtn")}</Text>
        </Pressable>
      </ScrollView>
    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imagebackground:{
    flex:1,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    },
    tinyLogo: {
      width: 50,
      height: 50,
      marginTop:'20%',
    },
  container:{
    flex:1,
    position:'relative',
    width:'100%',
  },
  containerContent:{
    alignItems:'center',
    justifyContent:'center',
  },
  signBox:{
    flex:1,
    flexDirection:"column",
    paddingTop:10,
    paddingBottom:10,
    borderRadius:30,
    position:'relative',
    width:'80%',
    height:'100%',
  },
  signContent:{
    alignItems: 'center',
  },
  iconTouchableArea:{
    position:'absolute',
    right:10,
    height:50,
    width:50,
    justifyContent:'center',
    alignItems:'center',
  },
  icon:{
    position:'absolute',
  },
  title:{
    fontFamily:'Pangolin_400Regular',
    fontSize:30,
  },
  pickerText:{
    fontFamily:'Pangolin_400Regular',
    fontSize:30,
  },
  inputView:{
    width:'100%',
    borderRadius:20,
    height:45,
    marginBottom:13,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    padding:20,
    backgroundColor:'rgba(255,255,255,0.5)',
  },
  inputText:{
    flex:1,
    height:50,
    color:'black',
    flexDirection:'row',
    fontFamily:'Pangolin_400Regular',
  },
  signUp:{
    flex:1,
    color:'white',
    marginTop:5,
    fontFamily:'Pangolin_400Regular',
  },
  picker: {
    width:'100%',
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    fontFamily:'Pangolin_400Regular',
  },
  signUpBtn:{
    width:'40%',
    height:'6%',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'5%',
    borderRadius:15,
    padding:10, 
    backgroundColor:'#116fdf',
  },
  disabledButton:{
    width:'40%',
    height:'6%',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:'5%',
    borderRadius:15,
    padding:10, 
    backgroundColor:'grey',
  },
  dateView: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3AB4BA',
    borderRadius: 10,
    height: 50,
    marginBottom: 15,
    padding: 20,
    flex: 1, 
  },
  dateText: {
    color: 'black',
    marginLeft: 10, 
    fontFamily:'Pangolin_400Regular',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight:'bold',
  },
})