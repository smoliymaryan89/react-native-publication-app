import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getLength } from "../firebase/firebaseOperation";
import { useNavigation, useRoute } from "@react-navigation/native";

const PostItem = ({ posts: { id, image, imageName, place } }) => {
  const { params } = useRoute();

  const location = params?.location;

  const { navigate } = useNavigation();

  const [commentsLength, setCommentsLength] = useState(0);

  useEffect(() => {
    const unsubscribe = getLength(`posts/${id}/comments`, setCommentsLength);

    return () => {
      unsubscribe.then((res) => res()).catch((e) => console.error(e));
    };
  }, []);

  return (
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
          onPress={() => navigate("Коментарі", { image, id })}
        >
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={{ fontSize: 16, color: "#BDBDBD" }}>
            {commentsLength}
          </Text>
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
  );
};

export default PostItem;

const styles = StyleSheet.create({
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
