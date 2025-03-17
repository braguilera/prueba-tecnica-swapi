import { useColorScheme } from 'nativewind';
import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No hay datos disponibles en la galaxia...',
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1 justify-center items-center gap-4 p-4">
      {/* Ícono temático de Star Wars */}
      <FontAwesome5
        name="empire"
        size={64}
        color={isDark ? '#FFE81F' : '#3498db'}
      />
      <Text
        className={`${
          isDark ? 'text-yellow-400' : 'text-blue-400'
        } text-lg font-bold text-center max-w-[80%]`}
      >
        {message}
      </Text>
    </View>
  );
};

export default EmptyState;