import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CategoryScreen from 'screens/category/CategoryScreen';
import DetailScreen from 'screens/detail/DetailScreen';
import GameScreen from 'screens/game/GameScreen';
import ListScreen from 'screens/list/ListScreen';

interface Props {}
const Stack = createNativeStackNavigator();

const CategoryStack = (props: Props) => {
  return (
    <Stack.Navigator initialRouteName="CategoriesList">
      <Stack.Screen
        name="CategoriesList"
        options={{ headerShown: false }}
        component={CategoryScreen}
      />
      <Stack.Screen
        name="ListItem"
        options={{ headerShown: false }}
        component={ListScreen}
      />
      <Stack.Screen
        name="DetailScreen"
        options={{ headerShown: false }}
        component={DetailScreen}
      />
      <Stack.Screen
        name="Game"
        options={{ headerShown: false }}
        component={GameScreen}
      />
    </Stack.Navigator>
  );
};

export default CategoryStack;
