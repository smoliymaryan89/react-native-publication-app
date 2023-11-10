import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAvatar,
  selectName,
  selectUserID,
} from "../redux/auth/authSelectors";
import { getCollectionByQuery } from "../firebase/firebaseOperation";
import { ImageBackground } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";

import { Image } from "react-native";

import { Text } from "react-native";
import { logout } from "../redux/auth/authOperation";
import { useNavigation } from "@react-navigation/native";
import PostItem from "../components/PostItem";

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);

  const name = useSelector(selectName);
  const userId = useSelector(selectUserID);
  const userAvatar = useSelector(selectAvatar);

  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    const unsubscribe = getCollectionByQuery("posts", userId, setUserPosts);

    return () => {
      unsubscribe.then((res) => res()).catch((e) => console.error(e));
    };
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1, resizeMode: "cover", justifyContent: "flex-end" }}
      source={require("../assets/images/bg-img.jpg")}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={{ alignSelf: "flex-end", marginBottom: 46 }}
          activeOpacity={0.7}
          onPress={() => dispatch(logout())}
        >
          <Feather name="log-out" size={24} color={"#464343"} />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: userAvatar }} />
          <TouchableOpacity
            style={{
              marginLeft: 90,
              marginTop: -15,
            }}
          >
            <AntDesign name="pluscircleo" size={30} color="#FF6C00" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{name}</Text>
        <FlatList
          data={userPosts}
          renderItem={({ item }) => <PostItem posts={item} />}
          keyExtractor={({ image }) => image}
        />
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    position: "relaative",
    height: "80%",
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 70,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#5e5858",
    borderRadius: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginTop: 15,
  },
  userName: {
    color: "#212121",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 32,
  },
  postContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postImg: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  imgName: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
});
