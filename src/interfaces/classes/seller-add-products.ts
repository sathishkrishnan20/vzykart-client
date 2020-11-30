import {Item} from 'react-native-picker-select';
import {IProductImage} from '../products';
import {CRUD} from '../enums';
import {IUOM} from '../master';

export interface SellerAddProductsState {
  productId: string;
  productPrefix: string;
  productName: string;
  productDescription: string;
  mrp: string;
  sellingPrice: string;
  discount: string;
  gstPercentage: string;
  sellerId: string;
  uom: string;
  unit: string;
  selectedCategories: string[] | Item[];
  images: IProductImage[];

  date: Date;
  showDatePicker: boolean;
  isLoading: boolean;
  alertVisible: boolean;
  disableInputs: boolean;
  crudType: CRUD;
  uomData: Item[];
  categoryData: Item[];
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
