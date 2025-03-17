// src/components/Loading.tsx
import { useColorScheme } from 'nativewind';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingProps {
  message?: string;
}

const LoadingAnimation: React.FC<LoadingProps> = ({ message = 'Buscando en la galaxia...' }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1 justify-center items-center gap-4">
      <ActivityIndicator color={isDark ? '#FFE81F' : '#3498db'} size={'large'}/>   
      <Text className={`${isDark ? 'text-yellow-400' : 'text-blue-400' } text-lg font-bold text-center max-w-[70%]`}>
        {message}
      </Text>
    </View>
  );
};

export default LoadingAnimation;