import { View, Text } from "react-native";
import React from "react";
import PostItem from "./PostItem";
const ShowPendingPost = ({ posts }) => {
  return (
    <View>
      {posts.map((post, i) => (
        <PostItem post={post} key={i} />
      ))}
    </View>
  );
};

export default ShowPendingPost;
