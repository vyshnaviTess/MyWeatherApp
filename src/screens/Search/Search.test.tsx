import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Search from './Search';
import {useCitySearch} from '../../hooks/useCitySearch';
import {saveCity} from '../../hooks/weatherCache';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {RootTabParamList} from '../../Utils/RootStackParamList';
import {SafeAreaProvider} from 'react-native-safe-area-context';

jest.mock('../../hooks/useCitySearch');
jest.mock('../../hooks/weatherCache');

type MockNavigation = Partial<
  BottomTabNavigationProp<RootTabParamList, 'Search'>
>;
type MockRoute = Partial<RouteProp<RootTabParamList, 'Search'>>;

describe.skip('Search Screen', () => {
  const mockNavigation: MockNavigation = {navigate: jest.fn()};
  const mockRoute: MockRoute = {}; // mock route object
  const mockSetCity = jest.fn();
  const mockSearchCity = jest.fn();
  beforeEach(() => {
    (useCitySearch as jest.Mock).mockReturnValue({
      city: 'Test City',
      setCity: mockSetCity,
      cities: [
        {id: '1', place_name: 'Test City', latitude: 1.234, longitude: 5.678},
      ],
      searchCity: mockSearchCity,
    });
  });

  it('renders the city list correctly', async () => {
    const {findByTestId, debug} = render(
      <SafeAreaProvider>
        <Search navigation={mockNavigation as any} route={mockRoute as any} />
      </SafeAreaProvider>,
    );

    // debug(); // Inspect the rendered output

    await waitFor(async () => {
      debug();
      const cityItem = await findByTestId('cityItem-Test City');
      expect(cityItem).toBeTruthy();
    });
  });

  it('updates city name on input change', () => {
    const {getByTestId} = render(
      <Search navigation={mockNavigation as any} route={mockRoute as any} />,
    );
    const cityNameInput = getByTestId('cityNameInput');

    fireEvent.changeText(cityNameInput, 'New City');
    expect(mockSearchCity).toHaveBeenCalledWith('New City');
  });

  it('saves city and navigates to HomeScreen when save button is pressed', async () => {
    (saveCity as jest.Mock).mockResolvedValueOnce(undefined); // Explicitly set resolved value

    const {getByTestId} = render(
      <Search navigation={mockNavigation as any} route={mockRoute as any} />,
    );
    const saveButton = getByTestId('saveButton');

    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(saveCity).toHaveBeenCalledWith('Test City');
      expect(mockNavigation.navigate).toHaveBeenCalledWith('HomeScreen', {
        city: 'Test City',
        latitude: 1.234,
        longitude: 5.678,
      });
    });
  });

  it('selects city from the list and navigates to HomeScreen', async () => {
    (saveCity as jest.Mock).mockResolvedValueOnce(undefined); // Explicitly set resolved value

    const {getByTestId} = render(
      <Search navigation={mockNavigation as any} route={mockRoute as any} />,
    );
    const cityItem = getByTestId('cityItem-Test City');

    fireEvent.press(cityItem);

    await waitFor(() => {
      expect(mockSetCity).toHaveBeenCalledWith('Test City');
      expect(saveCity).toHaveBeenCalledWith('Test City');
      expect(mockNavigation.navigate).toHaveBeenCalledWith('HomeScreen', {
        city: 'Test City',
        latitude: 1.234,
        longitude: 5.678,
      });
    });
  });

  it('logs error when city is not found on save', async () => {
    console.error = jest.fn();
    (useCitySearch as jest.Mock).mockReturnValueOnce({
      city: 'Unknown City',
      setCity: mockSetCity,
      cities: [],
      searchCity: mockSearchCity,
    });

    const {getByTestId} = render(
      <Search navigation={mockNavigation as any} route={mockRoute as any} />,
    );
    const saveButton = getByTestId('saveButton');

    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('City not found');
    });
  });
});
