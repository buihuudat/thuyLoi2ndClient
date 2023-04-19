import { View, Text, RefreshControl } from "react-native";
import React from "react";
import PostItem from "./PostItem";
import { ScrollView } from "react-native-virtualized-view";
import NoOrder from "../NoOrder";

const ShowAccessPost = ({ posts, refreshing, onRefresh }) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {posts.length > 0 ? (
          posts.map((post, i) => <PostItem post={post} key={i} />)
        ) : (
          <NoOrder />
        )}
      </View>
    </ScrollView>
  );
};

export default ShowAccessPost;
