import React, { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import Colors from "../assets/constants/Colors";
import { formatPriceToVnd } from "./formatPriceToVnd";
import moment from "moment";
import favouriteApi from "../api/favouriteApi";
import { useSelector } from "react-redux";
import { Logo } from "../assets";

const PostProductItem = ({ postproduct, navigate }) => {
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
  const formattedPrice = useMemo(
    () => formatPriceToVnd(postproduct.price),
    [postproduct]
  );
  const formattedTime = moment(postproduct.createdAt).format("DD/MM/YYYY");

  return (
    <TouchableOpacity onPress={navigate}>
      <View style={styles.container}>
        <View>
          <View style={styles.bookmarkIcon}>
            <IonIcons
              name={isFavorite ? "bookmark" : "bookmark-outline"}
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

          <Text style={styles.price}>{formattedPrice}</Text>
          <View style={styles.timeContainer}>
            <IonIcons name="time" size={14} />
            <Text style={styles.time}>{formattedTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostProductItem;

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 250,
    backgroundColor: Colors.LIGHT_GREY,
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
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
