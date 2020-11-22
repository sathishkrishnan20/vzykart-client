import {USER_CART, UPDATE_CART_ITEMS} from '../providers/constants';
import {ICartItem} from '../interfaces/classes/cart';
interface ICartProviderState {
  type?: string;
  userId: string;
  cartItems: ICartItem[];
  tempCartItems: ICartItem[];
}

export const userInitialState: ICartProviderState = {
  userId: '',
  cartItems: [],
  tempCartItems: [],
};
// State
export default (state = userInitialState, action: ICartProviderState) => {
  switch (action.type) {
    case USER_CART:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case UPDATE_CART_ITEMS:
      return {
        ...state,
        tempCartItems: action.cartItems,
      };
    default:
      return state;
  }
};
