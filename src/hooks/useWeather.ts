import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getCachedCity, getCachedWeatherData, saveCity, saveWeatherData } from './weatherCache';
import { getWeatherByCity, getWeatherByCoordinates } from '../api/weatherServices';

interface WeatherInfo {
  name: string;
  temp: string;
  temp_min: string;
  temp_max: string;
  feels_like: string;
  humidity: string;
  desc: string;
  icon: string;
  pressure: string;
  wind: string;
}

const useWeather = (city?: string, _latitude?: number, _longitude?: number) => {
  const [info, setInfo] = useState<WeatherInfo>({
    name: 'Loading...',
    temp: 'Loading...',
    temp_min: 'Loading...',
    temp_max: 'Loading...',
    feels_like: 'Loading...',
    humidity: 'Loading...',
    desc: 'Loading...',
    icon: 'loading',
    pressure: 'Loading...',
    wind: 'Loading...',
  });

  const getWeatherByCityName = async (cityName: string) => {
    try {
      const results = await getWeatherByCity(cityName);
      if (results.cod === 200) {
        const weatherData = {
          name: results.name,
          temp: results.main.temp,
          temp_min: results.main.temp_min,
          temp_max: results.main.temp_max,
          feels_like: results.main.feels_like,
          humidity: results.main.humidity,
          desc: results.weather[0].description,
          icon: results.weather[0].icon,
          pressure: results.main.pressure,
          wind: results.wind.speed,
        };
        setInfo(weatherData);
        saveCity(cityName); // Save the city to cache
        saveWeatherData(weatherData); // Save the fetched data to cache
      } else {
        throw new Error('Could not fetch weather data.');
      }
    } catch (err) {
      console.log("Network error: Displaying cached data.", (err as Error).message);
      const cachedData = await getCachedWeatherData();
      if (cachedData) {
        setInfo(cachedData as WeatherInfo);
        Alert.alert('Warning', 'Displaying cached weather data due to network error.');
      } else {
        Alert.alert('Error', 'Could not fetch data and no cached data available.');
      }
    }
  };

  const fetchWeatherByCoordinates = useCallback(async (lat: number, lon: number) => {
    try {
      const results = await getWeatherByCoordinates(lat, lon);
      if (results.cod === 200) {
        const weatherData = {
          name: results.name,
          temp: results.main.temp,
          temp_min: results.main.temp_min,
          temp_max: results.main.temp_max,
          feels_like: results.main.feels_like,
          humidity: results.main.humidity,
          desc: results.weather[0].description,
          icon: results.weather[0].icon,
          pressure: results.main.pressure,
          wind: results.wind.speed,
        };
        setInfo(weatherData);
        saveWeatherData(weatherData); // Cache the successful fetch data
      } else {
        throw new Error('Could not fetch weather data.');
      }
    } catch (err) {
      console.log("Network error: Displaying cached data.", (err as Error).message);
      const cachedData = await getCachedWeatherData();
      if (cachedData) {
        setInfo(cachedData as WeatherInfo);
        Alert.alert('Warning', 'Displaying cached weather data due to network error.');
      } else {
        Alert.alert('Error', 'Could not fetch data and no cached data available.');
      }
    }
  }, []);

  const getWeatherByCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.log("Error getting location", error.message);
        Alert.alert('Error', 'Error getting location: ' + error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, [fetchWeatherByCoordinates]);

  useEffect(() => {
    if (city) {
      getWeatherByCityName(city);
    } else {
      getWeatherByCurrentLocation();
    }
  }, [city, getWeatherByCurrentLocation]);

  return { info };
};

export default useWeather;
