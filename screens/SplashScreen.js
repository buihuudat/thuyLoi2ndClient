//tran tu
import React, { useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import Images from "../assets/constants/Images";
import Colors from "../assets/constants/Colors";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />
      <View style={styles.backgroundCurvedContainer} />
      <Image
        source={Images.LOGO_TLS}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.titleText}>Thủy Lợi Market</Text>
      <Text style={styles.titleSubText}>Xin chào</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.DEFAULT_PINK,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_PINK,
    height: 2000,
    position: "absolute",
    top: -1700,
    width: 2000,
    borderRadius: 1000,
    alignSelf: "center",
    zIndex: -1,
  },

  image: {
    height: 150,
    width: 150,
    marginBottom: 100,
  },
  titleText: {
    fontSize: 32,
    color: Colors.DEFAULT_BLACK,
    fontWeight: "600",
  },
  titleSubText: {
    fontSize: 20,
    color: Colors.DEFAULT_BLACK,
    marginTop: 10,
  },
});
