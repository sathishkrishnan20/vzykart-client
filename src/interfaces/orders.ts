import {IUserAddress} from '.';
import {VALID_ORDER_STATUS, BOOKING_FROM, PAYMENT_TYPE} from './enums';
import {IProductImage} from './products';
import {ViewStyle, StyleProp} from 'react-native';
import {Item} from 'react-native-picker-select';
export interface IOrderProducts {
  productId: string;
  sellerId: string;
  productName: string;
  quantity: number;
  productDescription: string;
  amount: number; // amount without Discount and tax details
  gstAmount: number;
  discountAmount: number;
  totalAmount: number; // // amount with Discount and tax details
  uom: string;
  unit: string;
  image?: IProductImage;
  active?: boolean;
  sellerInfo?: {
    _id: string;
    sellerName: string;
    sellerDescription: string;
  };
}

export interface IOrderCreate {
  userId: string;
  deliveryAddress: IUserAddress;
  orderStatus: VALID_ORDER_STATUS;
  amount: number; // amount without Discount and tax details
  gstAmount: number;
  discountAmount: number;
  deliveryCharge: number;
  totalAmount: number; // amount with Discount and tax details

  // PAYMENTS
  paymentId: string;
  totalAmountPaid: number;
  totalAmountDue: number;
  booking_from: BOOKING_FROM;
  isPaymentError: boolean;
  paymentErrorMessage: string;
  paymentMode: PAYMENT_TYPE;
  orderItems: IOrderProducts[];
}

export interface IOrder extends IOrderCreate {
  _id: string;
  orderId: string;
  invoiceNumber: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  userInfo?: {
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
  };
}

export interface IOrderStatusUpdateButton {
  value: VALID_ORDER_STATUS;
  label: string;
  style: StyleProp<ViewStyle>;
  disabled?: boolean;
}

// Order Card Component
export interface IOrderCard {
  orderData: IOrder;
}
export interface IOrderOnChangeStatusProp {
  orderStatus: VALID_ORDER_STATUS;
  deliveryPersonId?: string;
  deliveryBoyAssignedDate?: Date;
}
export interface IStatusUpdateActions {
  statusUpdateButtons?: IOrderStatusUpdateButton[];
  onChangeStatus?: (value: IOrderOnChangeStatusProp) => void;
  deliveryPersonList?: Item[];
}
export interface IOrderCardState extends IOrderCard, IStatusUpdateActions {
  onClick: () => void;
  disabled?: boolean;
}
