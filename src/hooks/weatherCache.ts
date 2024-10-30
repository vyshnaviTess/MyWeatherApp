import AsyncStorage from '@react-native-async-storage/async-storage';
import { ForecastData } from '../hooks/useForecast';

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
// New function to save weather data to cache
export const saveWeatherData = async (weatherData: object): Promise<void> => {
  try {
    await AsyncStorage.setItem('weatherData', JSON.stringify(weatherData));
  } catch (error) {
    console.error('Error saving weather data to storage', error);
  }
};

// New function to retrieve cached weather data
export const getCachedWeatherData = async (): Promise<object | null> => {
  try {
    const weatherData = await AsyncStorage.getItem('weatherData');
    return weatherData ? JSON.parse(weatherData) : null;
  } catch (error) {
    console.error('Error fetching weather data from AsyncStorage:', error);
    return null;
  }
};

// Save forecast data to cache
export const saveForecastData = async (city: string, forecastData: ForecastData[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(`forecast_${city}`, JSON.stringify(forecastData));
  } catch (error) {
    console.error('Error saving forecast data to storage', error);
  }
};

// Retrieve cached forecast data
export const getCachedForecastData = async (city: string): Promise<ForecastData[] | null> => {
  try {
    const forecastData = await AsyncStorage.getItem(`forecast_${city}`);
    return forecastData ? JSON.parse(forecastData) : null;
  } catch (error) {
    console.error('Error fetching forecast data from AsyncStorage:', error);
    return null;
  }
};