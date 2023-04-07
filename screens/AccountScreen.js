import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../assets/constants/Colors";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Rating } from "react-native-elements";
import { Divider } from "@rneui/themed";
import TitleContainer from "../components/TitleContainer";
import IconAndSubTitle from "../components/IconAndSubTitle";
import TitleBar from "../components/TitleBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setToken, setUser } from "../redux/features/userSlice";

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const user = useSelector((state) => state?.user.data);

  const logout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate("SplashScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView
          edges={["top"]}
          style={{
            flex: 1,
            backgroundColor: Colors.DEFAULT_BLUE,
          }}
        />
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.DEFAULT_BLUE}
          translucent
        />
        <TitleBar title="Tài khoản" />

        <View style={styles.mainContainer}>
          <View style={styles.iconEditContainer}>
            <IonIcons name="build" size={12} style={styles.iconEdit} />
          </View>

          <View style={styles.contentContainer}>
            <Image
              style={styles.avatarProfile}
              source={
                user.avatar === "" &&
                require("../assets/images/default-avatar-profile.jpg")
              }
            />

            <TouchableOpacity onPress={() => navigate("ProfileScreen")}>
              <View style={styles.infoAcountContainer}>
                <Text style={styles.name}>{user.fullname}</Text>
                <View style={styles.rating}>
                  <Rating
                    // showRating
                    onFinishRating={2}
                    // style={{ paddingVertical: 10 }}
                    readonly={false}
                    size={10}
                    // fractions={2}
                    imageSize={15}
                    defaultRating={2}
                    ratingCount={5}
                    isDisabled={false}
                    onSwipeRating={false}
                  />
                </View>

                <View style={styles.followContainer}>
                  <View style={styles.followContainerItem}>
                    <Text style={styles.numberFollow}>
                      {user.follow.follower ?? 0}
                    </Text>
                    <Text style={styles.userFollow}>Người theo dõi</Text>
                  </View>
                  <View style={styles.followContainerItem}>
                    <Text style={styles.numberFollow}>
                      {user.follow.following ?? 0}
                    </Text>
                    <Text style={styles.userFollow}>Người đang theo dõi</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <TitleContainer content="Quản lý đơn hàng" />
      <TouchableOpacity
        onPress={() => navigation.navigate("PurchaseOrderScreen")}
      >
        <IconAndSubTitle
          title="Đơn mua"
          icon="basket"
          bgr={Colors.FABEBOOK_BLUE}
        />
      </TouchableOpacity>

      <Divider />
      <TouchableOpacity onPress={() => navigation.navigate("OrderSold")}>
        <IconAndSubTitle
          title="Đơn bán"
          icon="reader"
          bgr={Colors.DEFAULT_GREEN}
        />
      </TouchableOpacity> */}

        <TitleContainer content="Tiện ích" />

        <TouchableOpacity
          onPress={() => navigation.navigate("FavouriteScreen")}
        >
          <IconAndSubTitle
            title="Tin đã lưu"
            icon="bookmarks"
            bgr={Colors.DEFAULT_PINK}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity>
          <IconAndSubTitle
            title="Đánh giá"
            icon="star-half"
            bgr={Colors.DEFAULT_YELLOW}
          />
        </TouchableOpacity>
        <TitleContainer content="Khác" />
        <TouchableOpacity onPress={() => navigate("ProfileScreen")}>
          <IconAndSubTitle
            title="Thông tin tài khoản"
            icon="settings"
            bgr={Colors.DEFAULT_BLUE}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <IconAndSubTitle
            title="Đăng xuất"
            icon="log-out"
            bgr={Colors.INACTIVE_GREY}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  mainContainer: {
    marginHorizontal: 10,
  },
  avatarProfile: {
    width: 65,
    height: 65,
    objectFit: "fill",
    borderRadius: 100,
    marginRight: 1,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoAcountContainer: {
    flexDirection: "column",
  },
  name: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 14,
    fontWeight: 600,
  },
  followContainer: {
    flexDirection: "row",
  },
  numberFollow: {
    marginRight: 5,
    fontSize: 14,
    fontWeight: 600,
  },
  userFollow: {
    fontSize: 14,
    color: Colors.INACTIVE_GREY,
  },
  followContainerItem: {
    flexDirection: "row",
    marginRight: 20,
  },
  rating: {
    paddingVertical: 5,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  iconEditContainer: {
    position: "absolute",
    top: "60%",
    left: "10%",
    zIndex: 1,
    borderRadius: 15,
    backgroundColor: Colors.DEFAULT_BLACK,
  },
  iconEdit: {
    color: Colors.DEFAULT_WHITE,
    padding: 3,
  },
});
