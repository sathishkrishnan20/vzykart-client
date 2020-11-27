import {getService, postService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {IDeliveryPersonCreateRequest} from '../interfaces/classes/delivery-person';

class DeliveryPersonAction {
  async getAllDeliveryPersonByAdmin(): Promise<IResponse> {
    const result = await getService('/admin/delivery-person/list').catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async createDeliveryByAdmin(
    data: IDeliveryPersonCreateRequest,
  ): Promise<IResponse> {
    const result = await postService(`/admin/delivery-person`, data).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default DeliveryPersonAction;
