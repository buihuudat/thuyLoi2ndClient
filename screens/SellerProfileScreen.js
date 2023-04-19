import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
  StatusBar,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../assets/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import userApi from "../api/userApi";
import productApi from "../api/postProductApi";
import PostProductItem from "../components/PostProductItem";
import { ScrollView } from "react-native-virtualized-view";
import { followApi } from "../api/followApi";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Header } from "react-native-elements";
import FollowModal from "../components/handlers/followModal";
import { Entypo } from "@expo/vector-icons";

export default function SellerProfileScreen({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [follows, setFollows] = useState([]);

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const navigation = useNavigation();
  const user_id = route.params._id;
  const { _id } = useSelector((state) => state.user.data);

  useEffect(() => {
    const getSeller = async () => {
      try {
        const seller = await userApi.get({ _id: user_id });
        setUser(seller);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
    getSeller();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await productApi.userGet({ user_id: user._id });
        setPosts(_.filter(posts, { status_check_post: "access" }));
      } catch {
      } finally {
        setPostLoading(false);
      }
    };

    getPosts();
  }, [user]);

  useEffect(() => {
    const getFollow = async () => {
      try {
        const followers = await followApi.followers({ _id: user._id });
        const following = await followApi.following({ _id: user._id });
        setFollowers(followers);
        setFollowing(following);
        setIsFollowed(_.some(followers, { _id }));
      } catch {}
    };
    getFollow();
  }, [user, isFollowed]);

  const handleViewProduct = useCallback(
    (item) => {
      navigation.navigate("PostProductItemDetail", { item });
    },
    [navigation]
  );

  const handleBack = useCallback(() => {
    setIsLoading(false);
    setPostLoading(false);
    navigation.goBack();
  }, [navigation]);

  const handleFollower = useCallback(async () => {
    try {
      await followApi.follow({ _id, follower: user_id });
      setIsFollowed(true);
    } catch {
      Alert.alert("Opps", "Something else");
    }
  }, []);
  const handleUnFollower = useCallback(async () => {
    try {
      await followApi.unfollow({ _id, follower: user_id });
      setIsFollowed(false);
    } catch {}
  }, []);

  const handleViewFollower = useCallback(() => {
    setModalVisible(true);
    setFollows(followers), setTitle("Người theo dõi");
  }, [followers]);
  const handleViewFollowing = useCallback(() => {
    setModalVisible(true);
    setFollows(following), setTitle("Người đang theo dõi");
  }, [following]);

  return isLoading ? (
    <ActivityIndicator size={"large"} />
  ) : (
    <View>
      <StatusBar barStyle={"light-content"} />
      <Header
        centerComponent={{
          text: "Trang người bán",
          style: { fontSize: 20, color: Colors.DEFAULT_WHITE },
        }}
        leftComponent={{
          icon: "chevron-left",
          color: Colors.DEFAULT_WHITE,
          onPress: handleBack,
        }}
        backgroundColor={Colors.DEFAULT_BLUE}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.DEFAULT_BLUE,
            display: "flex",
            justifyContent: "center",
            padding: 20,
          }}
        >
          {/* info */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              gap: 15,
            }}
          >
            <Image
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 100,
                height: 100,
                borderRadius: 100,
                resizeMode: "cover",
              }}
              source={
                user.avatar
                  ? { uri: user.avatar }
                  : require("../assets/images/default-avatar-profile.jpg")
              }
            />
            {/* name */}
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {user.fullname}
            </Text>
            {/* follow */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 3,
              }}
            >
              <TouchableOpacity
                style={{ color: "white", fontSize: 20 }}
                onPress={handleViewFollower}
              >
                <Text style={{ fontSize: 13, color: Colors.DEFAULT_WHITE }}>
                  <Text style={{ fontSize: 20 }}>{followers.length ?? 0}</Text>{" "}
                  Người theo dõi
                </Text>
              </TouchableOpacity>
              <Text style={{ color: "white", fontSize: 20 }}>|</Text>
              <TouchableOpacity
                style={{ color: "white", fontSize: 20 }}
                onPress={handleViewFollowing}
              >
                <Text style={{ fontSize: 13, color: Colors.DEFAULT_WHITE }}>
                  Đang theo dõi{" "}
                  <Text style={{ fontSize: 20 }}>{following.length ?? 0}</Text>
                </Text>
              </TouchableOpacity>
            </View>
            {isFollowed ? (
              <TouchableOpacity
                onPress={handleUnFollower}
                style={{
                  borderWidth: 1,
                  borderColor: Colors.DEFAULT_WHITE,
                  backgroundColor: Colors.INACTIVE_GREY,
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "white", margin: 5 }}
                >
                  Bỏ theo dõi
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleFollower}
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: Colors.DEFAULT_WHITE,
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "white", margin: 5 }}
                >
                  Theo dõi
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              paddingTop: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Entypo name="address" size={24} color="white" />
              <Text style={{ fontSize: 15, color: "white" }}>
                {user.address !== ""
                  ? user.address
                  : "Người dùng chưa cung cấp địa chỉ"}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Entypo name="phone" size={24} color="white" />
              <Text style={{ fontSize: 15, color: "white" }}>
                {user.phone !== ""
                  ? user.phone
                  : "Người dùng chưa cung cấp số điện thoại"}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Entypo name="email" size={24} color="white" />
              <Text style={{ fontSize: 15, color: "white" }}>
                {user.email !== ""
                  ? user.email
                  : "Người dùng chưa cung cấp số điện thoại"}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: 500,
            backgroundColor: "#fff",
          }}
        >
          Sản phẩm đã đăng
        </Text>
        <ScrollView>
          <View
            style={{
              display: "flex",
            }}
          >
            {postLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={posts}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "center",
                }}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                  <PostProductItem
                    postproduct={item}
                    navigate={() => handleViewProduct(item)}
                  />
                )}
              />
            )}
          </View>
        </ScrollView>
        <FollowModal
          modalVisible={modalVisible}
          title={title}
          follows={follows}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  );
}
