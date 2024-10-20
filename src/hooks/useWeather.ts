import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getCachedCity, cacheCity } from './weatherCache';
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

const useWeather = (city?: string, latitude?: number, longitude?: number) => {
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

  useEffect(() => {
    if (city) {
      getWeatherByCityName(city);
    } else {
      getWeatherByCurrentLocation();
    }
  }, [city]);

  const getWeatherByCityName = async (cityName: string) => {
    let cachedCity = await getCachedCity();
    if (!cachedCity || cachedCity !== cityName) {
      cacheCity(cityName);
    }
    
    try {
      const results = await getWeatherByCity(cityName);
      if (results.cod === 200) {
        setInfo({
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
        });
      } else {
        Alert.alert('Error', 'Could not fetch weather data.');
      }
    } catch (err) {
      Alert.alert('Error', (err as Error).message || 'An unexpected error occurred');
    }
  };

  const getWeatherByCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        Alert.alert('Error', 'Error getting location: ' + error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    try {
      const results = await getWeatherByCoordinates(lat, lon);
      if (results.cod === 200) {
        setInfo({
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
        });
      } else {
        Alert.alert('Error', 'Could not fetch weather data.');
      }
    } catch (err) {
      Alert.alert('Error', (err as Error).message || 'An unexpected error occurred');
    }
  };

  return { info };
};

export default useWeather;
