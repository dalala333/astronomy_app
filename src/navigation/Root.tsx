import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from 'components/StartScreen';
import React from 'react';
import TabNav from './TabNav';

interface Props {}
const Stack = createNativeStackNavigator();

const Root = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Intro"
    >
      <Stack.Screen name="Intro" component={StartScreen} />
      <Stack.Screen name="Tab" component={TabNav} />
    </Stack.Navigator>
  );
};

export default Root;
