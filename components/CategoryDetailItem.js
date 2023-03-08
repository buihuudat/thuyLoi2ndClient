import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import Colors from "../assets/constants/Colors";

const CategoryDetailItem = ({ postproduct }) => {
  return (
    <View style={styles.container}>
      <View style={styles.favoriteIcon}>
          <IonIcons
            name="heart-outline"
            size={23}
            style={{ color: Colors.DEFAULT_RED }}
          />
        </View>
      <View>
        <TouchableOpacity>
          <Image style={styles.image} source={postproduct.source} />
        </TouchableOpacity>
      </View>

      <View style={styles.titlePostProduct}>
        <Text style={styles.titleContent}>{postproduct.title}</Text>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <Text style={styles.price}>{postproduct.price} đ</Text>
          <View style={styles.timeContainer}>
            <IonIcons name="time" size={14} />
            <Text style={styles.time}>{postproduct.time}</Text>
            <Text style={styles.time}>3 km</Text>
            <Text style={styles.time}>Q. Bình Thạnh</Text>
          </View>
          

        </View>
      </View>
    </View>
  );
};

export default CategoryDetailItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    backgroundColor: Colors.LIGHT_GREY,
    margin: 3,
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  titlePostProduct: {
    flexDirection: "column",

    padding: 10,
  },
  titleContent: {
    fontSize: 13,
    color: Colors.DEFAULT_BLACK,
    fontWeight: 600,
  },
  price: {
    fontSize: 13,
    color: Colors.DEFAULT_RED,
    paddingVertical:5,
  },
  time: {
    fontSize: 13,
    color: Colors.DEFAULT_BLACK,
    paddingHorizontal:3
  },
  timeContainer: {
    flexDirection: "row",
  },
  favoriteIcon: {
    position: "absolute",
    top: "85%",
    left: "90%",
    zIndex: 1,
  },
});
