import {getService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
class SellerAction {
  async getAllSellers(): Promise<IResponse> {
    const result = await getService('/seller/list').catch((ex) => ex.response);
    return result.data;
  }
}
export default SellerAction;
