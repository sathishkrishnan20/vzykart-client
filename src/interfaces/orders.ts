import {IUserAddress} from '.';
import {VALID_ORDER_STATUS, BOOKING_FROM, PAYMENT_TYPE} from './enums';
import {IProductImage} from './products';
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
  orderItems: IOrderItem[];
}

export interface IOrderItem {
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
}
