import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home/HomeScreen';
import Search from './screens/Search/Search';


import { RootStackParamList, RootTabParamList } from './Utils/RootStackParamList';
import ForecastScreen from './screens/Forecast/ForecastScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();//

// Tab Navigator
const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} initialParams={{ latitude: undefined, longitude: undefined  }}/>
      <Tab.Screen name="Search" component={Search} options={{ title: 'Search' }} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  // Clear AsyncStorage on App start
  useEffect(() => {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };

    clearAsyncStorage();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tab Navigator (Home and Search) */}
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        {/* Forecast Screen */}
        <Stack.Screen
          name="Forecast"
          component={ForecastScreen}
          options={{ title: '5-Day Forecast' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
