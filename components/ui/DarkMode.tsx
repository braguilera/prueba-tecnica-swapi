import React from "react";
import { Switch, Text, View, Pressable, Image } from "react-native";
import { useColorScheme } from "nativewind";
import { FontAwesome5 } from '@expo/vector-icons';

const DarkMode = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="w-full flex items-center mb-4">
      {/* Título Star Wars */}
      <Text 
        className={`text-xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-gray-800'}`}
        style={{ fontFamily: 'System', letterSpacing: 1 }}
      >
        STAR WARS
      </Text>
      
      {/* Línea separadora */}
      <View className={`w-32 h-1 rounded-full mb-3 ${isDark ? 'bg-yellow-400' : 'bg-blue-500'}`} />
      
      {/* Switch de Modo */}
      <View className="w-full h-14 flex flex-row justify-center items-center">
        <Pressable 
          onPress={() => isDark && toggleColorScheme()}
          className="flex flex-row items-center mr-2"
        >
          <FontAwesome5 
            name="jedi" 
            size={18} 
            color={isDark ? "#94a3b8" : "#3498db"} 
            className="mr-1"
          />
          <Text className={`mr-2 ${isDark ? 'text-gray-500' : 'text-blue-500 font-semibold'}`}>
            Lado Luminoso
          </Text>
        </Pressable>
        
        <Switch 
          value={isDark} 
          onChange={toggleColorScheme}
          trackColor={{ false: "#3498db50", true: "#FFE81F40" }}
          thumbColor={isDark ? "#FFE81F" : "#3498db"}
          ios_backgroundColor="#3498db50"
          className="mx-1"
        />
        
        <Pressable 
          onPress={() => !isDark && toggleColorScheme()}
          className="flex flex-row items-center ml-2"
        >
          <Text className={`ml-2 ${isDark ? 'text-yellow-400 font-semibold' : 'text-gray-500'}`}>
            Lado Oscuro
          </Text>
          <FontAwesome5 
            name="sith" 
            size={16} 
            color={isDark ? "#FFE81F" : "#94a3b8"} 
            className="ml-1"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default DarkMode;