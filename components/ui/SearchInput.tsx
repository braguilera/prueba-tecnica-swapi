import { useColorScheme } from "nativewind";
import React from "react";
import { View, TextInput } from "react-native";

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <View className="mb-4 mx-4">
      <TextInput
        className="bg-blue-100 dark:bg-gray-800 text-blue-800 dark:text-yellow-400 p-3 rounded-lg border border-blue-300 dark:border-yellow-500"
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#94a3b8" : "#3b82f6"}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
  
  
};