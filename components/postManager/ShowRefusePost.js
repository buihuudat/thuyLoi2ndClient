import React from "react";
import PostItem from "./PostItem";
const ShowRefusePost = ({ posts }) => {
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

export default ShowRefusePost;
