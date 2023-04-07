import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import Colors from "../assets/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import userApi from "../api/userApi";
import { setUser } from "../redux/features/userSlice";
export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
  });
  const handleBack = () => {
    navigation.navigate("HomeTab");
  };

  const handleUpdate = async () => {
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
  };

  const handleScroll = (event) => {
    event.nativeEvent.contentOffset.y;
  };
  const handleSettings = () => {};
  return (
    <View>
      {/* <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: Colors.DEFAULT_BLUE,
        }}
      /> */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          // marginTop: 25,
        }}
      >
        <View
          style={{
            height: "40%",
            backgroundColor: Colors.DEFAULT_BLUE,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            display: "flex",
            justifyContent: "center",
            padding: 10,
          }}
        >
          {/* nav */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              zIndex: 100,
              alignItems: "center",
              justifyContent: "space-between",
              // marginBottom: "auto",
            }}
          >
            <TouchableOpacity onPress={handleBack}>
              <Entypo
                name="chevron-left"
                size={28}
                color={Colors.DEFAULT_GREY}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: Colors.DEFAULT_WHITE,
                fontSize: 20,
                padding: 10,
              }}
            >
              Trang cá nhân
            </Text>
            <TouchableOpacity onPress={handleSettings}>
              <Feather name="settings" size={28} color={Colors.DEFAULT_GREY} />
            </TouchableOpacity>
          </View>
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
                width: 120,
                height: 120,
                borderRadius: 100,
              }}
              source={
                user.avatar === "" &&
                require("../assets/images/default-avatar-profile.jpg")
              }
            />
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
              <Text style={{ color: "white", fontSize: 20 }}>
                {user.follow.follower ?? 0}{" "}
                <Text style={{ fontSize: 13 }}>Người theo dõi</Text>
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>|</Text>
              <Text style={{ color: "white", fontSize: 20 }}>
                <Text style={{ fontSize: 13 }}>Đang theo dõi </Text>
                {user.follow.following ?? 0}{" "}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          style={{
            padding: 50,
            // maxHeight: "60%",
            overflow: "scroll",
            height: 100,
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
            {isDisable && (
              <Button
                title="Chỉnh sửa thông tin"
                style={{
                  padding: 10,
                }}
                onPress={() => setIsDisable(false)}
              />
            )}
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
