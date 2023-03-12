//tran thanh tu
import { View, Text, StatusBar, StyleSheet, FlatList } from "react-native";
import React from "react";
import Colors from "../assets/constants/Colors";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import NoOrder from "../components/NoOrder";
import TitleBar from "../components/TitleBar";

const renderScene = SceneMap({
  1: NoOrder,
  2: NoOrder,
  3: NoOrder,
  4: NoOrder,
  5: NoOrder,
});

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

const PostManagerScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "1", title: "Hiển thị" },
    { key: "2", title: "Hết hạn" },
    { key: "3", title: "Từ chối" },
    { key: "4", title: "Thanh toán" },
    { key: "5", title: "Tin nháp" },
  ]);
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
