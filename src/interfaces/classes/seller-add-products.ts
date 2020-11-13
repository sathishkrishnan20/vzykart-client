import {Item} from 'react-native-picker-select';

export interface SellerAddProductsState {
  productPrefix: string;
  productName: string;
  productDescription: string;
  mrp: string;
  tradePrice: string;
  sellingPrice: string;
  discount: string;
  gst: string;
  shopId: string;
  uom: string;
  unit: string;
  categories: string[] | Item[];
  selectedItems: any[];
  date: Date;
  showDatePicker: boolean;
  isLoading: boolean;
  alertVisible: boolean;
}

export interface SellerViewProductsState {
  productData: SellerAddProductsState[];
  isLoading: boolean;
}
