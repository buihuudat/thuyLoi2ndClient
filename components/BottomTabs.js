//tran thanh tu
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import Colors from "../assets/constants/Colors";
import AccountScreen from "../screens/AccountScreen";
import OrderScreen from "../screens/OrderScreen";
import PostManagerScreen from "../screens/PostManagerScreen";
import { StyleSheet } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Button } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { filterCateGories } from "../data";
import proviceApi from "../api/proviceAPI";

import * as ImagePicker from "expo-image-picker";

const BottomTabs = createBottomTabNavigator();

const HomeTabs = () => {
  const bottomSheet = useRef();
  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [number, onChangeNumber] = useState("");
  const [data, setData] = useState({});

  const [provice, setProvice] = useState([]);
  const [city, setCity] = useState(79);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [nameCity, setNamCity] = useState("");

  const [image, setImage] = useState([]);
  console.log(image);

  useEffect(() => {
    const animatedValue = new Animated.Value(0);
    animatedValue.addListener((value) => {
      console.log(value);
    });
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled === false) {
      setImage(result.assets[0].uri);
    }
  };
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled === false) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const getProvice = async () => {
      const data = await proviceApi.get();
      setProvice(data);
    };
    getProvice();
  }, []);

  // get districts
  useEffect(() => {
    const districts = () => {
      provice?.forEach((data, index) => {
        if (data.code === city) {
          setDistricts(data.districts);
          setNamCity(data.name);
          setDistrict(data.districts[0].name);
        }
      });
    };
    districts();
  }, [city, provice]);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => bottomSheet.current.show()}
      >
        <View style={styles.containerCircleBig}>
          <View style={styles.containerCircleSmall}>
            <IonIcons
              name="share-outline"
              size={30}
              color={Colors.DEFAULT_BLACK}
            />
            <Text style={styles.title}>Đăng tin</Text>
          </View>
        </View>
      </TouchableOpacity>

      <BottomTabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "relative",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: 60,
            backgroundColor: Colors.DEFAULT_BLUE,
            borderTopWidth: 0,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.DEFAULT_YELLOW,
          tabBarInactiveTintColor: Colors.DEFAULT_WHITE,
        }}
      >
        <BottomTabs.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons name="home-outline" size={23} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="PostManagerScreen"
          component={PostManagerScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons name="reader-outline" size={23} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="login"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              // <View style={styles.containerCircleBig}>
              //   <View style={styles.containerCircleSmall}>
              <IonIcons
                name="share-outline"
                size={30}
                color={Colors.DEFAULT_BLACK}
              />

              //     <Text style={styles.title}>Đăng tin</Text>
              //   </View>
              // </View>
            ),
          }}
        />

        <BottomTabs.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons name="cart-outline" size={23} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons name="person-circle-outline" size={30} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>
      <View style={styles.containerBS}>
        <BottomSheet ref={bottomSheet} height={700}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.headerBottomSheet}>
              <View>
                <TouchableOpacity
                  style={styles.iconClose}
                  onPress={() => bottomSheet.current.close()}
                >
                  <IonIcons
                    name="close"
                    size={30}
                    color={Colors.DEFAULT_WHITE}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.titleHeaderBottomSheet}>
                  Đăng tin sản phẩm
                </Text>
              </View>
              <View style={{ marginHorizontal: 20 }}></View>
            </View>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button title="Tải ảnh lên" onPress={pickImage} />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button title="Chụp ảnh" onPress={takePicture} />
                {image && (
                  <Image
                    source={{ uri: image }}
                    // source={{ uri: 'data:image/jpeg;base64,' + image }}
                    style={{ width: 100, height: 100 }}
                  />
                )}
              </View>

              <View style={styles.selectDropdownContainer}>
                <SelectDropdown
                  buttonStyle={{
                    backgroundColor: Colors.DEFAULT_WHITE,
                    width: "100%",
                    height: "100%",
                  }}
                  buttonTextStyle={{
                    textAlign: "left",
                    marginHorizontal: 0,
                    fontSize: 16,
                  }}
                  data={filterCateGories}
                  defaultButtonText={"Thể loại"}
                  onSelect={(selectedItem, index) => {
                    setData({ ...data, filterCateGories: selectedItem });
                  }}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <IonIcons
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color={"#444"}
                        size={18}
                      />
                    );
                  }}
                />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Tiêu đề"
                placeholderTextColor={Colors.DEFAULT_BLACK}
              />
              <View style={styles.descriptionContainer}>
                <AutoGrowingTextInput
                  maxHeight={200}
                  minHeight={70}
                  onChangeText={onChangeDescription}
                  placeholder="Mô tả"
                  placeholderTextColor={Colors.DEFAULT_BLACK}
                  value={description}
                  style={styles.descriptionInput}
                />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Giá"
                keyboardType="numeric"
                placeholderTextColor={Colors.DEFAULT_BLACK}
              />
              <View style={styles.address}>
                <View style={styles.selectDropdownCityContainer}>
                  <SelectDropdown
                    buttonStyle={{
                      backgroundColor: Colors.DEFAULT_WHITE,
                      width: "100%",
                      height: "100%",
                    }}
                    buttonTextStyle={{
                      textAlign: "left",
                      marginHorizontal: 0,
                      fontSize: 16,
                    }}
                    data={provice}
                    defaultButtonText={nameCity}
                    renderCustomizedRowChild={(item, index) => {
                      return (
                        <View style={styles.dropdown3RowChildStyle}>
                          <Text style={styles.dropdown3RowTxt}>
                            {item.name}
                          </Text>
                        </View>
                      );
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.name;
                    }}
                    onSelect={(selectedItem, index) => {
                      setDistricts(selectedItem.districts);
                      setCity(selectedItem.code);
                    }}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <IonIcons
                          name={isOpened ? "chevron-up" : "chevron-down"}
                          color={"#444"}
                          size={18}
                        />
                      );
                    }}
                  />
                  {/* {sexErrText !== "" && TextErrorInput(sexErrText)} */}
                </View>
                <View style={styles.selectDropdownDistrictContainer}>
                  <SelectDropdown
                    buttonStyle={{
                      backgroundColor: Colors.DEFAULT_WHITE,
                      width: "100%",
                      height: "100%",
                    }}
                    buttonTextStyle={{
                      textAlign: "left",
                      marginHorizontal: 0,
                      fontSize: 16,
                    }}
                    data={districts}
                    defaultButtonText={district}
                    renderCustomizedRowChild={(item, index) => {
                      return (
                        <View style={styles.dropdown3RowChildStyle}>
                          <Text style={styles.dropdown3RowTxt}>
                            {item.name}
                          </Text>
                        </View>
                      );
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.name;
                    }}
                    onSelect={(selectedItem, index) => {
                      setDistricts(selectedItem.name);
                      setCity(selectedItem.code);
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.name;
                    }}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <IonIcons
                          name={isOpened ? "chevron-up" : "chevron-down"}
                          color={"#444"}
                          size={18}
                        />
                      );
                    }}
                  />
                  {/* {sexErrText !== "" && TextErrorInput(sexErrText)} */}
                </View>
              </View>

              <View style={styles.button}>
                <Button
                  title="Đăng tin"
                  color={Colors.DEFAULT_WHITE}
                  onPress={() => Alert.alert("Tính năng đang phát triển")}
                />
              </View>
            </ScrollView>
          </View>
        </BottomSheet>
      </View>
    </>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -15,
    zIndex: 1,
    left: "40%",
  },
  containerCircleBig: {
    backgroundColor: Colors.DEFAULT_BLUE,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  containerCircleSmall: {
    backgroundColor: Colors.DEFAULT_WHITE,
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  title: {
    color: Colors.DEFAULT_BLACK,
    fontWeight: 600,
    fontSize: 13,
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  containerBS: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContainer: {
    flexDirection: "column",
  },
  headerBottomSheet: {
    width: "100%",
    height: 55,
    backgroundColor: Colors.DEFAULT_BLUE,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  titleHeaderBottomSheet: {
    fontSize: 19,
    fontWeight: 500,
    color: Colors.DEFAULT_WHITE,
  },
  iconClose: {
    marginHorizontal: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderColor: Colors.DEFAULT_GREY,
  },
  descriptionContainer: {
    flexDirection: "row",
    padding: 10,
  },
  descriptionInput: {
    paddingLeft: 10,
    fontSize: 16,
    flex: 1,

    backgroundColor: Colors.DEFAULT_WHITE,
    borderWidth: 1,
    borderColor: Colors.DEFAULT_GREY,
    // borderRadius: IsIOS ? 4 : 0,
  },
  button: {
    backgroundColor: Colors.DEFAULT_BLUE,
    marginHorizontal: 100,
    borderRadius: 5,
    marginTop: 20,
  },
  selectDropdownContainer: {
    width: "95%",
    height: 40,

    backgroundColor: Colors.DEFAULT_WHITE,
    borderWidth: 1,
    borderColor: Colors.DEFAULT_GREY,

    margin: 10,
  },
  address: {
    // flexDirection:"row",
    width: "95%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  selectDropdownCityContainer: {
    width: "47%",
    height: "100%",
    backgroundColor: Colors.DEFAULT_WHITE,
    borderWidth: 1,
    borderColor: Colors.DEFAULT_GREY,
  },
  selectDropdownDistrictContainer: {
    width: "47%",
    height: "100%",
    backgroundColor: Colors.DEFAULT_WHITE,
    borderWidth: 1,
    borderColor: Colors.DEFAULT_GREY,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  dropdown3RowTxt: {
    color: Colors.DEFAULT_BLACK,
    textAlign: "center",
    fontWeight: 500,
    fontSize: 15,
  },
  containerImage: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
