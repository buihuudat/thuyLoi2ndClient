{
  /* tranthanhtu 9/3/2023 */
}
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../assets/constants/Colors";

const ChatContentItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{item.content}</Text>
    </View>
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
