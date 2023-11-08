import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserID } from "../redux/auth/authSelectors";
import { transformDate } from "../utils/transformDate";
import { Image } from "react-native";

const Comment = ({ item: { userId, avatar, message, date } }) => {
  const currentId = useSelector(selectUserID);

  const userAvatar = avatar ? avatar : null;

  const commentDate = transformDate(date.toDate());
  //  <View style={{ width: 28, height: 28, backgroundColor: "#a99e9e" }}></View>;
  return (
    <View
      style={{
        ...styles.container,
        flexDirection: userId === currentId ? "row-reverse" : "row",
      }}
    >
      {userAvatar ? (
        <Image
          style={{
            ...styles.avatar,
            marginLeft: userId === currentId ? 32 : 0,
            marginRight: userId === currentId ? 0 : 32,
          }}
          source={{ uri: userAvatar }}
        />
      ) : (
        <View
          style={{
            width: 28,
            height: 28,
            backgroundColor: "#a99e9e",
            borderRadius: 16,
            marginLeft: 20,
          }}
        ></View>
      )}
      <View style={styles.commentThumb}>
        <Text style={styles.commentText}>{message}</Text>
        <Text
          style={{
            ...styles.commentDate,
            textAlign: userId === currentId ? "left" : "right",
          }}
        >
          {commentDate}
        </Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 343,
    marginBottom: 24,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 20,
  },
  commentThumb: {
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  commentText: {
    marginBottom: 8,
  },
  commentDate: {
    color: "#BDBDBD",
    fontSize: 10,
  },
});
