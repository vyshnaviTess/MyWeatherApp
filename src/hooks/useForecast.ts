// hooks/useForecast.ts
import { useState, useEffect } from 'react';
import { fetchWeatherForecast } from '../api/weatherServices';

import { BASE_URL, WEATHER_API_KEY } from '../Utils/constants';

interface ForecastData {
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
    fetchWeatherForecast(city)
      .then(setForecast)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'An unknown error occurred.')
      )
      .finally(() => setLoading(false));
  }, [city]);

  return { forecast, loading, error };
};
