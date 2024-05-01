import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for the project
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

// import Icon from 'react-native-vector-icons/FontAwesome';

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed hehdhfhfhfh</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={BottomTabs}  />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = 'home-outline';
          } else if (route.name === 'Article') {
            iconName = 'newspaper-outline';
          }

          // You can return any component here that you want as the icon
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={Feed}  />
      <Tab.Screen name="Article" component={Article} options={{ headerShown: false }}  />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={MyDrawer} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
