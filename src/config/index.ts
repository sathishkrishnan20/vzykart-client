import {Platform} from 'react-native';

export const IS_WEB = Platform.OS === 'web';
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const SERVER_URL = 'http://192.168.1.12:4000';
export const API_URL = SERVER_URL + '/api';
export const IMAGE_UPLOAD_API_URL = API_URL + '/image/upload';
export const BACKGROUND_IMAGE_URL =
  'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d95d03767dd830006a295b6%2F0x0.jpg';
