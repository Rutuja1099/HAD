import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from "../screens/Dashboard";
import Week from "../screens/Week";
import WellnessHub from "../screens/WellnessHub";
import ChatList from "../screens/ChatList";
import Settings from "../screens/Settings";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
    
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Questionnaire" component={Week} />
      <Tab.Screen name="WellnessHub" component={WellnessHub} />
      <Tab.Screen name="ChatList" component={ChatList} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>

  );
};

export default BottomTabNavigator;
