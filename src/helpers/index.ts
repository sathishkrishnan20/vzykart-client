import {Item} from 'react-native-picker-select';

export const getMultiSelectValues = (array: string[] | Item[]): string[] => {
  const finalArray: string[] = [];
  array.forEach((item: Item | string) =>
    finalArray.push(typeof item === 'string' ? item : item.label),
  );
  return finalArray;
};
