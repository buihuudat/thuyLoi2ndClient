{
  /* tranthanhtu 8/3/2023 */
}
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import Colors from "../assets/constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import IonIcons from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import { dataCateGories, dataPostProducts } from "../data";
import CategoryItem from "../components/CategoryItem";
import PostProductItem from "../components/PostProductItem";
import { ScrollView } from "react-native-virtualized-view";
import CategoryDetailItem from "../components/CategoryDetailItem";
import SwiperPostProductItemDetail from "../components/SwiperPostProductItemDetail";
const PostProductItemDetail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_PINK}
        translucent
      />

      <View style={styles.backgroundCurvedContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("HomeTabs")}
        >
          <IonIcons
            name="chevron-back-outline"
            size={25}
            color={Colors.DEFAULT_BLACK}
            style={{ marginTop: 40 }}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <IonIcons
            name="ellipsis-vertical-outline"
            size={25}
            color={Colors.DEFAULT_BLACK}
            style={{ marginRight: 5, marginTop: 40 }}
          />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        <SwiperPostProductItemDetail />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Cần bán iphone 14 promax 90%</Text>
          <View style={styles.priceAndIconFavoriteContainer}>
            <Text style={styles.price}>8.000.000 đ</Text>
            <View style={styles.iconAndContent}>
              <Text>Lưu tin</Text>
              <View style={styles.favoriteIcon}>
                <IonIcons
                  name="heart-outline"
                  size={22}
                  style={{ color: Colors.DEFAULT_RED, padding: 5 }}
                />
              </View>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <IonIcons
              name="time"
              size={14}
              style={{ color: Colors.DEFAULT_BLACK, paddingRight: 5 }}
            />
            <Text style={styles.time}>2 ngày trước</Text>
          </View>
          <View style={styles.adrressContainer}>
            <IonIcons
              name="location-outline"
              size={22}
              style={{ color: Colors.DEFAULT_BLACK }}
            />
            <Text style={styles.adrress}>
              412 Nguyễn Văn Công, P.3, Q.Gò Vấp
            </Text>
          </View>
          <View style={styles.profie}></View>
        </View>
      </ScrollView>
    </View>
  );
};
export default PostProductItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundCurvedContainer: {
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_PINK,
    height: 90,
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    zIndex: -1,
    paddingHorizontal: 10,
  },
  slide: {},
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 15,
    paddingVertical: 10,
    fontWeight: 500,
    color: Colors.DEFAULT_BLACK,
  },
  price: {
    color: Colors.DEFAULT_RED,
    fontSize: 14,
    fontWeight: 400,
  },
  priceAndIconFavoriteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconAndContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_RED,
  },
  timeContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  adrressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  adrress: {
    paddingHorizontal: 5,
  },
  profie: {
    marginVertical:5,
    borderBottomWidth: 0.2,
    borderColor: Colors.DEFAULT_BLACK,
    borderTopWidth:0.2,
    width: "100%",
    height:100,
    // backgroundColor:Colors.DEFAULT_GREEN
  },
});
