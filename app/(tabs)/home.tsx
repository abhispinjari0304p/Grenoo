import { db } from "@/config/firebaseConfig";
import { HomeProductType } from "@/constants/homeProduct";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {
  const [products, setProducts] = useState<HomeProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const querySnapshot = await getDocs(collection(db, "homeProducts"));
      const fetchedProducts: HomeProductType[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedProducts.push({
          id: doc.id,
          name: data.name,
          price: data.price,
          farmer: data.farmer,
          image: data.image
        });
      });
      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SkeletonCard = () => (
    <View className="w-[48%] bg-gray-200 rounded-2xl p-3 mb-4 animate-pulse">
      <View className="w-full h-24 bg-gray-300 rounded-lg mb-3" />
      <View className="h-4 bg-gray-300 rounded mb-2" />
      <View className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <View className="h-3 bg-gray-200 rounded w-2/3" />
    </View>
  );

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
              {/* Wheat Emoji - positioned absolutely at left */}
              <View className="absolute left-4 top-4">
                <Text style={{ fontSize: 60 }}>🌾</Text>
              </View>
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
        {/* Product Grid Header */}
        <View className="flex-row justify-between items-center px-4 mt-3 mb-2">
          <View>
            <Text className="text-2xl font-extrabold text-[#2D5128]">
              Market Price
            </Text>
            <Text className="text-sm text-gray-500">
              Fresh & updated daily 🌱
            </Text>
          </View>

          {/* Refresh / Filter Button */}
          <TouchableOpacity
            onPress={fetchProducts}
            className="bg-[#E4EB9C] p-2 rounded-full shadow"
          >
            <Ionicons name="refresh" size={20} color="#2D5128" />
          </TouchableOpacity>
        </View>

        {loading ? (
          // Skeleton Loader instead of ActivityIndicator
          <FlatList
            data={[1, 2, 3, 4, 5, 6]} // dummy placeholders
            keyExtractor={(item) => item.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ padding: 16 }}
            renderItem={() => <SkeletonCard />}
          />
        ) : error ? (
          <View className="flex-1 justify-center items-center px-4">
            <Text className="text-red-500 text-center mb-4">{error}</Text>
            <TouchableOpacity
              onPress={fetchProducts}
              className="bg-[#2D5128] px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ padding: 16 }}
            refreshing={loading}
            onRefresh={fetchProducts}
            renderItem={({ item }) => (
              <View className="w-[48%] bg-gray-100 rounded-2xl p-3 mb-4 shadow-sm">
                <Image
                  source={
                    typeof item.image === "string"
                      ? { uri: item.image }
                      : item.image
                  }
                  className="w-full h-24 rounded-lg"
                  resizeMode="cover"
                  style={{ width: "100%", height: 96 }}
                />
                <Text className="font-semibold mt-2">{item.name}</Text>
                <Text className="text-green-600">{item.price}</Text>
                <Text className="text-gray-400 text-sm">{item.farmer}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
