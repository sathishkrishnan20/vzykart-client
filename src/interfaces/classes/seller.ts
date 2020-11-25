import {IProductImage} from '../products';
import {IUserAddress} from '..';

export interface ISellerCreateRequest {
  sellerName: string;
  sellerDescription: string;
  location: IUserAddress;
  sellerThumbImage: IProductImage;
  mobileNumber: string;
  contactName: string;
  email: string;
}

export interface ISeller extends ISellerCreateRequest {
  _id: string;
  sellerId: string;
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
