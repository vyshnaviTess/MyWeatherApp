// 
import React from 'react';
import { useClearAsyncStorage } from './src/hooks/useClearAsyncStorage';
import AppNavigator from './src/navigations/AppNavigator';



const App: React.FC = () => {
  // Clear AsyncStorage on App start
  useClearAsyncStorage();

  return <AppNavigator />;
};

export default App;
