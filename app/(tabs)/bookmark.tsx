
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, View } from "react-native";
import useAppwrite from "../../libs/useAppwrite";
import { getSavedPosts } from "../../libs/appwrite";
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { useGlobalContext } from "@/context/GlobalProvider";

const Bookmark = () => {
  const { user } = useGlobalContext();
  // we have to pass the parameter for searchPost function so we can give it by callback function
  const { data: posts, refetch } = useAppwrite(() => getSavedPosts(user.$id)); 
  useEffect(() => {
    refetch();
  },[]);
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
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
                  Saved Videos
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Saved Videos
                </Text>
                <View className="mt-6 mb-8">
                  <SearchInput initialQuery='' />
                </View>
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search"
          />
        )}
         refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
       
      />
    </SafeAreaView>
  );
};

export default Bookmark;
