import AsyncStorage from '@react-native-community/async-storage';
import {IS_WEB} from '../config';

const SELLER_ID_KEY = 'sellerId';

export const setSellerId = async (sellerId: string) => {
  IS_WEB
    ? localStorage.setItem(SELLER_ID_KEY, sellerId)
    : await AsyncStorage.setItem(SELLER_ID_KEY, sellerId);
};

export const getSellerId = async () => {
  return IS_WEB
    ? localStorage.getItem(SELLER_ID_KEY) || '5fa90fa1207f370732e06674'
    : (await AsyncStorage.getItem(SELLER_ID_KEY)) || '5fa90fa1207f370732e06674';
};
