import {
    toast
} from 'react-toastify';
import {
    IS_WEB
} from '../../config';
import 'react-toastify/dist/ReactToastify.css';
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
    //toast.show(title);
    toast.success(message, {
        type: type,
        autoClose: autoHide === true ? true : duration
    });
}