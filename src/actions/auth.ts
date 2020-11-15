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
class AuthAction {
  async login(
    userType: USER_TYPE = USER_TYPE.USER,
    data: ILoginAPI,
    props: any,

    navigateParams = {},
  ) {
    try {
      const navigateRouteName =
        userType === USER_TYPE.SALES_USER ? '/seller/product/view' : '/Home';

      const result = await postService(
        (userType === USER_TYPE.SALES_USER ? '/seller/sales-user' : '/users') +
          '/sign-in',
        data,
      ).catch((ex) => ex.response);
      const response: IResponse = result.data;
      if (response.success) {
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
}
export default AuthAction;
