import AsyncStorage from '@react-native-community/async-storage';
import {IS_WEB} from '../config';
import {ICartItem} from '../interfaces/classes/cart';

const SELLER_ID_KEY = 'sellerId';
const USER_ID_KEY = 'userId';
const TOKEN_KEY = 'token';
const USER_TYPE_KEY = 'userType';
const SALES_USER_KEY = 'salesUserId';
const CART_KEY = 'cart-{userId}';
const DELIVERY_PERSON_ID_KEY = 'deliveryPersonId';

export const setSellerId = async (sellerId: string) => {
  set(SELLER_ID_KEY, sellerId);
};
export const getSellerId = async () => {
  return (await get(SELLER_ID_KEY)) || '';
};

export const setDeliveryPersonId = async (deliveryPersonId: string) => {
  set(DELIVERY_PERSON_ID_KEY, deliveryPersonId);
};

export const getDeliveryPersonId = async () => {
  return (await get(DELIVERY_PERSON_ID_KEY)) || '';
};

export const setSalesUserId = async (sellerId: string) => {
  set(SALES_USER_KEY, sellerId);
};
export const getSalesUserId = async () => {
  return (await get(SALES_USER_KEY)) || '1';
};

export const setUserId = async (userId: string) => {
  set(USER_ID_KEY, userId);
};

export const getUserId = async () => {
  return await get(USER_ID_KEY);
};

export const setUserType = async (sellerId: string) => {
  set(USER_TYPE_KEY, sellerId);
};
export const getUserType = async () => {
  return (await get(USER_TYPE_KEY)) || '';
};

export const setToken = async (token: string) => {
  set(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await get(TOKEN_KEY);
};

const set = async (key: string, value: string) => {
  IS_WEB
    ? localStorage.setItem(key, value)
    : await AsyncStorage.setItem(key, value);
};
const get = async (key: string) => {
  return IS_WEB ? localStorage.getItem(key) : await AsyncStorage.getItem(key);
};

export const removeAll = async () => {
  return IS_WEB ? localStorage.clear() : await AsyncStorage.clear();
};

export const setCartItem = async (data: ICartItem[]) => {
  const userId = await getUserId();
  const cartData = JSON.stringify(data);
  set(CART_KEY.replace('{userId}', userId || ''), cartData);
};
export const getCartItem = async (): Promise<ICartItem[]> => {
  const userId = await getUserId();
  const cartDataStr =
    (await get(CART_KEY.replace('{userId}', userId || ''))) || '[]';
  return JSON.parse(cartDataStr);
};
