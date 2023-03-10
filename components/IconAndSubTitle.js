//tran thanh tu
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../assets/constants/Colors";
import IonIcons from "react-native-vector-icons/Ionicons";

const IconAndSubTitle = ({ title, icon, bgr }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 15,
          backgroundColor: `${bgr}`,
          marginRight: 5,
        }}
      >
        <IonIcons name={icon} size={15} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default IconAndSubTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    alignItems: "center",
    marginHorizontal: 10,
  },
  icon: {
    color: Colors.DEFAULT_WHITE,
    padding: 5,
  },
  title: {
    fontSize: 15,
    color: Colors.DEFAULT_BLACK,
    fontWeight: 400,
  },
});
