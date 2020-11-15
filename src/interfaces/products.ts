export interface ICreateProduct {
  sellerId: string;
  productName: string;
  productDescription: string;
  mrp: number;
  tradePrice: number;
  sellingPrice: number;
  discount: number;
  gst: number;
  uom: string;
  unit: string;
  categories: string[];
  images: IProductImage[];

  rupeeSymbol?: string;
}

export interface IProduct extends ICreateProduct {
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
  seller?: {
    name: string;
    location: string;
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
