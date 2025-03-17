import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import PaginationButtons from "./PaginationButtons";
import { SearchInput } from "./SearchInput";
import CustomButton from "./CustomButton";

interface CommonListProps<T> {
  data: T[];
  titleKey: keyof T;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  type: "film" | "person" | "planet";
  totalItems: number;
  currentPageUrl: string;
}

const CommonList = <T extends {}>({
  data, titleKey, onPrev, onNext, hasPrev, hasNext, type, totalItems, currentPageUrl,}: CommonListProps<T>) => {
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
    <View className="flex-1 bg-blue-50 dark:bg-gray-900 p-4">
      <FlatList
        data={filteredData}
        keyExtractor={(_, index) => index.toString()}
        className="w-full"
        renderItem={({ item }) => (
          <CustomButton
            variant="listItem"
            className="mb-3 active:scale-95 active:opacity-80"
            onPress={() => navigation.navigate("Details", { data: item, type })}
          >
            <Text className="text-blue-700 dark:text-yellow-400 font-bold text-lg">
              {String(item[titleKey as keyof typeof item])}
            </Text>
          </CustomButton>
        )}
      />
      
      {totalItems > 10 &&
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
      }
    </View>
  );
};

export default CommonList;