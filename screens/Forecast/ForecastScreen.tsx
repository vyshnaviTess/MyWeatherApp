// screens/Forecast/ForecastScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Card, Title } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import styles from './ForecastScreen.style';
import Header from '../../components/Header';
import { WEATHER_API_KEY } from '../../Utils/constants';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Utils/RootStackParamList';

type ForecastScreenRouteProp = RouteProp<RootStackParamList, 'Forecast'>;
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

const ForecastScreen: React.FC<{ route: ForecastScreenRouteProp }> = ({ route }) => {
  const { city } = route.params;
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);
  useEffect(() => {
    fetchForecast(city); // Fetch forecast based on the city
  }, [city]);

  const fetchForecast = (city: string) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        setForecast(data.list.filter((_: any, index: number) => index % 8 === 0)); // Filter data to show daily forecast (every 24 hours)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  // const getCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       fetchForecast(latitude, longitude);
  //     },
  //     (error) => {
  //       setError(error.message);
  //       setLoading(false);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // };

  // const fetchForecast = (lat: number, lon: number) => {
  //   fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setForecast(data.list.filter((_: any, index: number) => index % 8 === 0)); // Filter data to show daily forecast (every 24 hours)
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00aaff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header name="5-Day Forecast" />
      <FlatList
        data={forecast}
        keyExtractor={(item) => item.dt_txt}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Title style={styles.date}>{new Date(item.dt_txt).toLocaleDateString()}</Title>
            <Text style={styles.temp}>Temperature: {item.main.temp} °C</Text>
            <Text style={styles.desc}>Weather: {item.weather[0].description}</Text>
            <Text style={styles.humidity}>Humidity: {item.main.humidity} %</Text>
          </Card>
        )}
      />
    </View>
  );
};

export default ForecastScreen;
