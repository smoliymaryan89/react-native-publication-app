import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg-img.jpg")}
        style={styles.bgImg}
      >
        <View style={styles.wrapper}>
          <Text style={styles.title}>Увійти</Text>
          <View style={styles.formWrapper}>
            <Input placeholder="Адреса електронної пошти" />
            <Input placeholder="Пароль" />
            <CustomButton text={"Увійти"} styleProps={{ marginTop: 27 }} />
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.noAccountMessage}>
              Немає акаунту?
              <Text style={{ textDecorationLine: "underline" }}>
                Зареєструватися
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 111,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 33,
    fontFamily: "Roboto-medium",
  },
  formWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  noAccountMessage: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    marginRight: 3,
  },
});
