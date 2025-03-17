// src/components/Loading.tsx
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingProps {
  message?: string;
}

const LoadingAnimation: React.FC<LoadingProps> = ({ message = 'Buscando en la galaxia...' }) => {
  return (
    <View className="flex-1 justify-center items-center gap-4">
      <ActivityIndicator color="#FFE81F" size={'large'}/>   
      <Text className="text-yellow-400 text-lg font-bold text-center max-w-[70%]">
        {message}
      </Text>
    </View>
  );
};

export default LoadingAnimation;