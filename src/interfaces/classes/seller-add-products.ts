import {Item} from 'react-native-picker-select';

export interface SellerAddProductsState {
  productPrefix: string;
  productName: string;
  productDescription: string;
  mrp: number;
  tradePrice: number;
  sellingPrice: number;
  discount: number;
  gst: number;
  shopId: string;
  uom: string;
  unit: string;
  categories: Item[];
  selectedItems: any[];
  date: Date;
  showDatePicker: boolean;
  isLoading: boolean;
  alertVisible: boolean;
}
