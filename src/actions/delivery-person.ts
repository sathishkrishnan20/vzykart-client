import {getService, postService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {
  IDeliveryPersonCreateRequest,
  IDeliveryPerson,
} from '../interfaces/classes/delivery-person';
import {Item} from 'react-native-picker-select';

class DeliveryPersonAction {
  async getAllDeliveryPersons(): Promise<IResponse> {
    const result = await getService('/delivery-person/list').catch(
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

  async getAllDeliveryPersonsAsItem(): Promise<Item[]> {
    const result = await getService('/delivery-person/list').catch(
      (ex) => ex.response,
    );
    const response = result.data;
    if (response.success) {
      const data: IDeliveryPerson[] = response.data;
      const items: Item[] = data.map((personInfo) => {
        return {
          label: `${personInfo.firstName} ${personInfo.lastName}`,
          value: personInfo._id,
        };
      });
      return items;
    }
    return [];
  }
}

export default DeliveryPersonAction;
