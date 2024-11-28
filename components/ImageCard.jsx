import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

const ImageCard = ({
  post: {
    title,
    thumbnail,
    creator: { username, avatar },
  },
}) => {
  return (
    <View className='flex-col items-center px-4 mb-14 mt-5'>
      <View className='flex-row items-start gap-3'>
        <View className='flex-1 flex-row justify-center items-center'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text
              className='text-white font-psemibold text-sm'
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className='text-xs text-gray-100 font-pregular'
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className='pt-2'>
          <Image source={icons.menu} className='h-5 w-5' resizeMode='contain' />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className='w-full h-60 rounded-xl mt-3 justify-center items-center'
      >
        <Image
          source={{ uri: thumbnail }}
          className='w-full h-full rounded-xl mt-3'
          resizeMode='cover'
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImageCard;
