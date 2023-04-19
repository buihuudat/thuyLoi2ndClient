import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  Keyboard,
} from "react-native";
import Colors from "../assets/constants/Colors";
import _ from "lodash";
import productApi from "../api/postProductApi";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const rs = await productApi.gets();
        setPosts(_.filter(rs, { status_check_post: "access" }));
      } catch (e) {}
    };
    getPosts();
  }, []);

  const handleBack = useCallback(() => {
    navigate("HomeTab");
    // Keyboard.dismiss;
  }, [navigate]);

  useEffect(() => {
    const dataResult = posts.filter((item) => {
      return (
        item.title
          .toLowerCase()
          .includes(searchQuery && searchQuery.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(searchQuery && searchQuery.toLowerCase())
      );
    });
    if (!dataResult || !searchQuery) {
      setSearchResults([]);
    } else {
      setSearchResults(dataResult);
    }
  }, [searchQuery, posts]);

  const handlePress = (item) => {
    navigate("PostProductItemDetail", { item });
  };

  const renderResultItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={{ display: "flex", flexDirection: "row" }}
        accessible={false}
      >
        <Image
          title={item.title}
          source={{ uri: item.images[0].url }}
          style={{ width: 60, height: 60, resizeMode: "cover" }}
        />
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.title}</Text>
          <Text style={styles.itemDescription}>{item?.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: Colors.DEFAULT_BLUE,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.DEFAULT_BLUE,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: 10,
          alignSelf: "center",
          zIndex: -1,
        }}
      >
        <TouchableOpacity onPress={handleBack}>
          <Entypo name="chevron-left" size={34} color={Colors.DEFAULT_GREY} />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="search"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Tìm kiếm"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              onChangeText={(text) => setSearchQuery(text)}
              autoFocus={true}
            />
          </View>
        </View>
        <TouchableWithoutFeedback>
          <Feather
            name="bell"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginRight: 5 }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginRight: 5 }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.container}>
        {searchResults && (
          <FlatList
            data={searchResults}
            renderItem={renderResultItem}
            keyExtractor={(item) => item?._id}
            style={styles.list}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "scroll",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
  },
  inputContainer: {
    width: "70%",
    height: 35,
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_WHITE,
    justifyContent: "center",
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: "100%",
    width: 100,
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
});

export default Search;
