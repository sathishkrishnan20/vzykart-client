import {postService, getService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {
  IRegisterAPI,
  ILoginAPI,
  IForgotPasswordAPI,
  IGenAuthCodeAPI,
} from '../interfaces/actions/auth';
class AuthAction {
  async login(productData: ILoginAPI) {
    const result = await postService('/products', productData).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async register(data: IRegisterAPI): Promise<IResponse> {
    const result = await postService('/users/sign-up', data).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async forgotPassword(data: IForgotPasswordAPI): Promise<IResponse> {
    const result = await getService('/products/shop/' + data).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default AuthAction;
