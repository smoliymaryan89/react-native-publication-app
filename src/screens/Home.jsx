import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Platform } from "react-native";
import PostsNavigation from "./PostsNavigation";

const Home = () => {
  const Tabs = createBottomTabNavigator();
  const { navigate } = useNavigation();

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 83,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsNavigation}
        options={({ route }) => ({
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigate("Login")}
              style={{ marginRight: 16, marginBottom: 10 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleStyle: styles.headerTitle,
          headerStyle: {
            ...styles.header,
            shadowColor: "rgba(0, 0, 0, 0.30)",
            shadowOffset: {
              width: 0,
              height: 0.5,
            },
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Feather name="grid" focused={focused} color={color} size={24} />
          ),
          tabBarActiveTintColor: "#FF6C00",
          headerShown: ((route) => {
            if (getFocusedRouteNameFromRoute(route) === "Коментарі") {
              return false;
            }
            if (getFocusedRouteNameFromRoute(route) === "Карта") {
              return false;
            }

            return;
          })(route),
          tabBarStyle: ((route) => {
            if (getFocusedRouteNameFromRoute(route) === "Коментарі") {
              return { display: "none" };
            }
            if (getFocusedRouteNameFromRoute(route) === "Карта") {
              return { display: "none" };
            }
            return { height: 80, borderTopWidth: 1 };
          })(route),
        })}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
          headerStyle: {
            ...styles.header,
            shadowColor: "rgba(0, 0, 0, 0.30)",
            shadowOffset: {
              width: 0,
              height: 0.5,
            },
          },
          headerTitleStyle: styles.headerTitle,
          tabBarShowLabel: false,
          tabBarButton: () => (
            <TouchableOpacity
              style={{
                ...styles.btnWrapper,
                paddingVertical: Platform.OS === "ios" ? 9 : 13.5,
              }}
              activeOpacity={0.7}
              onPress={() => navigate("Створити публікацію")}
            >
              <Feather name="plus" focused="false" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#212121CC"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigate("Публікації");
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Feather name="user" focused={focused} size={24} color={color} />
          ),
          tabBarActiveTintColor: "#FF6C00",
        }}
      />
    </Tabs.Navigator>
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
    paddingBottom: 11,
  },
  header: {
    borderBottomWidth: 1,
    height: 88,
  },
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13.5,
    paddingHorizontal: 28.5,
    backgroundColor: "#FF6C00",
    borderRadius: 25,
    marginTop: 10,
  },
});

export default Home;
