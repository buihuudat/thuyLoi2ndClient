import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { BGregister, BGWave, Logo } from "../assets";

export default function FirstScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style={{ position: "relative", flex: 1 }}>
      <View>
        <Animatable.Image
          animation={"fadeIn"}
          easing="ease-out"
          source={BGregister}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 15,
            position: "absolute",
            left: "50%",
            transform: "translate(-50%,0)",
          }}
        >
          <Image alt="logo" source={Logo} />
          <TouchableOpacity onPress={() => navigation.navigate("home")}>
            <Animatable.View
              animation={"pulse"}
              easing="ease-in-out"
              iterationCount={"infinite"}
            >
              <Text
                style={{
                  padding: 10,
                  backgroundColor: "#0047BE",
                  width: "100%",
                  borderRadius: 20,
                  color: "white",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: 20,
                }}
              >
                Tiếp
              </Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
