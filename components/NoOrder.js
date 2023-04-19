import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../assets/constants/Colors";
import IonIcons from "react-native-vector-icons/Ionicons";
const NoOrder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IonIcons name="cart-outline" size={70} style={styles.icon} />
      </View>
      <Text style={styles.title}>Chưa có tin nào</Text>
    </View>
  );
};

export default NoOrder;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DEFAULT_WHITE,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  iconContainer: {
    backgroundColor: Colors.LIGHT_GREY2,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    borderRadius: 100,
    margin: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
  },
  icon: {
    marginRight: 5,
    color: Colors.DEFAULT_YELLOW,
  },
});
