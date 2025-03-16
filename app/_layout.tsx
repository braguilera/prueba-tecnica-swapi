import { Slot } from "expo-router";
import { Text, View } from "react-native";

export default function Layout() {
    return (
        <View className="flex-1 bg-blue-950 items-center justify-center">
            <Text>Hola</Text>
            <Slot></Slot>
        </View>
    );
}