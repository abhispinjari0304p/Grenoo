import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CartItem {
  id: string;
  name: string;
  price: string;
  farmer: string;
  image: string;
  quantity: number;
  pricePerUnit: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Organic Tomato',
      price: '₹30/kg',
      farmer: 'Farmer Prashant',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
      quantity: 2,
      pricePerUnit: 30
    },
    {
      id: '2',
      name: 'Fresh Onions',
      price: '₹40/kg',
      farmer: 'Farmer Vaibhav',
      image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg',
      quantity: 1,
      pricePerUnit: 40
    },
    {
      id: '3',
      name: 'Pure Milk',
      price: '₹55/litre',
      farmer: 'Farmer Ramesh',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg',
      quantity: 3,
      pricePerUnit: 55
    }
  ]);

  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const name = await AsyncStorage.getItem('userName') || 'User';
      const email = await AsyncStorage.getItem('userEmail') || '';
      setUserInfo({ name, email });
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setCartItems(prevItems => prevItems.filter(item => item.id !== id))
        }
      ]
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.pricePerUnit * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before checkout.');
      return;
    }
    
    Alert.alert(
      'Order Placed!',
      `Thank you ${userInfo.name}! Your order of ₹${getTotalPrice()} has been placed successfully.`,
      [{ text: 'OK' }]
    );
  };

  const CartItemCard = ({ item }: { item: CartItem }) => (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="font-semibold text-[#2D5128] text-lg">{item.name}</Text>
              <Text className="text-gray-500 text-sm">{item.farmer}</Text>
              <Text className="text-green-600 font-bold mt-1">{item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              className="p-1"
            >
              <Ionicons name="trash-outline" size={20} color="#FF5252" />
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-between items-center mt-3">
            <View className="flex-row items-center bg-[#F5F5F5] rounded-lg">
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, -1)}
                className="p-2"
              >
                <Ionicons name="remove" size={16} color="#2D5128" />
              </TouchableOpacity>
              <Text className="px-4 font-semibold text-[#2D5128]">{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, 1)}
                className="p-2"
              >
                <Ionicons name="add" size={16} color="#2D5128" />
              </TouchableOpacity>
            </View>
            <Text className="font-bold text-[#2D5128]">
              ₹{item.pricePerUnit * item.quantity}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      {/* Header */}
      <View className="bg-[#2D5128] px-6 py-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-extrabold text-[#E4EB9C]">
              My Cart
            </Text>
            <Text className="text-[#8DA750]">
              {getTotalItems()} items in cart
            </Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-[#E4EB9C] justify-center items-center">
            <Text className="text-[#2D5128] font-bold">{getTotalItems()}</Text>
          </View>
        </View>
      </View>

      {cartItems.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="cart-outline" size={80} color="#CCCCCC" />
          <Text className="text-xl font-semibold text-gray-500 mt-4 text-center">
            Your cart is empty
          </Text>
          <Text className="text-gray-400 text-center mt-2">
            Add some fresh products to get started
          </Text>
        </View>
      ) : (
        <>
          {/* Cart Items */}
          <View className="flex-1 px-4 pt-4">
            <FlatList
              data={cartItems}
              renderItem={CartItemCard}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* Order Summary */}
          <View className="bg-white p-6 shadow-lg">
            <View className="border-t border-gray-200 pt-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-600">Subtotal ({getTotalItems()} items)</Text>
                <Text className="font-semibold">₹{getTotalPrice()}</Text>
              </View>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-600">Delivery Fee</Text>
                <Text className="font-semibold text-green-600">Free</Text>
              </View>
              <View className="h-[1px] bg-gray-200 my-3" />
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold text-[#2D5128]">Total</Text>
                <Text className="text-xl font-bold text-[#2D5128]">₹{getTotalPrice()}</Text>
              </View>
              
              <TouchableOpacity
                onPress={handleCheckout}
                className="bg-[#2D5128] rounded-xl py-4 items-center"
              >
                <Text className="text-white font-bold text-lg">
                  Place Order - ₹{getTotalPrice()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;