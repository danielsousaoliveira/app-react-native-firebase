import { MenuOption } from "react-native-popup-menu";
import { View, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const MenuItemCustom = ({ text, action, value, icon }) => {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View className="px-4 py-1 flex-row justify-between items-center">
                <Text>{text}</Text>
                <Text>{icon}</Text>
            </View>
        </MenuOption>
    );
};

export const DividerCustom = () => {
    return <View className="w-full p-[1px] bg-gray-300" />;
};
