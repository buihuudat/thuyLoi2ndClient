import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const FollowModal = ({ title, follows, modalVisible, setModalVisible }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image
          source={
            item.avatar
              ? { uri: item.avatar }
              : require("../../assets/images/default-avatar-profile.jpg")
          }
          style={styles.avatar}
        />
        <Text style={styles.title}>{item.fullname}</Text>
      </View>
    );
  };

  return (
    <Modal
      style={{ width: "80%", height: "80%", position: "absolute" }}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Text style={{ textAlign: "center" }}>{title}</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={follows}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    marginLeft: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default FollowModal;
