import { View, StatusBar, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../assets/constants/Colors";
import TitleBar from "../components/TitleBar";
import productApi from "../api/postProductApi";

const OrderScreen = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await productApi.gets();
      setPosts(posts);
    };
    getPosts();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_BLUE}
        translucent
      />
      <TitleBar title="Dạo chợ" />
      <View>
        <Text>123</Text>
      </View>
    </View>
  );
};
export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
