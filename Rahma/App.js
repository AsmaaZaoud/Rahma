import * as React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo for the project
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import DriverHome from "./Driver/DriverHome"
import DriverMap from "./Driver/DriverMap"
import DriverHistory from "./Driver/DriverHistory"
import DriverProfile from "./Driver/DriverProfile"

const { width, height } = Dimensions.get("screen");

const out = () => <Feather name="log-out" color="black" size={40} />;
const logo = () => <Image source={require('./assets/logo.png')} style={{ width: width/8, height: width/8 }} />;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
  
        if (route.name === 'DriverHome') {
          iconName = 'home';
        } else if (route.name === 'DriverMap') {
          iconName = 'map-pin';
        } else if (route.name === 'DriverHistory') {
          iconName = 'rotate-ccw';
        } else if (route.name === 'DriverProfile') {
          iconName = 'user';
        }
  
        // You can return any component here that you want as the icon
        return <Feather name={iconName} size={size} color={color} />;
      },
    })}
   
  >
      {/* ------------ Driver ---------- */}
      <Tab.Screen name="DriverHome" component={DriverHome}   />
      <Tab.Screen name="DriverMap" component={DriverMap}  />
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
