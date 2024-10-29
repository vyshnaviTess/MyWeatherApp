import axios from 'axios';
import { BASE_URL, WEATHER_API_KEY } from '../Utils/constants';

const fetchWeatherData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Type assertion to handle the unknown type error
    if (axios.isAxiosError(error)) {
      // If the error is an Axios error, you can access error.response
      throw new Error(`Failed to fetch weather data: ${error.response?.data?.message || error.message}`);
    } else {
      // Handle any other types of errors
      throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};

export const getWeatherByCoordinates = async (latitude: number, longitude: number) => {
  const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
  console.log(url);
  const results = await fetchWeatherData(url);
  console.log("results", results);
  return results;
};

export const getWeatherByCity = async (city: string) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
  const results = await fetchWeatherData(url);
  return results;
};

export const fetchWeatherForecast = async (city: string) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
  const data = await fetchWeatherData(url);
  return data.list.filter((_: any, index: number) => index % 8 === 0); // Daily forecast (every 24 hours)
};
