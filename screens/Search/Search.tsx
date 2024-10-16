import React, { useState } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';

import { ACCESS_TOKEN } from '../../Utils/constants';
import Header from '../../components/Header';
import styles from './Search.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../Utils/RootStackParamList';


// Define the type for the screen's navigation props
type SearchProps = BottomTabScreenProps<RootTabParamList, 'Search'>;

// Define the type for each city object in the list
interface City {
  id: string;
  place_name: string;
  latitude: number; // Add latitude property
  longitude: number; 
}

const Search: React.FC<SearchProps> = ({ navigation }) => {
  const [city, setCity] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null); 

  const fetchCities = (text: string) => {
    setCity(text);
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${ACCESS_TOKEN}`)
      .then((item) => item.json())
      .then((data) => {
        setCities(data.features.slice(0, 10).map((feature: any) => ({
          id: feature.id,
          place_name: feature.place_name,
          latitude: feature.geometry.coordinates[1], // Latitude
          longitude: feature.geometry.coordinates[0],
        })));
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
      });
  };

    const btnClick = async () => {
      const selectedCity = cities.find(c => c.place_name === city);
      if (!selectedCity) return console.error('City not found');
    
      await AsyncStorage.setItem('newCity', city);
      navigation.navigate('HomeScreen', { 
        city: selectedCity.place_name, 
        latitude: selectedCity.latitude, 
        longitude: selectedCity.longitude 
      });
    };

    const listClick = async (cityName: string) => {
      const selectedCity = cities.find(c => c.place_name === cityName);
      if (!selectedCity) return console.error('City not found');
    
      setCity(cityName);
      await AsyncStorage.setItem('newCity', cityName);
      navigation.navigate('HomeScreen', {
        city: selectedCity.place_name,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      });
    };    

  return (
    <View style={styles.view}>
      <Header name="Search Screen" />
      <TextInput
        label="City Name to search..."
        theme={{ colors: { primary: '#00aaff' } }}
        value={city}
        onChangeText={(text) => fetchCities(text)}
      />
      <Button
        icon="content-save"
        mode="contained"
        theme={{ colors: { primary: '#00aaff' } }}
        style={styles.btn}
        onPress={btnClick}
      >
        <Text style={{ color: 'white' }}>Save Changes</Text>
      </Button>

      <FlatList
        data={cities}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            style={styles.list}
            onPress={() => listClick(item.place_name)}
          >
            <Text>{item && item.place_name}</Text>
          </Card>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Search;
