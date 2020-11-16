import {IProductImage} from '../products';

export interface ISeller {
  _id: string;
  sellerId: string;
  sellerName: string;
  sellerDescription: string;
  location: string;
  sellerThumbImage: IProductImage;
}
