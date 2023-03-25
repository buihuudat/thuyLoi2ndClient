import { View, Text } from "react-native";
import React from "react";
import PostItem from "./PostItem";
const ShowAccessPost = ({ posts }) => {
  return (
    <View>
      {posts.map((post, i) => (
        <PostItem post={post} key={i} />
      ))}
    </View>
  );
};

export default ShowAccessPost;
