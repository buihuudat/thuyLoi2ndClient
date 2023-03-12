import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "./contants/Colors";
import { Feather } from "@expo/vector-icons";

export default function InputForm({
  label,
  placeholder,
  type,
  secure,
  data,
  setData,
  autoCap = "none",
  isPasswordShow,
  setIsPasswordShow,
}) {
  return (
    <View>
      <Text>{label}</Text>
      <View style={styles.inputSubContainer}>
        <Feather
          name="lock"
          size={22}
          color={Colors.DEFAULT_GREY}
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholderTextColor={Colors.DEFAULT_GREY}
          selectionColor={Colors.DEFAULT_GREY}
          style={styles.inputText}
          placeholder={placeholder}
          keyboardType={type}
          secureTextEntry={isPasswordShow}
          label={label}
          value={data}
          autoCapitalize={autoCap}
          onChangeText={(e) => setData(e)}
        />
        {secure && (
          <Feather
            name={isPasswordShow ? "eye" : "eye-off"}
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "100%",
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: "100%",
    width: 100,
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
});
