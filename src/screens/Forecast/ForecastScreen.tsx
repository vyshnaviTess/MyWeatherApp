// screens/Forecast/ForecastScreen.tsx

import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Card, Title } from 'react-native-paper';

import styles from './ForecastScreen.style';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Utils/RootStackParamList';
import Header from '../../components/Header';
import { useForecast } from '../../hooks/useForecast';


type ForecastScreenRouteProp = RouteProp<RootStackParamList, 'Forecast'>;

const ForecastScreen: React.FC<{ route: ForecastScreenRouteProp }> = ({ route }) => {
  const { city } = route.params;
  const { forecast, loading, error } = useForecast(city);

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
      {/* <Header name="5-Day Forecast" /> */}
      <FlatList
        data={forecast}
        keyExtractor={(item) => item.dt_txt}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Title style={styles.date}>{new Date(item.dt_txt).toLocaleDateString()}</Title>
            <Text style={styles.temp}>Temperature: {Math.round(Number(item.main.temp))}°C</Text>
            <Text style={styles.desc}>Weather: {item.weather[0].description}</Text>
            <Text style={styles.humidity}>Humidity: {item.main.humidity} %</Text>
          </Card>
        )}
      />
    </View>
  );
};

export default ForecastScreen;
