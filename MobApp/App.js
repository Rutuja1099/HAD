import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//components
import Settings from './screens/Settings';
import Notifications from './screens/Notifications'
import SecurityPrivacy from './screens/SecurityPrivacy'
import EditProfile from './screens/EditProfile'
import PasswordManager from './screens/PasswordManager'
import PrivacyNotice from './screens/PrivacyNotice'
import Chat from "./screens/Chat";
import ChatList from "./screens/ChatList";
import WellnessHub from "./screens/WellnessHub";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import Week from "./screens/Week";
import Day from "./screens/Day";
import ChangePassword from "./screens/ChangePassword";
import Questionnaire from "./screens/Questionnaire";
import Appointment from "./screens/Appointment";
import DoctorAppointmentDetail from "./screens/DoctorAppointmentDetail";
import Dashboard from "./screens/Dashboard";
import Meditation from "./screens/Meditation";
import Moodlift from "./screens/Moodlift";
import MeditationPage from "./screens/MeditationPage";
import EmergencyContact from "./screens/EmergencyContact";
import AnswerQnA from "./screens/AnswerQnA";
import Destress from "./screens/Destress";
import './localization/i18n';


NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    
    <NavigationContainer>

      {/* <Stack.Navigator>
      <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacy} options={{headerShown: false,}}/> */}

      <Stack.Navigator initialRouteName="Login" >
      
        <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false,}}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false,}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false,}}/>
        <Stack.Screen name="Week" component={Week}/>
        <Stack.Screen name="Day" component={Day}/>
        <Stack.Screen name="ChatList" component={ChatList} options={{headerShown: false,}}/>
        <Stack.Screen name="Meditation" component={Meditation} options={{headerShown: false,}}/>
        <Stack.Screen name="Moodlift" component={Moodlift} options={{headerShown: false,}}/>
        <Stack.Screen name="MeditationPage" component={MeditationPage} options={{headerShown: false,}}/>
        <Stack.Screen name="Destress" component={Destress} options={{headerShown: false,}}/>
        <Stack.Screen name="Appointment" component={Appointment} options={{headerShown: false,}}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false,}}/>

        <Stack.Screen name="Questionnaire" component={Questionnaire} options={{headerShown: false,}}/>
        
        <Stack.Screen name="DoctorAppointmentDetail" component={DoctorAppointmentDetail} options={{headerShown: false,}}/>
        <Stack.Screen name="Settings" component={Settings} options={{headerShown: false,}}/>
        {/* <Stack.Screen name="Profile" component={Profile} options={{headerShown: false,}}/> */}
        <Stack.Screen name="Notifications" component={Notifications} options={{headerShown: false,}}/>
        <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacy} options={{headerShown: false,}}/>
        <Stack.Screen name="Password Manager" component={PasswordManager} options={{headerShown: false,}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false,}}/>
        <Stack.Screen name="PrivacyNotice" component={PrivacyNotice} options={{headerShown: false,}}/>
        <Stack.Screen 
          name="Chat" 
          component={Chat} 
          // initialParams={{ doctorName: 'Dr. John', doctorId: 123 }}  
        />
        <Stack.Screen name="Wellness Hub" component={WellnessHub} options={{headerShown: false,}}/>   
        <Stack.Screen name="Emergency Contacts" component={EmergencyContact} options={{headerShown: false,}}/> 
        <Stack.Screen name="AnswerQnA" component={AnswerQnA} options={{headerShown: false,}}/>      
      
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}
