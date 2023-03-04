import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  LogBox,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BGregister } from "../../assets/index";
import FormRegsiter from "../../components/formRegsiter";
import { Entypo } from "@expo/vector-icons";
import InputForm from "../../components/InputForm";

export default function RegisterScreen() {
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
        w="full"
        style={{
          position: "absolute",
        }}
        sizeMode="cover"
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
          <InputForm
            label={"Số điện thoại"}
            placeholder="Số điện thoại"
            type="numberic"
          />
          <InputForm
            label={"Mật khẩu"}
            placeholder="Mật khẩu"
            type="numberic"
            secure={true}
          />
          <Button title="Tiếp" />
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
