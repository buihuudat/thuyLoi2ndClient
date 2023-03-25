//tran thanh tu
import { View, Text, StatusBar, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../assets/constants/Colors";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import NoOrder from "../components/NoOrder";
import TitleBar from "../components/TitleBar";
import ShowAccessPost from "../components/postManager/ShowAccessPost";
import ShowPendingPost from "../components/postManager/ShowPendingPost";
import ShowRefusePost from "../components/postManager/ShowRefusePost";
import productApi from "../api/postProductApi";
import { useSelector } from "react-redux";
import _ from "lodash";
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
  { key: "4", title: "Tin nháp" },
];
const PostManagerScreen = () => {
  // const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [accessPost, setAccessPost] = useState([]);
  const [pendingPost, setPendingPost] = useState([]);
  const [refusePost, setRefusePost] = useState([]);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const getPosts = async () => {
      const rs = await productApi.userGet({ user_id: user._id });
      setAccessPost(_.filter(rs, { status_check_post: "access" }));
      pendingPost(_.filter(rs, { status_check_post: "pending" }));
      refusePost(_.filter(rs, { status_check_post: "refuse" }));
    };
    getPosts();
  }, []);

  const renderScene = SceneMap({
    1:
      accessPost.length > 0
        ? () => <ShowAccessPost posts={accessPost} />
        : NoOrder,
    2:
      pendingPost.length > 0
        ? () => <ShowPendingPost posts={pendingPost} />
        : NoOrder,
    3:
      refusePost.length > 0
        ? () => <ShowRefusePost posts={refusePost} />
        : NoOrder,
    4: NoOrder,
  });
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_BLUE}
        translucent
      />

      <TitleBar title="Quản lý tin đăng" />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}

        // overScrollMode="auto"
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
