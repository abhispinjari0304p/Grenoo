import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: true }}>
            <Tabs.Screen name='home' options={{ title: "Home" }} />
            <Tabs.Screen name='categories' options={{ title: "Categories" }} />
            <Tabs.Screen name='cart' options={{ title: "Cart" }} />
            <Tabs.Screen name='profile' options={{ title: "Profile" }} />
        </Tabs>
    )
}

export default TabLayout;