import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { host } from "../api/axiosClient";
import React, { useState, useEffect, useCallback } from "react";
import Colors from "../assets/constants/Colors";
import messageApi from "../api/messageApi";
import { Header } from "react-native-elements";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import UploadImage from "../components/UploadImage";

const socket = io(host);

function ChatScreen(props) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");
  const [images, setImages] = useState([]);
  const [selectShow, setSelectShow] = useState(false);
  const [text, setText] = useState(props.route.params.message ?? "");
  const [modalVisible, setModalVisible] = useState({ type: false, image: "" });

  const from = props.route.params.from;
  const to = props.route.params.to;
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const getMessages = async () => {
      setIsLoading(true);
      try {
        const messages = await messageApi.get({
          from: from,
          to: to._id,
        });
        setMessages(messages);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("user", from);
    });
    socket.on("msg-recieve", async () => {
      try {
        const receivedMessages = await messageApi.get({
          from: from,
          to: to._id,
        });
        setMessages(receivedMessages);
      } catch (error) {}
    });
    // return () => {
    //   // Huỷ đăng ký các sự kiện socket.io và hủy yêu cầu
    //   socket.off("connect");
    //   socket.off("msg-recieve");
    //   socket.disconnect();
    // };
  }, [messages]);

  async function sendMessage() {
    if (text.trim() === "" && !images) {
      console.log(123);
      return;
    }
    const data = {
      message: {
        text: text,
        images: images,
        file: file,
      },
      from: from,
      to: to._id,
    };
    try {
      await messageApi.add(data);
      await messageApi.listUserChat({
        from: user,
        to,
        message: text ? text : images ? "Hình ảnh" : "Tập tin",
      });
      const receivedMessages = await messageApi.get({
        from: data.from,
        to: data.to,
      });
      socket.emit("send-msg", data);
      setMessages(receivedMessages);
      setImages([]);
      setText("");
    } catch (error) {}
  }

  const handleViewImage = useCallback((url) => {
    setModalVisible({ type: true, image: url });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          margin: 10,
          padding: 10,
          alignSelf: item.fromSelf ? "flex-end" : "flex-start",
          backgroundColor: item.fromSelf ? Colors.DEFAULT_BLUE : "#EEE",
          borderRadius: 8,
          marginBottom: 5,
          maxWidth: "70%",
          display: "flex",
          flexDirection: "row",
          gap: 5,
        }}
      >
        {!item.fromSelf && (
          <Image
            style={{ width: 30, height: 30, borderRadius: 100 }}
            source={
              to?.avatar ??
              require("../assets/images/default-avatar-profile.jpg")
            }
          />
        )}
        <View>
          <Text
            style={{
              color: !item.fromSelf
                ? Colors.DEFAULT_BLACK
                : Colors.DEFAULT_WHITE,
            }}
          >
            {item.messages.images &&
              item.messages.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleViewImage(image.url)}
                >
                  <Image
                    source={{ uri: image.url }}
                    style={{
                      width: 100,
                      height: 100,
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  />
                </TouchableOpacity>
              ))}
            {item.messages.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_BLUE}
        translucent
      />
      <Header
        leftComponent={{
          icon: "arrow-left",
          color: "#fff",
          onPress: () => props.navigation.goBack(),
        }}
        centerComponent={{
          text: to.fullname,
          style: { color: "#fff", fontSize: 20 },
        }}
        backgroundColor={Colors.DEFAULT_BLUE}
        style={{
          alignItems: "center",
        }}
      />
      {isLoading ? (
        <ActivityIndicator size={"large"} color={Colors.DEFAULT_BLUE} />
      ) : (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          inverted={true}
        />
      )}

      {selectShow && (
        <View style={{ marginTop: "auto" }}>
          <UploadImage images={images} setImages={setImages} />
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          marginTop: "auto",
          alignItems: "center",
          gap: 5,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 40,
            margin: 5,
            padding: 5,
            borderRadius: 10,
            backgroundColor: "#ddd",
          }}
          placeholder="Nhập tin nhắn..."
          value={text}
          onChangeText={(text) => setText(text)}
          autoFocus={true}
          multiline={true}
        />
        <TouchableOpacity onPress={() => setSelectShow(!selectShow)}>
          <FontAwesome5 name="images" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            width: 60,
            backgroundColor: Colors.DEFAULT_BLUE,
            margin: 5,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => sendMessage()}
        >
          <Text style={{ color: Colors.DEFAULT_WHITE, textAlign: "center" }}>
            Gửi
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible.type} transparent={true}>
        <View style={styles.modalBackground}>
          <TouchableOpacity
            onPress={() => setModalVisible({ type: false, image: "" })}
          >
            <Image
              source={{ uri: modalVisible.image }}
              style={styles.modalImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 300,
  },
});

export default ChatScreen;
