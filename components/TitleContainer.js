//tran thanh tu
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../assets/constants/Colors";

const TitleContainer = ({content}) => {
  return (
    <View style={styles.title}>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export default TitleContainer;

const styles = StyleSheet.create({
  title: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    backgroundColor: Colors.LIGHT_GREY,
    marginVertical: 5,
  },
  content: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    fontWeight: 600,
    padding: 10,
  },
});
