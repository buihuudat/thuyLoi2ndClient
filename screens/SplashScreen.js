import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { BGregister, BGWave, Logo } from "../assets";
import SelectDropdown from "react-native-select-dropdown";
import { Cities_VN } from "../data";
import { useDispatch } from "react-redux";
import { setCity } from "../redux/features/citySlice";

export default function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [city, setCityState] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (city) {
      setIsDisable(false);
    }
  }, [city]);
  const handleNext = () => {
    dispatch(setCity(city));
    navigation.navigate("HomeTab");
  };

  return (
    <SafeAreaView>
      <Image
        source={BGWave}
        style={{
          width: "100%",
          resizeMode: "cover",
          position: "absolute",
        }}
      />
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Image alt="logo" source={Logo} />
          <View>
            <Text
              style={{
                fontSize: 30,
                // fontFamily: "Rampart One",
              }}
            >
              Thủy Lợi Market
            </Text>
          </View>

          <View>
            <SelectDropdown
              data={Cities_VN}
              defaultButtonText={"Vị trí hiện tại"}
              onSelect={(selectedItem, index) => {
                setCityState(selectedItem);
              }}
            />
          </View>

          <TouchableOpacity onPress={handleNext} disabled={isDisable}>
            <Animatable.View
              animation={!isDisable ? "pulse" : undefined}
              easing="ease-in-out"
              iterationCount={"infinite"}
              style={{
                borderRadius: 20,
                backgroundColor: isDisable ? "#999" : "#0047BE",
                display: "flex",
                height: 60,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
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
