import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import ImageCard from "../../components/ImageCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, isLogged, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logOut = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/");
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <ImageCard post={item} />}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logOut}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='h-6 w-6'
              />
            </TouchableOpacity>
            <View className='h-16 w-16 items-center justify-center border rounded-lg border-secondary'>
              <Image
                source={{ uri: user?.avatar }}
                className='h-[90%] w-[90%] '
              />
            </View>
            <Text className='font-psemibold text-xl text-white mt-5'>
              {user?.username}
            </Text>
            <View className='flex-row gap-5 mt-5'>
              <View className='items-center'>
                <Text className='font-psemibold text-xl text-white'>
                  {posts.length || 0}
                </Text>
                <Text className='font-pregular text-md text-white'>Posts</Text>
              </View>
              <View className='items-center'>
                <Text className='font-psemibold text-xl text-white'>10K</Text>
                <Text className='font-pregular text-md text-white'>Views</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Posts Found'
            subtitle='Be the first one to upload'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
