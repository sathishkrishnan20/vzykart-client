import './GestureHandler';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home, Details} from '../screens';
import {Text, View, Platform} from 'react-native';

export type StackParams = {
  Home: undefined;
  Details: {data: string} | undefined;
};

const DetailsScreen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>DetailsScreen</Text>
  </View>
);
function getHeaderTitle(route: any) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : 'Home';
  return routeName;
}
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {backgroundColor: '#F02245'},
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        options={({route}) => ({
          title: getHeaderTitle(route),
        })}
        name="Tabs"
        component={TabNavigator}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name === 'Home') {
            iconName = focused ? 'home-circle-outline' : 'home-circle';
          } else if (route.name === 'Details') {
            iconName = focused ? 'text-search' : 'text-search';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'account-circle-outline' : 'account-circle';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Cart" component={Details} />
      <Tab.Screen name="Account" component={Details} />
    </Tab.Navigator>
  );
};
export function Routes() {
  return Platform.OS === 'web' ? (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Details" component={Details} />
    </Router>
  ) : (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
