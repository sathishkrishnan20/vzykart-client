// @ts-ignore
import Toast from 'react-native-toast-message';
import {IS_WEB} from '../../config';
import {IResponse} from '../../interfaces/request-response';
import {baseToast} from './toast';
interface IToastOptional {
  duration?: number;
  autoHide?: boolean;
}
interface IToast extends IToastOptional {
  title?: string;
  message: string;
}
interface IResponseToast extends IResponse, IToastOptional {}
enum ToastType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}
export const showToastByResponse = ({
  success,
  message,
  duration = 3000,
  autoHide = true,
}: IResponseToast) => {
  baseToast(
    success ? ToastType.SUCCESS : ToastType.ERROR,
    success ? 'Success' : 'Failed',
    message,
    autoHide,
    duration,
  );
};
export const SuccessToast = ({
  title = 'Success',
  message,
  duration = 3000,
  autoHide = true,
}: IToast) => {
  baseToast(ToastType.SUCCESS, title, message, autoHide, duration);
};

export const WarningToast = ({
  title = 'Warning',
  message,
  duration = 3000,
  autoHide = true,
}: IToast) => {
  baseToast(ToastType.WARNING, title, message, autoHide, duration);
};

export const ErrorToast = ({
  title = 'Failed',
  message,
  duration = 3000,
  autoHide = true,
}: IToast) => {
  baseToast(ToastType.ERROR, title, message, autoHide, duration);
};

export const InfoToast = ({
  title = 'Info',
  message,
  duration = 3000,
  autoHide = true,
}: IToast) => {
  baseToast(ToastType.INFO, title, message, autoHide, duration);
};
