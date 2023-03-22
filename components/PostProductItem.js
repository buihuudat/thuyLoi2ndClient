import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import Colors from "../assets/constants/Colors";
import { formatPriceToVnd } from "./formatPriceToVnd";
import { format } from "date-fns";
import moment from "moment";

const PostProductItem = ({ postproduct, navigate }) => {
  return (
    <TouchableOpacity onPress={navigate}>
      <View style={styles.container}>
        <View>
          <View style={styles.bookmarkIcon}>
            <IonIcons
              name="bookmark-outline"
              size={23}
              style={{ color: Colors.DEFAULT_RED }}
            />
          </View>

          <Image
            style={styles.image}
            source={{ uri: postproduct.images[0].url }}
          />

          <View style={styles.titlePostProduct}>
            <Text style={styles.titleContent}>{postproduct.title}</Text>
            <IonIcons name="ellipsis-vertical-outline" size={19} />
          </View>

          <Text style={styles.price}>
            {formatPriceToVnd(postproduct.price)}
          </Text>
          <View style={styles.timeContainer}>
            <IonIcons name="time" size={14} />
            <Text style={styles.time}>
              {moment(postproduct.createdAt).format("L")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostProductItem;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 250,
    backgroundColor: Colors.LIGHT_GREY,
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  titlePostProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  titleContent: {
    fontSize: 13,
    color: Colors.DEFAULT_BLACK,
    fontWeight: 600,
  },
  price: {
    paddingLeft: 10,
    fontSize: 13,
    color: Colors.DEFAULT_RED,
  },
  time: {
    paddingLeft: 10,
    fontSize: 13,
    color: Colors.DEFAULT_BLACK,
  },
  timeContainer: {
    flexDirection: "row",
    padding: 10,
  },
  bookmarkIcon: {
    position: "absolute",
    top: "85%",
    left: "80%",
    zIndex: 1,
  },
});
