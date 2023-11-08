import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";

import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authOperation";
import { uploadAvatar } from "../firebase/firebaseOperation";

const RegistrationScreen = () => {
  const [avatar, setAvatar] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardShowing, setIsKeyboardShowing] = useState(false);

  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const removeAvatar = () => {
    setAvatar(null);
  };

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const avatarPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  if (hasPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  }

  const onRegistration = async () => {
    try {
      if (login && email && password) {
        dispatch(register(login, email, password, avatar));
      }

      if (avatar) {
        await uploadAvatar(avatar, "avatars");
      }
    } catch (error) {
      console.log("Registration error:", error);
    }
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
              <View style={styles.userAvatar}>
                {!avatar ? (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      position: "absolute",
                      top: 81,
                      left: 107,
                      zIndex: 100,
                    }}
                    onPress={avatarPicker}
                  >
                    <AntDesign name="pluscircleo" size={30} color="#FF6C00" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      position: "absolute",
                      top: 81,
                      left: 107,
                      zIndex: 100,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                    onPress={removeAvatar}
                  >
                    <AntDesign
                      name="pluscircleo"
                      size={30}
                      color="#E8E8E8"
                      style={{ transform: [{ rotate: "45deg" }] }}
                    />
                  </TouchableOpacity>
                )}
                <Image
                  source={{ uri: avatar }}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 16,
                  }}
                />
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <View style={styles.formWrapper}>
                <Input
                  placeholder="Логін"
                  value={login}
                  onChangeText={setLogin}
                  onFocus={() => {
                    setIsKeyboardShowing(true);
                    setIsLoginFocused(true);
                  }}
                  onBlur={() => {
                    setIsKeyboardShowing(false);
                    setIsLoginFocused(false);
                  }}
                  styleProps={
                    isLoginFocused && {
                      borderColor: "#FF6C00",
                      backgroundColor: "#fff",
                    }
                  }
                />
                <Input
                  placeholder="Адреса електронної пошти"
                  value={email}
                  keyboardType={"email-address"}
                  onChangeText={setEmail}
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
                    text={"Зареєстуватися"}
                    styleProps={{ marginTop: 27 }}
                    onPress={onRegistration}
                  />
                )}
              </View>
              {!isKeyboardShowing && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigate("Login")}
                >
                  <Text style={styles.noAccountMessage}>
                    Вже є акаунт?
                    <Text>Увійти</Text>
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
  userAvatar: {
    position: "absolute",
    top: -60,
    left: 128,
    zIndex: 100,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  bgImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 45,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    marginTop: 92,
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

export default RegistrationScreen;
