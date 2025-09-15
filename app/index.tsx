import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#2E481E]">
      <StatusBar barStyle="light-content" backgroundColor="#2E481E" />
      <SafeAreaView className="flex-1">
        <LinearGradient
          colors={["#2E481E", "#1B2D12"]}
          style={{ flex: 1 }}
        >
          <ImageBackground
            source={require("../assets/images/tree.png")}
            className="flex-1 flex justify-end h-60 w-full"
            resizeMode="cover"
          >
            <View className="bg-[#2E481E] rounded-t-[50px] rounded-tr-0 py-10 px-10">
              {/* Logo Image */}
              <View className="items-center mb-4">
                <ImageBackground
                  source={require("../assets/images/Grenoo.png")}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </View>
              <Text className="text-white text-3xl font-extrabold text-center mb-2">
                Welcome to <Text style={{ color: "#9acd6c" }}>AgriMitra</Text>
              </Text>
              <Text className="text-[#d0d0d0] text-base text-center mb-6">
                Grow with us — Sign in or create a new account
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/home")}
                className="bg-[#4CAF50] rounded-xl py-4 items-center mb-4"
              >
                <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
                  Continue as Guest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/signin")}
                className="bg-[#4CAF50] rounded-xl py-4 items-center mb-4"
              >
                <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/signup")}
                className="border border-[#4CAF50] rounded-xl py-4 items-center"
              >
                <Text style={{ color: "#4CAF50", fontWeight: "700", fontSize: 18 }}>
                  Create an Account
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}
