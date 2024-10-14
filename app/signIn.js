import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, ActivityIndicator } from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import KeyboardViewCustom from "../components/KeyboardViewCustom";
import { useAuth } from "../context/authContext";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Sign In", "Please fill in all fields");
            return;
        }
        setLoading(true);
        let response = await login(emailRef.current, passwordRef.current);

        setLoading(false);
        if (response.success) {
            router.push("/home");
        } else {
            Alert.alert("Sign In", response.message);
        }
    };
    return (
        <KeyboardViewCustom>
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="gap-y-6">
                <View className="items-center">
                    <Image
                        style={{ height: hp(20) }}
                        resizeMode="contain"
                        source={require("../assets/images/gift.png")}
                    />
                </View>
                <View className="gap-y-10">
                    <Text style={{ fontSize: hp(3) }} className="font-bold tracking-wider text-center text-neutral-800">
                        Sign In
                    </Text>
                    <View style={{ height: hp(7) }} className="flex-row items-center px-4 bg-neutral-100">
                        <Octicons name="mail" size={hp(2.5)} color="gray" />
                        <TextInput
                            onChangeText={(value) => (emailRef.current = value)}
                            style={{ fontSize: hp(2) }}
                            className=" px-3 bg-neutral-100"
                            placeholder="Email"
                            placeholderTextColor={"gray"}
                        />
                    </View>
                </View>

                <View style={{ height: hp(7) }} className="flex-row items-center px-4 bg-neutral-100">
                    <Octicons name="lock" size={hp(2.5)} color="gray" />
                    <TextInput
                        onChangeText={(value) => (passwordRef.current = value)}
                        style={{ fontSize: hp(2) }}
                        className=" px-3 bg-neutral-100"
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor={"gray"}
                    />
                </View>
                <Text style={{ fontSize: hp(1.5) }} className="text-right text-neutral-500">
                    Forgot password?
                </Text>

                <View>
                    {loading ? (
                        <ActivityIndicator size="x-large" color="#d397f8" />
                    ) : (
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={{ height: hp(6.5) }}
                            className="bg-purple-400 rounded-xl justify-center items-center"
                        >
                            <Text
                                style={{ fontSize: hp(2.5) }}
                                className="text-white font-bold tracking-wider text-center "
                            >
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View className="flex-row justify-center gap-x-1">
                    <Text style={{ fontSize: hp(1.5) }} className="text-center text-neutral-500">
                        Don't have an account?
                    </Text>
                    <Pressable onPress={() => router.push("signUp")}>
                        <Text style={{ fontSize: hp(1.5) }} className="font-bold text-purple-400 text-center">
                            Sign Up
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardViewCustom>
    );
}
