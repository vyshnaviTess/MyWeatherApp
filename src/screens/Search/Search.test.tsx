import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useCitySearch} from '../../hooks/useCitySearch';
import Search from './Search';

jest.mock('../../hooks/useCitySearch');
jest.mock('../../hooks/weatherCache', () => ({
  saveCity: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  addListener: jest.fn(),
  canGoBack: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
};

const mockRoute = {};

const mockUseCitySearch = useCitySearch as jest.MockedFunction<
  typeof useCitySearch
>;

describe.skip('Search Component', () => {
  beforeEach(() => {
    mockUseCitySearch.mockReturnValue({
      city: '',
      setCity: jest.fn(),
      cities: [
        {
          id: '1',
          place_name: 'New York',
          latitude: 40.7128,
          longitude: -74.006,
        },
        {
          id: '2',
          place_name: 'Los Angeles',
          latitude: 34.0522,
          longitude: -118.2437,
        },
      ],
      searchCity: jest.fn(),
      error: null,
    });
  });

  const setup = () => {
    return render(
      <SafeAreaProvider>
        <NavigationContainer>
          <Search navigation={mockNavigation as any} route={mockRoute as any} />
        </NavigationContainer>
      </SafeAreaProvider>,
    );
  };

  it('renders correctly with initial state', async () => {
    const {getByTestId} = setup();

    // Use waitFor to wait for the input to appear
    await waitFor(() => {
      const inputElement = getByTestId('cityNameInput');
      expect(inputElement).toBeTruthy();
    });
  });

  it('calls searchCity when text is entered', async () => {
    const {getByTestId} = setup();

    const input = await waitFor(() => getByTestId('cityNameInput'));
    fireEvent.changeText(input, 'San Francisco');

    // Ensure searchCity was called
    await waitFor(() => {
      expect(mockUseCitySearch().searchCity).toHaveBeenCalledWith(
        'San Francisco',
      );
    });
  });

  it('navigates to HomeScreen when save button is pressed', async () => {
    // Set up mock return value to indicate city is selected for saving
    mockUseCitySearch.mockReturnValueOnce({
      city: 'New York',
      setCity: jest.fn(),
      cities: [
        {
          id: '1',
          place_name: 'New York',
          latitude: 40.7128,
          longitude: -74.006,
        },
      ],
      searchCity: jest.fn(),
      error: null,
    });

    const {getByTestId} = setup();
    const saveButton = await waitFor(() => getByTestId('saveButton'));
    fireEvent.press(saveButton);

    // Wait for navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('HomeScreen', {
        city: 'New York',
        latitude: 40.7128,
        longitude: -74.006,
      });
    });
  });

  it('navigates to HomeScreen when a city is tapped', async () => {
    const {getByTestId} = setup();

    const cityItem = await waitFor(() => getByTestId('cityItem-New York'));
    fireEvent.press(cityItem);

    // Wait for navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('HomeScreen', {
        city: 'New York',
        latitude: 40.7128,
        longitude: -74.006,
      });
    });
  });

  it('displays error message if searchCity fails', async () => {
    mockUseCitySearch.mockReturnValueOnce({
      city: '',
      setCity: jest.fn(),
      cities: [],
      searchCity: jest.fn(),
      error: 'Error fetching cities',
    });

    const {getByText} = setup();

    await waitFor(() => {
      expect(getByText('Error fetching cities')).toBeTruthy();
    });
  });
});
