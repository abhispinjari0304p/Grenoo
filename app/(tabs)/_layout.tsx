import { Colors } from '@/assets/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false, tabBarActiveTintColor: Colors.PRIMARY,
            tabBarInactiveBackgroundColor: Colors.dark.text,
            tabBarStyle: {
                backgroundColor: '#fff',
                paddingBottom: 14,
                height: 75
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold'
            }
        }}>
            <Tabs.Screen name='home' options={{
                title: "Home",
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home" size={24} color={color} />
                )
            }} />
            <Tabs.Screen name='categories' options={{
                title: "Categories",
                tabBarIcon: ({ color }) => (
                    <Ionicons name="grid" size={24} color={color} />
                )
            }} />
            <Tabs.Screen name='cart' options={{
                title: "Cart",
                tabBarIcon: ({ color }) => (
                    <Ionicons name="cart" size={24} color={color} />
                )
            }} />
            <Tabs.Screen name='profile' options={{
                title: "Profile",
                tabBarIcon: ({ color }) => (
                    <Ionicons name="person" size={24} color={color} />
                )
            }} />
        </Tabs>
    )
}

export default TabLayout;