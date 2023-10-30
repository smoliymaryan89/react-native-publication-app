import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { Image } from "react-native";

const CommentsScreen = () => {
  const { params } = useRoute();

  return (
    <View style={styles.wrapper}>
      <Image
        source={{ uri: params.image }}
        width={343}
        height={240}
        style={styles.img}
      />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  img: {
    marginBottom: 32,
  },
});
