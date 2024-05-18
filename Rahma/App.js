import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//onboard - Donor
import Onboard from "./Donor/Onboard";
import Amount from './Donor/Amount';
import DateTimeScreen from './Donor/DateTimeScreen';
import Address from './Donor/Address';
import Confirm from './Donor/Confirm';
import Done from './Donor/Done';
import History from './Donor/History';

import AsyncStorage from '@react-native-async-storage/async-storage';

//stack navigation
const Stack = createNativeStackNavigator();

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
      //onbord
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
            {/* <Stack.Screen name="Onboarding" component={Onboard} options={{ headerShown: false }}/> */}
            <Stack.Screen name="Amount" component={Amount} options={{ headerShown: false }}/>
            <Stack.Screen name="DateTimeScreen" component={DateTimeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Address" component={Address} options={{ headerShown: false }}/>
            <Stack.Screen name="Confirm" component={Confirm} options={{ headerShown: false }}/>
            <Stack.Screen name="Done" component={Done} options={{ headerShown: false }}/>
            <Stack.Screen name="History" component={History} options={{ headerShown: false }}/>
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
