import { View, Text } from "react-native";
import React from "react";

export default function TextErrorInput(msg) {
  return <Text style={{ color: "red" }}>{msg}</Text>;
}
