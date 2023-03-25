import { View, Text } from "react-native";
import React from "react";

export default function PostProductHandler({ ref }) {
  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [number, onChangeNumber] = useState("");
  const [data, setData] = useState({});

  const [provice, setProvice] = useState([]);
  const [city, setCity] = useState(79);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [nameCity, setNamCity] = useState("");
  return (
    <View style={styles.containerBS}>
      <BottomSheet ref={bottomSheet} height={700}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.headerBottomSheet}>
            <View>
              <TouchableOpacity
                style={styles.iconClose}
                onPress={() => bottomSheet.current.close()}
              >
                <IonIcons name="close" size={30} color={Colors.DEFAULT_WHITE} />
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
              {/* {image && (
                  <Image
                    source={{ uri: image }}
                    // source={{ uri: 'data:image/jpeg;base64,' + image }}
                    style={{ width: 100, height: 100 }}
                  />
                )} */}
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
                        <Text style={styles.dropdown3RowTxt}>{item.name}</Text>
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
                        <Text style={styles.dropdown3RowTxt}>{item.name}</Text>
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
