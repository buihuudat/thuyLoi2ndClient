{
  /* tranthanhtu 8/3/2023 */
}
import { View, Image, StyleSheet } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

const SwiperPostProductItemDetail = ({ images }) => {
  return (
    <View style={{ height: 250, width: "100%" }}>
      <Swiper
        containerStyle={styles.wrapper}
        showsButtons={false}
        loop={true}
        // autoplay={true}
        paginationStyle={true}
        showsPagination={true}
      >
        {images.map((image, i) => (
          <View style={styles.slide} key={i}>
            <Image style={styles.image} source={{ uri: image.url }} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default SwiperPostProductItemDetail;

const styles = StyleSheet.create({
  slide: {},
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
