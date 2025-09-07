import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mt-4">
        <Pressable className="p-3 rounded-full bg-gray-100 justify-center items-center">
          <Ionicons name="person-outline" size={22} color="black" />
        </Pressable>
        <View className="flex-row space-x-4">
          <Pressable className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center">
            <Ionicons name="notifications-outline" size={22} color="black" />
          </Pressable>
          <Pressable className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center">
            <Ionicons name="sunny-outline" size={22} color="black" />
          </Pressable>
        </View>
      </View>

      {/* Greeting */}
      <View className=" mt-6">
        <Text className="text-2xl font-extrabold text-gray-900">
          Welcome to AgriMitra
        </Text>
        <Text className="text-2xl font-extrabold text-green-800">
          Buy & Sell Fresh Farm Produce
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="mt-3">
        {/* Featured Plant Card */}
      <View className="mt-6">
        <View className="bg-green-100 rounded-3xl overflow-hidden">
          <Image
            source={require("../../assets/images/leaves.jpg")}
            className="w-full h-40"
            resizeMode="cover"
            style={{ width: '100%', height: 160 }}
          />
          <View className="absolute right-4 top-4 bg-white rounded-2xl px-4 py-3 shadow-md">
            <Text className="font-bold text-green-800">Succulent</Text>
            <Text className="text-gray-500 text-xs">12 days ago planted</Text>
            <Text className="mt-2 text-sm">🌡 Room temp: 24°C</Text>
            <Text className="text-sm">💡 Room light: 76%</Text>
          </View>
        </View>
      </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5">
          {["Crops", "Fruits", "Vegetables", "Dairy", "Seeds"].map((cat, i) => (
            <TouchableOpacity key={i} className="bg-gray-100 px-4 py-2 rounded-full mr-2">
              <Text>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View className="flex-row flex-wrap justify-between mt-5">
          {[1, 2, 3, 4].map((item, i) => (
            <View key={i} className="w-[48%] bg-gray-100 rounded-2xl p-3 mb-4">
              <Image
                source={{ uri: "https://via.placeholder.com/100" }}
                className="w-full h-24 rounded-lg"
              />
              <Text className="font-semibold mt-2">Organic Tomato</Text>
              <Text className="text-green-600">₹30/kg</Text>
              <Text className="text-gray-400 text-sm">Farmer Rahul</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
