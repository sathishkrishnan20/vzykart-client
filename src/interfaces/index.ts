import {RouteComponentProps} from 'react-router-dom';
import {StackScreenProps} from '@react-navigation/stack';
export interface ComponentProp
  extends RouteComponentProps,
    StackScreenProps<any, any> {}

export interface IUserAddress {
  no_and_street: string;
  address_line_1?: string;
  post_office_name?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  pin_code: number;
  locality: string;
}
