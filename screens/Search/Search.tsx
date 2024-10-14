import React, { useState } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';

import { ACCESS_TOKEN } from '../../Utils/constants';
import Header from '../../components/Header';
import styles from './Search.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../Utils/RootStackParamList';

// Define the type for the RootTabParamList
type RootTabParamList = {
  HomeScreen: { city: string };
  Search: undefined;
};

// Define the type for the screen's navigation props
type SearchProps = BottomTabScreenProps<RootTabParamList, 'Search'>;

// Define the type for each city object in the list
interface City {
  id: string;
  place_name: string;
}

const Search: React.FC<SearchProps> = ({ navigation }) => {
  const [city, setCity] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);

  const fetchCities = (text: string) => {
    setCity(text);
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${ACCESS_TOKEN}`)
      .then((item) => item.json())
      .then((data) => {
        setCities(data.features.slice(0, 10).map((feature: any) => ({
          id: feature.id,
          place_name: feature.place_name,
        })));
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
      });
  };

  const btnClick = async () => {
    try {
      await AsyncStorage.setItem('newCity', city);
      navigation.navigate('HomeScreen', { city: city });
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  const listClick = async (cityName: string) => {
    try {
      setCity(cityName);
      await AsyncStorage.setItem('newCity', cityName);
      navigation.navigate('HomeScreen', { city: cityName });
    } catch (error) {
      console.error('Error saving city:', error);
    }
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
