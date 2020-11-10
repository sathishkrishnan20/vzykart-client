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
import {Home, Details, ShopDetails} from '../screens';
import {Text, View, Platform} from 'react-native';
import Cart from '../screens/Cart';
import ProductDetail from '../screens/ProductDetails';
import Header from '../components/Header';
import SellerAddProducts from '../screens/_seller/products/add';
const HEADER_HEIGHT = 70;
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
      <Stack.Screen name="ShopDetails" component={ShopDetails} />
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
          let iconName = 'home-circle-outline';
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
      <Tab.Screen name="product-details" component={SellerAddProducts} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Details} />
    </Tab.Navigator>
  );
};
export function Routes() {
  return Platform.OS === 'web' ? (
    <Router>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          height: HEADER_HEIGHT,
          zIndex: 99,
        }}>
        <Header
          title="V-Cart"
          menus={[
            {
              title: 'Home',
              navigationLink: 'home',
            },
            {
              title: 'Filters',
              navigationLink: 'filter',
            },
            {
              title: 'About',
              navigationLink: 'about',
            },
            {
              title: 'Notifications',
              navigationLink: 'about',
            },
            {
              title: 'Profile',
              navigationLink: 'profile',
            },
          ]}
          notificationCount={'99+'}
        />
      </div>
      <View style={{marginTop: HEADER_HEIGHT}}>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/product-details" component={ProductDetail} />
        <Route exact path="/Details" component={Details} />
        <Route exact path="/ShopDetails" component={ShopDetails} />
        <Route exact path="/seller/add-product" component={SellerAddProducts} />

        <Route exact path="/cart" component={Cart} />
      </View>
    </Router>
  ) : (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
