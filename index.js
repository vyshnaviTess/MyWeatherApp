// index.js or index.tsx

import 'react-native-gesture-handler'; // Important for navigation to work correctly
import {AppRegistry} from 'react-native';
import App from './App'; // Adjust the path if necessary
import {name as appName} from './app.json'; // Import the app name from app.json

AppRegistry.registerComponent(appName, () => App);
