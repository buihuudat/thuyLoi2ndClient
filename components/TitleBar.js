import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Colors from "../assets/constants/Colors";

const TitleBar = ({title}) => {
  return (
    <View style={styles.backgroundCurvedContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
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
      marginTop: 35,
    },
  });
