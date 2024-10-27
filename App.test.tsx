// App.test.tsx
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import App from './App';
import AppNavigator from './src/navigations/AppNavigator';
import { useClearAsyncStorage } from './src/hooks/useClearAsyncStorage';

// Mock useClearAsyncStorage and AppNavigator
jest.mock('./src/hooks/useClearAsyncStorage', () => ({
  useClearAsyncStorage: jest.fn(),
}));

jest.mock('./src/navigations/AppNavigator', () => jest.fn(() => <div>AppNavigator</div>));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls useClearAsyncStorage hook on app start', () => {
    render(<App />);
    expect(useClearAsyncStorage).toHaveBeenCalledTimes(1);
  });

  it('renders AppNavigator component', () => {
    (AppNavigator as jest.Mock).mockReturnValue(<Text>AppNavigator</Text>);
    const { getByText } = render(<App />);
    expect(getByText('AppNavigator')).toBeTruthy();
  });
});
