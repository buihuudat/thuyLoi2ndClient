import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BGregister } from "../../assets/index";
import { Entypo } from "@expo/vector-icons";
import InputForm from "../../components/InputForm";
import SelectDropdown from "react-native-select-dropdown";
import { sex } from "../../data";
import TextErrorInput from "../../components/textErrorInput";
import { authAPI } from "../../api/authAPI";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../redux/features/userSlice";
import Images from "../../components/contants/Images";
import Lottie from "lottie-react-native";

export default function RegisterScreen() {
  const [show, setShow] = useState(0);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    msv: "",
    phone: "",
    password: "",
    sex,
    cfpassword: "",
    fullname: "",
  });
  const [msvErrText, setMsvErrText] = useState("");
  const [fnErrText, setFnErrText] = useState("");
  const [lnErrText, setLnErrText] = useState("");
  const [phoneErrText, setPhoneErrText] = useState("");
  const [passErrText, setPassErrText] = useState("");
  const [cfPassErrText, setCfPassErrText] = useState("");
  const [sexErrText, setSexErrText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate("login");
  };

  const handleNext = () => {
    const { msv, firstname, lastname, fullname, sex } = data;
    let err = false;
    if (!msv) {
      setMsvErrText("Bạn chưa nhập mã sinh viên");
      err = true;
    }
    if (msv.length !== 10) {
      setMsvErrText("Mã sinh viên không hợp lệ");
      err = true;
    }
    if (!firstname) {
      setFnErrText("Bạn chưa nhập tên");
      err = true;
    }
    if (firstname.length < 3) {
      setFnErrText("Tên không hợp lệ");
      err = true;
    }
    if (!lastname) {
      setLnErrText("Bạn chưa nhập họ");
      err = true;
    }
    if (lastname.length < 3) {
      setLnErrText("Họ không hợp lệ");
      err = true;
    }
    if (!sex) {
      setSexErrText("Vui lòng chọn giới tính");
      err = true;
    }
    if (err) return;
    setData({ ...data, fullname: firstname + " " + lastname });
    setMsvErrText("");
    setFnErrText("");
    setFnErrText("");
    setLnErrText();
    setShow(1);
  };

  const handleRegister = async () => {
    const { phone, password, cfpassword } = data;
    let err = false;
    if (!phone) {
      setPhoneErrText("Bạn chưa nhập số điện thoại");
      err = true;
    }
    if (phone.length < 10 || phone.length > 11) {
      setPhoneErrText("Số điện thoại không hợp lệ");
      err = true;
    }

    if (!password) {
      setPassErrText("Bạn chưa nhập mật khẩu");
      err = true;
    }
    if (password.length < 8) {
      setPassErrText("Mật khẩu yêu cầu tối thiểu 8 kí tự");
      err = true;
    }
    if (!cfpassword || password !== cfpassword) {
      setCfPassErrText("Mật khẩu không khớp");
      err = true;
    }

    if (err) return;
    setPhoneErrText("");
    setPassErrText("");
    setCfPassErrText("");

    try {
      const { user, token } = await authAPI.register(data);
      dispatch(setUser(user));
      await AsyncStorage.setItem("token", token);
      navigation.navigate("home");
    } catch (e) {
      const errors = e.data.errors;
      errors.forEach((e) => {
        if (e.param === "phone") {
          setPhoneErrText(e.msg);
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <Image
        source={BGregister}
        style={{
          position: "absolute",
          width: "100%",
        }}
        resizeMode="cover"
      />
      <ScrollView>
        <TouchableOpacity onPress={handleBack} style={{ padding: 10 }}>
          <Entypo name="chevron-left" size={34} color="#06b2bb" />
        </TouchableOpacity>
        <View
          style={styles.flexColumn && { marginTop: 70, padding: 10, gap: 10 }}
        >
          <Text
            style={{
              paddingTop: 10,
              fontSize: 30,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Đăng ký tài khoản
          </Text>
          {show === 0 && (
            <View style={{ display: "flex", gap: 20 }}>
              <View>
                <InputForm
                  label={"Mã sinh viên"}
                  placeholder="Mã sinh viên"
                  type="numeric"
                  data={data.msv}
                  setData={(msv) => setData({ ...data, msv })}
                />
                {msvErrText !== "" && TextErrorInput(msvErrText)}
              </View>

              <View>
                <InputForm
                  label={"Tên"}
                  placeholder="Tên"
                  type="default"
                  data={data.firstname}
                  setData={(firstname) => setData({ ...data, firstname })}
                  autoCap="words"
                />
                {fnErrText !== "" && TextErrorInput(fnErrText)}
              </View>

              <View>
                <InputForm
                  label={"Họ"}
                  placeholder="Họ"
                  type="default"
                  data={data.lastname}
                  setData={(lastname) => setData({ ...data, lastname })}
                  autoCap="words"
                />
                {lnErrText !== "" && TextErrorInput(lnErrText)}
              </View>
              <View>
                <SelectDropdown
                  data={sex}
                  defaultButtonText={"Chọn giới tính"}
                  onSelect={(selectedItem, index) => {
                    setData({ ...data, sex: selectedItem });
                  }}
                />
                {sexErrText !== "" && TextErrorInput(sexErrText)}
              </View>

              <Button title="Tiếp" onPress={handleNext} />
            </View>
          )}
          {show === 1 && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
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
                />
                {passErrText !== "" && TextErrorInput(passErrText)}
              </View>
              <View>
                <InputForm
                  label={"Xác nhận mật khẩu"}
                  placeholder="Xác nhận mật khẩu"
                  type="visible-password"
                  secure={true}
                  data={data.cfpassword}
                  setData={(cfpassword) => setData({ ...data, cfpassword })}
                />
                {cfPassErrText !== "" && TextErrorInput(cfPassErrText)}
              </View>
              {isLoading ? (
                <Lottie source={Images.LOADING} autoPlay />
              ) : (
                <Button
                  title="Đăng ký"
                  onPress={handleRegister}
                  color="green"
                />
              )}
              <Button
                title="Quay lại"
                onPress={() => setShow(0)}
                color="#EFC868"
              />
            </View>
          )}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "row",
            }}
          >
            <Text>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={{ color: "blue" }}>Đăng nhập ngay</Text>
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
});
