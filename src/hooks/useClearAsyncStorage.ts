import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Custom hook to clear AsyncStorage
export const useClearAsyncStorage = () => {
  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };

    clearStorage();
  }, []);
};
