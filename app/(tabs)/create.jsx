import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();

  const [form, setForm] = useState({
    title: "",
    image: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (type) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });

    if (!result.canceled) {
      if (type === "image") {
        setForm({ ...form, image: result.assets[0] });
      }
      if (type === "thumbnail") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    }
  };

  const [submitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    const { title, image, thumbnail, prompt } = form;

    if (!title || !image || !thumbnail || !prompt) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    setIsSubmitting(true);

    try {
      //await signIn(email, password);
      await createPost({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully!");

      router.replace("/home");
    } catch (error) {
      console.log("Post submission error:", error.message); // Log error for debugging
      Alert.alert("Error", error.message);
      throw Error;
    } finally {
      setForm({ title: "", image: null, thumbnail: null, prompt: "" });
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl font-psemibold text-white'>Upload Image</Text>
        <FormField
          title='Image Title'
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-7'
          placeholder='title of the main AI generated image'
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode='cover'
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='h-16 w-16 border border-secondary-100 border-dashed justify-center items-center'>
                  <Image
                    source={icons.upload}
                    className='h-1/2 w-1/2'
                    resizeMode='contain'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker("thumbnail")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode='cover'
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='h-16 w-16 border border-secondary-100 border-dashed justify-center items-center'>
                  <Image
                    source={icons.upload}
                    className='h-1/2 w-1/2'
                    resizeMode='contain'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title='Prompt'
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
          placeholder='prompt used to generate image'
        />
        <CustomButton
          title='Publish'
          handlePress={submit}
          containerStyles='mt-14'
          textStyles=''
          isLoading={submitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
