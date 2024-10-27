// screens/Forecast/ForecastScreen.tsx

import React from 'react';
import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native';
import {Card, Title} from 'react-native-paper';

import styles from './ForecastScreen.style';

import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Utils/RootStackParamList';
import {useForecast} from '../../hooks/useForecast';

type ForecastScreenRouteProp = RouteProp<RootStackParamList, 'Forecast'>;

const ForecastScreen: React.FC<{route: ForecastScreenRouteProp}> = ({
  route,
}) => {
  const {city} = route.params;
  const {forecast, loading, error} = useForecast(city);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#00aaff"
          testID="loading-indicator"
        />
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
      <FlatList
        style={styles.weatherByCity}
        data={forecast}
        keyExtractor={item => item.dt_txt}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Title style={styles.date}>
                  {new Date(item.dt_txt).toLocaleDateString()}
                </Title>
                <Text style={styles.temp}>
                  Temperature: {Math.round(Number(item.main.temp))}°C
                </Text>
                <Text style={styles.desc}>
                  Weather: {item.weather[0].description}
                </Text>
                <Text style={styles.humidity}>
                  Humidity: {item.main.humidity}%
                </Text>
              </View>
              <Image
                style={styles.image}
                source={{
                  uri:
                    'https://openweathermap.org/img/w/' +
                    item.weather[0].icon +
                    '.png',
                }}
              />
            </View>
          </Card>
        )}
      />
    </View>
  );
};

export default ForecastScreen;
