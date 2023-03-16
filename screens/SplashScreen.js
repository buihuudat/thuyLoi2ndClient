import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Colors from "../assets/constants/Colors";
import { Logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import { Cities_VN } from "../data";
import * as Animatable from "react-native-animatable";
import Svg, { Path } from "react-native-svg";
import { setCity } from "../redux/features/citySlice";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [city, setCityState] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  // const user = useSelector((state) => state?.user.data);
  // console.log(user);

  useEffect(() => {
    if (city) {
      setIsDisable(false);
    }
  }, [city]);
  const handleNext = () => {
    dispatch(setCity(city));
    navigation.navigate("LoginScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageLogo}>
        <Image alt="logo" source={Logo} />

        <Text style={styles.name}>Thủy Lợi Market</Text>

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
            <Text style={styles.textButton}>Tiếp</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <View style={styles.box}>
          <Svg
            height={200}
            width={Dimensions.get("screen").width}
            viewBox="0 0 1440 320"
            style={styles.bottomWavy}
          >
            <Path
              fill="#1D5C94"
              d="M0,128L40,133.3C80,139,160,149,240,176C320,203,400,245,480,218.7C560,192,640,96,720,69.3C800,43,880,85,960,122.7C1040,160,1120,192,1200,186.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            />
          </Svg>
          <Svg
            height={150}
            width={Dimensions.get("screen").width}
            viewBox="0 0 1440 320"
            style={styles.bottomWavy}
          >
            <Path
              fill="#113D80"
              d="M0,128L40,133.3C80,139,160,149,240,176C320,203,400,245,480,218.7C560,192,640,96,720,69.3C800,43,880,85,960,122.7C1040,160,1120,192,1200,186.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            />
          </Svg>
          <Svg
            height={100}
            width={Dimensions.get("screen").width}
            viewBox="0 0 1440 320"
            style={styles.bottomWavy}
          >
            <Path
              fill="#08226c"
              d="M0,128L40,133.3C80,139,160,149,240,176C320,203,400,245,480,218.7C560,192,640,96,720,69.3C800,43,880,85,960,122.7C1040,160,1120,192,1200,186.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            />
          </Svg>
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
  imageLogo: {
    marginTop: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  name: {
    fontSize: 30,
  },

  bottom: {
    position: "absolute",
    width: Dimensions.get("screen").width,
    bottom: 0,
  },
  textButton: {
    color: "white",
    fontWeight: 600,
    fontSize: 20,
  },
  box: {
    backgroundColor: "#08226c",
    height: 80,
  },
  bottomWavy: {
    position: "absolute",
    bottom: 20,
  },
});
