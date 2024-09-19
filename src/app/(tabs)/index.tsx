import { Text, View, Image, FlatList, Alert } from "react-native";
import PostListItem from "../../components/PostListItem";
import { ScrollView } from "react-native";
import posts from "../../../assets/data/posts.json";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*)");
    if (error) {
      Alert.alert("woops");
    }
    setPosts(data);
  };

  console.log(posts);

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{ gap: 3 }}
      showsVerticalScrollIndicator={false}
    />
  );

  // method 1:
  //    return (
  //   <View>
  //    <ScrollView >
  //       <PostListItem post={posts[0]} />
  //       <PostListItem post={posts[1]}  />
  //       <PostListItem post={posts[2]}  />
  //    </ScrollView>
  //   </View>
  // )
}
