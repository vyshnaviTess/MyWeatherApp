// Utils/RootStackParamList.ts

export type RootStackParamList = {
  HomeTabs: undefined;  // Tab navigator
  Forecast: { city: string };  // Forecast screen
};

export type RootTabParamList = {
  HomeScreen: { city: string };  // Home screen with city param
  Search: undefined;  // Search screen
};
