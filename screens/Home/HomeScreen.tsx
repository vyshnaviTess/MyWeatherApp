import React, { useState, useEffect } from 'react';
import { Button, Card, Title } from 'react-native-paper';
import { View, Image, ScrollView } from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './HomeScreen.style';
import { WEATHER_API_KEY } from '../../Utils/constants';
import { RootStackParamList, RootTabParamList } from '../../Utils/RootStackParamList';
import { RouteProp } from '@react-navigation/native';

// Define the type for the route params
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeTabs'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: RouteProp<RootTabParamList, 'HomeScreen'>; // Correctly specify the route type
}
// interface HomeScreenProps {
//   navigation: HomeScreenNavigationProp;
//   route: {
//     params: {
//       city: string;
//     };
//   };
// }

interface WeatherInfo {
  name: string;
  temp: string;
  humidity: string;
  desc: string;
  icon: string;
  pressure: string;
  wind: string;
}

const HomeScreenTwo: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  // console.log("city", route.params.city || "London");
  const { city } = route.params;
  const [info, setInfo] = useState<WeatherInfo>({
    name: "loading !!",
    temp: "loading",
    humidity: "loading",
    desc: "loading",
    icon: "loading",
    pressure: "loading",
    wind: "loading",
  });

  useEffect(() => {
    getWeather();
  }, [city]);

  const getWeather = async () => {
    let newCity = await AsyncStorage.getItem("newCity");
    if (!newCity) {
      newCity = city;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const results = await response.json();

      setInfo({
        name: results.name,
        temp: results.main.temp,
        humidity: results.main.humidity,
        desc: results.weather[0].description,
        icon: results.weather[0].icon,
        pressure: results.main.pressure,
        wind: results.wind.speed,
      });
    } catch (err) {
      const errorMessage = (err as Error).message || "An unexpected error occurred";
      alert(errorMessage);
    }
  };

  return (
    <View style={styles.view}>
      <ScrollView>
        <Header name="Weather App" />
        <View style={styles.placeView}>
          <Title style={styles.title}>{info.name}</Title>
          <Image
            style={styles.image}
            source={{
              uri: "https://openweathermap.org/img/w/" + info.icon + ".png",
            }}
          />
          <Title style={styles.desc}>{info.desc}</Title>
        </View>

        <Card elevation={3} style={styles.card}>
          <Title style={styles.infoTitle}>Temperature: {info.temp}</Title>
        </Card>
        <Card elevation={3} style={styles.card}>
          <Title style={styles.infoTitle}>Humidity: {info.humidity}</Title>
        </Card>
        <Card elevation={3} style={styles.card}>
          <Title style={styles.infoTitle}>Description: {info.desc}</Title>
        </Card>
        <Card elevation={3} style={styles.card}>
          <Title style={styles.infoTitle}>Pressure: {info.pressure}</Title>
        </Card>
        <Card elevation={4} style={styles.card}>
          <Title style={styles.infoTitle}>Wind Speed: {info.wind}</Title>
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

export default HomeScreenTwo;
