import {postService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
interface Validate {
  promoCode: string;
  userType: string;
  userId: string;
  amountToApplyPromoCode: number;
}

class PromoCodeAction {
  async validatePromoCode(data: Validate): Promise<IResponse> {
    const result = await postService('/promo-code/validate', data).catch((ex) => ex.response);
    return result.data;
  }
  async applyPromoCode(data: Validate): Promise<IResponse> {
    const result = await postService('/promo-code/apply', data).catch((ex) => ex.response);
    return result.data;
  }
}
export default PromoCodeAction;
