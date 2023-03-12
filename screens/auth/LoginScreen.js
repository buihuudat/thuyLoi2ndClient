import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import React, {useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Logo } from "../../assets";
import InputForm from "../../components/InputForm";
import { useDispatch } from "react-redux";
import TextErrorInput from "../../components/textErrorInput";
import { authAPI } from "../../api/authAPI";
import { setUser } from "../../redux/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../assets/constants/Colors";
import IonIcons from "react-native-vector-icons/Ionicons";


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

    <View style={{ position: "relative", flex: 1 }}>
      <View style={styles.backgroundCurvedContainer}>
        <TouchableOpacity onPress={handleBack}>
          <IonIcons
            name="chevron-back-outline"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={
          styles.flexColumn && {
            padding: 10,
            marginHorizontal: 10,
          }
        }
      >
        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
          alt="logo"
          source={Logo}
          resizeMode="center"
        />
        {isLoading ? (
          // <Lottie source={Images.LOADING} autoPlay />
          <></>
        ) : (
          <Text
            style={{
              fontSize: 25,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Đăng nhập
          </Text>
        )}
        <View style={{ marginBottom: 15 }}>
          <InputForm
            label={"Số điện thoại"}
            placeholder="Số điện thoại"
            type="numeric"
            data={data.phone}
            setData={(phone) => setData({ ...data, phone })}
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
          }}
        >
          <TouchableOpacity
            onPress={() => Alert.alert("Chức năng đang phát triển")}
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
  )
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
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 500,
    color: Colors.DEFAULT_WHITE,
  },
});
