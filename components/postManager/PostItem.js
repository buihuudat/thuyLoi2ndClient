import React, { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import Colors from "../../assets/constants/Colors";
import { formatPriceToVnd } from "../formatPriceToVnd";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const PostItem = ({ post }) => {
  const { navigate } = useNavigation();
  const handleBack = useCallback(() => {
    navigate("PostProductItemDetail", { item: post });
  }, [navigate]);
  return (
    <TouchableOpacity onPress={handleBack}>
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: post.images[0].url }} />

          <View style={styles.titlePostProduct}>
            <Text style={styles.titleContent}>{post.title}</Text>
            <IonIcons name="ellipsis-vertical-outline" size={19} />
          </View>

          <Text style={styles.price}>{formatPriceToVnd(post.price)}</Text>
          <View style={styles.timeContainer}>
            <IonIcons name="time" size={14} />
            <Text style={styles.time}>
              {moment(post.updatedAt).startOf().toNow()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;

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
