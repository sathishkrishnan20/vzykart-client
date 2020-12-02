import {IProduct} from '../products';

export interface ICartItem {
  productId: string;
  quantity: number;
  checked?: number;
}
export interface ProductAndCart extends IProduct, ICartItem {}

export interface ICartScreenState {
  cartItemsIsLoading: boolean;
  selectAll: boolean;
  cartItems: ProductAndCart[];
  refreshCount: number;
  visibleConfirmCartDeleteModal: boolean;
}
