import React from 'react';
import { Button, Card, Title, Text } from 'react-native-paper';
import { View, Image, ScrollView, Alert } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import styles from './HomeScreen.style';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, RootTabParamList } from '../../Utils/RootStackParamList';

import Header from '../../components/Header';
import useWeather from '../../hooks/useWeather';

// Define the type for the route params
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeTabs'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: RouteProp<RootTabParamList, 'HomeScreen'>; // Correctly specify the route type
}

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { city, latitude, longitude } = route.params; // Optionally use city from route params
  const { info } = useWeather(city, latitude, longitude);
  
  return (
    <View style={styles.view}>
      <ScrollView>
        {/* <Header name="Weather App" /> */}
        <View style={styles.placeView}>
          <Title style={styles.title}>{info.name}</Title>
          <Image
            style={styles.image}
            source={{
              uri: "https://openweathermap.org/img/w/" + info.icon + ".png",
            }}
          />
          <Title style={styles.tempInfo}>{Math.round(Number(info.temp))}°C</Title>
          <Title style={styles.desc}>{info.desc}</Title>
          <Text>feels like: {Math.round(Number(info.feels_like))}°C</Text>
        </View>

        <Card elevation={3} style={styles.card}>
          <Title style={styles.infoTitle}>min: {Math.round(Number(info.temp_min))}°C max: {Math.round(Number(info.temp_max))}°C</Title>
        </Card>
        <Card elevation={3} style={styles.card}> 
          <Title style={styles.infoTitle}>Humidity: {info.humidity}%</Title>
        </Card>
        <Card elevation={3} style={styles.card}>
          <Title style={styles.infoTitle}>Description: {info.desc}</Title>
        </Card>
        <Card elevation={3} style={styles.card}>
          <Title style={styles.infoTitle}>Pressure: {info.pressure} hPa</Title>
        </Card>
        <Card elevation={4} style={styles.card}>
          <Title style={styles.infoTitle}>Wind Speed: {info.wind} m/s</Title>
        </Card>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Forecast', { city: info.name })} // Pass the city parameter to Forecast
        >
          View 5-Day Forecast
        </Button>
      </ScrollView>
      </View>
  );
};

export default HomeScreen;
