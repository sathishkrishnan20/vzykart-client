import {INPUT_COMPONENT, CRUD} from './enums';
import {Item} from 'react-native-picker-select';
import {IProductImage} from './products';
import {IProductChangeStateTypes} from './classes/seller-add-products';

export interface IAddUpdate {
  component: INPUT_COMPONENT;
  label: string;
  stateKey: string;
  value: string | object | number | boolean | string[];
  disabled?: boolean;
  selectionItems?: Item[];
  onSelectedItemsChange?: Function;
  showDatePicker?: boolean;
  showDatePickerStateKey?: string;
  changeState?: (value: IProductChangeStateTypes) => void;
}

export interface ITableAddUpdate {
  componentData: IAddUpdate[][];
  changeState: (key: string, value: IProductChangeStateTypes) => void;
}

export interface TableHeader {
  label: string;
  node: string;
}
[];

export interface IViewTableComponentProp {
  headerData: TableHeader[];
  valueData: any[];
  uniqueIdKeyName: string;
  showActions: boolean;
  actionButtons?: CRUD[];
  viewAction?: (id: string) => void;
  editAction?: (id: string) => void;
  deleteAction?: (id: string) => void;
}
