import { useColorScheme } from 'nativewind';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

interface StarWarsTextProps {
  text: string;
  duration?: number;
  delay?: number;
}

const StarWarsText: React.FC<StarWarsTextProps> = ({ text, duration = 35000, delay = 0 }) => {
  const rotateX = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;
  const { colorScheme } = useColorScheme();
  const isDark:boolean = colorScheme === 'dark';

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.timing(rotateX, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ]),
      { resetBeforeIteration: true }
    );

    animation.start();
  }, []);

  const rotateInterpolation = rotateX.interpolate({
    inputRange: [0, 1],
    outputRange: ['60deg', '50deg']
  });

  const positionInterpolation = position.interpolate({
    inputRange: [0, 1],
    outputRange: [400, -600]
  });

  return (
    <View className="flex-1 mt-4 justify-center items-center overflow-hidden w-full">
      <Animated.View
        className="absolute"
        style={{
          transform: [
            { perspective: 1000 },
            { rotateX: rotateInterpolation },
            { translateY: positionInterpolation }
          ]
        }}
      >
        <Text className={`text-2xl text-center leading-10 shadow-lg ${isDark ? 'text-white shadow-white' : 'text-blue-500 shadow-blue-400'}`}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );
};

export default StarWarsText;
