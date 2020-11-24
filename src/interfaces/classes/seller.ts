import {IProductImage} from '../products';
import {IUserAddress} from '..';

export interface ISeller {
  _id: string;
  sellerId: string;
  sellerName: string;
  sellerDescription: string;
  location: IUserAddress;
  sellerThumbImage: IProductImage;
}

export interface ISellerFlatten {
  _id: string;
  sellerId: string;
  sellerName: string;
  sellerDescription: string;
  sellerThumbImage: IProductImage;
  'location.name': string;
  'location.coordinates'?: number[];
  'location.type'?: 'Point';
  'location.no_and_street': string;
  'location.address_line_1'?: string;
  'location.post_office_name'?: string;
  'location.district': string;
  'location.city': string;
  'location.state': string;
  'location.country': string;
  'location.pin_code': number | string;
  'location.locality'?: string;
  'location.contactNumber': string;
}
