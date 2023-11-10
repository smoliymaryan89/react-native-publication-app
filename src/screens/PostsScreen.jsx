import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectEmail,
  selectName,
} from "../redux/auth/authSelectors";
import { getAllCollection, getLength } from "../firebase/firebaseOperation";
import PostItem from "../components/PostItem";

const PostsScreen = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const avatar = useSelector(selectAvatar);

  const [post, setPost] = useState([]);

  console.log(post);

  useEffect(() => {
    const unsubscribe = getAllCollection("posts", setPost);

    return () => {
      unsubscribe.then((res) => res()).catch((e) => console.error(e));
    };
  }, []);

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
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={{ width: 60, height: 60, borderRadius: 16 }}
          />
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              backgroundColor: "rgba(246, 246, 246, 1)",
            }}
          ></View>
        )}
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <FlatList
        data={post}
        renderItem={({ item }) => <PostItem posts={item} />}
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
});

export default PostsScreen;
