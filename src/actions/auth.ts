import axios from 'axios';
import {postService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {
  IRegisterAPI,
  ILoginAPI,
  IForgotPasswordAPI,
  IGenAuthCodeAPI,
} from '../interfaces/actions/auth';
import {navigateByProp, replaceByProp} from '../navigation';
import {ErrorToast, showToastByResponse} from '../components/Toast';
import {USER_TYPE} from '../interfaces/enums';
import {store} from '../routes/store';
import {
  AUTH_USER_LOGIN,
  AUTH_SELLER_LOGIN,
  AUTH_ADMIN_LOGIN,
} from '../providers/constants';
import {
  setToken,
  setUserId,
  setUserType,
  setSellerId,
  setSalesUserId,
  getUserId,
  getToken,
} from '../services/storage-service';
import {ComponentProp} from '../interfaces';
import ROUTE_NAMES from '../routes/name';
import {IS_WEB} from '../config';
import {getHomeRouteByUserType} from '../helpers';
const getBaseAuthAPIRouteByUserType = (userType: USER_TYPE) => {
  switch (userType) {
    case USER_TYPE.USER:
      return '/users';
    case USER_TYPE.SALES_USER:
      return '/seller/sales-user';
    case USER_TYPE.ADMIN:
      return '/admin';

    default:
      return '/users';
  }
};
class AuthAction {
  async login(
    userType: USER_TYPE = USER_TYPE.USER,
    data: ILoginAPI,
    props: any,
    navigateParams = {},
    signInHook: (data: any) => void,
  ): Promise<IResponse> {
    try {
      const navigateRouteName = getHomeRouteByUserType(userType);
      const result = await postService(
        getBaseAuthAPIRouteByUserType(userType) + '/sign-in',
        data,
      ).catch((ex) => ex.response);
      const response: IResponse = result.data;
      if (response.success) {
        axios.defaults.headers.common['authorization'] = response.data.token;
        if (response.data.type === USER_TYPE.USER) {
          store.dispatch({
            type: AUTH_USER_LOGIN,
            userId: response.data.id,
            token: response.data.token,
          } as never);
          setUserId(response.data.id);
        } else if (response.data.type === USER_TYPE.SALES_USER) {
          store.dispatch({
            type: AUTH_SELLER_LOGIN,
            userId: response.data.id,
            sellerId: response.data.sellerId,
            token: response.data.token,
          } as never);
          setSalesUserId(response.data.id);
          setSellerId(response.data.sellerId);
        } else if (response.data.type === USER_TYPE.ADMIN) {
          store.dispatch({
            type: AUTH_ADMIN_LOGIN,
            adminId: response.data.id,
            token: response.data.token,
          } as never);
        }
        setToken(response.data.token);
        setUserType(response.data.type);
        const signInHookRequest = {
          token: response.data?.token,
          userType: response.data?.type,
          userId: response.data?.id,
        };
        signInHook(signInHookRequest);
        if (IS_WEB) {
          replaceByProp(props, navigateRouteName, navigateParams);
        }
      } else {
        showToastByResponse(response);
      }

      return response;
    } catch (error) {
      ErrorToast({message: error.message});
      return error;
    }
  }
  async register(
    userType: USER_TYPE = USER_TYPE.USER,
    data: IRegisterAPI,
  ): Promise<IResponse> {
    const result = await postService(
      getBaseAuthAPIRouteByUserType(userType) + '/sign-up',
      data,
    ).catch((ex) => ex.response);
    return result.data;
  }
  async generateOTP(
    userType: USER_TYPE = USER_TYPE.USER,
    data: IGenAuthCodeAPI,
  ): Promise<IResponse> {
    const result = await postService(
      getBaseAuthAPIRouteByUserType(userType) + '/generate-otp',
      data,
    ).catch((ex) => ex.response);
    return result.data;
  }
  async forgotPassword(
    userType: USER_TYPE = USER_TYPE.USER,
    data: IForgotPasswordAPI,
  ): Promise<IResponse> {
    const result = await postService(
      getBaseAuthAPIRouteByUserType(userType) + '/forgot-password',
      data,
    ).catch((ex) => ex.response);
    return result.data;
  }

  async redirectUserIfNotLogged(
    props: ComponentProp,
    redirectScreenName: string,
    params: any = {},
  ) {
    const userId = await getUserId();
    const token = await getToken();
    if (!userId || !token) {
      navigateByProp(props, ROUTE_NAMES.login, {
        needToRedirect: true,
        redirectScreenName,
        params,
      });
      return true;
    }
    return false;
  }
}
export default AuthAction;
