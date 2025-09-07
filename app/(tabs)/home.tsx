import { Homeproducts } from "@/constants/homeProduct";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { FlatList, Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#2D5128" />
      <View className="border-b border-2 border-[#2D5128]/20 bg-[#2D5128]">
        <View className="px-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mt-4">
            <Pressable onPress={() => router.push('/profile')} className=" rounded-full bg-[#E4EB9C] justify-center items-center">
              <Ionicons name="person-circle" size={40} color="#142C14" />
            </Pressable>
            <View className="flex-row space-x-3 gap-1">
              <Pressable className="w-10 h-10 rounded-full bg-[#E4EB9C] justify-center items-center">
                <Ionicons name="notifications-outline" size={22} color="#142C14" />
              </Pressable>
              <Pressable className="w-10 h-10 rounded-full bg-[#E4EB9C] justify-center items-center">
                <Ionicons name="sunny-outline" size={22} color="#142C14" />
              </Pressable>
            </View>
          </View>

          {/* Greeting */}
          <View className="mt-6">
            <Text className="text-2xl font-extrabold text-[#E4EB9C]">
              Welcome to AgriMitra
            </Text>
            <Text className="text-2xl font-extrabold text-[#8DA750]">
              Buy & Sell Fresh Farm Produce
            </Text>
          </View>

          {/* Featured Plant Card */}
          <View className="mt-6">
            <View className="bg-[#E4EB9C] rounded-3xl overflow-hidden">
              <Image
                source={require("../../assets/images/leaves.jpg")}
                className="w-full h-44"
                resizeMode="cover"
                style={{ width: '100%', height: 170 }}
              />
              <View className="absolute right-4 top-4 bg-white rounded-2xl px-3 py-3 shadow-md mb-3">
                <Text className="font-bold text-[#2D5128]">Wheat Seeds</Text>
                <Text className="text-gray-500 text-xs">By Shree Farm Co.</Text>
                <View className="h-[1px] bg-gray-200 my-2" />
                <Text className="text-sm font-semibold text-[#537B2F]">₹120/kg</Text>
                <Text className="text-xs text-gray-500">150kg left</Text>

                <TouchableOpacity className="p-2 rounded-full bg-[#142C14] items-center mt-1">
                  <Ionicons name="cart-outline" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View className="mt-2 px-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5 mb-4">
            {["Crops", "Fruits", "Vegetables", "Dairy", "Seeds"].map((cat, i) => (
              <TouchableOpacity
                key={i}
                className="bg-[#8DA750] px-4 py-2 rounded-full mr-2"
              >
                <Text className="text-[#142C14] font-semibold">{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Product Grid */}
      <View className="flex-1 px-2">
        <FlatList
          data={Homeproducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="w-[48%] bg-gray-100 rounded-2xl p-3 mb-4">
              <Image
                source={item.image}
                className="w-full h-24 rounded-lg"
                resizeMode="cover"
                style={{ width: '100%', height: 96 }}
              />
              <Text className="font-semibold mt-2">{item.name}</Text>
              <Text className="text-green-600">{item.price}</Text>
              <Text className="text-gray-400 text-sm">{item.farmer}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
