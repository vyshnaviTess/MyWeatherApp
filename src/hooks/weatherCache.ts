import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCachedCity = async () => {
  try {
    const city = await AsyncStorage.getItem('newCity');
    return city;
  } catch (error) {
    console.error('Error fetching city from AsyncStorage:', error);
    return null;
  }
};

export const saveCity = async (city: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('newCity', city);
  } catch (error) {
    console.error('Error saving city to storage', error);
  }
};
