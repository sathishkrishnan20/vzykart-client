import {Item} from 'react-native-picker-select';
import {IProductImage} from '../products';

export interface SellerAddProductsState {
  productPrefix: string;
  productName: string;
  productDescription: string;
  mrp: string;
  tradePrice: string;
  sellingPrice: string;
  discount: string;
  gst: string;
  sellerId: string;
  uom: string;
  unit: string;
  categories: string[] | Item[];
  selectedItems: any[];
  date: Date;
  showDatePicker: boolean;
  isLoading: boolean;
  alertVisible: boolean;
  images: IProductImage[];
}

export interface SellerViewProductsState {
  productData: SellerAddProductsState[];
  isLoading: boolean;
}

export type IProductChangeStateTypes =
  | string
  | Date
  | boolean
  | string[]
  | Item[]
  | IProductImage[];
