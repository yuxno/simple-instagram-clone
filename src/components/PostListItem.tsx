import { Text, View, Image, useWindowDimensions } from "react-native";
import posts from "../../assets/data/posts.json";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import { cld } from "../lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";

export default function PostListItem({ post }) {
  const { width } = useWindowDimensions();

  const myImage = cld.image(post.image);
  myImage.resize(thumbnail().width(500).height(500));
  // console.log(myImage.toURL());

  const avatar = cld.image(
    post.user.avatar_url || "840aae0dd2d1220543f26aeb38c4ed37_taoqqr"
  );
  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
  );

  return (
    // header
    <View className="bg-white ">
      <View className="p-3 flex-row items-center   ">
        <AdvancedImage
          className="w-12 aspect-square rounded-[50px]  "
          cldImg={avatar}
        />
        {/* <Image source={{uri:post.user.image_url}} className="w-12 aspect-square rounded-[50px]  " /> */}
        <Text className="p-2 font-bold ">
          {post.user.username || "New user"}{" "}
        </Text>
      </View>

      {/* content */}

      <AdvancedImage cldImg={myImage} className="w-full aspect-[4/3] " />

      {/* <Image source={{uri:post.image_url}} className="w-full aspect-square " /> */}

      {/* icons */}
      <View className="flex-row items-center justify-between p-3">
        <View className="flex-row gap-3  ">
          <AntDesign name="hearto" size={24} color="black" />
          <FontAwesome5 name="comment" size={24} color="black" />
          <Feather name="send" size={24} color="black" />
        </View>

        <Feather name="bookmark" size={24} color="black" className="ml-auto " />
      </View>
    </View>
  );
}
