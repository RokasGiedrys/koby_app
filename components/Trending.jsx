import { useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut || undefined}
      duration={500}
    >
      <TouchableOpacity
        className='flex justify-center items-center'
        activeOpacity={0.7}
      >
        <ImageBackground
          source={{
            uri: item.thumbnail,
          }}
          className='w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40'
          resizeMode='cover'
        />
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = ({ posts = [] }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id || null);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0]?.key);
    }
  };

  if (!posts.length) {
    return <Text>No posts available</Text>; // Provide fallback UI
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item, index) => item?.$id || String(index)}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
