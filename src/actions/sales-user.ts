import {getService, postService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
class SalesUserAction {
  async getAllSalesUserByAdmin(): Promise<IResponse> {
    const result = await getService('/admin/sales-users/list').catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async getAllSalesUserBySellerId(sellerId: string): Promise<IResponse> {
    const result = await getService(`/seller/${sellerId}/sales-users`).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default SalesUserAction;
