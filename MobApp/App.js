import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//components
import Settings from './screens/Settings';
import Profile from './screens/Profile'
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
import Harmony from "./screens/Harmony";
import Questionnaire from "./screens/Questionnaire";
import Appointment from "./screens/Appointment";
import DoctorAppointmentDetail from "./screens/DoctorAppointmentDetail";
import Dashboard from "./screens/Dashboard";
import Meditation from "./screens/Meditation";
import Moodlift from "./screens/Moodlift";
import MeditationPage from "./screens/MeditationPage";


NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    
    <NavigationContainer>

      {/* <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} /> */}

      <Stack.Navigator initialRouteName="Login">
      
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Week" component={Week}/>
        <Stack.Screen name="Day" component={Day}/>
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="Meditation" component={Meditation} />
        <Stack.Screen name="Moodlift" component={Moodlift} />
        <Stack.Screen name="MeditationPage" component={MeditationPage} />
        <Stack.Screen name="Appointment" component={Appointment} />
        <Stack.Screen name="Dashboard" component={Dashboard} />

        <Stack.Screen name="Questionnaire" component={Questionnaire} />
        
        <Stack.Screen name="DoctorAppointmentDetail" component={DoctorAppointmentDetail} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Security and Privacy" component={SecurityPrivacy} />
        <Stack.Screen name="Password Manager" component={PasswordManager} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Privacy Notice" component={PrivacyNotice} />
        <Stack.Screen 
          name="Chat" 
          component={Chat} 
          // initialParams={{ doctorName: 'Dr. John', doctorId: 123 }}  
        />
        <Stack.Screen name="Wellness Hub" component={WellnessHub} />   
        <Stack.Screen name="Harmony" component={Harmony}/>     
      
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}
