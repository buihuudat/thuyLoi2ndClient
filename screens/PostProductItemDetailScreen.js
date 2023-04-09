{
  /* tranthanhtu 8/3/2023 */
}
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../assets/constants/Colors";
import IonIcons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-virtualized-view";
import SwiperPostProductItemDetail from "../components/SwiperPostProductItemDetail";
// import StarRating from "react-native-star-rating";
import { useSelector } from "react-redux";
import ChatContentItem from "../components/ChatContentItem";
import { Rating } from "react-native-ratings";
import moment from "moment";
import { formatPriceToVnd } from "../components/formatPriceToVnd";
import favouriteApi from "../api/favouriteApi";
import userApi from "../api/userAPI";

const chatList = [
  {
    id: 1,
    content: "Sản phẩm này còn không?",
  },
  {
    id: 2,
    content: "Sản phẩm này có ship không?",
  },
  {
    id: 3,
    content: "Sản phẩm này còn bảo hành không?",
  },
];

const PostProductItemDetail = ({ navigation, route }) => {
  const [userSell, setUserSell] = useState({});
  const [favourite, setFavourite] = useState(false);
  const post = route.params.item;
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const getDataDetail = async () => {
      const rsUser = await userApi.get({ _id: post.user[0].user_id });
      const rsFavourite = await favouriteApi.get({
        user_id: post.user[0].user_id,
        post_id: post._id,
      });
      setFavourite(rsFavourite.post && rsFavourite.post.length > 0);
      setUserSell(rsUser);
    };
    getDataDetail();
  }, [post]);

  const handleAddFavourite = async () => {
    const rs = await favouriteApi.update({
      user_id: post.user[0].user_id,
      post_id: post._id,
    });
    setFavourite(rs.status === "add");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_BLUE}
        translucent
      />

      <View style={styles.backgroundCurvedContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("HomeTab")}
        >
          <IonIcons
            name="chevron-back-outline"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginTop: 40 }}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <IonIcons
            name="ellipsis-vertical-outline"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginRight: 5, marginTop: 40 }}
          />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        <SwiperPostProductItemDetail images={post.images} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.priceAndIconFavoriteContainer}>
            <Text style={styles.price}>{formatPriceToVnd(post.price)}</Text>
            <TouchableOpacity
              onPress={handleAddFavourite}
              style={styles.iconAndContent}
            >
              <Text>{!favourite ? "Lưu tin" : "Đã lưu"}</Text>
              <View style={styles.favoriteIcon}>
                <IonIcons
                  name={!favourite ? "heart-outline" : "heart"}
                  size={22}
                  style={{ color: Colors.DEFAULT_RED, padding: 5 }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.timeContainer}>
            <IonIcons
              name="time"
              size={14}
              style={{ color: Colors.DEFAULT_BLACK, paddingRight: 5 }}
            />
            <Text style={styles.time}>
              {moment(post.createdAt).startOf("day").fromNow()}
            </Text>
          </View>
          <View style={styles.adrressContainer}>
            <IonIcons
              name="location-outline"
              size={22}
              style={{ color: Colors.DEFAULT_BLACK }}
            />
            <Text style={styles.adrress}>
              {`${post.location[0].district}, ${post.location[0].city}`}
            </Text>
          </View>
          <View style={styles.profie}>
            <View style={styles.profieContainerOne}>
              <View style={styles.avaterAndNameContainer}>
                <Image
                  style={styles.avatarProfile}
                  source={
                    user.avatar === "" &&
                    require("../assets/images/default-avatar-profile.jpg")
                  }
                />
                <View style={styles.nameAndTimeContainer}>
                  <Text style={styles.name}>{user.fullname}</Text>
                  <View style={styles.iconAndTimeContainer}>
                    <IonIcons
                      name="radio-button-on-outline"
                      size={11}
                      style={{ color: Colors.DEFAULT_GREEN, paddingRight: 5 }}
                    />
                    <Text style={styles.time}>Đang hoạt động</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.buttonProfieDetail}>Xem trang</Text>
            </View>
            <View style={styles.profieContainerTwo}>
              <View style={styles.titleAndIconContainer}>
                <Text style={styles.time}>Cá nhân</Text>
                <IonIcons
                  name="person-circle-outline"
                  size={18}
                  style={{ color: Colors.INACTIVE_GREY, paddingRight: 5 }}
                />
              </View>
              <View style={styles.titleAndIconContainer}>
                <Text style={styles.time}>Đánh giá</Text>

                {/* <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={2}
                  emptyStarColor={Colors.DEFAULT_YELLOW}
                  fullStarColor={Colors.DEFAULT_YELLOW}
                  starSize={13}
                  // selectedStar={(rating) => this.onStarRatingPress(rating)}
                /> */}
                <Rating
                  // showRating
                  onFinishRating={2}
                  // style={{ paddingVertical: 10 }}
                  readonly={false}
                  size={10}
                  fractions={2}
                  imageSize={13}
                  defaultRating={2}
                  ratingCount={5}
                  isDisabled={false}
                  onSwipeRating={false}
                />
              </View>
              <View style={styles.titleAndIconContainer}>
                <Text style={styles.time}>Phản hồi chat</Text>
                <Text style={styles.time}>{"90%"}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.description}>{post.description}</Text>
          <View style={styles.phoneContainer}>
            <Text style={styles.phone}>Liên hệ: {post.user.phone}</Text>
          </View>
          <View style={styles.chatContainer}>
            <Text style={styles.title}>Chat với người bán</Text>
            <FlatList
              style={{ paddingBottom: 10 }}
              data={chatList}
              horizontal
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => <ChatContentItem item={item} />}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.contact}>
        <View style={styles.iconAndPhoneContactContainer}>
          <IonIcons
            name="call-outline"
            size={20}
            style={{ color: Colors.DEFAULT_WHITE, paddingRight: 5 }}
          />
          <Text style={styles.phoneContact}>Gọi điện</Text>
        </View>

        <View style={styles.iconAndMessageContactContainer}>
          <IonIcons
            name="chatbox-outline"
            size={20}
            style={{ color: Colors.INACTIVE_GREY, paddingRight: 5 }}
          />
          <Text style={styles.phoneMessage}>Gửi SMS</Text>
        </View>
        <View style={styles.iconAndChatContactContainer}>
          <IonIcons
            name="chatbubble-ellipses-outline"
            size={20}
            style={{ color: Colors.INACTIVE_GREY, paddingRight: 5 }}
          />
          <Text style={styles.phoneMessage}>Chat</Text>
        </View>
      </View>
    </View>
  );
};
export default PostProductItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  backgroundCurvedContainer: {
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_BLUE,
    height: 80,
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
    marginVertical: 5,
    borderBottomWidth: 0.2,
    borderColor: Colors.DEFAULT_BLACK,
    borderTopWidth: 0.2,
    width: "100%",
    height: 100,
    // backgroundColor:Colors.DEFAULT_GREEN
  },
  profieContainerOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  avatarProfile: {
    width: 40,
    height: 40,
    objectFit: "fill",
    borderRadius: 100,
    marginRight: 5,
  },
  avaterAndNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameAndTimeContainer: {},
  name: {
    fontSize: 13,
    fontWeight: 600,
  },
  time: {
    fontSize: 12,
    color: Colors.INACTIVE_GREY,
    marginBottom: 5,
  },
  iconAndTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
  },
  buttonProfieDetail: {
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_YELLOW,
    padding: 7,
    borderRadius: 15,
    fontSize: 13,
    color: Colors.DEFAULT_YELLOW,
  },
  titleAndIconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  profieContainerTwo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },
  description: {
    fontSize: 14,
    fontWeight: 500,
  },
  phoneContainer: {
    paddingVertical: 10,
  },
  phone: {
    color: Colors.FABEBOOK_BLUE,
  },
  chatContainer: {
    paddingVertical: 10,
  },
  contact: {
    with: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconAndPhoneContactContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_BLUE,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  iconAndMessageContactContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flex: 1,
    borderRightWidth: 0.5,
  },
  iconAndChatContactContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  phoneContact: {
    fontSize: 16,
    fontWeight: 500,
    color: Colors.DEFAULT_WHITE,
  },
  phoneMessage: {
    fontSize: 14,
    color: Colors.DEFAULT_BLACK,
  },
});
