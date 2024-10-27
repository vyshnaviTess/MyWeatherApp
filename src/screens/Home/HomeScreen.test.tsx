import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import useWeather from '../../hooks/useWeather';

// Mock useWeather hook
jest.mock('../../hooks/useWeather', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock weather data
const mockWeatherData = {
  name: 'London',
  icon: '04d',
  temp: '15',
  feels_like: '13',
  desc: 'Cloudy',
  temp_min: '10',
  temp_max: '20',
  humidity: '80',
  pressure: '1012',
  wind: '5',
};

// Mock navigation
const mockNavigation = {navigate: jest.fn()} as any;

describe('<HomeScreen />', () => {
  beforeEach(() => {
    (useWeather as jest.Mock).mockReturnValue({info: mockWeatherData});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays weather information correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen
          route={{
            key: 'key',
            name: 'HomeScreen',
            params: {city: 'London', latitude: 51.5074, longitude: -0.1278},
          }}
          navigation={mockNavigation}
        />
      </NavigationContainer>,
    );

    expect(getByText('London')).toBeTruthy();
    expect(getByText('Cloudy')).toBeTruthy();
    expect(getByText('15°C')).toBeTruthy();
    expect(getByText('feels like: 13°C')).toBeTruthy();
    expect(getByText('min: 10°C max: 20°C')).toBeTruthy();
    expect(getByText('Humidity: 80%')).toBeTruthy();
    expect(getByText('Pressure: 1012 hPa')).toBeTruthy();
    expect(getByText('Wind Speed: 5 m/s')).toBeTruthy();
  });

  it('navigates to Forecast screen on button press', async () => {
    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen
          route={{
            key: 'key',
            name: 'HomeScreen',
            params: {city: 'London', latitude: 51.5074, longitude: -0.1278},
          }}
          navigation={mockNavigation}
        />
      </NavigationContainer>,
    );

    fireEvent.press(getByText('View 5-Day Forecast'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Forecast', {
        city: 'London',
      });
    });
  });
});
