import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Colors from "../assets/constants/Colors";

import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import messageApi from "../api/messageApi";

const Item = ({ name, message, avatar }) => (
  <View style={styles.item}>
    <Image
      source={avatar ?? require("../assets/images/default-avatar-profile.jpg")}
      style={{ width: 40, height: 40, borderRadius: 100, resizeMode: "cover" }}
    />
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  </View>
);

const MessageScreen = () => {
  const [userChat, setUserChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const getUserChat = async () => {
      setIsLoading(true);
      try {
        const rs = await messageApi.getUserChat(user._id);
        rs && setUserChat(rs?.userChat);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
    getUserChat();
  }, []);

  const handlePress = useCallback(
    (item) => {
      navigation.navigate("ChatScreen", {
        from: user._id,
        to: { ...item, _id: item?.user_id },
      });
    },
    [navigation]
  );

  const handleBack = useCallback(() => {
    navigation.navigate("HomeTab");
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Item
        name={item?.fullname}
        message={item?.lastMessage}
        avatar={item?.avatar}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={{ padding: 10 }}>
        <Entypo name="chevron-left" size={34} color={Colors.DEFAULT_GREY} />
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.DEFAULT_BLUE} />
      ) : (
        <FlatList
          data={userChat}
          renderItem={renderItem}
          keyExtractor={(item) => item?._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    backgroundColor: "#eee",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
  },
});

export default MessageScreen;
