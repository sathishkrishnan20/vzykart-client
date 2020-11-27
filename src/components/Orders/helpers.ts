import {VALID_ORDER_STATUS, USER_TYPE} from '../../interfaces/enums';
import colors from '../../colors';
import {IOrderStatusUpdateButton} from '../../interfaces/orders';

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
      return 'Your Items are picked and it is arriving Soon';
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

export const getFollowUpStatusUpdateButtons = (
  orderStatus: VALID_ORDER_STATUS,
  userType: USER_TYPE,
) => {
  const approveButton: IOrderStatusUpdateButton = {
    label: 'Approve',
    value: VALID_ORDER_STATUS.APPROVED,
    style: {
      backgroundColor: colors.green,
      borderColor: colors.gray,
    },
  };
  const cancelButton: IOrderStatusUpdateButton = {
    label: 'Cancel',
    value: VALID_ORDER_STATUS.CANCELED,
    style: {
      backgroundColor: colors.red,
      borderColor: colors.gray,
    },
  };
  const deliveryBoyAssignedButton: IOrderStatusUpdateButton = {
    label: 'Assign Delivery Person',
    value: VALID_ORDER_STATUS.DELIVERY_BOY_ASSIGNED,
    style: {
      backgroundColor: colors.green,
      borderColor: colors.gray,
    },
  };
  const outForDeliveryButton: IOrderStatusUpdateButton = {
    label: 'Out for Delivery',
    value: VALID_ORDER_STATUS.OUT_FOR_DELIVERY,
    style: {
      backgroundColor: colors.green,
      borderColor: colors.gray,
    },
  };
  const deliveredButton: IOrderStatusUpdateButton = {
    label: 'Delivered',
    value: VALID_ORDER_STATUS.DELIVERED,
    style: {
      backgroundColor: colors.green,
      borderColor: colors.gray,
    },
  };
  if (userType === USER_TYPE.SALES_USER) {
    switch (orderStatus) {
      case VALID_ORDER_STATUS.CREATED:
        return [cancelButton, approveButton];
      case VALID_ORDER_STATUS.APPROVED:
        return [deliveryBoyAssignedButton];
      case VALID_ORDER_STATUS.DELIVERY_BOY_ASSIGNED:
        return [outForDeliveryButton];
      case VALID_ORDER_STATUS.OUT_FOR_DELIVERY:
        return [deliveredButton];
      case VALID_ORDER_STATUS.DELIVERED:
        deliveredButton.disabled = true;
        return [deliveredButton];
      default:
        return [];
    }
  } else if (USER_TYPE.USER) {
    // for now There is no status Update for USER. even Canceling the Order is not allowed
    return [];
  } else if (USER_TYPE.DELIVERY_PERSON) {
    switch (orderStatus) {
      case VALID_ORDER_STATUS.DELIVERY_BOY_ASSIGNED:
        return [outForDeliveryButton];
      case VALID_ORDER_STATUS.OUT_FOR_DELIVERY:
        return [deliveredButton];
      default:
        return [];
    }
  }
  return [];
};
