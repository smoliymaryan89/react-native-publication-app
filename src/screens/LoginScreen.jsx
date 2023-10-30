import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";

const LoginScreen = ({ router }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardShowing, setIsKeyboardShowing] = useState(false);

  const { navigate } = useNavigation();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onLogin = () => {
    setEmail("");
    setPassword("");
    console.log(`Email: ${email}\nPassword: ${password}`);
    navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/bg-img.jpg")}
          style={styles.bgImg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View
              style={
                isKeyboardShowing
                  ? { ...styles.wrapper, paddingBottom: 0 }
                  : styles.wrapper
              }
            >
              <Text style={styles.title}>Увійти</Text>
              <View style={styles.formWrapper}>
                <Input
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType={"email-address"}
                  onFocus={() => {
                    setIsKeyboardShowing(true);
                    setIsEmailFocused(true);
                  }}
                  onBlur={() => {
                    setIsKeyboardShowing(false);
                    setIsEmailFocused(false);
                  }}
                  styleProps={
                    isEmailFocused && {
                      borderColor: "#FF6C00",
                      backgroundColor: "#fff",
                    }
                  }
                />
                <View style={{ position: "relative" }}>
                  <Input
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={showPassword && true}
                    onFocus={() => {
                      setIsKeyboardShowing(true);
                      setIsPasswordFocused(true);
                    }}
                    onBlur={() => {
                      setIsKeyboardShowing(false);
                      setIsPasswordFocused(false);
                    }}
                    styleProps={{
                      ...(isPasswordFocused && {
                        borderColor: "#FF6C00",
                        backgroundColor: "#fff",
                      }),
                      ...(showPassword
                        ? { paddingRight: 100 }
                        : { paddingRight: 90 }),
                    }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      position: "absolute",
                      right: 16,
                      top: 17,
                    }}
                    onPress={toggleShowPassword}
                  >
                    <Text
                      style={{
                        color: "#1B4371",
                        fontSize: 16,
                      }}
                    >
                      {showPassword ? "Показати" : "Сховати"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {!isKeyboardShowing && (
                  <CustomButton
                    text={"Увійти"}
                    styleProps={
                      isKeyboardShowing ? { marginTop: 0 } : { marginTop: 27 }
                    }
                    onPress={onLogin}
                  />
                )}
              </View>
              {!isKeyboardShowing && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigate("Registration")}
                >
                  <Text style={styles.noAccountMessage}>
                    Немає акаунту?
                    <Text style={{ textDecorationLine: "underline" }}>
                      Зареєструватися
                    </Text>
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

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

export default LoginScreen;
