// @ts-ignore
import Toast from 'react-native-toast-message';
import {
    IS_WEB
} from '../../config';
const commonConfig = {
    position: IS_WEB ? 'top' : 'bottom',
    topOffset: IS_WEB ? 150 : 0,
    bottomOffset: IS_WEB ? 0 : 60,
};
export const baseToast = (type,
    title,
    message,
    autoHide,
    duration) => {
    Toast.show({
        type: type,
        text1: title,
        text2: message,
        autoHide: autoHide,
        visibilityTime: duration || 3000,
        ...commonConfig,
    });
}