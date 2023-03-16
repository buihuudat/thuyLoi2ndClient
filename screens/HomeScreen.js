import {
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../assets/constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import IonIcons from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import { dataCateGories, dataPostProducts } from "../data";
import CategoryItem from "../components/CategoryItem";
import PostProductItem from "../components/PostProductItem";
import { ScrollView } from "react-native-virtualized-view";
import TitleContainer from "../components/TitleContainer";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import BottomSheet from "react-native-gesture-bottom-sheet";

const HomeScreen = ({ navigation }) => {
  // const user = useSelector((state) => state?.user.data);
  // console.log(user);
  const bottomSheet = useRef();

  const handleBack = () => {
    navigation.navigate("SplashScreen");
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_BLUE}
      />
      <View style={styles.backgroundCurvedContainer}>
        {/* <TouchableOpacity
          onPress={handleBack}
          style={{ marginLeft: 5, marginTop: 20 }}
        >
          <Entypo name="chevron-left" size={34} color={Colors.DEFAULT_GREY} />
        </TouchableOpacity> */}

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
            color={Colors.DEFAULT_WHITE}
            style={{ marginRight: 5, marginTop: 20 }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <IonIcons
            name="chatbox-ellipses-outline"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginRight: 5, marginTop: 20 }}
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

        <TitleContainer content="Khám phá danh mục" />
        <View style={styles.mainContainer}>
          <FlatList
            data={dataCateGories}
            horizontal={true}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <CategoryItem
                postproduct={item}
                navigate={() => navigation.navigate("CategoryDetails")}
              />
            )}
          />
        </View>
        <TitleContainer content="Tin đăng dành cho bạn" />
        <View style={styles.mainContainer}>
          <FlatList
            data={dataPostProducts}
            numColumns={2}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <PostProductItem
                postproduct={item}
                navigate={() => navigation.navigate("PostProductItemDetail")}
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.containerBS}>
        {/* <BottomSheet hasDraggableIcon ref={bottomSheet} height={600} /> */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => bottomSheet.current.show()}
        >
          <Text style={styles.text}>Open modal</Text>
        </TouchableOpacity> */}
      </View>
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
    backgroundColor: Colors.DEFAULT_BLUE,
    height: 70,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    zIndex: -1,
  },
  inputContainer: {
    width: "70%",
    height: 35,
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_WHITE,
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

  mainContainer: {
    marginHorizontal: 10,
  },

  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  containerBS: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
