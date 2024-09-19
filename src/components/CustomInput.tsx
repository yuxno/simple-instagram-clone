import { Text, TextInput, View } from "react-native";
export default function CustomInput({ label, ...TextInputProps }) {
  return (
    <View>
      <Text className="mb-2 mt-3">{label}</Text>
      <TextInput
        {...TextInputProps}
        className=" p-3 border-gray-500 border rounded-md   "
      />
    </View>
  );
}
