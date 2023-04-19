import { View, Text } from "react-native";
import React from "react";
import PostItem from "./PostItem";
import { ScrollView } from "react-native-virtualized-view";
const ShowPendingPost = ({ posts }) => {
  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {posts.map((post, i) => (
          <PostItem post={post} key={i} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ShowPendingPost;
