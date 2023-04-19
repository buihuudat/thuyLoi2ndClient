import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import Colors from "../assets/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import userApi from "../api/userApi";
import { setUser } from "../redux/features/userSlice";
import imageUpload from "../components/handlers/ImageUpload";
import { Header } from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { followApi } from "../api/followApi";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [msvErr, setMsvErr] = useState("");
  const [fullnameErr, setFullnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [addressErr, setAddressErr] = useState("");

  const [data, setData] = useState({
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    password: user.password,
    address: user.address,
    avatar: user.avatar,
  });

  useEffect(() => {
    const getFollow = async () => {
      try {
        const followers = await followApi.followers({ _id: user._id });
        const following = await followApi.following({ _id: user._id });
        setFollowers(followers);
        setFollowing(following);
      } catch {}
    };
    getFollow();
  }, []);

  const handleBack = useCallback(() => {
    navigation.navigate("HomeTab");
  }, [navigation]);
  const handleUpdate = useCallback(async () => {
    setIsLoading(true);
    setMsvErr("");
    setFullnameErr("");
    setEmailErr("");
    setPhoneErr("");
    setPasswordErr("");
    setAddressErr("");
    try {
      const user = await userApi.update(data);
      dispatch(setUser(user));
      setIsDisable(true);
    } catch (e) {
      const errors = e.data.errors;
      errors.forEach((e) => {
        if (e.param === "fullname") {
          setFullnameErr(e.msg);
        }
        if (e.param === "msv") {
          setMsvErr(e.msg);
        }
        if (e.param === "email") {
          setEmailErr(e.msg);
        }
        if (e.param === "password") {
          setPasswordErr(e.msg);
        }
        if (e.param === "address") {
          setAddressErr(e.msg);
        }
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleChangeAvatar = async () => {
    let image = "";
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result?.assets && !result.assets[0].cancelled) {
      setIsLoading(true);
      const rp = await FileSystem.readAsStringAsync(result?.assets[0]?.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      image = await imageUpload([{ url: `data:image/jpeg;base64,${rp}` }]);
    }
    try {
      await userApi.updateAvatar({
        _id: user._id,
        avatar: image[0].url,
      });
      Alert.alert("Hoàn tất", "Cập nhật ảnh đại diện thành công");
      const rq = await userApi.get({ _id: user._id });
      setData({ ...data, avatar: rq.avatar });
      dispatch(setUser(rq));
    } catch (e) {
      Alert.alert("Lỗi", "Cập nhật ảnh thất bại, vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <StatusBar barStyle={"light-content"} />
      <Header
        centerComponent={{
          text: "Trang cá nhân",
          style: { fontSize: 20, color: Colors.DEFAULT_WHITE },
        }}
        leftComponent={{
          icon: "chevron-left",
          color: Colors.DEFAULT_WHITE,
          onPress: handleBack,
        }}
        rightComponent={{
          icon: "edit",
          color: Colors.DEFAULT_WHITE,
          onPress: () => setIsDisable(!isDisable),
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
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            display: "flex",
            justifyContent: "center",
            padding: 50,
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
            <TouchableOpacity onPress={handleChangeAvatar}>
              <Image
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  resizeMode: "cover",
                }}
                source={
                  data.avatar
                    ? { uri: data.avatar }
                    : require("../assets/images/default-avatar-profile.jpg")
                }
              />
            </TouchableOpacity>
            {isLoading && <ActivityIndicator color={Colors.DEFAULT_WHITE} />}
            <Text
              style={{
                color: "white",
                fontSize: 25,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {user.fullname}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Text style={{ fontSize: 13, color: Colors.DEFAULT_WHITE }}>
                <Text style={{ fontSize: 20 }}>{followers.length ?? 0}</Text>{" "}
                Người theo dõi
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>|</Text>
              <Text style={{ fontSize: 13, color: Colors.DEFAULT_WHITE }}>
                Đang theo dõi{" "}
                <Text style={{ fontSize: 20 }}>{following.length ?? 0}</Text>
              </Text>
            </View>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={false}
          style={{
            padding: 50,
            height: "60%",
          }}
        >
          <View style={{ display: "flex", gap: 10 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Entypo name="user" size={24} color="black" />
              <View>
                <Text style={{ fontWeight: 200 }}>Mã sinh viên</Text>
                <TextInput
                  defaultValue={user.msv}
                  editable={!isDisable}
                  onChangeText={(MSV) => setData({ ...data, MSV })}
                />
                {msvErr && (
                  <Text style={{ color: "red", fontSize: 11 }}>{msvErr}</Text>
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#999",
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <MaterialCommunityIcons
                name="rename-box"
                size={24}
                color="black"
              />
              <View>
                <Text style={{ fontWeight: 200 }}>Tên đầy đủ</Text>
                <TextInput
                  defaultValue={user.fullname}
                  editable={!isDisable}
                  onChangeText={(fullname) => setData({ ...data, fullname })}
                />
                {fullnameErr && (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    {fullnameErr}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#999",
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <MaterialIcons name="email" size={24} color="black" />
              <View>
                <Text style={{ fontWeight: 200 }}>Email</Text>
                <TextInput
                  defaultValue={user.email}
                  editable={!isDisable}
                  onChangeText={(email) => setData({ ...data, email })}
                />
                {emailErr && (
                  <Text style={{ color: "red", fontSize: 11 }}>{emailErr}</Text>
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#999",
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Entypo name="phone" size={24} color="black" />
              <View>
                <Text style={{ fontWeight: 200 }}>Số điện thoại</Text>
                <TextInput
                  defaultValue={user.phone}
                  editable={!isDisable}
                  onChangeText={(phone) => setData({ ...data, phone })}
                />
                {phoneErr && (
                  <Text style={{ color: "red", fontSize: 11 }}>{phoneErr}</Text>
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#999",
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <MaterialCommunityIcons
                name="onepassword"
                size={24}
                color="black"
              />
              <View>
                <Text style={{ fontWeight: 200 }}>Mật khẩu</Text>
                <TextInput
                  defaultValue={user.password.slice(0, 9)}
                  secureTextEntry={true}
                  editable={!isDisable}
                  onChangeText={(password) => setData({ ...data, password })}
                />
                {passwordErr && (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    {passwordErr}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#999",
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Entypo name="address" size={24} color="black" />
              <View>
                <Text style={{ fontWeight: 200 }}>Address</Text>
                <TextInput
                  defaultValue={user.address}
                  editable={!isDisable}
                  onChangeText={(address) => setData({ ...data, address })}
                />
                {addressErr && (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    {addressErr}
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#999",
              }}
            />
          </View>
          <View>
            {!isDisable &&
              (isLoading ? (
                <ActivityIndicator size="large" color={Colors.DEFAULT_BLUE} />
              ) : (
                <Button
                  title="Cập nhật thông tin"
                  style={{
                    padding: 10,
                  }}
                  color={Colors.DEFAULT_GREEN}
                  onPress={handleUpdate}
                />
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
