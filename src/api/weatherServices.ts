import { WEATHER_API_KEY } from '../Utils/constants';

export const getWeatherByCoordinates = async (latitude: number, longitude: number) => {
  console.log('WetherInfo',`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
  );
  const results = await response.json();
  return results;
};

export const getWeatherByCity = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
  );
  const results = await response.json();
  return results;
};

export const fetchWeatherForecast = async (city: string, apiKey: string) => {
  console.log('forecast',`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data.');
  }
  const data = await response.json();
  return data.list.filter((_: any, index: number) => index % 8 === 0); // Daily forecast (every 24 hours)
};

