import {Item} from 'react-native-picker-select';
import {getCartItem, setCartItem} from '../services/storage-service';
import {ICartItem} from '../interfaces/classes/cart';
import {store} from '../routes/store';
import {USER_CART} from '../providers/constants';
import {IProduct, ICategoryInfo} from '../interfaces/products';
import {IS_WEB, IMAGE_BASE_URL} from '../config';

export const getCategoryValues = (
  array: string[] | Item[],
): ICategoryInfo[] => {
  const finalArray: ICategoryInfo[] = [];
  array.forEach((item: Item | string) => {
    if (typeof item === 'string') {
      finalArray.push({
        _id: item,
        category: item,
      });
    } else {
      finalArray.push({
        _id: item.value,
        category: item.label,
      });
    }
  });
  return finalArray;
};

export const getMultiSelectCategoryValues = (
  array: ICategoryInfo[],
): Item[] | string[] => {
  return array.map((item) => {
    if (IS_WEB) {
      return {
        label: item.category,
        value: item._id,
      };
    } else {
      return item._id;
    }
  }) as Item[] | string[];
};

export const updateCartOnStorage = async (productId: string, qty: number) => {
  const cartDataOnStorage = (await getCartItem()) as ICartItem[];
  const productDataIndexOnStorage = cartDataOnStorage.findIndex(
    (item) => item.productId === productId,
  );
  if (productDataIndexOnStorage === -1) {
    cartDataOnStorage.push({
      productId,
      quantity: qty,
      checked: 1,
    });
  } else {
    if (qty === 0) {
      // cartDataOnStorage.splice(productDataIndexOnStorage, 1);
    } else {
      cartDataOnStorage[productDataIndexOnStorage].quantity = qty;
    }
  }
  setCartItem(cartDataOnStorage);
  store.dispatch({
    type: USER_CART,
    cartItems: cartDataOnStorage,
  } as never);
};

export const updateCartDataOnStorage = async (cartItems: ICartItem[]) => {
  setCartItem(cartItems);
  store.dispatch({
    type: USER_CART,
    cartItems: cartItems,
  } as never);
};

export const calculateTotalSellingAmountWithGST = (
  productItem: IProduct,
  quantity: number,
) => {
  return quantity * (productItem.sellingPrice + productItem.gst || 0);
};

export const calculateTotalMRPAmountWithGST = (
  productItem: IProduct,
  quantity: number,
) => {
  return quantity * (productItem.mrp + productItem.gst || 0);
};

export const getImageLink = (url?: string) => {
  if (!url) {
    return;
  }
  if (
    url.indexOf('http://') > 0 ||
    url.indexOf('https://') > 0 ||
    url.indexOf('www.') === 0
  ) {
    return url;
  } else {
    // URL is relative
    return IMAGE_BASE_URL + url;
  }
};
