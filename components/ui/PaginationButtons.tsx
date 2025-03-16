// src/components/PaginationButtons.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface PaginationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  prevPage: boolean;
  nextPage: boolean;
  currentPage: number;
  totalPages: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  onPrev,
  onNext,
  prevPage,
  nextPage,
  currentPage,
  totalPages,
}) => {
  return (
    <View className="flex-row justify-between items-center mt-4">
      <TouchableOpacity 
        onPress={onPrev} 
        disabled={!prevPage}
        className={`${prevPage ? 'bg-yellow-500' : 'bg-gray-700'} rounded-lg py-3 px-4`}
      >
        <Text className={`${prevPage ? 'text-black' : 'text-gray-500'} font-bold`}>
          Anterior
        </Text>
      </TouchableOpacity>
      
      <View className="flex items-center">
        <Text className="text-yellow-400 font-bold">
          Página {currentPage} de {totalPages}
        </Text>
      </View>

      <TouchableOpacity 
        onPress={onNext} 
        disabled={!nextPage}
        className={`${nextPage ? 'bg-yellow-500' : 'bg-gray-700'} rounded-lg py-3 px-4`}
      >
        <Text className={`${nextPage ? 'text-black' : 'text-gray-500'} font-bold`}>
          Siguiente
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaginationButtons;