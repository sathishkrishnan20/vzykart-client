import {getService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {ISlider} from '../interfaces/master';
interface ISliderResponse extends IResponse {
  data: ISlider[];
}
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

  async getSliderImages(): Promise<ISliderResponse> {
    const result = await getService('/master/slider').catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default MasterAction;
