import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
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

export default function RegisterScreen() {
  const [show, setShow] = useState("0");
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    msv: "",
    phone: "",
    password: "",
    sex: "",
    cfpassword: "",
  });
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleBack = () => {
    navigation.navigate("login");
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
        <TouchableOpacity onPress={handleBack} style={{ padding: 13 }}>
          <Entypo name="chevron-left" size={34} color="#06b2bb" />
        </TouchableOpacity>
        <View
          style={styles.flexColumn && { marginTop: 90, padding: 10, gap: 10 }}
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
          <View style={{ display: "flex", gap: 10 }}>
            <InputForm
              label={"Tên"}
              placeholder="Tên"
              type="visible-password"
              data={data.phone}
              setData={(phone) => setData({ ...data, phone })}
            />
            <InputForm
              label={"Họ"}
              placeholder="Họ"
              type="visible-password"
              data={data.phone}
              setData={(phone) => setData({ ...data, phone })}
            />
            <View>
              <SelectDropdown
                data={sex}
                defaultButtonText={"Chọn giới tính"}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
              />
            </View>
            <InputForm
              label={"Số điện thoại"}
              placeholder="Số điện thoại"
              type="visible-password"
              data={data.phone}
              setData={(phone) => setData({ ...data, phone })}
            />
            <InputForm
              label={"Mật khẩu"}
              placeholder="Mật khẩu"
              type="numberic"
              secure={true}
              data={data.password}
              setData={(password) => setData({ ...data, password })}
            />
            <InputForm
              label={"Xác nhận mật khẩu"}
              placeholder="Xác nhận mật khẩu"
              type="numberic"
              secure={true}
              data={data.cfpassword}
              setData={(cfpassword) => setData({ ...data, cfpassword })}
            />
            <Button title="Tiếp" onPress={() => setShow()} />
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
