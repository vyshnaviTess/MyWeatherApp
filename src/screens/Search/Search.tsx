import React from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import styles from './Search.style';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../Utils/RootStackParamList';

import Header from '../../components/Header';
import { useCitySearch } from '../../hooks/useCitySearch';
import { saveCity } from '../../hooks/weatherCache';


// Define the type for the screen's navigation props
type SearchProps = BottomTabScreenProps<RootTabParamList, 'Search'>;

const Search: React.FC<SearchProps> = ({ navigation }) => {
  const { city, setCity, cities, searchCity } = useCitySearch();

  const handleSave = async () => {
    const selectedCity = cities.find((c) => c.place_name === city);
    if (!selectedCity) {
      console.error('City not found');
      return;
    }

    await saveCity(city);
    navigation.navigate('HomeScreen', {
      city: selectedCity.place_name,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
    });
  };

  const handleCitySelection = async (cityName: string) => {
    const selectedCity = cities.find((c) => c.place_name === cityName);
    if (!selectedCity) {
      console.error('City not found');
      return;
    }

    setCity(cityName);
    await saveCity(cityName);
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
        onChangeText={(text) => searchCity(text)}
      />
      <Button
        icon="content-save"
        mode="contained"
        theme={{ colors: { primary: '#00aaff' } }}
        style={styles.btn}
        onPress={handleSave}
      >
      <Text style={styles.text}>Save Changes</Text>
      </Button>

      <FlatList
        data={cities}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            style={styles.list}
            onPress={() => handleCitySelection(item.place_name)}
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
