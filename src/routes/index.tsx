import './GestureHandler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Home, Details} from '../screens';
import {Platform} from 'react-native';

export type StackParams = {
  Home: undefined;
  Details: {data: string} | undefined;
};

const Stack = createStackNavigator<StackParams>();

export function Routes() {
  return Platform.OS === 'web' ? (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Details" component={Details} />
    </Router>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
