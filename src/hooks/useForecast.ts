import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { fetchWeatherForecast } from '../api/weatherServices';
import { getCachedForecastData, saveForecastData } from './weatherCache';


export interface ForecastData {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export const useForecast = (city: string) => {
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const forecastData = await fetchWeatherForecast(city);
        setForecast(forecastData);
        await saveForecastData(city, forecastData); // Cache successful fetch
      } catch (err) {
        // If network fetch fails, attempt to load cached data
        const cachedData = await getCachedForecastData(city);
        if (cachedData) {
          setForecast(cachedData);
          setError('Displaying cached forecast data due to network error.');
          Alert.alert('Network Error', 'Displaying cached forecast data due to network error.');
        } else {
          setError('Could not fetch forecast data and no cached data available.');
          Alert.alert('Error', 'Could not fetch data and no cached data available.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  return { forecast, loading, error };
};
