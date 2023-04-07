import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Logo } from "../../assets/index";

import InputForm from "../../components/InputForm";
import SelectDropdown from "react-native-select-dropdown";
import { sex } from "../../data";
import TextErrorInput from "../../components/textErrorInput";
import authApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken, setUser } from "../../redux/features/userSlice";
import IonIcons from "react-native-vector-icons/Ionicons";
import Colors from "../../assets/constants/Colors";

export default function RegisterScreen() {
  const [show, setShow] = useState(0);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    msv: "",
    phone: "",
    email: "",
    password: "",
    sex,
    cfpassword: "",
    fullname: "",
  });
  const [msvErrText, setMsvErrText] = useState("");
  const [fnErrText, setFnErrText] = useState("");
  const [lnErrText, setLnErrText] = useState("");
  const [phoneErrText, setPhoneErrText] = useState("");
  const [emailErrorTexxt, setEmailErrorTexxt] = useState("");
  const [passErrText, setPassErrText] = useState("");
  const [cfPassErrText, setCfPassErrText] = useState("");
  const [sexErrText, setSexErrText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate("LoginScreen");
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
    setIsLoading(true);

    try {
      const { user, token } = await authApi.register(data);
      dispatch(setUser(user));
      dispatch(setToken(token));
      await AsyncStorage.setItem("token", token);
      navigation.navigate("HomeTab");
    } catch (e) {
      const errors = e.data.errors;
      errors.forEach((e) => {
        if (e.param === "msv") {
          setMsvErrText(e.msg);
          setShow(0);
        }
        if (e.param === "email") {
          setEmailErrorTexxt(e.msg);
          setShow(1);
        }
        if (e.param === "phone") {
          setPhoneErrText(e.msg);
          setShow(1);
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.mainContainer}>
        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
          alt="logo"
          source={Logo}
          resizeMode="center"
        />
        <Text style={styles.title}>Đăng ký tài khoản</Text>
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
            <TouchableOpacity
              onPress={handleNext}
              style={{
                padding: 10,
                marginVertical: 20,
                borderRadius: 10,
                backgroundColor: Colors.DEFAULT_BLUE,
              }}
            >
              <Text style={styles.textButton}>Tiếp</Text>
            </TouchableOpacity>
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
                label={"Email"}
                placeholder="Email"
                data={data.email}
                setData={(email) => setData({ ...data, email })}
              />
              {emailErrorTexxt !== "" && TextErrorInput(emailErrorTexxt)}
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
            <View>
              <InputForm
                label={"Xác nhận mật khẩu"}
                placeholder="Xác nhận mật khẩu"
                type="visible-password"
                secure={true}
                data={data.cfpassword}
                setData={(cfpassword) => setData({ ...data, cfpassword })}
                isPasswordShow={isPasswordShow}
                setIsPasswordShow={setIsPasswordShow}
              />
              {cfPassErrText !== "" && TextErrorInput(cfPassErrText)}
            </View>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Button title="Hoàn tất" onPress={handleRegister} color="green" />
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
          <Text style={{ fontSize: 15 }}>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{ color: Colors.DEFAULT_BLUE, fontSize: 15 }}>
              Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DEFAULT_WHITE,
    width: "100%",
    height: "100%",
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
  mainContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 500,
    textAlign: "center",
    marginBottom: 20,
  },
  textButton: {
    fontWeight: 500,
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
});
