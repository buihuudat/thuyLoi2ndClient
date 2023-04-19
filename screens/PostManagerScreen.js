import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../assets/constants/Colors";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import NoOrder from "../components/NoOrder";
import ShowAccessPost from "../components/postManager/ShowAccessPost";
import ShowPendingPost from "../components/postManager/ShowPendingPost";
import ShowRefusePost from "../components/postManager/ShowRefusePost";
import productApi from "../api/postProductApi";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Header } from "react-native-elements";
const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Colors.DEFAULT_YELLOW }}
    style={{ backgroundColor: Colors.DEFAULT_WHITE, width: "100%" }}
    renderLabel={({ route, focused, color }) => (
      <Text
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: Colors.DEFAULT_BLACK,
          textAlign: "center",
        }}
      >
        {route.title}
      </Text>
    )}
  />
);

const routes = [
  { key: "1", title: "Hiển thị" },
  { key: "2", title: "Chờ duyệt" },
  { key: "3", title: "Từ chối" },
];
const PostManagerScreen = () => {
  // const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const getPosts = async () => {
      const rs = await productApi.userGet({ user_id: user._id });
      setPosts(rs);
    };
    getPosts();
  }, []);

  const filteredPosts = {
    access: posts.filter((post) => post.status_check_post === "access"),
    pending: posts.filter((post) => post.status_check_post === "pending"),
    refuse: posts.filter((post) => post.status_check_post === "refuse"),
  };

  const sceneMap = {
    1:
      filteredPosts.access.length > 0
        ? () => <ShowAccessPost posts={filteredPosts.access} />
        : NoOrder,
    2:
      filteredPosts.pending.length > 0
        ? () => <ShowPendingPost posts={filteredPosts.pending} />
        : NoOrder,
    3:
      filteredPosts.refuse.length > 0
        ? () => <ShowRefusePost posts={filteredPosts.refuse} />
        : NoOrder,
    4: NoOrder,
  };

  const renderScene = SceneMap(sceneMap);
  return (
    <View style={styles.container}>
      <Header
        backgroundColor={Colors.DEFAULT_BLUE}
        centerComponent={{
          text: "Quản lý tin đăng",
          style: {
            textAlign: "center",
            fontSize: 20,
            fontWeight: 500,
            color: "white",
          },
        }}
      />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        overScrollMode="auto"
        // initialLayout={{ width: layout.width }}
      />
    </View>
  );
};
export default PostManagerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
