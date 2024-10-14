import { View, Text, Platform, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { MenuItemCustom, DividerCustom } from "./MenuItemCustom";

const ios = Platform.OS == "ios";
export default function HomeHeader() {
    const { top } = useSafeAreaInsets();
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        setLoading(true);
        await logout();
        setLoading(false);
    };

    const handleProfile = async () => {};
    return (
        <View
            style={{
                paddingTop: ios ? top + hp(1) : top,
                alignItems: "center",
            }}
            className="flex-row justify-between bg-indigo-200 pb-7 rounded-b-3xl  px-5"
        >
            <View>
                <Text style={{ marginTop: hp(2), fontSize: hp(3) }} className="font-medium text-white">
                    Home
                </Text>
            </View>

            <TouchableOpacity style={styles.style}>
                <Menu>
                    <MenuTrigger>
                        <Octicons name="person" size={hp(2.5)} color="white" />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderRadius: 10,
                                borderCurve: "continuous",
                                marginTop: hp(6),
                                marginLeft: hp(1.5),
                                shadowOpacity: 0.4,
                                shadowOffset: { width: 0, height: 0 },
                                width: wp(40),
                            },
                        }}
                    >
                        <MenuItemCustom
                            text="Profile"
                            action={handleProfile}
                            value={null}
                            icon={<Octicons name="person" size={hp(2.5)} color="gray" />}
                        ></MenuItemCustom>
                        <DividerCustom />
                        <MenuItemCustom
                            text="Logout"
                            action={handleLogout}
                            value={null}
                            icon={<Octicons name="sign-out" size={hp(2.5)} color="gray" />}
                        ></MenuItemCustom>
                    </MenuOptions>
                </Menu>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    style: {
        marginTop: hp(2),
        zIndex: 1,
        borderRadius: 30,
        height: hp(3),
        width: hp(3),
        borderColor: "white",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
});
