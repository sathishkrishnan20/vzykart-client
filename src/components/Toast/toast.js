import {
    toast
} from 'react-toastify';
import {
    IS_WEB
} from '../../config';
import 'react-toastify/dist/ReactToastify.css';

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