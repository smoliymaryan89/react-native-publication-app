import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { View } from "react-native";

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onFocus,
  onBlur,
  styleProps,
  leftIcon,
  keyboardType,
  rightIcon,
}) => {
  return (
    <View>
      {leftIcon}
      <TextInput
        placeholder={placeholder}
        style={{ ...styles.input, ...styleProps }}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={"#BDBDBD"}
        onFocus={onFocus}
        onBlur={onBlur}
        leftIcon={leftIcon}
        keyboardType={keyboardType}
        rightIcon={rightIcon}
      />
      {rightIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 16,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,

    fontSize: 16,
    color: "#212121",
  },
});

export default Input;
