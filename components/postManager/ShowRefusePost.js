import { View, Text } from "react-native";
import React from "react";
import PostItem from "./PostItem";
const ShowRefusePost = ({ posts }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "center",
      }}
    >
      {posts.map((post, i) => (
        <PostItem post={post} key={i} />
      ))}
    </View>
  );
};

export default ShowRefusePost;
