import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Colors from "../assets/constants/Colors";
import React, { useCallback, useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import { dataCateGories } from "../data";
import CategoryItem from "../components/CategoryItem";
import PostProductItem from "../components/PostProductItem";
import TitleContainer from "../components/TitleContainer";
import productApi from "../api/postProductApi";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/navbar";
import { ScrollView } from "react-native-virtualized-view";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { navigate } = useNavigation();

  // get posts
  useEffect(() => {
    const getPosts = async () => {
      setisLoading(true);
      try {
        const rs = await productApi.gets();
        setPosts(_.filter(rs, { status_check_post: "access" }));
      } catch (e) {
      } finally {
        setisLoading(false);
      }
    };
    getPosts();
  }, []);

  // handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const rs = await productApi.gets();
      setPosts(_.filter(rs, { status_check_post: "access" }));
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleViewProduct = useCallback(
    (item) => {
      navigation.navigate("PostProductItemDetail", { item });
    },
    [navigate]
  );

  const handleViewCategory = useCallback(
    (item) => {
      navigation.navigate("CategoryDetails", {
        posts: _.filter(posts, {
          category: item.type,
        }),
      });
    },
    [posts]
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Navbar posts={posts} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* banner */}
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

          {/* post products */}
          <View style={styles.mainContainer}>
            <FlatList
              data={dataCateGories}
              horizontal={true}
              keyExtractor={(item) => item?.id.toString()}
              renderItem={({ item }) => (
                <CategoryItem
                  postproduct={item}
                  navigate={() => handleViewCategory(item)}
                />
              )}
            />
          </View>
          <TitleContainer content="Tin đăng dành cho bạn" />
          <View
            style={
              styles.mainContainer && {
                paddingBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
              }
            }
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.DEFAULT_BLUE} />
            ) : (
              <FlatList
                data={posts}
                numColumns={2}
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
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
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
    resizeMode: "cover",
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
