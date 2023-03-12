//tran thanh tu
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Colors from "../assets/constants/Colors";
import { ScrollView } from "react-native-virtualized-view";
import IonIcons from "react-native-vector-icons/Ionicons";
import CategoryDetailItem from "../components/CategoryDetailItem";

const dataPostProducts = [
  {
    id: "1",
    source: {
      uri: "https://imaxmobile.vn/media/data/iphone-8-plus-64GB-cu-5.jpg",
    },
    title: "Cần bán iphone 8 plus ",
    price: "2.500.000",
    time: "hôm qua",
  },
  {
    id: "2",
    source: {
      uri: "https://filebroker-cdn.lazada.vn/kf/S35d38b24ffb340829a6eb2ffdd6953d2k.jpg",
    },
    title: "Bán quạt",
    price: "150.000",
    time: "2 ngày trước",
  },
  {
    id: "3",
    source: {
      uri: "https://kiemtraxecu.com/wp-content/uploads/2019/08/wave-cu.jpg",
    },
    title: "Bán xe wave alpha",
    price: "5.000.000",
    time: "2 ngày trước",
  },
  {
    id: "4",
    source: {
      uri: "https://muabandonghothuysy.com/wp-content/uploads/2020/04/longines-l4.778.8.12.0-6-767x1024.jpg",
    },
    title: "đồng hồ",
    price: "300.000",
    time: "5 ngày trước",
  },
];

const FavoriteScreen = ({ navigation }) => {
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
            style={{ marginTop: 20 }}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Tin đã lưu</Text>
        <TouchableWithoutFeedback>
          <IonIcons
            name="ellipsis-vertical-outline"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginRight: 5, marginTop: 20 }}
          />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          <FlatList
            data={dataPostProducts}
            numColumns={1}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <CategoryDetailItem
                postproduct={item}
                navigate={() => navigation.navigate("PostProductItemDetail")}
              />
            )}
          />
        </View>
      </ScrollView>
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
    backgroundColor: Colors.DEFAULT_BLUE,
    height: 70,
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    zIndex: -1,
    paddingHorizontal: 10,
  },
  mainContainer: {
    marginHorizontal: 10,
  },

  title: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 600,
    color:Colors.DEFAULT_WHITE
  },
});
