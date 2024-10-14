import { View, Text, Pressable } from "react-native";
import React from "react";
import { NativeWind } from "nativewind";
import { useAuth } from "../../context/authContext";

export default function Home() {
    const { user } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text className="text-3xl text-center">Hi, {user?.email} !</Text>
        </View>
    );
}
