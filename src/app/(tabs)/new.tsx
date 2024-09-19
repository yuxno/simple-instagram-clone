import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../../components/Button";
import { upload } from "cloudinary-react-native";
import { cld, uploadImage } from "../../lib/cloudinary";
import { UploadApiResponse } from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import { router } from "expo-router";

export default function New() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { session } = useAuth();

  // useEffect (()=>{
  //    if(!image) {
  //       pickImage();
  //    }
  // }, [image])
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    // console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!image) {
      return;
    }
    const response = await uploadImage(image);
    // console.log("image id", response?.public_id);

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          caption,
          image: response?.public_id,
          user_id: session?.user.id,
        },
      ])
      .select();

    router.push("/(tabs)");
  };

  return (
    <View className="p-3 items-center w-full flex-1 ">
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-[3/4] rounded-lg shadow-lg"
        />
      ) : (
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/46/93/2d/46932dd1d21442740b261313a16ff2ef.jpg",
          }}
          className="w-52 aspect-[3/4] rounded-lg shadow-lg"
        />
        //   <Text className="text-gray-500 p-3 font-bold text-xl">
        //     No Image Selected
        //   </Text>
      )}

      <Text
        onPress={pickImage}
        className="text-blue-400 p-3 font-bold text-xl "
      >
        Change
      </Text>

      <TextInput
        value={caption}
        onChangeText={(newValue) => setCaption(newValue)}
        className="w-full p-3 "
        placeholder="say something "
      />

      <View className="w-full mt-auto">
        <Button title="Share" onPress={createPost} />
      </View>
    </View>
  );
}
