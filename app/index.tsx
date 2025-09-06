import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-lg text-green-500">Prashanttt</Text>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Text>Click me to redirect</Text>
      </TouchableOpacity>
    </View>
  );
}
