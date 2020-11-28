import {Item} from 'react-native-picker-select';
import {getCartItem, setCartItem} from '../services/storage-service';
import {ICartItem} from '../interfaces/classes/cart';
import {store} from '../routes/store';
import {USER_CART} from '../providers/constants';
import {IProduct, ICategoryInfo} from '../interfaces/products';
import {IS_WEB, IMAGE_BASE_URL} from '../config';
import {USER_TYPE, SLIDER_IMAGE_ACTION} from '../interfaces/enums';
import ROUTE_NAMES from '../routes/name';
import {IAddUpdate} from '../interfaces/table-component';
import {ISlider} from '../interfaces/master';

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

export const updateCartOnStorageByProductId = async (productId: string) => {
  const cartDataOnStorage = (await getCartItem()) as ICartItem[];
  const index = cartDataOnStorage.findIndex(
    (item) => item.productId === productId,
  );
  if (index === -1) {
    cartDataOnStorage.push({
      productId,
      quantity: 1,
      checked: 1,
    });
  } else {
    cartDataOnStorage[index].quantity = cartDataOnStorage[index].quantity + 1;
  }
  setCartItem(cartDataOnStorage);
  store.dispatch({
    type: USER_CART,
    cartItems: cartDataOnStorage,
  } as never);
};

export const getCartItemCountByProductId = async (productId: string) => {
  const cartDataOnStorage = (await getCartItem()) as ICartItem[];
  const itemData = cartDataOnStorage.find(
    (item) => item.productId === productId,
  );
  if (!itemData) {
    return 0;
  } else {
    return itemData.quantity;
  }
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

export const getHomeRouteByUserType = (userType: USER_TYPE) => {
  switch (userType) {
    case USER_TYPE.USER:
      return ROUTE_NAMES.home;
    case USER_TYPE.SALES_USER:
      return ROUTE_NAMES.sellerOrders;
    case USER_TYPE.ADMIN:
      return ROUTE_NAMES.adminOrders;
    case USER_TYPE.DELIVERY_PERSON:
      return ROUTE_NAMES.deliveryPersonOrders;
    default:
      return ROUTE_NAMES.home;
  }
};

export const getLoginRouteByUserType = (userType: USER_TYPE) => {
  switch (userType) {
    case USER_TYPE.USER:
      return ROUTE_NAMES.dynamicLogin.replace(':userType', 'user');
    case USER_TYPE.SALES_USER:
      return ROUTE_NAMES.dynamicLogin.replace(':userType', 'seller');
    case USER_TYPE.DELIVERY_PERSON:
      return ROUTE_NAMES.dynamicLogin.replace(':userType', 'delivery-person');
    default:
      return ROUTE_NAMES.login;
  }
};

export const convertObjectToArray = (array: IAddUpdate[][]) => {
  const finalArray = [];
  for (let index = 0; index < array.length; index++) {
    const rowElement = array[index];
    for (let index = 0; index < rowElement.length; index++) {
      const colElement = rowElement[index];
      finalArray.push([colElement]);
    }
  }
  return finalArray;
};

export const getNavigationPramsFromImageSlider = (value: ISlider) => {
  let routeName: string = '';
  let navigationParams: any = {};

  if (value.imageOnClickAction === SLIDER_IMAGE_ACTION.NAVIGATION) {
    // @ts-ignore
    routeName = ROUTE_NAMES[value.navigationRouteKey] as string;
    if (routeName) {
      navigationParams = value.navigationParams;
      Object.keys(navigationParams).forEach((paramKey) => {
        routeName = routeName.replace(
          `:${paramKey}`,
          JSON.stringify(navigationParams[paramKey]),
        );
      });
    }
  }
  return {routeName, navigationParams};
};
