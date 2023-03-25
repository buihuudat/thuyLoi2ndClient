import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";

import BottomSheet from "react-native-gesture-bottom-sheet";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { dataCateGories, filterCateGories } from "../../data";
import proviceApi from "../../api/proviceAPI";
import IonIcons from "react-native-vector-icons/Ionicons";
import Colors from "../../assets/constants/Colors";
import _ from "lodash";
import { useSelector } from "react-redux";
import UploadImage from "../UploadImage";
export default function PostProduct({ bottomSheet }) {
  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [price, setPrice] = useState("");
  const [data, setData] = useState({});
  const [phone, setPhone] = useState("");
  const [provice, setProvice] = useState([]);
  const [city, setCity] = useState(79);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [nameCity, setNamCity] = useState("");
  const [images, setImages] = useState([]);

  const user = useSelector((state) => state.user.data);

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

  const handlePostProduct = () => {
    const rq = {
      user: {
        user_id: user._id,
        phone: phone ?? user.phone,
      },
      type: _.filter(dataCateGories, { title: data.filterCateGories })[0]?.type,
      title,
      description,
      price,
      location: {
        city: nameCity,
        district,
      },
    };
    console.log(rq);
  };

  return (
    <View>
      <View style={styles.containerBS}>
        <BottomSheet ref={bottomSheet} height={700}>
          <ScrollView style={styles.bottomSheetContainer}>
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
              <UploadImage />
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
                onChangeText={setPrice}
                value={price}
                placeholder="Giá"
                keyboardType="numeric"
                placeholderTextColor={Colors.DEFAULT_BLACK}
              />
              <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="Số điện thoại liên hệ"
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
                <Button title="Đăng tin" onPress={handlePostProduct} />
              </View>
            </ScrollView>
          </ScrollView>
        </BottomSheet>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
});
