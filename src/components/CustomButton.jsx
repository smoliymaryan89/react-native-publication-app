import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  text,
  styleProps,
  onPress,
  textStyles,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ ...styles.button, ...styleProps }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ ...styles.text, ...textStyles }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
  },
});

export default CustomButton;
