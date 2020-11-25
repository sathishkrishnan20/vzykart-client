import {RouteComponentProps} from 'react-router-dom';
import {StackScreenProps} from '@react-navigation/stack';
import {USER_TYPE} from './enums';
import {IProductImage} from './products';
export interface ComponentProp
  extends RouteComponentProps,
    StackScreenProps<any, any> {}

export interface IUserAddress {
  name: string;
  coordinates?: number[];
  type?: 'Point';
  no_and_street: string;
  address_line_1?: string;
  post_office_name?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  pin_code: number | string;
  locality?: string;
  contactNumber?: string;
}

export interface IUserInfo {
  _id?: string;
  email?: string;
  mobileNumber?: string;
  type?: USER_TYPE;
  userName?: string;
  profileImage?: IProductImage;
  address?: IUserAddress[];
  lastName?: string;
  firstName?: string;
}
