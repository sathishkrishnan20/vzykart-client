import {postService} from '../services/http-service';
class ProductAction {
  async createProduct(productData: any) {
    const result = await postService('/products', productData).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default ProductAction;
