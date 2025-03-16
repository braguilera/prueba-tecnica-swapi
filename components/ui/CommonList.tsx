// src/components/CommonList.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import PaginationButtons from "./PaginationButtons";
import { SearchInput } from "./SearchInput";

interface CommonListProps<T> {
  data: T[];
  titleKey: keyof T;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  type: "film" | "person" | "planet";
  searchPlaceholder: string;
  onSearch: (term: string) => void;
  currentSearchTerm: string;
  totalItems: number;
  currentPageUrl: string;
}

const CommonList = <T extends {}>({
  data,
  titleKey,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  type,
  searchPlaceholder,
  onSearch,
  currentSearchTerm,
  totalItems,
  currentPageUrl,
}: CommonListProps<T>) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(item => {
    const value = String(item[titleKey]).toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  const getCurrentPageNumber = (url: string): number => {
    const pageParam = new URL(url).searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : 1;
  };

  const totalPages = Math.ceil(totalItems / 10);
  const currentPage = getCurrentPageNumber(currentPageUrl);

  return (
    <View className="flex-1 bg-black p-4">
      <SearchInput
        value={currentSearchTerm}
        onChange={onSearch} // Ahora actualiza el estado padre
        placeholder={searchPlaceholder}
      />
      
      <FlatList
        data={filteredData}
        keyExtractor={(_, index) => index.toString()}
        className="w-full"
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { data: item, type })}
            className="mb-3"
          >
            <View className="bg-gray-900 border border-yellow-500 rounded-lg p-4 shadow-lg">
              <Text className="text-yellow-400 font-bold text-lg">
                {String(item[titleKey as keyof typeof item])}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      
      <View className="flex-row justify-between mt-4">
        <PaginationButtons
          onPrev={onPrev}
          onNext={onNext}
          prevPage={hasPrev}
          nextPage={hasNext}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </View>
    </View>
  );
};

export default CommonList;