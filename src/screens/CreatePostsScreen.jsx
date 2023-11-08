import { useEffect, useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import { uploadAvatar, uploadDataToDB } from "../firebase/firebaseOperation";
import { useSelector } from "react-redux";
import { selectUserID } from "../redux/auth/authSelectors";

const CreatePostsScreen = () => {
  const { navigate } = useNavigation();
  const userId = useSelector(selectUserID);

  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);

  const [disabled, setDisabled] = useState(true);

  const cameraRef = useRef(null);
  const cameraType = Camera.Constants.Type.back;

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  useEffect(() => {
    isEmptyForm();
  }, [image, place]);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        setImage(uri);
        await MediaLibrary.createAssetAsync(uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async () => {
    getCurrentLocation();

    const photoURI = await uploadAvatar(image, "posts");

    const newPost = { imageName, place, location, image: photoURI, userId };

    await uploadDataToDB("posts", newPost);

    navigate("Posts");

    clearForm();
  };

  const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
  };

  const isEmptyForm = () => {
    setDisabled(!image || !place.trim() || !imageName.trim() ? true : false);
  };

  const clearForm = () => {
    setImage(null);
    setImageName("");
    setPlace("");
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{ marginBottom: 32 }}>
          <View style={styles.imgWrapper}>
            {!image ? (
              <Camera type={cameraType} ref={cameraRef} style={styles.camera}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.iconWrapper}
                  onPress={takePicture}
                >
                  <Ionicons
                    name="camera"
                    size={24}
                    color={"rgba(189, 189, 189, 1)"}
                  />
                </TouchableOpacity>
              </Camera>
            ) : (
              <Image
                source={{ uri: image }}
                style={{
                  flex: 1,
                  width: "100%",
                  borderRadius: 8,
                }}
              />
            )}
          </View>
          <Text style={styles.text}>Завантажте фото</Text>
        </View>
        <View>
          <Input
            placeholder={"Назва..."}
            styleProps={styles.input}
            value={imageName}
            onChangeText={setImageName}
          />
          <Input
            leftIcon={
              <SimpleLineIcons
                name="location-pin"
                size={24}
                color="rgba(189, 189, 189, 1)"
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: Platform.OS === "ios" ? 12 : 16,
                  left: 0,
                }}
              />
            }
            placeholder={"Місцевість..."}
            styleProps={{ paddingLeft: 24, marginBottom: 32, ...styles.input }}
            value={place}
            onChangeText={setPlace}
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
            onPress={handleSubmit}
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
            onPress={clearForm}
          >
            <Feather
              name="trash-2"
              size={24}
              color={"rgba(189, 189, 189, 1)"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 240,
  },
  camera: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
