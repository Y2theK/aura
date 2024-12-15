import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {

  const pathname = usePathname();
  const [query,SetQuery] =  useState(initialQuery || '');

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        value={query}
        onChangeText={(e) => SetQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if(!query){
            return Alert.alert("Missing query","Please input something to search")
          }
          // if the query is start with search , u are already in search page so just set params otherwise go to the route with params
          if(pathname.startsWith("/search")){
            router.setParams({query})
          }else{
            router.push(`/search/${query}`)
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;