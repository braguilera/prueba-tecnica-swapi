import { Platform } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

const DarkModeInitializer = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  //Funtion to initialize in light mode if you're on the web
  useEffect(() => {
    if (Platform.OS !== 'web' && colorScheme !== 'dark') {
      toggleColorScheme();
    }
  }, []);

  return null;
};

export default DarkModeInitializer;
