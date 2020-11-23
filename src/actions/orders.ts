import {getService, postService, putService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {IOrderCreate} from '../interfaces/orders';
class OrderAction {
  async createNewOrder(data: IOrderCreate): Promise<IResponse> {
    const result = await postService('/orders/', data).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async getOrdersByUserId(userId: string): Promise<IResponse> {
    const result = await getService('/orders/user/' + userId).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async getOrdersByOrderId(orderId: string): Promise<IResponse> {
    const result = await getService('/orders/' + orderId).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async getOrdersBySellerId(sellerId: string): Promise<IResponse> {
    const result = await getService('/orders/seller/' + sellerId).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async updateOrdersByOrderId(orderId: string, data: any): Promise<IResponse> {
    const result = await putService('/orders/' + orderId, data).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default OrderAction;
