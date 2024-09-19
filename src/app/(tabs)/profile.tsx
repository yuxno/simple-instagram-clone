import { Image, Text, View, TextInput, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import CustomInput from "../../components/CustomInput";
import { cld, uploadImage } from "../../lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "cloudinary-react-native";

export default function Profile() {
  // const [email, setEmail] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    if (!user) {
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      Alert.alert("error");
    }
    // console.log(data);
    setUsername(data.username);
    setBio(data.bio);
    setRemoteImage(data.avatar_url);
  };

  const updateProfile = async () => {
    if (!user) {
      return;
    }

    const updatedProfil = {
      id: user.id,
      username,
      bio,
    };
    if (image) {
      const response = await uploadImage(image);
      console.log(response.public_id);
      updatedProfil.avatar_url = response.public_id;
    }
    const { data, error } = await supabase
      .from("profiles")
      .update(updatedProfil)
      .eq("id", user.id)
      .select();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  let remoteCld;
  if (remoteImage) {
    remoteCld = cld.image(remoteImage);
    remoteCld.resize(
      thumbnail().width(300).height(300).gravity(focusOn(FocusOn.face()))
    );
  }
  return (
    <View className=" p-3 flex-1 ">
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-36 aspect-square rounded-full self-center "
        />
      ) : remoteCld ? (
        <AdvancedImage
          cldImg={remoteCld}
          className="w-36 aspect-square rounded-full self-center "
        />
      ) : (
        <View className="w-36 aspect-square rounded-full bg-slate-300 " />
      )}

      <Text
        onPress={pickImage}
        className="text-blue-500 p-2 font-bold text-lg self-center  "
      >
        Change
      </Text>

      {/* <Text className="mb-2 mt-3">Email</Text> */}
      {/* <TextInput
        value={email}
        onChangeText={(newValue) => setEmail(newValue)}
        className=" p-3  border-gray-500 border rounded-md   "
        placeholder="example@ptt.com "
      /> */}

      <CustomInput
        label={"Username"}
        value={username}
        onChangeText={setUsername}
        placeholder="username "
      />

      <CustomInput
        label="bio"
        value={bio}
        onChangeText={setBio}
        placeholder="bio.. "
        multiline
        numberOfLines={2}
      />

      <View className=" mt-3">
        <Button title="Update profile" onPress={updateProfile} />
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}
