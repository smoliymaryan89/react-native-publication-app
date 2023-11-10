import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import Input from "../components/Input";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectAvatar, selectUserID } from "../redux/auth/authSelectors";
import { useEffect, useState } from "react";
import {
  getAllCollection,
  uploadDataToDB,
} from "../firebase/firebaseOperation";
import { FlatList } from "react-native-gesture-handler";
import Comment from "../components/Comment";
import { KeyboardAvoidingView } from "react-native";

const CommentsScreen = ({ route }) => {
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState(null);
  const [isKeyboardShowing, setIsKeyboardShowing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const sortedComments = comments.sort((a, b) => a.date - b.date);

  const avatar = useSelector(selectAvatar);
  const userId = useSelector(selectUserID);

  const { id, image } = route.params;

  useEffect(() => {
    const unsubscribe = getAllCollection(`posts/${id}/comments`, setComments);

    return () => {
      unsubscribe.then((res) => res()).catch((e) => console.error(e));
    };
  }, []);

  const handleInput = (text) => {
    if (!currentComment) {
      setDisabled(false);
    }
    setCurrentComment(text);
  };

  const handleSubmit = async () => {
    const comment = {
      userId,
      avatar,
      message: currentComment,
      date: new Date(),
    };

    await uploadDataToDB(`posts/${id}/comments`, comment);
    setDisabled(true);
    setCurrentComment(null);
  };

  console.log(isKeyboardShowing);

  return (
    <View
      style={
        isKeyboardShowing
          ? { ...styles.wrapper, paddingBottom: 0 }
          : styles.wrapper
      }
    >
      <Image
        source={{ uri: image }}
        width={343}
        height={240}
        style={styles.img}
      />
      <FlatList
        data={sortedComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Comment item={item} />}
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        <Input
          value={currentComment}
          placeholder={"Коментувати..."}
          styleProps={{ width: 342, borderRadius: 50, paddingRight: 50 }}
          onChangeText={handleInput}
          onFocus={() => setIsKeyboardShowing(true)}
          rightIcon={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSubmit}
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
      </KeyboardAvoidingView>
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
