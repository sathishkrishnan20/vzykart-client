import {getService, postService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {ISellerCreateRequest} from '../interfaces/classes/seller';
class SellerAction {
  async getAllSellers(): Promise<IResponse> {
    const result = await getService('/seller/list').catch((ex) => ex.response);
    return result.data;
  }
  async createSeller(data: ISellerCreateRequest): Promise<IResponse> {
    const result = await postService('/seller', data).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default SellerAction;
