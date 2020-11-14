export interface ICreateProduct {
  shopId: string;
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
  productId: number;
  imageUrl?: string;
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
  shop?: {
    name: string;
    location: string;
  };
}

export interface IProductImage {
  destinationPath: string;
  optimizedDestinationPath: string;
  active: boolean;
}
