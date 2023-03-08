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
const CategoryDetails = ({navigation}) => {
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
        <View style={styles.filterContainer}>
          <View style={styles.filterAndIconContainer}>
            <IonIcons
              name="funnel-outline"
              size={23}
              color={Colors.DEFAULT_BLACK}
              //   style={{}}
            />

            <Text style={styles.filterTitle}>Lọc</Text>
          </View>
          <View style={styles.filterAndIconContainerItem}>
            <Text style={styles.filterTitle}>Thú cưng</Text>
            <IonIcons
              name="caret-down-outline"
              size={20}
              color={Colors.DEFAULT_BLACK}
              //   style={{}}
            />
          </View>
          <View style={styles.priceAndIconContainer}>
            <Text style={styles.filterTitle}>Giá</Text>
            <IonIcons
              name="add"
              size={23}
              color={Colors.DEFAULT_BLACK}
              //   style={{}}
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            data={dataPostProducts}
            numColumns={1}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => <CategoryDetailItem postproduct={item} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default CategoryDetails;

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
    width: "70%",
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
  filterContainer: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    height: 60,
  },
  filterAndIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.DEFAULT_BLACK,
    borderRadius: 5,
    height: 40,
    width: 70,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  filterAndIconContainerItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.DEFAULT_BLACK,
    borderRadius: 5,
    height: 40,
    width: 100,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  priceAndIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_GREY,
    borderRadius: 5,
    height: 40,
    width: 60,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: 600,
    paddingHorizontal: 2,
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
});
