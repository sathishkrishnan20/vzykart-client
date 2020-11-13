import {AsyncStorage} from 'react-native';
import {IS_WEB} from '../config';

const SHOP_ID_KEY = 'shopId';

export const setShopId = async (shopId: string) => {
  IS_WEB
    ? localStorage.setItem(SHOP_ID_KEY, shopId)
    : await AsyncStorage.setItem(SHOP_ID_KEY, shopId);
};

export const getShopId = async () => {
  return IS_WEB
    ? localStorage.getItem(SHOP_ID_KEY) || ''
    : (await AsyncStorage.getItem(SHOP_ID_KEY)) || '';
};
