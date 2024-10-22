import { ACCESS_TOKEN } from '../Utils/constants';

interface City {
  id: string;
  place_name: string;
  latitude: number;
  longitude: number;
}

export const fetchCities = async (cityName: string): Promise<City[]> => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${ACCESS_TOKEN}`
  );

  const data = await response.json();
  return data.features.slice(0, 10).map((feature: any) => ({
    id: feature.id,
    place_name: feature.place_name,
    latitude: feature.geometry.coordinates[1], // Latitude
    longitude: feature.geometry.coordinates[0], // Longitude
  }));
};
