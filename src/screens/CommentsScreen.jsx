import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { useRoute } from "@react-navigation/native";

import Input from "../components/Input";
import { Feather } from "@expo/vector-icons";

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
      <Input
        placeholder={"Коментувати..."}
        styleProps={{ width: 342, borderRadius: 50, paddingRight: 50 }}
        rightIcon={
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              backgroundColor: "#FF6C00",
              borderRadius: 50,
              position: "absolute",
              right: 8,
              top: 12,
            }}
          >
            <Feather name="arrow-up" size={25} color="#ffffff" />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  img: {
    marginBottom: 32,
  },
});
