import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Main from "./src/components/Main";

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
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
