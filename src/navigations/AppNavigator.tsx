import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import Search from '../screens/Search/Search';
import ForecastScreen from '../screens/Forecast/ForecastScreen';
import { RootStackParamList, RootTabParamList } from '../Utils/RootStackParamList';


// Create Stack and Tab navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// Tab Navigator for Home and Search
const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} initialParams={{ latitude: undefined, longitude: undefined }} />
      <Tab.Screen name="Search" component={Search} options={{ title: 'Search' }} />
    </Tab.Navigator>
  );
};

// Stack Navigator
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tab Navigator */}
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

export default AppNavigator;
