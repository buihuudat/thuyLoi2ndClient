{
    /* tranthanhtu 11/3/2023 */
  }
  import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableWithoutFeedback,
  } from "react-native";
  import React from "react";
  import Colors from "../assets/constants/Colors";
  import IonIcons from "react-native-vector-icons/Ionicons";
  import { ScrollView } from "react-native-virtualized-view";
  import { TabView, SceneMap, TabBar } from "react-native-tab-view";
  import { useWindowDimensions } from "react-native";
  import NoOrder from "../components/NoOrder";
  
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
      style={{ backgroundColor: Colors.DEFAULT_WHITE }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: Colors.DEFAULT_BLACK,
            paddingHorizontal: 5,
            textAlign: "center",
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );
  
  const PurchaseOrderScreen = ({ navigation }) => {
    const layout = useWindowDimensions();
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: "1", title: "Chờ xác nhận" },
      { key: "2", title: "Đang xử lý" },
      { key: "3", title: "Đang giao" },
      { key: "4", title: "Đã giao" },
      { key: "5", title: "Đã hủy" },
    ]);
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.DEFAULT_BLUE}
          translucent
        />
  
        <View style={styles.backgroundCurvedContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("HomeTabs")}
          >
            <IonIcons
              name="chevron-back-outline"
              size={25}
              color={Colors.DEFAULT_WHITE}
              style={{ marginTop: 35 }}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.title}>Đơn mua</Text>
          <TouchableWithoutFeedback>
            <IonIcons
              name="ellipsis-vertical-outline"
              size={25}
              color={Colors.DEFAULT_WHITE}
              style={{ marginRight: 5, marginTop: 35 }}
            />
          </TouchableWithoutFeedback>
        </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
  
          // overScrollMode="auto"
          // initialLayout={{ width: layout.width }}
        />
  
        <ScrollView></ScrollView>
      </View>
    );
  };
  export default PurchaseOrderScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.DEFAULT_WHITE,
    },
    backgroundCurvedContainer: {
      flexDirection: "row",
      backgroundColor: Colors.DEFAULT_BLUE,
      height: 85,
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      alignSelf: "center",
      zIndex: -1,
      paddingHorizontal: 10,
    },
    title: {
      marginTop: 35,
      fontSize: 18,
      fontWeight: 500,
      color:Colors.DEFAULT_WHITE
    },
  });
  