import "expo-router/entry";
import './global.css';
import Navigation from "./Navigation"
import { View } from "react-native";
import DarkModeInitializer from './utils/DarkModeInitializer';

export default function App() {
  return (
    <View className="flex-1 dark">
      <DarkModeInitializer />
      <Navigation />
    </View>
  );
}