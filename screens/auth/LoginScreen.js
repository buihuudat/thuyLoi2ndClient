import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Logo } from "../../assets";
import InputForm from "../../components/InputForm";
import { useDispatch } from "react-redux";
import TextErrorInput from "../../components/textErrorInput";
import authApi from "../../api/authApi";
import { setToken, setUser } from "../../redux/features/userSlice";
import Colors from "../../assets/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FbLogin from "../../components/handlers/loginFB";

export default function LoginScreen({}) {
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
      const { user, token } = await authApi.login(data);

      dispatch(setUser(user));
      dispatch(setToken(token));
      await AsyncStorage.setItem("token", token);
      navigation.navigate("HomeTab");
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View
      style={{
        position: "relative",
        flex: 1,
      }}
    >
      <View
        style={
          styles.flexColumn && {
            padding: 10,
            marginHorizontal: 10,
            paddingTop: 50,
          }
        }
      >
        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            resizeMode: "cover",
          }}
          alt="logo"
          source={Logo}
          resizeMode="center"
        />

        <Text
          style={{
            fontSize: 25,
            fontWeight: 500,
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          Đăng nhập
        </Text>

        <View style={{ marginBottom: 15, paddingTop: 30 }}>
          <InputForm
            label={"Số điện thoại"}
            placeholder="Số điện thoại"
            type="numeric"
            data={data.phone}
            setData={(phone) => setData({ ...data, phone })}
            isPasswordShow={false}
          />
          {phoneErrText !== "" && TextErrorInput(phoneErrText)}
        </View>
        <View style={{ marginBottom: 15 }}>
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

          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                padding: 10,
                marginVertical: 20,
                borderRadius: 10,
                backgroundColor: Colors.DEFAULT_BLUE,
              }}
            >
              <Text style={styles.textButton}>Đăng nhập</Text>
            </TouchableOpacity>
          )}

          <Text
            style={{ textAlign: "center", fontWeight: 600 }}
            onPress={() => Alert.alert("Chức năng đang phát triển")}
          >
            Quên mật khẩu?
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            {/* login with FB */}
            <FbLogin />
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  textButton: {
    fontWeight: 500,
    fontSize: 15,
    color: "white",
    textAlign: "center",
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
});
