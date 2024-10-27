// src/__mocks__/MockScreen.tsx
import React from 'react';
import {View, Text} from 'react-native';

interface MockScreenProps {
  name: string;
}

const MockScreen: React.FC<MockScreenProps> = ({name}) => (
  <View>
    <Text>{name}</Text>
  </View>
);

export default MockScreen;
