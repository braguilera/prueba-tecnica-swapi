// src/components/CustomButton.tsx
import React from 'react';
import { Pressable, Text, View, PressableProps, Platform } from 'react-native';

interface CustomButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'listItem' | 'icon';
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const getBaseStyles = () => {
    let styles = 'rounded-lg p-4 shadow-lg justify-center items-center ';
    
    switch(variant) {
      case 'primary':
        styles += 'bg-blue-500 dark:bg-yellow-600';
        break;
      case 'secondary':
        styles += 'bg-blue-200 dark:bg-gray-700';
        break;
      case 'listItem':
        styles += 'bg-blue-100 dark:bg-gray-800 border-2 border-blue-300 dark:border-yellow-500';
        break;
      case 'icon':
        styles += 'w-12 h-12 rounded-full bg-blue-100 dark:bg-gray-800/80 border-2 border-blue-300 dark:border-yellow-500';
        break;
    }
    
    if(disabled) styles += ' opacity-75';
    return styles;
  };
  
  const getTextStyles = () => {
    switch(variant) {
      case 'primary':
        return 'text-white dark:text-gray-900 font-bold text-lg h-full w-full rounded-full';
      case 'secondary':
        return 'text-blue-700 dark:text-yellow-400 font-semibold text-lg h-full w-full rounded-full';
      case 'listItem':
        return 'text-blue-700 dark:text-yellow-400 font-bold text-lg';
    }
  };
  
  return (
    <Pressable
      className={`${getBaseStyles()} ${className}`}
      android_ripple={{
        color: variant === 'primary' ? '#60a5fa' : '#4B5563',
        borderless: true,
        radius: 20
      }}
      style={({ pressed }) => [
        Platform.OS === 'ios' && {
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }]
        }
      ]}
      disabled={disabled}
      {...props}
    >
      {children || (
        <Text className={getTextStyles()}>
          {icon}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;