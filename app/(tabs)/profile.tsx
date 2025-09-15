import { auth } from "@/config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserInfo {
  name: string;
  email: string;
  userId: string;
}

const Profile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    userId: ''
  });

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const name = await AsyncStorage.getItem('userName') || 'User';
      const email = await AsyncStorage.getItem('userEmail') || '';
      const userId = await AsyncStorage.getItem('userId') || '';
      setUserInfo({ name, email, userId });
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              await AsyncStorage.multiRemove(['userName', 'userEmail', 'userId']);
              router.replace('/');
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          }
        }
      ]
    );
  };

  const menuItems = [
    {
      id: '1',
      title: 'My Orders',
      icon: 'receipt-outline',
      color: '#4CAF50',
      onPress: () => Alert.alert('Coming Soon', 'Order history feature will be available soon!')
    },
    {
      id: '2',
      title: 'My Farm',
      icon: 'leaf-outline',
      color: '#8BC34A',
      onPress: () => Alert.alert('Coming Soon', 'Farm management feature will be available soon!')
    },
    {
      id: '3',
      title: 'Sell Products',
      icon: 'storefront-outline',
      color: '#FF9800',
      onPress: () => Alert.alert('Coming Soon', 'Product selling feature will be available soon!')
    },
    {
      id: '4',
      title: 'Payment Methods',
      icon: 'card-outline',
      color: '#2196F3',
      onPress: () => Alert.alert('Coming Soon', 'Payment methods feature will be available soon!')
    },
    {
      id: '5',
      title: 'Notifications',
      icon: 'notifications-outline',
      color: '#9C27B0',
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon!')
    },
    {
      id: '6',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      color: '#607D8B',
      onPress: () => Alert.alert('Help & Support', 'Contact us at support@agrimitra.com or call +91-9876543210')
    },
    {
      id: '7',
      title: 'About AgriMitra',
      icon: 'information-circle-outline',
      color: '#795548',
      onPress: () => Alert.alert('About AgriMitra', 'AgriMitra v1.0.0\nConnecting farmers directly with consumers for fresh, quality produce.')
    }
  ];

  const MenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity
      onPress={item.onPress}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-center"
    >
      <View 
        className="w-12 h-12 rounded-full justify-center items-center mr-4"
        style={{ backgroundColor: `${item.color}20` }}
      >
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-[#2D5128] text-lg">{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      {/* Header */}
      <View className="bg-[#2D5128] px-6 py-6">
        <View className="items-center">
          <View className="w-20 h-20 rounded-full bg-[#E4EB9C] justify-center items-center mb-4">
            <Ionicons name="person" size={40} color="#2D5128" />
          </View>
          <Text className="text-2xl font-extrabold text-[#E4EB9C]">
            {userInfo.name || 'User'}
          </Text>
          <Text className="text-[#8DA750] mt-1">
            {userInfo.email}
          </Text>
          <View className="bg-[#8DA750] px-3 py-1 rounded-full mt-2">
            <Text className="text-white text-sm font-semibold">Premium Member</Text>
          </View>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="px-6 py-4">
        <View className="flex-row justify-between">
          <View className="bg-white rounded-2xl p-4 flex-1 mr-2 shadow-sm items-center">
            <Text className="text-2xl font-bold text-[#4CAF50]">12</Text>
            <Text className="text-gray-600 text-sm">Orders</Text>
          </View>
          <View className="bg-white rounded-2xl p-4 flex-1 mx-1 shadow-sm items-center">
            <Text className="text-2xl font-bold text-[#FF9800]">₹2,450</Text>
            <Text className="text-gray-600 text-sm">Saved</Text>
          </View>
          <View className="bg-white rounded-2xl p-4 flex-1 ml-2 shadow-sm items-center">
            <Text className="text-2xl font-bold text-[#2196F3]">4.8</Text>
            <Text className="text-gray-600 text-sm">Rating</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-50 rounded-2xl p-4 mb-6 shadow-sm flex-row items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={24} color="#FF5252" />
          <Text className="font-semibold text-red-500 text-lg ml-2">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;