import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BGWave, Logo } from "../../assets";
import { Entypo, Feather } from "@expo/vector-icons";
import InputForm from "../../components/InputForm";
import { useDispatch } from "react-redux";
import TextErrorInput from "../../components/textErrorInput";
import { authAPI } from "../../api/authAPI";
import { setUser } from "../../redux/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Images from "../../components/contants/Images";
import Lottie from "lottie-react-native";

export default function LoginScreen() {
  const [phoneErrText, setPhoneErrText] = useState("");
  const [passErrText, setPassErrText] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    phone: "",
    password: "",
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleBack = () => {};
  const handleLogin = async () => {
    const { phone, password } = data;
    let err = false;
    if (!phone) {
      setPhoneErrText("Bạn chưa nhập số điện thoại");
      err = true;
    }
    if (!password) {
      setPassErrText("Bạn chưa nhập mật khẩu");
      err = true;
    }
    if (err) return;
    setPhoneErrText("");
    setPassErrText("");
    setIsLoading(true);

    try {
      const { user, token } = await authAPI.login(data);
      dispatch(setUser(user));
      await AsyncStorage.setItem("token", token);
      setIsLoading(false);
      navigation.navigate("home");
    } catch (e) {
      const errors = e.data.errors;
      errors.forEach((e) => {
        if (e.param === "phone") {
          setPhoneErrText(e.msg);
        }
        if (e.param === "password") {
          setPassErrText(e.msg);
        }
      });
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ position: "relative", flex: 1 }}>
      <Image
        source={BGWave}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
        resizeMode="stretch"
      />
      <ScrollView>
        <TouchableOpacity onPress={handleBack} style={{ padding: 13 }}>
          <Entypo name="chevron-left" size={34} color="#06b2bb" />
        </TouchableOpacity>
        <View
          style={
            styles.flexColumn && {
              padding: 10,
              gap: 15,
            }
          }
        >
          <Image
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 4,
            }}
            alt="logo"
            source={Logo}
            resizeMode="center"
          />
          {isLoading ? (
            <Lottie source={Images.LOADING} autoPlay />
          ) : (
            <Text
              style={{
                paddingTop: 10,
                fontSize: 30,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Đăng nhập
            </Text>
          )}
          <View>
            <InputForm
              label={"Số điện thoại"}
              placeholder="Số điện thoại"
              type="numeric"
              data={data.phone}
              setData={(phone) => setData({ ...data, phone })}
            />
            {phoneErrText !== "" && TextErrorInput(phoneErrText)}
          </View>
          <View>
            <InputForm
              label={"Mật khẩu"}
              placeholder="Mật khẩu"
              type="visible-password"
              secure={true}
              data={data.password}
              setData={(password) => setData({ ...data, password })}
              isPasswordShow={isPasswordShow}
              setIsPasswordShow={setIsPasswordShow}
            />
            {passErrText !== "" && TextErrorInput(passErrText)}
          </View>
          <Button onPress={handleLogin} title="Đăng nhập" />
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 20,
              backgroundColor: "999",
              opacity: 0.5,
            }}
            onPress={() => Alert.alert("Chức năng đang phát triển")}
          >
            <Text style={{ textAlign: "center", fontWeight: 600 }}>
              Quên mật khẩu
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                textAlign: "center",
                borderRadius: 10,
                backgroundColor: "#3878DB",
              }}
            >
              <Text style={styles.textButton}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("register")}
              style={{
                padding: 10,
                textAlign: "center",
                borderRadius: 10,
                backgroundColor: "green",
              }}
            >
              <Text style={styles.textButton}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  textButton: {
    fontWeight: 600,
    color: "white",
  },
});
