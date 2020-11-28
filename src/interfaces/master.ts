import {IProductImage} from './products';

export interface IUOM {
  uom: string;
  _id: string;
  active: boolean;
}

export interface ICategory {
  category: string;
  _id: string;
  categoryImage: IProductImage;
  active: boolean;
}
