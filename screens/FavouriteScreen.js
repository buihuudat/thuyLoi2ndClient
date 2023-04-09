import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../assets/constants/Colors";
import { ScrollView } from "react-native-virtualized-view";
import IonIcons from "react-native-vector-icons/Ionicons";
import CategoryDetailItem from "../components/CategoryDetailItem";
import productApi from "../api/postProductApi";
import favouriteApi from "../api/favouriteApi";
import { useSelector } from "react-redux";
import _ from "lodash";

const FavouriteScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [isFav, setIsFav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch {
      } finally {
        setIsLoading(false);
      }
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_BLUE}
        translucent
      />

      <View style={styles.backgroundCurvedContainer}>
        <TouchableWithoutFeedback onPress={handleBack}>
          <IonIcons
            name="chevron-back-outline"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginTop: 20 }}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>Tin đã lưu</Text>
        <TouchableWithoutFeedback>
          <IonIcons
            name="ellipsis-vertical-outline"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginRight: 5, marginTop: 20 }}
          />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.DEFAULT_BLUE} />
          ) : (
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
    marginTop: 20,
    fontSize: 19,
    fontWeight: 600,
    color: Colors.DEFAULT_WHITE,
  },
});
