import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AppNavigator from './AppNavigator';
import MockScreen from '../../__mocks__/MockScreen';

jest.mock('../screens/Home/HomeScreen', () => () => (
  <MockScreen name="Home Screen" />
));
jest.mock('../screens/Search/Search', () => () => (
  <MockScreen name="Search Screen" />
));
jest.mock('../screens/Forecast/ForecastScreen', () => () => (
  <MockScreen name="Forecast Screen" />
));

describe('AppNavigator', () => {
  it('renders HomeScreen and Search tabs in the Tab Navigator', async () => {
    const {findByText, getByText} = render(<AppNavigator />);

    expect(await findByText('Home Screen')).toBeTruthy();
    fireEvent.press(getByText('Search'));

    waitFor(async () => {
      expect(await findByText('Search Screen')).toBeTruthy();
    });
  });

  it('navigates between Home and Search tabs', async () => {
    const {findByText, getByText} = render(<AppNavigator />);
    expect(await findByText('Home Screen')).toBeTruthy();

    // Navigate to Search tab
    fireEvent.press(getByText('Search'));
    expect(await findByText('Search Screen')).toBeTruthy();

    // Navigate back to Home tab
    fireEvent.press(getByText('Home'));
    waitFor(async () => {
      expect(await findByText('Home Screen')).toBeTruthy();
    });
  });
});
