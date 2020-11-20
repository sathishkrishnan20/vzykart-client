import {Item} from 'react-native-picker-select';
import {getCartItem, setCartItem} from '../services/storage-service';
import {ICartItem} from '../interfaces/classes/cart';
import {store} from '../routes/store';
import {USER_CART} from '../providers/constants';

export const getMultiSelectValues = (array: string[] | Item[]): string[] => {
  const finalArray: string[] = [];
  array.forEach((item: Item | string) =>
    finalArray.push(typeof item === 'string' ? item : item.label),
  );
  return finalArray;
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
