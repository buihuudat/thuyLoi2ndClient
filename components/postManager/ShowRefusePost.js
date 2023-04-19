import React from "react";
import PostItem from "./PostItem";
import { ScrollView } from "react-native-virtualized-view";
import { RefreshControl, View } from "react-native";
import NoOrder from "../NoOrder";

const ShowRefusePost = ({ posts, refreshing, onRefresh }) => {
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

export default ShowRefusePost;
