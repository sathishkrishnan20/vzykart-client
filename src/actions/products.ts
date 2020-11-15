import {postService, getService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
class ProductAction {
  async createProduct(productData: any) {
    const result = await postService('/products', productData).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async getProductsBySellerId(sellerId: string): Promise<IResponse> {
    const result = await getService('/products/seller/' + sellerId).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default ProductAction;
