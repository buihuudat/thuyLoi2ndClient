import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import Images from "../../assets/constants/Images";
import Colors from "../../assets/constants/Colors";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const handleBack = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_PINK}
        translucent
      />

      <TouchableOpacity onPress={handleBack} style={{ padding: 13 }}>
        <Entypo name="chevron-left" size={34} color="#06b2bb" />
      </TouchableOpacity>
      <View style={styles.backgroundCurvedContainer} />
      <View
        style={
          styles.flexColumn && {
            padding: 10,
            gap: 15,
            justifyContent: "center",
            alignItems: "center",
          }
        }
      >
        <Image
          source={Images.LOGO_TLS}
          style={styles.image}
          resizeMode="contain"
        />
        <Text
          style={{
            marginTop: 30,
            marginBottom: 20,
            paddingTop: 20,
            fontSize: 30,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Đăng ký
        </Text>
        {/* <InputForm
          label={"Mã sinh viên"}
          placeholder="Mã sinh viên"
          type="numberic"
        /> */}

        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="user"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Nhập mã sinh viên"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              // onChangeText={(text) => setUsername(text)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="phone"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Nhập mã số điện thoại"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              // onChangeText={(text) => setUsername(text)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="lock"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              secureTextEntry={isPasswordShow ? false : true}
              placeholder="Nhập password"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              // onChangeText={(text) => setPassword(text)}
            />
            <Feather
              name={isPasswordShow ? "eye" : "eye-off"}
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
              onPress={() => setIsPasswordShow(!isPasswordShow)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.signInButton}
          // onPress={() => signIn()}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <LottieView source={Images.LOADING} autoPlay />
          ) : (
            <Text style={styles.signInButtonText}>Đăng ký</Text>
          )}
        </TouchableOpacity>
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
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              paddingHorizontal: 10,
            }}
          >
            hoặc
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
            <Text
              style={styles.textButton}
              onPress={() => alert("Chức năng đang phát triển")}
            >
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              padding: 10,
              textAlign: "center",
              borderRadius: 10,
              backgroundColor: "green",
            }}
          >
            <Text style={styles.textButton}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_PINK,
    height: 1000,
    position: "absolute",
    top: -780,
    width: 1000,
    borderRadius: 1000,
    alignSelf: "center",
    zIndex: -1,
  },

  textButton: {
    fontWeight: 600,
    color: "white",
  },
  image: {
    height: 100,
    width: 100,
  },

  inputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_PINK,
    justifyContent: "center",
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: "100%",
    width: 100,
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  signInButton: {
    backgroundColor: Colors.DEFAULT_PINK,
    borderRadius: 8,
    marginHorizontal: 20,
    height: 40,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signInButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontWeight: "600",
  },
});
