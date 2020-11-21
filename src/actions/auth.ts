import {postService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {
  IRegisterAPI,
  ILoginAPI,
  IForgotPasswordAPI,
  IGenAuthCodeAPI,
} from '../interfaces/actions/auth';
import {navigateByProp} from '../navigation';
import {ErrorToast, showToastByResponse} from '../components/Toast';
import {USER_TYPE} from '../interfaces/enums';
import {store} from '../routes/store';
import {AUTH_USER_LOGIN, AUTH_SELLER_LOGIN} from '../providers/constants';
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
class AuthAction {
  async login(
    userType: USER_TYPE = USER_TYPE.USER,
    data: ILoginAPI,
    props: any,

    navigateParams = {},
  ) {
    try {
      const navigateRouteName =
        userType === USER_TYPE.SALES_USER
          ? ROUTE_NAMES.sellerProductView
          : ROUTE_NAMES.home;

      const result = await postService(
        (userType === USER_TYPE.SALES_USER ? '/seller/sales-user' : '/users') +
          '/sign-in',
        data,
      ).catch((ex) => ex.response);
      const response: IResponse = result.data;
      if (response.success) {
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
        }
        setToken(response.data.token);

        setUserType(response.data.type);
        navigateByProp(props, navigateRouteName, navigateParams);
      } else {
        showToastByResponse(response);
        return result.data;
      }
    } catch (error) {
      ErrorToast({message: error.message});
    }
  }
  async register(
    userType: USER_TYPE = USER_TYPE.USER,
    data: IRegisterAPI,
  ): Promise<IResponse> {
    const result = await postService(
      (userType === USER_TYPE.SALES_USER ? '/seller/sales-user' : '/users') +
        '/sign-up',
      data,
    ).catch((ex) => ex.response);
    return result.data;
  }
  async generateOTP(
    userType: USER_TYPE = USER_TYPE.USER,
    data: IGenAuthCodeAPI,
  ): Promise<IResponse> {
    const result = await postService(
      (userType === USER_TYPE.SALES_USER ? '/seller/sales-user' : '/users') +
        '/generate-otp',
      data,
    ).catch((ex) => ex.response);
    return result.data;
  }
  async forgotPassword(
    userType: USER_TYPE = USER_TYPE.USER,
    data: IForgotPasswordAPI,
  ): Promise<IResponse> {
    const result = await postService(
      (userType === USER_TYPE.SALES_USER ? '/seller/sales-user' : '/users') +
        '/forgot-password',
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
