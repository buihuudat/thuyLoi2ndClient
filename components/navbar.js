import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useCallback } from "react";
import Colors from "../assets/constants/Colors";
import { Feather } from "@expo/vector-icons";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { FeatureBuilding } from "./handlers/featureBuilding";
import { Header } from "react-native-elements";

export default function navbar({ posts }) {
  const { navigate } = useNavigation();

  const handleSearch = useCallback(() => {
    navigate("Search", { posts });
    // Keyboard.dismiss;
  }, [navigate]);
  const handleMessage = useCallback(() => {
    navigate("MessageScreen");
  }, [navigate]);

  return (
    <View>
      <StatusBar barStyle={"light-content"} />
      <Header backgroundColor={Colors.DEFAULT_BLUE} />
      <View style={styles.backgroundCurvedContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="search"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Tìm kiếm"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              onPressOut={handleSearch}
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={FeatureBuilding}>
          <Feather
            name="bell"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginRight: 5 }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleMessage}>
          <IonIcons
            name="chatbox-ellipses-outline"
            size={25}
            color={Colors.DEFAULT_WHITE}
            style={{ marginRight: 5 }}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundCurvedContainer: {
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_BLUE,
    position: "relative",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    width: "70%",
    height: 35,
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_WHITE,
    justifyContent: "center",
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    height: "100%",
    width: 100,
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
});
