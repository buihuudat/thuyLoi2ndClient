import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

export default function UploadImage({ images, setImages }) {
  const pickImage = async () => {
    if (images.length === 6) {
      Alert("Đã đạt số lượng ảnh tối đa");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      multiple: true,
    });

    if (result?.assets && !result.assets[0].cancelled) {
      const rp = await FileSystem.readAsStringAsync(result?.assets[0]?.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImages((prevImg) => [
        ...prevImg,
        { url: `data:image/jpeg;base64,${rp}` },
      ]);
    }
  };
  const takePhoto = async () => {
    let permissionResult = await Permissions.askAsync(Permissions.CAMERA);
    if (permissionResult.status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }
    if (images.length === 6) {
      Alert("Đã đạt số lượng ảnh tối đa");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result?.assets && !result.assets[0].cancelled) {
      const rp = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImages([...images, { url: `data:image/jpeg;base64,${rp}` }]);
    }
  };
  const removeImage = useCallback((index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.imageContainer}>
        {images &&
          images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => removeImage(index)}>
              <Image source={{ uri: image.url }} style={styles.image} />
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.button}>Thêm ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto}>
          <Text style={styles.button}>Chụp ảnh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});
