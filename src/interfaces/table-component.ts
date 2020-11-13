import {INPUT_COMPONENT} from './enums';
import {Item} from 'react-native-picker-select';

export interface IAddUpdate {
  component: INPUT_COMPONENT;
  label: string;
  stateKey: string;
  value: string | object | number | boolean | string[];
  selectionItems?: Item[];
  onSelectedItemsChange?: Function;
  showDatePicker?: boolean;
  showDatePickerStateKey?: string;
}

export interface ITableAddUpdate {
  componentData: IAddUpdate[][];
  changeState: (
    key: string,
    value: string | Date | boolean | string[] | Item[],
  ) => void;
}
