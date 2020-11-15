import AsyncStorage from '@react-native-community/async-storage';
import {IS_WEB} from '../config';

const SELLER_ID_KEY = 'sellerId';
const USER_ID_KEY = 'userId';
const TOKEN_KEY = 'token';

export const setSellerId = async (sellerId: string) => {
  set(SELLER_ID_KEY, sellerId);
};
export const getSellerId = async () => {
  return (await get(SELLER_ID_KEY)) || '1';
};

export const setUserId = async (userId: string) => {
  set(USER_ID_KEY, userId);
};

export const getUserId = async () => {
  return await get(USER_ID_KEY);
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
