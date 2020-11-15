import {
  AUTH_USER_LOGIN,
  AUTH_SELLER_LOGIN,
  AUTH_LOGOUT,
} from '../providers/constants';
import {USER_TYPE} from '../interfaces/enums';
interface IAuthProviderState {
  type?: string;
  isAuthenticated: boolean;
  userId: string;
  sellerId: string;
  userType: USER_TYPE | '';
  token: string;
  success: boolean;
  hasLoggedIn: boolean;
  needToRedirect: boolean;
  redirectNotice: any;
  userData: any;
}

export const userInitialState: IAuthProviderState = {
  isAuthenticated: false,
  userId: '',
  userType: '',
  token: '',
  success: false,
  hasLoggedIn: false,
  needToRedirect: false,
  sellerId: '',
  redirectNotice: {},
  userData: {},
};
// State
export default (state = userInitialState, action: IAuthProviderState) => {
  switch (action.type) {
    case AUTH_USER_LOGIN:
      return {
        ...state,
        userId: action.userId,
        userType: USER_TYPE.USER,
        token: action.token,
        userData: action.userData || {},
        success: true,
        isAuthenticated: true,
        hasLoggedIn: true,
      };
    case AUTH_SELLER_LOGIN:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        userData: action.userData || {},
        userType: USER_TYPE.SALES_USER,
        success: true,
        isAuthenticated: true,
        hasLoggedIn: true,
      };
    case AUTH_LOGOUT:
      return userInitialState;

    default:
      return state;
  }
};
