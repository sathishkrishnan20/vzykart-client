import {IUserAddress} from '.';
export interface ICategoryInfo {
  _id: string;
  category: string;
}
export interface ICreateProduct {
  productId?: string;
  sellerId: string;
  productName: string;
  productDescription: string;
  mrp: number;
  sellingPrice: number;
  discount: number;
  gstPercentage: number;
  uom: string;
  unit: string;
  categories?: ICategoryInfo[];
  images?: IProductImage[];
  rupeeSymbol?: string;
}

export interface IProduct extends ICreateProduct {
  _id: string;
  productId: string;
  specifications?: {
    specificationKey: string;
    value: string;
  }[];
  reviews?: {
    userName: string;
    userId: string;
    comment: string;
  }[];
  ratings?: number;
  sellerInfo?: {
    sellerName: string;
    location: IUserAddress;
  };
}

export interface IProductImage {
  destinationPath: string;
  optimizedDestinationPath: string;
  active: boolean;
}

export interface IProductListState {
  productData: IProduct[];
  isLoading: boolean;
}
