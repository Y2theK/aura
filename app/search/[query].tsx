
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, View } from "react-native";

import useAppwrite from "../../libs/useAppwrite";
import { searchPosts } from "../../libs/appwrite";
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const {query} = useLocalSearchParams(); // to get dynamic query from params
  // we have to pass the parameter for searchPost function so we can give it by callback function
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query)); 

  // when the query change call refetch 
  useEffect(() => {
    refetch();
  },[query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.name}
            avatar={item.creator.avatar}
            videoId={item.$id}
            savedUsers={item.saved_users}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
                </Text>
                <View className="mt-6 mb-8">
                  <SearchInput initialQuery={query} />
                </View>
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search"
          />
        )}
       
      />
    </SafeAreaView>
  );
};

export default Search;
