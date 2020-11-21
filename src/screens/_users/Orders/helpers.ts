import {VALID_ORDER_STATUS} from '../../../interfaces/enums';
import colors from '../../../colors';

export const getUserMessageByOrderStatus = (
  orderStatus: VALID_ORDER_STATUS,
) => {
  switch (orderStatus) {
    case VALID_ORDER_STATUS.CREATED:
      return 'Order Created Waiting For Seller Approval';
    case VALID_ORDER_STATUS.APPROVED:
      return 'Your Order is Approved, we will assign Delivery boy soon';
    case VALID_ORDER_STATUS.DELIVERY_BOY_ASSIGNED:
      return 'Delivery boy assigned. and he is Reaching a shop to pick your Order';
    case VALID_ORDER_STATUS.OUT_FOR_DELIVERY:
      return 'Your Items are picked by and it is arriving Soon';
    case VALID_ORDER_STATUS.DELIVERED:
      return 'Your Order has been Delivered';
    case VALID_ORDER_STATUS.CANCELED:
      return 'Your Order has Cancelled';
    default:
      return orderStatus;
  }
};

export const getColorByOrderStatus = (orderStatus: VALID_ORDER_STATUS) => {
  switch (orderStatus) {
    case VALID_ORDER_STATUS.CREATED:
      return colors.themePrimary;
    case VALID_ORDER_STATUS.APPROVED:
      return colors.green;
    case VALID_ORDER_STATUS.DELIVERY_BOY_ASSIGNED:
      return '#800000';
    case VALID_ORDER_STATUS.OUT_FOR_DELIVERY:
      return '#800000';
    case VALID_ORDER_STATUS.DELIVERED:
      return colors.green;
    case VALID_ORDER_STATUS.CANCELED:
      return colors.red;
    default:
      return colors.black;
  }
};
