import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from './screens/Settings';
import Profile from './screens/Profile'
import Notifications from './screens/Notifications'
import SecurityPrivacy from './screens/SecurityPrivacy'
import EditProfile from './screens/EditProfile'
import PasswordManager from './screens/PasswordManager'
import PrivacyNotice from './screens/PrivacyNotice'
import Chat from "./screens/Chat";
import ChatList from "./screens/ChatList";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ChatList" component={ChatList} />
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
        
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}
