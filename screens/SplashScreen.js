import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import Colors from "../assets/constants/Colors";
import { Logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import Svg, { Path } from "react-native-svg";
import { setCity } from "../redux/features/citySlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen() {
  const [cityState, setCityState] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user.data);
  const city = useSelector((state) => state.city.data);

  useLayoutEffect(() => {
    if (city) {
      navigation.navigate("LoginScreen");
    }
  }, []);

  // useEffect(() => {
  //   if (city || cityState) {
  //     setIsDisable(false);
  //   }
  // }, [cityState]);

  const handleNext = useCallback(() => {
    AsyncStorage.getItem("user", (error, result) => {
      if (result) {
        dispatch(setUser(JSON.parse(result)));
      }
      if (!user) {
        navigation.navigate("LoginScreen");
      } else {
        navigation.navigate("HomeTab");
      }
    });
  }, [user, navigation, dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.imageLogo}>
        <Image alt="logo" source={Logo} style={{ resizeMode: "cover" }} />

        <Text
          style={{
            fontSize: 30,
            paddingTop: 30,
          }}
        >
          Chào mừng đến với
        </Text>
        <Text style={styles.name}>Thủy Lợi Market</Text>

        {/* set current city */}
        <View>
          {/* <SelectDropdown
            data={Cities_VN}
            defaultButtonText={city || "Vị trí hiện tại"}
            onSelect={(selectedItem, index) => {
              setCityState(selectedItem);
            }}
          /> */}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <Animatable.View
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
            style={{
              borderRadius: 20,
              backgroundColor: "#0047BE",
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
