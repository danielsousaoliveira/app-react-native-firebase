import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { NativeWind } from "nativewind";

export default function StartPage() {
    return (
        <View className="flex flex-row justify-center h-screen">
            <ActivityIndicator size="large" color="gray" />
        </View>
    );
}
