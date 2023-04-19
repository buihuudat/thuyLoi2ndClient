import { View, StyleSheet, FlatList, StatusBar } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../assets/constants/Colors";
import { ScrollView } from "react-native-virtualized-view";
import CategoryDetailItem from "../components/CategoryDetailItem";
import productApi from "../api/postProductApi";
import favouriteApi from "../api/favouriteApi";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Header } from "react-native-elements";

const FavouriteScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [isFav, setIsFav] = useState(true);

  const user = useSelector((state) => state.user.data);

  const toggleFav = useCallback(() => {
    setFavourite(!isFav);
  }, [isFav]);

  useEffect(() => {
    const getFavouritePost = async () => {
      try {
        const rs = await favouriteApi.gets({ user_id: user?._id });
        setFavourite(rs);
      } catch {}
    };
    getFavouritePost();
  }, [user]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const postPromises = favourite[0]?.post?.map(async (data) => {
          return productApi.get({
            _id: data.post_id,
          });
        });

        const postResponses = await Promise.all(postPromises);

        const newPosts = postResponses.filter(
          (postResponse) => postResponse != null
        );

        setPosts(newPosts);
      } catch {}
    };

    getPost();
  }, [favourite]);

  const handleBack = useCallback(() => {
    navigation.navigate("HomeTab");
  }, [navigation]);

  const navigateToPostDetail = useCallback((item) => {
    navigation.navigate("PostProductItemDetail", { item });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Header
        leftComponent={{
          icon: "chevron-left",
          color: Colors.DEFAULT_WHITE,
          onPress: handleBack,
        }}
        centerComponent={{
          text: "Tin đã lưu",
          style: styles.title,
        }}
        rightComponent={{
          icon: "menu",
          color: Colors.DEFAULT_WHITE,
        }}
        backgroundColor={Colors.DEFAULT_BLUE}
        style={{ alignItems: "center" }}
      />

      <ScrollView>
        <View style={styles.mainContainer}>
          {posts && (
            <FlatList
              data={posts}
              numColumns={1}
              keyExtractor={(item) => item?._id}
              renderItem={({ item }) => (
                <CategoryDetailItem
                  postproduct={item}
                  navigate={() => navigateToPostDetail(item)}
                  favourite={isFav}
                  setFavourite={toggleFav}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundCurvedContainer: {
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_BLUE,
    height: 70,
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    zIndex: -1,
    paddingHorizontal: 10,
  },
  mainContainer: {
    marginHorizontal: 10,
  },

  title: {
    fontSize: 19,
    fontWeight: 600,
    color: Colors.DEFAULT_WHITE,
  },
});
