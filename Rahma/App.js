import * as React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather ,AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'; // Assuming you're using Expo for the project
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import DriverHome from "./Driver/DriverHome"
import DriverMap from "./Driver/DriverMap"
import DriverHistory from "./Driver/DriverHistory"
import DriverProfile from "./Driver/DriverProfile"

const { width, height } = Dimensions.get("screen");


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomHeaderLeft = () => (
  <View style={{ marginLeft: 20, marginBottom: 10 }}>
   <Image source={require('./assets/logo.png')} style={{ width: width/8, height: width/8 }} />
  </View>
);

const CustomHeaderRight = () => (
  <View style={{ marginRight: 10, marginBottom: 0 }}>
    <Feather name="log-out" color="black" size={30} />
  </View>
);
function BottomTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({  size }) => {
        let iconName;
  
        if (route.name === 'DriverHome') {
          iconName = 'home';
        return <Feather name={iconName} size={26} color="#616161" selectionColor="blue" />;

        } else if (route.name === 'DriverMap') {
          iconName = 'map-pin';
        return <Feather name={iconName} size={26} color="#616161" selectionColor="blue" />;

        } else if (route.name === 'DriverHistory') {
          return <MaterialCommunityIcons name="clipboard-text-clock-outline" size={33} color="#616161" selectionColor="blue" />;
        } else if (route.name === 'DriverProfile') {
          iconName = 'user';
        return <Feather name={iconName} size={26} color="#616161" selectionColor="blue" />;

        }
  
        // You can return any component here that you want as the icon
        // return <Feather name={iconName} size={26} color="grey" selectionColor="blue" />;
      },

      headerLeft: () => <CustomHeaderLeft />, 
      headerRight: () => <CustomHeaderRight />, 
      headerTitle: ""


    })}
   
  >
      {/* ------------ Driver ---------- */}
      <Tab.Screen name="DriverHome" component={DriverHome}   />
      <Tab.Screen name="DriverMap" component={DriverMap}  />
      <Tab.Screen name="DriverHistory" component={DriverHistory}   />
      <Tab.Screen name="DriverProfile" component={DriverProfile}   />
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
