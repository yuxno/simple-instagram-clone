import { Pressable, Text } from "react-native";

type ButtonProps={
    title: string,
    onPress ?: ()=> void
}
export default function Button({title, onPress}: ButtonProps){
    return (
        <Pressable        
        onPress={onPress} 
        className="bg-blue-500 p-3 w-full items-center rounded-md mt-2 ">
        <Text className="text-white font-semibold ">{title}</Text>
        </Pressable>
    )
}
