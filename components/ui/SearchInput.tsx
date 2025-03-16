// src/components/SearchInput.tsx
import React from "react";
import { View, TextInput } from "react-native";

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <View className="mb-4 mx-4">
      <TextInput
        className="bg-gray-800 text-yellow-400 p-3 rounded-lg border border-yellow-500"
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};