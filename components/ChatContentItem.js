import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../assets/constants/Colors";

const ChatContentItem = ({ item, props }) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate("ChatScreen", {
          from: props.from,
          to: props.to,
          message: item.content,
        });
      }}
    >
      <Text style={styles.content}>{item.content}</Text>
    </TouchableOpacity>
  );
};

export default ChatContentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 7,
    borderWidth: 0.5,
    marginHorizontal: 5,
    borderRadius: 15,
    borderColor: Colors.DEFAULT_YELLOW,
  },
  content: {
    fontSize: 13,
  },
});
