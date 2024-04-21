import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";

// react-native link react-native-gesture-handler
// import "@react-native-gesture-handler";

import HomeScreen from "./Syeda/HomeScreen";

import { NavigationContainer } from "@react-navigation/native";
//stack navigation
import { createStackNavigator } from "@react-navigation/stack";

//onboard - syeda
import Onboard from "./Syeda/Onboard";

import AsyncStorage from '@react-native-async-storage/async-storage';

//stack navigation
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


  export default function App() {
    const [firstLaunch, setFirstLaunch] = useState(null);
    useEffect(() => {
      async function setData() {
        const appData = await AsyncStorage.getItem("appLaunched");
        if (appData == null) {
          setFirstLaunch(true);
          AsyncStorage.setItem("appLaunched", "false");
        } else {
          setFirstLaunch(false);
        }
      }
      setData();
    }, []);

    return (
      firstLaunch != null && (
        <NavigationContainer>
          <Stack.Navigator>
            {firstLaunch && (
              <Stack.Screen
                options={{ headerShown: false }}
                name="Onboarding"
                component={Onboard}
              />
            )}
            <Stack.Screen name="Onboarding" component={Onboard} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
