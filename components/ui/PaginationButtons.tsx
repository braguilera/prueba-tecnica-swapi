import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useColorScheme } from 'nativewind';
import CustomButton from './CustomButton';

interface PaginationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  prevPage: boolean;
  nextPage: boolean;
  currentPage: number;
  totalPages: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ onPrev, onNext, prevPage, nextPage, currentPage, totalPages,}) => {
    const { colorScheme } = useColorScheme();
    const isDark:boolean = colorScheme === 'dark';
    
  return (
    <View className="flex-row justify-between items-center mt-4 w-full">
      <CustomButton
        variant="icon"
        onPress={onPrev}
        disabled={!prevPage}
        className="p-2"
      >
        <FontAwesome5 
          name="chevron-left" 
          size={12} 
          color={prevPage ? (isDark ? "#FFE81F" : "#3498db") : "#4B5563"} 
        />
      </CustomButton>
  
      <View className="bg-blue-100 dark:bg-gray-800 rounded-lg px-6 py-2">
        <Text className="text-blue-700 dark:text-yellow-400 font-bold text-lg">
          {currentPage} / {totalPages}
        </Text>
      </View>
  
      <CustomButton
        variant="icon"
        onPress={onNext}
        disabled={!nextPage}
        className="p-2"
      >
        <FontAwesome5 
          name="chevron-right" 
          size={12} 
          color={nextPage ? (isDark ? "#FFE81F" : "#3498db") : "#4B5563"} 
        />
      </CustomButton>
    </View>
  );
};

export default PaginationButtons;