//tran thanh tu
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
import CategoryItem from "../components/layouts/CategoryItem";
import PostProductItem from "../components/PostProductItem";
import { ScrollView } from "react-native-virtualized-view";
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_PINK}
        translucent
      />

      <View style={styles.backgroundCurvedContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="search"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Tìm kiếm"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              // onChangeText={(text) => setUsername(text)}
            />
          </View>
        </View>
        <TouchableWithoutFeedback>
          <Feather
            name="bell"
            size={25}
            color={Colors.DEFAULT_BLACK}
            style={{ marginRight: 5, marginTop: 40 }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <IonIcons
            name="chatbox-ellipses-outline"
            size={25}
            color={Colors.DEFAULT_BLACK}
            style={{ marginRight: 5, marginTop: 40 }}
          />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        <View style={{ flex: 1, width: "100%", height: 120 }}>
          <Swiper
            containerStyle={styles.wrapper}
            showsButtons={false}
            loop={true}
            autoplay={true}
            paginationStyle={false}
            showsPagination={false}
          >
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={require("../assets/images/banners/banner_one.jpg")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={require("../assets/images/banners/banner_two.jpg")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={require("../assets/images/banners/banner_three.jpg")}
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={require("../assets/images/banners/banner_four.jpg")}
              />
            </View>
          </Swiper>
        </View>

        <View style={styles.title}>
          <Text style={styles.content}>Khám phá danh mục</Text>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            data={dataCateGories}
            horizontal={true}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => <CategoryItem postproduct={item} />}
          />
        </View>

        <View style={styles.title}>
          <Text style={styles.content}>Tin đăng dành cho bạn</Text>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            data={dataPostProducts}
            numColumns={2}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => <PostProductItem postproduct={item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    zIndex: -1,
  },
  inputContainer: {
    width: "80%",
    height: 35,
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginTop: 40,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_PINK,
    justifyContent: "center",
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: "100%",
    width: 100,
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  paginationStyle: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  paginationText: {
    color: "white",
    fontSize: 20,
  },

  title: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    backgroundColor: Colors.LIGHT_GREY,
    marginVertical: 5,
  },
  content: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
    fontWeight: 600,
    padding: 10,
  },
  mainContainer: {
    marginHorizontal: 10,
  },
});
