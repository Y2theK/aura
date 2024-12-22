
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";

import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import { useGlobalContext } from "@/context/GlobalProvider";
import { savedVideoWithUser } from "@/libs/appwrite";

const VideoCard = ({ title, creator, avatar, thumbnail, video, videoId,savedUsers = [] }) => {
  const [play, setPlay] = useState(false);
  const { user } = useGlobalContext();

  const [savedUser,setSavedUser] = useState(savedUsers);

  const savedVideo = async (videoId) => {
    try {
      const video = await savedVideoWithUser(videoId,user.$id);
      setSavedUser([...video.saved_users])
    } catch (error) {
      Alert.alert("Error",error.message)
    }
    
    
  }
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <TouchableOpacity
            onPress={() => savedVideo(videoId)}
          >
            <Image source={icons.bookmark} className="w-5 h-5" tintColor={savedUser.includes(user.$id) ? '#FFA001' : '#CDCDE0'} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      {play ? (
        <Video
        source={{ uri: video }}
        style={{ width: '100%', height: 240, borderRadius: 33, marginTop: 12, backgroundColor: 'rgba(255,255,255,0.1)' }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            setPlay(false);
          }
        }}
        onError={(error) => console.log('Error:', error)}

      />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
