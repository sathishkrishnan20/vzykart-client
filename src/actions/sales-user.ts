import {getService, postService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {ISalesUserCreateRequest} from '../interfaces/classes/sales-user';
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
  async createSalesUserByAdmin(
    data: ISalesUserCreateRequest,
  ): Promise<IResponse> {
    const result = await postService(`/admin/sales-users`, data).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async createSalesUserBySeller(
    data: ISalesUserCreateRequest,
  ): Promise<IResponse> {
    const result = await postService(`/seller/sales-user`, data).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default SalesUserAction;
