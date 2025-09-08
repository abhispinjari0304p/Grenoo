import { validationSchema } from "@/utils/authSchema";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
    ImageBackground,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";


const Signin = () => {
    const router = useRouter();
    const handleSignin = () => {

    };


    return (
        <SafeAreaView className="flex-1 bg-[#E8F5E9]">
            {/* Background image */}
            <ImageBackground
                source={require("../../assets/images/leaves.jpg")}
                resizeMode="cover"
                className="h-72 w-full"
            >
                <LinearGradient
                    colors={["rgba(0,0,0,0.6)", "transparent"]}
                    className="h-full w-full"
                />
            </ImageBackground>

            {/* Form Container */}
            <View className="flex-1 -mt-20 bg-white rounded-t-[50px] px-10 pt-8 shadow-lg">
                {/* Header */}
                <View className="mb-5 items-center">
                    <ImageBackground
                        source={require("../../assets/images/Grenoo.png")}
                        style={{ width: 100, height: 100 }}
                        resizeMode="contain"
                        className="mb-4"
                    />
                    <Text className="text-4xl font-extrabold text-center text-[#2E481E]">
                        Welcome back{" "}
                    </Text>
                    <Text className="text-gray-500 text-center mt-2 text-base">
                        Let&apos;s get started with new account{" "}
                    </Text>
                </View>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View className="w-full">
                            <Text className="text-[#142C14] text-base mb-1 font-bold">Email</Text>
                            <TextInput
                                keyboardType="email-address"
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                className="h-12 border border-gray-300 rounded-lg px-3 mb-1"
                                value={values.email}
                            />

                            {touched.email && errors.email &&
                                (<Text className="text-red-500 text-xs mb-2">
                                    {errors.email}
                                </Text>
                                )
                            }
                            <Text className="text-[#142C14] text-base mb-1 font-bold">Password</Text>
                            <TextInput
                                onChangeText={handleChange("password")}
                                secureTextEntry
                                onBlur={handleBlur("password")}
                                className="h-12 border border-gray-300 rounded-lg px-3 mb-1"
                                value={values.password}
                            />

                            {touched.password && errors.password &&
                                (<Text className="text-red-500 text-xs">
                                    {errors.password}
                                </Text>
                                )
                            }

                            <TouchableOpacity
                                className="w-full h-14 rounded-full bg-black justify-center items-center shadow-md mt-8"
                                onPress={() => handleSubmit()}
                            >
                                <Text className="text-white font-semibold text-xl">Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <View className="mt-2 flex-row justify-center">
                    <Text className="text-gray-600 text-base">
                        New to Agrimitra?{" "}
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/signup")}
                    >
                        <Text className="text-[#2E481E] font-semibold text-base border-b-2 border-[#2E481E]">
                            Join us now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signin