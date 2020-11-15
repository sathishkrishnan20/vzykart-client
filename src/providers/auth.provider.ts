import {AUTH_LOGIN, AUTH_LOGOUT} from '../providers/constants';
import {USER_TYPE} from '../interfaces/enums';
interface IAuthProviderState {
  type: string;
  isAuthenticated: boolean;
  userId: string;
  userType: USER_TYPE;
  success: boolean;
  hasLoggedIn: boolean;
  needToRedirect: boolean;
  redirectNotice: any;
  userData: any;
}

export const userInitialState = {
  isAuthenticated: false,
  userId: null,
  userType: null,
  success: false,
  hasLoggedIn: false,
  needToRedirect: false,

  redirectNotice: {},
  userData: {},
};
// State
export default (state = userInitialState, action: IAuthProviderState) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        userId: action.userId,
        userType: action.userType,
        userData: action.userData,
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
