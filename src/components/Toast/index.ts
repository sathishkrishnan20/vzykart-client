// @ts-ignore
import Toast from 'react-native-toast-message';
import {IS_WEB} from '../../config';
interface IToast {
  title: string;
  message: string;
  duration?: number;
  autoHide?: boolean;
}
enum ToastType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}
const commonConfig = {
  position: IS_WEB ? 'top' : 'bottom',
  topOffset: IS_WEB ? 150 : 0,
  bottomOffset: IS_WEB ? 0 : 60,
};
export const SuccessToast = ({
  title,
  message,
  duration = 3000,
  autoHide = true,
}: IToast) => {
  baseToast(ToastType.SUCCESS, title, message, autoHide, duration);
};

export const WarningToast = ({
  title,
  message,
  duration = 3000,
  autoHide = true,
}: IToast) => {
  baseToast(ToastType.WARNING, title, message, autoHide, duration);
};

export const ErrorToast = ({
  title,
  message,
  duration = 3000,
  autoHide = true,
}: IToast) => {
  baseToast(ToastType.ERROR, title, message, autoHide, duration);
};

export const InfoToast = ({
  title,
  message,
  duration = 3000,
  autoHide = true,
}: IToast) => {
  baseToast(ToastType.INFO, title, message, autoHide, duration);
};

const baseToast = (
  type: ToastType,
  title: string,
  message: string,
  autoHide: boolean,
  duration: number,
) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    autoHide: autoHide,
    visibilityTime: duration || 3000,
    ...commonConfig,
  });
};
