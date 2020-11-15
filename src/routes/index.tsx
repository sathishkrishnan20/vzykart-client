import './GestureHandler';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home, Details, ShopDetails} from '../screens';
import {Text, View, Platform} from 'react-native';
import Cart from '../screens/Cart';
import ProductDetail from '../screens/Products';
import Header from '../components/Header';
import SellerAddProducts from '../screens/_seller/products/add';
import SellerViewProducts from '../screens/_seller/products/view';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/Signup';
import ProductList from '../screens/Products/list';
import {getShopId} from '../services/storage-service';
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
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="/seller/product/add" component={SellerAddProducts} />
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
      <Tab.Screen name="product-details" component={SellerViewProducts} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Details} />
    </Tab.Navigator>
  );
};
export function Routes() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getShopId();
        console.log('User TOken ', userToken);
      } catch (e) {
        // Restoring token failed
        console.log('exception getting user Token', e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: data.token});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: data});
      },
    }),
    [],
  );

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
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />

        <Route exact path="/" component={Home} />
        <Route exact path="/productList" component={ProductList} />

        <Route exact path="/product-details" component={ProductDetail} />

        <Route exact path="/home" component={Home} />
        <Route exact path="/Details" component={Details} />
        <Route exact path="/cart" component={Cart} />

        <PrivateRoute
          exact
          path="/seller/product/add"
          authenticated={state.userToken}
          component={SellerAddProducts}
        />
        <Route
          exact
          path="/seller/product/:crudType/:productId"
          component={SellerAddProducts}
        />
        <Route
          exact
          path="/seller/product/view"
          component={SellerViewProducts}
        />
      </View>
    </Router>
  ) : (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

function PrivateRoute({component: Component, authenticated, ...rest}: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        )
      }
    />
  );
}
