//tran thanh tu
import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import Colors from "../assets/constants/Colors";

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_PINK}
        translucent
      />

      <View style={styles.backgroundCurvedContainer}>
        <Text style={styles.title}>Tin đã lưu</Text>
      </View>
    </View>
  );
};
export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundCurvedContainer: {
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_PINK,
    height: 70,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    zIndex: -1,
  },

  title: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 600,
  },
});
