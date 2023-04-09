import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from "react-native";
import Colors from "../assets/constants/Colors";

const TitleBar = ({ title }) => {
  return (
    <SafeAreaView style={styles.backgroundCurvedContainer}>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  backgroundCurvedContainer: {
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_BLUE,
    height: 80,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  title: {
    fontSize: 18,
    fontWeight: 500,
    color: Colors.DEFAULT_WHITE,
    marginTop: 30,
  },
});
