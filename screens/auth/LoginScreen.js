import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BGWave, Logo } from "../../assets";
import { Entypo } from "@expo/vector-icons";
import InputForm from "../../components/InputForm";

export default function LoginScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const handleBack = () => {};
  return (
    <SafeAreaView>
      <Image
        source={BGWave}
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
          <InputForm
            label={"Mã sinh viên"}
            placeholder="Mã sinh viên"
            type="numberic"
          />
          <InputForm
            label={"Mật khẩu"}
            placeholder="Mật khẩu"
            type="numberic"
            secure={true}
          />
          <Button title="Tiếp" />
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 20,
              backgroundColor: "999",
              opacity: 0.5,
            }}
            onPress={() => alert("Chức năng đang phát triển")}
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
