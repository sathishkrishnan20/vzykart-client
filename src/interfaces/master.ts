import {IProductImage} from './products';
import {SLIDER_IMAGE_ACTION} from './enums';

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

export interface ISlider {
  _id: string;
  sliderImage: IProductImage;
  imageOnClickAction: SLIDER_IMAGE_ACTION;
  navigationRouteKey: string;
  navigationParams: any;
  active: boolean;
}
