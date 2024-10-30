import React, {useCallback} from 'react';
import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Utils/RootStackParamList';
import {useForecast} from '../../hooks/useForecast';
import styles from './ForecastScreen.style';

// Define the ForecastData type if not imported from useForecast
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

type ForecastScreenRouteProp = RouteProp<RootStackParamList, 'Forecast'>;

const ForecastScreen: React.FC<{route: ForecastScreenRouteProp}> = ({
  route,
}) => {
  const {city} = route.params;
  const {forecast, loading, error} = useForecast(city);

  const renderItem = useCallback(({item}: {item: ForecastData}) => {
    const formattedDate = new Date(item.dt_txt).toLocaleDateString();
    const iconUri = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;

    return (
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Title style={styles.date}>{formattedDate}</Title>
            <Text style={styles.temp}>
              Temperature: {Math.round(item.main.temp)}°C
            </Text>
            <Text style={styles.desc}>
              Weather: {item.weather[0].description}
            </Text>
            <Text style={styles.humidity}>Humidity: {item.main.humidity}%</Text>
          </View>
          <Image style={styles.image} source={{uri: iconUri}} />
        </View>
      </Card>
    );
  }, []);

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

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text>{error}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.weatherByCity}
        data={forecast}
        keyExtractor={item => item.dt_txt}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ForecastScreen;
