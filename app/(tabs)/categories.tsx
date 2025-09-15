import { db } from "@/config/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  productCount: number;
}

interface Product {
  id: string;
  name: string;
  price: string;
  farmer: string;
  image: string;
  category: string;
}

const Categories = () => {
  const [categories] = useState<Category[]>([
    { id: '1', name: 'Crops', icon: '🌾', color: '#8BC34A', productCount: 12 },
    { id: '2', name: 'Fruits', icon: '🍎', color: '#FF9800', productCount: 8 },
    { id: '3', name: 'Vegetables', icon: '🥕', color: '#4CAF50', productCount: 15 },
    { id: '4', name: 'Dairy', icon: '🥛', color: '#2196F3', productCount: 6 },
    { id: '5', name: 'Seeds', icon: '🌱', color: '#795548', productCount: 10 },
    { id: '6', name: 'Herbs', icon: '🌿', color: '#009688', productCount: 7 },
  ]);

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts: Product[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedProducts.push({
          id: doc.id,
          name: data.name,
          price: data.price,
          farmer: data.farmer,
          image: data.image,
          category: data.category || 'crops'
        });
      });
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

  const CategoryCard = ({ item }: { item: Category }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.name.toLowerCase())}
      className={`mr-4 p-4 rounded-2xl items-center min-w-[100px] ${
        selectedCategory === item.name.toLowerCase() ? 'bg-[#2D5128]' : 'bg-white'
      } shadow-sm`}
    >
      <Text style={{ fontSize: 30 }}>{item.icon}</Text>
      <Text className={`font-semibold mt-2 ${
        selectedCategory === item.name.toLowerCase() ? 'text-white' : 'text-[#2D5128]'
      }`}>
        {item.name}
      </Text>
      <Text className={`text-xs mt-1 ${
        selectedCategory === item.name.toLowerCase() ? 'text-[#E4EB9C]' : 'text-gray-500'
      }`}>
        {item.productCount} items
      </Text>
    </TouchableOpacity>
  );

  const ProductCard = ({ item }: { item: Product }) => (
    <View className="w-[48%] bg-white rounded-2xl p-3 mb-4 shadow-sm">
      <Image
        source={{ uri: item.image }}
        className="w-full h-24 rounded-lg"
        resizeMode="cover"
      />
      <Text className="font-semibold mt-2 text-[#2D5128]">{item.name}</Text>
      <Text className="text-green-600 font-bold">{item.price}</Text>
      <Text className="text-gray-400 text-sm">{item.farmer}</Text>
      <TouchableOpacity className="mt-2 bg-[#E4EB9C] p-2 rounded-lg items-center">
        <Text className="text-[#2D5128] font-semibold">Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      {/* Header */}
      <View className="bg-[#2D5128] px-6 py-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-extrabold text-[#E4EB9C]">
              Categories
            </Text>
            <Text className="text-[#8DA750]">
              Browse by product type
            </Text>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-[#E4EB9C] justify-center items-center">
            <Ionicons name="search" size={20} color="#2D5128" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View className="py-4">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <TouchableOpacity
            onPress={() => setSelectedCategory('all')}
            className={`mr-4 p-4 rounded-2xl items-center min-w-[100px] ${
              selectedCategory === 'all' ? 'bg-[#2D5128]' : 'bg-white'
            } shadow-sm`}
          >
            <Text style={{ fontSize: 30 }}>🌟</Text>
            <Text className={`font-semibold mt-2 ${
              selectedCategory === 'all' ? 'text-white' : 'text-[#2D5128]'
            }`}>
              All
            </Text>
            <Text className={`text-xs mt-1 ${
              selectedCategory === 'all' ? 'text-[#E4EB9C]' : 'text-gray-500'
            }`}>
              {products.length} items
            </Text>
          </TouchableOpacity>
          
          <FlatList
            data={categories}
            renderItem={CategoryCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </View>

      {/* Products */}
      <View className="flex-1 px-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-[#2D5128]">
            {selectedCategory === 'all' ? 'All Products' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </Text>
          <Text className="text-gray-500">
            {filteredProducts.length} items
          </Text>
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">Loading products...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={ProductCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            onRefresh={fetchProducts}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Categories;