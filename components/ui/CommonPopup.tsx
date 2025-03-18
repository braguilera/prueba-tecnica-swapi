import React, { useState, useEffect } from 'react';
import { View, Text, Modal, ScrollView } from 'react-native';
import CustomButton from './CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from 'nativewind';
import LoadingAnimation from './LoadingAnimation';
import EmptyState from './EmptyState';

interface CommonPopupProps {
  urls: string[];
  type: 'person' | 'planet' | 'film';
  onClose: () => void;
}

const CommonPopup: React.FC<CommonPopupProps> = ({ urls, type, onClose }) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark: boolean = colorScheme === 'dark';

  useEffect(() => {
    const fetchData = async () => {
      if (!urls.length) {
        setLoading(false);
        return;
      }

      try {
        const fetchPromises = urls.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const item = await response.json();
          return item.name || item.title;
        });

        const results = await Promise.all(fetchPromises);
        setData(results.filter(Boolean));
      } catch (error) {
        console.error("Error fetching related data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urls]);

  const getTitle = ():string => {
    switch(type) {
      case 'film': return 'Personajes que aparecen';
      case 'person': return 'Películas en las que aparece';
      case 'planet': return 'Películas en las que aparece';
      default: return 'Relaciones';
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View className="py-12 flex items-center justify-center">
          <LoadingAnimation/>
        </View>
      );
    }

    if (data.length === 0) {
      return (
        <View className="py-8 flex items-center justify-center">
          <EmptyState/>
        </View>
      );
    }

    return (
      <ScrollView 
        className="max-h-64" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      >
        {data.map((item, index) => (
          <View 
            key={index} 
            className={`py-3 px-2 ${index < data.length - 1 ? 'border-b border-blue-200 dark:border-yellow-500/20' : ''}`}
          >
            <Text className="text-blue-800 dark:text-gray-200 text-base">{item}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View 
        className="flex-1 justify-center items-center bg-black/70 px-4"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <View className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <Text className="text-xl font-bold text-blue-600 dark:text-yellow-400">
              {getTitle()}
            </Text>
            <CustomButton
              variant="icon"
              onPress={onClose}
            >
              <FontAwesome name="close" size={12} color={isDark ? "#FFE81F" : "#3498db"}  />
            </CustomButton>
          </View>
          
          {/* Content */}
          <View className="p-4">
            {renderContent()}
          </View>
          
        </View>
      </View>
    </Modal>
  );
};

export default CommonPopup;