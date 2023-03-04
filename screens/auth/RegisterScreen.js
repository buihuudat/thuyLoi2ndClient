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
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BGregister } from "../../assets/index";
import FormRegsiter from "../../components/formRegsiter";
import { Entypo } from "@expo/vector-icons";

export default function RegisterScreen() {
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
        <FormRegsiter />
      </ScrollView>
    </SafeAreaView>
  );
}
