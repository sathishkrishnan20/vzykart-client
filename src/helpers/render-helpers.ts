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
    return 4;
  } else if (width > 1600 && width <= 2000) {
    return 5;
  } else if (width < 2000) {
    return 6;
  }
  return 6;
};
export {getNoOfColumns};
