import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

const PostsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Posts">
      <Stack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerStyle: {
            ...styles.header,
            shadowColor: "rgba(0, 0, 0, 0.30)",
            shadowOffset: {
              width: 0,
              height: 0.5,
            },
          },
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="Карта" component={MapScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: "#212121",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  header: {
    borderBottomWidth: 1,
    height: 88,
  },
});

export default PostsNavigation;
