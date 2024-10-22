import { useState } from 'react';
import { fetchCities } from '../api/cityService';


interface City {
  id: string;
  place_name: string;
  latitude: number;
  longitude: number;
}

export const useCitySearch = () => {
  const [city, setCity] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchCity = async (cityName: string) => {
    setCity(cityName);
    try {
      const cityResults = await fetchCities(cityName);
      setCities(cityResults);
    } catch (err) {
      setError('Error fetching cities');
    }
  };

  return { city, setCity, cities, searchCity, error };
};
