import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperation";
import { useEffect } from "react";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import Home from "../screens/Home";

import { createStackNavigator } from "@react-navigation/stack";
import { selectIsLoginIn } from "../redux/auth/authSelectors";

const Main = () => {
  const isLoginIn = useSelector(selectIsLoginIn);
  const dispatch = useDispatch();

  const Stack = createStackNavigator();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <Stack.Navigator initialRouteName="Login">
      {!isLoginIn ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Main;
