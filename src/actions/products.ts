import {postService, getService, putService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
class ProductAction {
  async createProduct(productData: any) {
    const result = await postService('/products', productData).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async updateProduct(productId: string, productData: any) {
    const result = await putService(
      '/products/' + productId,
      productData,
    ).catch((ex) => ex.response);
    return result.data;
  }

  async getProductsByFilters(filtersData: any): Promise<IResponse> {
    const result = await postService('/products/filters', filtersData).catch(
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
  async getProductByProductId(productId: string): Promise<IResponse> {
    const result = await getService('/products/' + productId).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async getProductsByMultipleIds(productIds: string): Promise<IResponse> {
    const result = await getService('/products/multi/' + productIds).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default ProductAction;
