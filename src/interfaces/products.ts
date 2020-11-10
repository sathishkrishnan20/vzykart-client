export interface IProduct {
  productName: string;
  productDescription: string;
  price: number;
  rupeeSymbol: string;
  catagories: string[];
  imageUrl: string;
  imageUrls?: string[];
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
