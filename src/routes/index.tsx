import './GestureHandler';
import React, {useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SellersList, Details} from '../screens';
import {View, Platform} from 'react-native';
import Cart from '../screens/Cart';
import ProductDetail from '../screens/Products';
import Header from '../components/Header';
import SellerAddProducts from '../screens/_seller/products/add';
import SellerViewProducts from '../screens/_seller/products/view';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/Signup';
import {ProductList} from '../screens/Products/list';
import {store} from './store';
import {
  getUserId,
  getToken,
  getUserType,
  getSalesUserId,
  getSellerId,
  removeAll,
  getCartItem,
} from '../services/storage-service';
import ROUTE_NAMES from './name';
import {
  AUTH_USER_LOGIN,
  AUTH_SELLER_LOGIN,
  AUTH_LOGOUT,
} from '../providers/constants';
import {USER_TYPE} from '../interfaces/enums';
import {ICartItem} from '../interfaces/classes/cart';
import {Checkout} from '../screens/Checkout';
import {Profile} from '../screens/_users/Profile';
const HEADER_HEIGHT = 70;

const SELLER_ROUTES = [
  {
    routeName: ROUTE_NAMES.sellerProductAdd,
    component: SellerAddProducts,
    name: 'Add Product',
  },
  {
    routeName: ROUTE_NAMES.sellerProductView,
    component: SellerViewProducts,
    name: 'View Product',
  },
  {
    routeName: ROUTE_NAMES.sellerProductCrudById,
    component: SellerAddProducts,
    name: 'Product',
  },
];

const AUTH_ROUTES = [
  {
    routeName: ROUTE_NAMES.login,
    component: Login,
    name: 'Login',
  },
  {
    routeName: ROUTE_NAMES.dynamicLogin,
    component: Login,
    name: 'Login',
  },
  {
    routeName: ROUTE_NAMES.register,
    component: SignUp,
    name: 'Register',
  },
];

const PUBLIC_ROUTES = [
  {
    routeName: '/',
    component: SellersList,
    name: 'Home',
  },
  {
    routeName: ROUTE_NAMES.home,
    component: SellersList,
    name: 'Home',
  },
  {
    routeName: ROUTE_NAMES.productListBySellerId,
    component: ProductList,
    name: 'Product List',
  },
  {
    routeName: ROUTE_NAMES.productDetails,
    component: ProductDetail,
    name: 'Product Details',
  },
];
const USER_AUTHENTICATED_ROUTES = [
  {
    routeName: ROUTE_NAMES.userCart,
    component: Cart,
    name: 'Cart',
  },
  {
    routeName: ROUTE_NAMES.userCheckout,
    component: Checkout,
    name: 'Checkout',
  },
  {
    routeName: ROUTE_NAMES.userProfile,
    component: Profile,
    name: 'Profile',
  },
];

const getTabNavMenus = (userType: USER_TYPE | null) => {
  if (userType === USER_TYPE.USER) {
    return [
      {
        title: 'Home',
        navigationLink: ROUTE_NAMES.home,
      },
      {
        title: 'Notifications',
        navigationLink: 'about',
      },
      {
        title: 'Profile',
        navigationLink: 'profile',
      },
      {
        title: 'Orders',
        navigationLink: '/seller/product/add',
      },
    ];
  } else if (userType === USER_TYPE.SALES_USER) {
    return [
      {
        title: 'Home',
        navigationLink: 'home',
      },
      {
        title: 'Filters',
        navigationLink: '/seller/product/add',
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
    ];
  } else {
    return [];
  }
};

export type StackParams = {
  Home: undefined;
  Details: {data: string} | undefined;
};
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
      <Stack.Screen name="Home" component={SellersList} />
      <Stack.Screen
        name={ROUTE_NAMES.productListBySellerId}
        component={ProductList}
        options={{
          title: 'Product List',
        }}
      />
      <Stack.Screen name="/seller/product/add" component={SellerAddProducts} />
      <Stack.Screen name={ROUTE_NAMES.userCheckout} component={Checkout} />
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
      <Tab.Screen name="Home" component={SellersList} />
      <Tab.Screen name="product-details" component={Checkout} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export function Routes() {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [userType, setUserType] = useState('');
  const [cartProductsLength, setCartProductsLength] = useState(0);
  const beforeRender = async () => {
    const userType = (await getUserType()) as USER_TYPE;
    if (userType) {
      setUserType(userType);
    }
    const token = await getToken();
    if (userType === USER_TYPE.USER) {
      const userId = await getUserId();
      store.dispatch({
        type: AUTH_USER_LOGIN,
        userId: userId,
        token: token,
      } as never);
      setUserLoggedIn(true);
      const cartItemsOnStorage = (await getCartItem()) as ICartItem[];
      setCartProductsLength(cartItemsOnStorage.length);
    } else if (userType === USER_TYPE.SALES_USER) {
      const userId = await getSalesUserId();
      const sellerId = await getSellerId();
      store.dispatch({
        type: AUTH_SELLER_LOGIN,
        userId: userId,
        sellerId: sellerId,
        token: token,
      } as never);
      setUserLoggedIn(true);
    } else {
      store.dispatch({
        type: AUTH_LOGOUT,
      } as never);
      setUserLoggedIn(false);
    }
  };
  React.useEffect(() => {
    beforeRender();
  }, []);
  store.subscribe(() => {
    if (userLoggedIn === false && store.getState().auth.hasLoggedIn === true)
      setUserLoggedIn(true);
    if (store.getState().cart.cartItems.length !== cartProductsLength) {
      setCartProductsLength(store.getState().cart.cartItems.length);
    }
  });

  const logout = async () => {
    const userType = (await getUserType()) as USER_TYPE;
    store.dispatch({
      type: AUTH_LOGOUT,
    } as never);
    setUserLoggedIn(false);
    removeAll();

    return (
      <Redirect
        to={{
          pathname:
            userType === USER_TYPE.SALES_USER ? '/seller/login' : 'user/login',
        }}
      />
    );
  };

  return Platform.OS === 'web' ? (
    <>
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
            onLogout={() => logout()}
            hasLoggedIn={userLoggedIn}
            menus={
              userLoggedIn ? getTabNavMenus(userType as USER_TYPE | null) : []
            }
            cartLength={cartProductsLength}
            notificationCount={'99+'}
          />
        </div>
        <View style={{marginTop: HEADER_HEIGHT}}>
          {AUTH_ROUTES.map((route, key: number) => (
            <Route
              key={'auth' + key}
              exact
              path={route.routeName}
              component={route.component}
            />
          ))}
          {PUBLIC_ROUTES.map((route, key: number) => (
            <Route
              key={'public' + key}
              exact
              path={route.routeName}
              component={route.component}
            />
          ))}

          {USER_AUTHENTICATED_ROUTES.map((route, key: number) => (
            <Route
              key={'user-auth' + key}
              exact
              path={route.routeName}
              component={route.component}
            />
          ))}

          {SELLER_ROUTES.map((route, key: number) => (
            <PrivateRoute
              key={'seller' + key}
              exact
              authenticated={userLoggedIn}
              path={route.routeName}
              component={route.component}
            />
          ))}
        </View>
      </Router>
    </>
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
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{pathname: '/seller/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
}
