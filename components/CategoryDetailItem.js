//tran thanh tu
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import Colors from "../assets/constants/Colors";
import moment from "moment";
import { formatPriceToVnd } from "./formatPriceToVnd";
import { useSelector } from "react-redux";
import favouriteApi from "../api/favouriteApi";
import { Logo } from "../assets";

const CategoryDetailItem = ({ postproduct, navigate }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useSelector((state) => state.user.data);
  useEffect(() => {
    const getFav = async () => {
      try {
        const rs = await favouriteApi.get({
          user_id: user._id,
          post_id: postproduct._id,
        });
        if (rs) {
          setIsFavorite(true);
        }
      } catch {}
    };
    getFav();
  }, []);
  return (
    <TouchableOpacity onPress={navigate}>
      <View style={styles.container}>
        <View style={styles.favoriteIcon}>
          <IonIcons
            name={isFavorite ? "heart" : "heart-outline"}
            size={23}
            style={{ color: Colors.DEFAULT_RED }}
          />
        </View>
        <View>
          <Image
            style={styles.image}
            source={{ uri: postproduct.images[0].url }}
          />
        </View>

        <View style={styles.titlePostProduct}>
          <Text style={styles.titleContent}>{postproduct.title}</Text>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <Text style={styles.price}>
              {formatPriceToVnd(postproduct.price)}
            </Text>
            <View style={styles.timeContainer}>
              <Feather name="map-pin" size={14} color="black" />
              <Text style={styles.time}>{postproduct.time}</Text>
              {/* <Text style={styles.time}></Text> */}
              <Text style={styles.time}>
                {postproduct.location[0].district},{" "}
                {postproduct.location[0].city}
              </Text>
            </View>
            <Text>{moment(postproduct.updatedAt).startOf().toNow()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    resizeMode: "cover",
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
    paddingVertical: 5,
  },
  time: {
    fontSize: 13,
    color: Colors.DEFAULT_BLACK,
    paddingHorizontal: 3,
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
