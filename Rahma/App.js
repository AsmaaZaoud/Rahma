import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for the project
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';


//Drive Pages
import DriverHome from "./Driver/DriverHome"
import DriverMap from "./Driver/DriverMap"
import DriverHistory from "./Driver/DriverHistory"
import DriverProfile from "./Driver/DriverProfile"



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
    
      
    >
      {/* ------------ Driver ---------- */}
      <Tab.Screen name="DriverHome" component={DriverHome} options={{ headerShown: false }}  />
      <Tab.Screen name="DriverMap" component={DriverMap} options={{ headerShown: false }}  />
      <Tab.Screen name="DriverHistory" component={DriverHistory} options={{ headerShown: false }}  />
      <Tab.Screen name="DriverProfile" component={DriverProfile} options={{ headerShown: false }}  />
      {/* ------------ ------- ---------- */}


    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
