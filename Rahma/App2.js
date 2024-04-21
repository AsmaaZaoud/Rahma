import React, { useEffect, useState} from "react";
import { StyleSheet , View} from "react-native";
import Onboard from "../screens/Onboard";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const App = () => {

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
      // <NavigationContainer independent={true}>
        <View screenOptions={screenOptionStyle} >
          {firstLaunch && (
            <View
              options={{ headerShown: false }}
              name="Onboard"
              component={Onboard}
            />
          )}
    </View>
    // </NavigationContainer>
  )
)
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});