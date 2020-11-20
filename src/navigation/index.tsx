import {useNavigation as useNavigationR} from '@react-navigation/native';
import {Platform} from 'react-native';
import {useHistory} from 'react-router-dom';
import {ComponentProp} from '../interfaces';
import {IS_WEB} from '../config';
import ROUTE_NAMES from '../routes/name';
import {ProductAndCart} from '../interfaces/classes/cart';

const useNavigation = Platform.OS === 'web' ? useHistory : useNavigationR;
const navigate = (navigation: any, routeName: string, params: any = {}) => {
  Platform.OS === 'web'
    ? navigation.push(routeName)
    : navigation.navigate(routeName, params);
};
const navigateByProp = (
  props: ComponentProp,
  routeName: string,
  params: any = {},
  customRouteMobile?: string,
) => {
  Platform.OS === 'web'
    ? props.history.replace(routeName)
    : props.navigation.navigate(customRouteMobile || routeName, params);
};

const getParamsByProp = (props: ComponentProp): any => {
  if (Platform.OS === 'web') {
    const {
      match: {params},
    } = props;
    return params || {};
  } else {
    return (props.route && props.route.params) || {};
  }
};

const navigateToCheckoutPage = (
  props: ComponentProp,
  checkoutProducts: ProductAndCart[],
) => {
  if (IS_WEB) {
    localStorage.setItem('checkoutProducts', JSON.stringify(checkoutProducts));
  }
  navigateByProp(props, ROUTE_NAMES.userCheckout, {
    checkoutProducts: checkoutProducts,
  });
};

const getParamForCheckoutPage = (props: ComponentProp) => {
  if (IS_WEB) {
    const data = localStorage.getItem('checkoutProducts') || '[]';
    return JSON.parse(data);
  } else {
    return (
      (props.route &&
        props.route.params &&
        props.route.params.checkoutProducts) ||
      []
    );
  }
};

export {
  useNavigation,
  navigate,
  navigateByProp,
  getParamsByProp,
  navigateToCheckoutPage,
  getParamForCheckoutPage,
};
