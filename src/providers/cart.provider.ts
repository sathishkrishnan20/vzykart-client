import {USER_CART} from '../providers/constants';
import {USER_TYPE} from '../interfaces/enums';
import {ICartItem} from '../interfaces/classes/cart';
interface ICartProviderState {
  type?: string;
  userId: string;
  cartItems: ICartItem[];
}

export const userInitialState: ICartProviderState = {
  userId: '',
  cartItems: [],
};
// State
export default (state = userInitialState, action: ICartProviderState) => {
  switch (action.type) {
    case USER_CART:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    default:
      return state;
  }
};
