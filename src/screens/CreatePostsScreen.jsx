import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";

import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import Input from "../components/Input";
import CustomButton from "../components/CustomButton";

const CreatePostsScreen = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 32 }}>
        <View style={styles.imgWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconWrapper}>
            <Ionicons
              name="camera"
              size={24}
              color={"rgba(189, 189, 189, 1)"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Завантажте фото</Text>
      </View>
      <View>
        <Input placeholder={"Назва..."} styleProps={styles.input} />
        <Input
          leftIcon={
            <SimpleLineIcons
              name="location-pin"
              size={24}
              color="rgba(189, 189, 189, 1)"
              style={{ position: "absolute", zIndex: 100, top: 16, left: 0 }}
            />
          }
          placeholder={"Місцевість..."}
          styleProps={{ paddingLeft: 24, marginBottom: 32, ...styles.input }}
        />
        <CustomButton
          disabled={disabled}
          text={"Опубліковати"}
          styleProps={
            disabled
              ? { backgroundColor: "#F6F6F6" }
              : { backgroundColor: "#FF6C00" }
          }
          textStyles={disabled ? { color: "#BDBDBD" } : { color: "#fff" }}
        />
      </View>
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 70,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#F6F6F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="trash-2" size={24} color={"rgba(189, 189, 189, 1)"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 34,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  imgWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 240,
    marginBottom: 8,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  input: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 0,

    fontWeight: "500",
  },
});

export default CreatePostsScreen;
