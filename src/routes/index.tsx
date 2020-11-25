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
import {SellersList} from '../screens';
import {View, Platform} from 'react-native';
import Cart from '../screens/Cart';
import Header from '../components/Header';
import SellerAddProducts from '../screens/_seller/products/add';
import SellerViewProducts from '../screens/_seller/products/view';
import {Login} from '../screens/Auth/Login';
import {SignUp} from '../screens/Auth/Signup';
import {ProductList} from '../screens/Products/list';
import {store} from './store';
import {
  getUserId,
  getToken,
  getUserType,
  getSalesUserId,
  getSellerId,
  removeAll,
} from '../services/storage-service';
import ROUTE_NAMES from './name';
import {
  AUTH_USER_LOGIN,
  AUTH_SELLER_LOGIN,
  AUTH_LOGOUT,
} from '../providers/constants';
import {USER_TYPE} from '../interfaces/enums';
import {Checkout} from '../screens/Checkout';
import {Profile} from '../screens/_users/Profile';
import {MyOrders} from '../screens/_users/Orders';
import {OrderDetails} from '../screens/_users/Orders/Details';
import {withBadge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {SellerOrders} from '../screens/_seller/orders';
import {getLoginRouteByUserType, getHomeRouteByUserType} from '../helpers';
import {SellerOrderDetails} from '../screens/_seller/orders/details';
import {AdminOrders} from '../screens/_admin/orders';
import {AdminOrderDetails} from '../screens/_admin/orders/details';
import {AdminViewSellers} from '../screens/_admin/sellers/view';
import {WriteSellerData} from '../screens/_admin/sellers/add';

const HEADER_HEIGHT = 70;

const ADMIN_ROUTES = [
  {
    routeName: ROUTE_NAMES.adminOrders,
    component: AdminOrders,
    name: 'Orders',
  },
  {
    routeName: ROUTE_NAMES.adminOrdersDetails,
    component: AdminOrderDetails,
    name: 'Orders Details',
  },
  {
    routeName: ROUTE_NAMES.adminViewSellers,
    component: AdminViewSellers,
    name: 'Admin Sellers Details',
  },
  {
    routeName: ROUTE_NAMES.adminAddSellers,
    component: WriteSellerData,
    name: 'Admin Add Seller',
  },
];
const SELLER_ROUTES = [
  {
    routeName: ROUTE_NAMES.sellerOrders,
    component: SellerOrders,
    name: 'Orders',
  },
  {
    routeName: ROUTE_NAMES.sellerOrdersDetails,
    component: SellerOrderDetails,
    name: 'Orders Details',
  },

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
  /* {
    routeName: ROUTE_NAMES.productDetails,
    component: ProductDetail,
    name: 'Product Details',
  }, */
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
  {
    routeName: ROUTE_NAMES.userOrders,
    component: MyOrders,
    name: 'Orders',
  },
  {
    routeName: ROUTE_NAMES.userOrderDetails,
    component: OrderDetails,
    name: 'Orders Details',
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
        title: 'Profile',
        navigationLink: ROUTE_NAMES.userProfile,
      },
      {
        title: 'Orders',
        navigationLink: ROUTE_NAMES.userOrders,
      },
    ];
  } else if (userType === USER_TYPE.SALES_USER) {
    return [
      {
        title: 'Home',
        navigationLink: ROUTE_NAMES.sellerOrders,
      },
      {
        title: 'Orders',
        navigationLink: ROUTE_NAMES.sellerOrders,
      },
      {
        title: 'Products',
        navigationLink: ROUTE_NAMES.sellerProductView,
      },
      {
        title: 'Add Product',
        navigationLink: ROUTE_NAMES.sellerProductAdd,
      },
    ];
  } else if (userType === USER_TYPE.ADMIN) {
    return [
      {
        title: 'Orders',
        navigationLink: ROUTE_NAMES.adminOrders,
      },
      {
        title: 'Sellers',
        navigationLink: ROUTE_NAMES.adminViewSellers,
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
const Tab = createBottomTabNavigator();
// @ts-ignore
export const AuthContext = React.createContext();
export function Routes() {
  const [cartProductsLength, setCartProductsLength] = useState(0);

  const [state, dispatch] = React.useReducer(
    (
      prevState: any,
      action: {type: any; token?: any; userType: USER_TYPE | null | undefined},
    ) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userType: action.userType,
            userToken: action.token,
            isLoading: false,
            isTokenRestored: true,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userType: action.userType,
            isTokenRestored: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userType: null,
            isTokenRestored: true,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userType: null,
      isTokenRestored: false,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let userType;
      let userId;
      try {
        userToken = await getToken();
        userType = (await getUserType()) as USER_TYPE;
        userId = (await getUserId()) || (await getSalesUserId());
      } catch (e) {
        // Restoring token failed
        console.error('exception getting user Token', e);
      }
      if (userToken && userId && userType === USER_TYPE.USER) {
        store.dispatch({
          type: AUTH_USER_LOGIN,
          userId: userId,
          token: userToken,
        } as never);
      } else if (userToken && userId && userType === USER_TYPE.SALES_USER) {
        const sellerId = await getSellerId();
        store.dispatch({
          type: AUTH_SELLER_LOGIN,
          userId: userId,
          sellerId: sellerId,
          token: userToken,
        } as never);
      }
      console.log('userId', userId);

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken, userType: userType});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: {token: any; userType: USER_TYPE}) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        dispatch({
          type: 'SIGN_IN',
          token: data.token,
          userType: data.userType,
        });
      },
      signOut: () => {
        store.dispatch({
          type: AUTH_LOGOUT,
        } as never);
        dispatch({type: 'SIGN_OUT', userType: null});
      },
    }),
    [],
  );

  store.subscribe(() => {
    if (store.getState().cart.cartItems.length !== cartProductsLength) {
      setCartProductsLength(store.getState().cart.cartItems.length);
    }
  });
  const logout = async () => {
    store.dispatch({
      type: AUTH_LOGOUT,
    } as never);
    removeAll();
    authContext.signOut();
    return;
  };

  const CartIcon: any = withBadge(cartProductsLength)(Icon);
  const NotificationIcon: any = withBadge(0)(Icon);

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
        <Tab.Screen name={ROUTE_NAMES.home} component={SellersList} />
        <Tab.Screen name={ROUTE_NAMES.userOrders} component={MyOrders} />
        <Tab.Screen name={ROUTE_NAMES.userCart} component={Cart} />
        <Tab.Screen name={ROUTE_NAMES.userProfile} component={Profile} />
      </Tab.Navigator>
    );
  };
  const StackNavigator = () => {
    return (
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator
          screenOptions={({navigation}: any) => ({
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyle: {backgroundColor: '#F02245'},
            headerTintColor: 'white',
            headerRight: () => {
              return (
                <View
                  style={{
                    marginRight: 10,
                    flexDirection: 'row',
                  }}>
                  <View style={{marginLeft: 4, marginRight: 4}}>
                    <CartIcon
                      onPress={() => navigation.navigate(ROUTE_NAMES.userCart)}
                      style={{marginRight: 5, marginTop: 10}}
                      size={24}
                      status="success"
                      color={'#FFF'}
                      name="cart"
                    />
                  </View>
                  <View style={{marginLeft: 4, marginRight: 4}}>
                    <NotificationIcon
                      style={{marginRight: 5, marginTop: 10}}
                      size={24}
                      status="success"
                      color={'#FFF'}
                      name="notifications"
                    />
                  </View>
                  <View style={{marginLeft: 4, marginRight: 4}}>
                    <Icon
                      onPress={() => logout()}
                      style={{marginRight: 5, marginTop: 10}}
                      name="power-sharp"
                      color={'#FFF'}
                      size={24}
                    />
                  </View>
                </View>
              );
            },
          })}>
          {state.userToken == null ? (
            <>
              {/* Auth Routes */}

              <Stack.Screen
                options={{headerShown: false}}
                name={ROUTE_NAMES.login}
                component={Login}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name={ROUTE_NAMES.register}
                component={SignUp}
              />
            </>
          ) : state.userType === USER_TYPE.USER ? (
            <>
              <Stack.Screen
                options={({route}) => ({
                  title: getHeaderTitle(route),
                })}
                name="Tabs"
                component={TabNavigator}
              />
              {/* User Public Routes */}
              <Stack.Screen name={ROUTE_NAMES.home} component={SellersList} />
              <Stack.Screen
                name={ROUTE_NAMES.productListBySellerId}
                component={ProductList}
              />

              {/* User Authenticated Routes */}
              <Stack.Screen
                name={ROUTE_NAMES.userCheckout}
                component={Checkout}
              />
              <Stack.Screen name={ROUTE_NAMES.userCart} component={Cart} />
              <Stack.Screen
                name={ROUTE_NAMES.userProfile}
                component={Profile}
              />
              <Stack.Screen
                name={ROUTE_NAMES.userOrders}
                component={MyOrders}
              />
              <Stack.Screen
                name={ROUTE_NAMES.userOrderDetails}
                component={OrderDetails}
              />
            </>
          ) : state.userType === USER_TYPE.SALES_USER ? (
            <>
              {/* Seller Routes */}
              <Stack.Screen
                name={ROUTE_NAMES.sellerOrders}
                component={SellerOrders}
              />
              <Stack.Screen
                name={ROUTE_NAMES.sellerOrdersDetails}
                component={SellerOrderDetails}
              />
              <Stack.Screen
                name={ROUTE_NAMES.sellerProductAdd}
                component={SellerAddProducts}
              />
              <Stack.Screen
                name={ROUTE_NAMES.sellerProductView}
                component={SellerViewProducts}
              />
              <Stack.Screen
                name={ROUTE_NAMES.sellerProductCrudById}
                component={SellerAddProducts}
              />
            </>
          ) : null}
        </Stack.Navigator>
      </AuthContext.Provider>
    );
  };
  console.log('Coming to render', state.isTokenRestored);
  return Platform.OS === 'web' ? (
    <>
      <AuthContext.Provider value={authContext}>
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
              userType={state.userType}
              onLogout={() => logout()}
              hasLoggedIn={state.userToken !== null}
              menus={
                state.userToken !== null
                  ? getTabNavMenus(state.userType as USER_TYPE | null)
                  : []
              }
              cartLength={cartProductsLength}
              notificationCount={'99+'}
            />
          </div>
          <View style={{marginTop: HEADER_HEIGHT}}>
            {AUTH_ROUTES.map((route, key: number) => (
              <RedirectHomeRouteIfLoggedIn
                key={'auth' + key}
                exact
                authenticated={state.userToken !== null}
                userType={state.userType}
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
            {state.isTokenRestored &&
              USER_AUTHENTICATED_ROUTES.map((route, key: number) => (
                <PrivateRoute
                  key={'user-auth' + key}
                  exact
                  authenticated={state.userToken !== null}
                  userType={USER_TYPE.USER}
                  path={route.routeName}
                  component={route.component}
                />
              ))}

            {state.isTokenRestored &&
              SELLER_ROUTES.map((route, key: number) => (
                <PrivateRoute
                  key={'seller' + key}
                  exact
                  authenticated={state.userToken !== null}
                  userType={USER_TYPE.SALES_USER}
                  path={route.routeName}
                  component={route.component}
                />
              ))}

            {state.isTokenRestored && state.userType === USER_TYPE.ADMIN
              ? ADMIN_ROUTES.map((route, key: number) => (
                  <PrivateRoute
                    key={'seller' + key}
                    exact
                    authenticated={state.userToken !== null}
                    userType={USER_TYPE.SALES_USER}
                    path={route.routeName}
                    component={route.component}
                  />
                ))
              : null}
          </View>
        </Router>
      </AuthContext.Provider>
    </>
  ) : (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

function PrivateRoute({
  component: Component,
  authenticated,
  userType,
  ...rest
}: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: getLoginRouteByUserType(userType),
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
}

function RedirectHomeRouteIfLoggedIn({
  component: Component,
  authenticated,
  userType,
  ...rest
}: any) {
  console.log('userType on Redirect' + userType);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated && userType ? (
          <Redirect
            to={{
              pathname: getHomeRouteByUserType(userType),
              state: {from: props.location},
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
