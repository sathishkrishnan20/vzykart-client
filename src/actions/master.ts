import {getService, putService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';

class MasterAction {
  async getUOM(): Promise<IResponse> {
    const result = await getService('/master/uom').catch((ex) => ex.response);
    return result.data;
  }

  async getCategories(): Promise<IResponse> {
    const result = await getService('/master/category').catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default MasterAction;
