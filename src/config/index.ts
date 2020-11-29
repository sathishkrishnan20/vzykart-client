import {Platform, Dimensions} from 'react-native';

export const SERVER_URL =
  'http://ec2-52-14-174-212.us-east-2.compute.amazonaws.com:8050';
export const IMAGE_BASE_URL = SERVER_URL;
export const RAZORPAY_KEY = 'rzp_test_HoaTilDmiHfZnE';

export const IS_WEB = Platform.OS === 'web';
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_BIG_SCREEN = Dimensions.get('window').width >= 600;
export const RAZORPAY_LOGO_URL =
  'http://ec2-52-14-174-212.us-east-2.compute.amazonaws.com:3000/logo192.png';
export const APP_HEADER = 'Vzy Cart';
export const WHATSAPP_NUMBER = '918883334889';

export const API_URL = SERVER_URL + '/api';
export const IMAGE_UPLOAD_API_URL = API_URL + '/image/upload';
export const BACKGROUND_IMAGE_URL =
  'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d95d03767dd830006a295b6%2F0x0.jpg';
