// ForecastScreen.test.tsx

import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import ForecastScreen from './ForecastScreen';
import {NavigationContainer} from '@react-navigation/native';
import {useForecast} from '../../hooks/useForecast';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Utils/RootStackParamList';

// Mock useForecast hook
jest.mock('../../hooks/useForecast', () => ({
  __esModule: true,
  useForecast: jest.fn(),
}));

type ForecastScreenRouteProp = RouteProp<RootStackParamList, 'Forecast'>;

const mockRoute: {route: ForecastScreenRouteProp} = {
  route: {key: 'Forecast', name: 'Forecast', params: {city: 'London'}},
};

describe('<ForecastScreen />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading indicator when data is loading', () => {
    (useForecast as jest.Mock).mockReturnValue({
      forecast: [],
      loading: true,
      error: null,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <ForecastScreen {...mockRoute} />
      </NavigationContainer>,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays an error message when there is an error', () => {
    (useForecast as jest.Mock).mockReturnValue({
      forecast: [],
      loading: false,
      error: 'Failed to fetch data',
    });

    const {getByText} = render(
      <NavigationContainer>
        <ForecastScreen {...mockRoute} />
      </NavigationContainer>,
    );

    expect(getByText('Failed to fetch data')).toBeTruthy();
  });

  it('renders forecast data correctly', async () => {
    const mockForecastData = [
      {
        dt_txt: '2023-10-27 12:00:00',
        main: {temp: 15, humidity: 80},
        weather: [{description: 'Cloudy', icon: '04d'}],
      },
      {
        dt_txt: '2023-10-28 12:00:00',
        main: {temp: 17, humidity: 70},
        weather: [{description: 'Sunny', icon: '01d'}],
      },
    ];

    (useForecast as jest.Mock).mockReturnValue({
      forecast: mockForecastData,
      loading: false,
      error: null,
    });

    const {getByText} = render(
      <NavigationContainer>
        <ForecastScreen {...mockRoute} />
      </NavigationContainer>,
    );

    // Wait for the list to render
    await waitFor(() => {
      // Verify forecast data for each item
      expect(getByText('Temperature: 15°C')).toBeTruthy();
      expect(getByText('Weather: Cloudy')).toBeTruthy();
      expect(getByText('Humidity: 80%')).toBeTruthy();

      expect(getByText('Temperature: 17°C')).toBeTruthy();
      expect(getByText('Weather: Sunny')).toBeTruthy();
      expect(getByText('Humidity: 70%')).toBeTruthy();
    });
  });
});
