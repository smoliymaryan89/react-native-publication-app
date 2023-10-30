import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";

const PostsScreen = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const [post, setPost] = useState([]);

  useEffect(() => {
    if (params) {
      setPost((prevState) =>
        prevState.includes(params) ? prevState : [...prevState, params]
      );
    }
  }, [params]);

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 32,
        }}
      >
        <Image source={require("../assets/images/userAvatar.png")} />
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>

      <FlatList
        data={post}
        renderItem={({ item: { image, imageName, place, location } }) => (
          <View
            style={{
              marginBottom: 32,
              flex: 1,
            }}
          >
            <Image source={{ uri: image }} style={styles.postImg} />
            <Text style={styles.imgName}>{imageName}</Text>
            <View style={styles.postContent}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
                onPress={() => navigate("Коментарі", { image })}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={{ fontSize: 16, color: "#BDBDBD" }}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
                onPress={() => navigate("Карта", { location })}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text
                  style={{
                    color: "#212121",
                    fontSize: 16,
                    textDecorationLine: "underline",
                  }}
                >
                  {place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={({ image }) => image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
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
  postContent: {
    flex: 1,
    flexDirection: "row",
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

export default PostsScreen;
