import { Image, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { router, Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

const App = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href='/home' />;

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className='w-full flex justify-center items-center min-h-[85vh] px-4'>
          <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[298px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className='text-secondary-200'>Koby</Text>
            </Text>

            <Image
              source={images.path}
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Koby
          </Text>
          <CustomButton
            title='Continue with Email'
            handlePress={() => router.push("/sign-in")}
            containerStyles={"w-full mt-7"}
            textStyles={""}
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
};

export default App;