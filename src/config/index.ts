import {Platform} from 'react-native';

export const IS_WEB = Platform.OS === 'web';
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const SERVER_URL = 'http://192.168.1.12:4000';
export const API_URL = SERVER_URL + '/api';
export const IMAGE_UPLOAD_API_URL = API_URL + '/image/upload';
