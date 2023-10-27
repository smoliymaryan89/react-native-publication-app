import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";

import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import Home from "./src/screens/Home";

const MainStack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
