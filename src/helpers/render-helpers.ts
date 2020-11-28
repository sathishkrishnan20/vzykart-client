import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const getNoOfColumns = () => {
  if (width > 0 && width <= 300) {
    return 1;
  } else if (width > 300 && width <= 600) {
    return 2;
  } else if (width > 600 && width <= 900) {
    return 3;
  } else if (width > 900 && width <= 1600) {
    return 7;
  } else if (width > 1600 && width <= 2000) {
    return 7;
  } else if (width < 2000) {
    return 8;
  }
  return 8;
};
const keyExtractor = (
  item: any,
  index: number = Number(Math.random().toPrecision(3)),
) => {
  if (item.key) {
    return String(item.key);
  }
  return String(index);
};
export {getNoOfColumns, keyExtractor};
