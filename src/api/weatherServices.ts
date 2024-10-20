import { WEATHER_API_KEY } from '../Utils/constants';

export const getWeatherByCoordinates = async (latitude: number, longitude: number) => {
  console.log("WetherInfo",`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
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
