import { View, StatusBar, StyleSheet } from "react-native";
import React from "react";
import Colors from "../assets/constants/Colors";
import TitleBar from "../components/TitleBar";

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_BLUE}
        translucent
      />

      <TitleBar title="Dạo chợ" />
    </View>
  );
};
export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

