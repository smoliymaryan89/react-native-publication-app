import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Image source={require("../assets/images/userAvatar.png")} />
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  name: {
    color: "#212121",
    fontSize: 13,
    fontWeight: "700",
  },
  email: {
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 11,
  },
});

export default PostsScreen;
