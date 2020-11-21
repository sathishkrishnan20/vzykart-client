import {ProductAndCart} from '../../interfaces/classes/cart';
import {IUserAddress} from '../../interfaces';
import {
  PAYMENT_TYPE,
  VALID_ORDER_STATUS,
  BOOKING_FROM,
} from '../../interfaces/enums';
import {RazorPaySuccess, RazorPayFailure} from '../../interfaces/razorpay';
import {IOrderCreate, IOrderItem} from '../../interfaces/orders';
import {getUserId} from '../../services/storage-service';
import {IS_WEB} from '../../config';
import {
  calculateTotalSellingAmountWithGST,
  calculateTotalMRPAmountWithGST,
} from '../../helpers';
import OrderAction from '../../actions/orders';
import {showToastByResponse} from '../../components/Toast';
export const createOrder = async (
  items: ProductAndCart[],
  deliveryAddress: IUserAddress,
  deliveryCharge: number,
  paymentType: PAYMENT_TYPE,
  result: RazorPayFailure | RazorPaySuccess,
) => {
  const {
    totalSellingPrice,
    totalGstPrice,
    totalDiscountPrice,
    totalPriceToBePaid,
    orderItems,
  } = getSellingAndDiscountGSTPrice(items, deliveryCharge);
  const orderCreateRequest: IOrderCreate = {
    userId: (await getUserId()) as string,
    deliveryAddress: deliveryAddress,
    orderStatus: VALID_ORDER_STATUS.CREATED,
    amount: totalSellingPrice,
    gstAmount: totalGstPrice,
    discountAmount: totalDiscountPrice,
    deliveryCharge: deliveryCharge,
    totalAmount: totalPriceToBePaid,
    totalAmountPaid:
      paymentType === PAYMENT_TYPE.ONLINE ? totalPriceToBePaid : 0,
    totalAmountDue:
      paymentType === PAYMENT_TYPE.ONLINE ? 0 : totalPriceToBePaid,
    paymentMode: paymentType,
    booking_from: IS_WEB ? BOOKING_FROM.WEB : BOOKING_FROM.APPLICATION,
    orderItems: orderItems,

    // @ts-ignore
    paymentErrorMessage: result.error ? result.error.description : '',
    // @ts-ignore
    paymentId: getPaymentId(result, paymentType),
    // @ts-ignore
    isPaymentError: result.error ? true : false,
  };
  const orderAction = new OrderAction();
  const orderCreateResponse = await orderAction.createNewOrder(
    orderCreateRequest,
  );
  showToastByResponse(orderCreateResponse);
  return orderCreateResponse;
};

export const getSellingAndDiscountGSTPrice = (
  items: ProductAndCart[],
  deliveryCharge: number,
) => {
  let totalSellingPrice = 0;
  let totalGstPrice = 0;
  let totalMRPPrice = 0;
  const orderItems: IOrderItem[] = [];

  items.forEach((productItem) => {
    totalSellingPrice += calculateTotalSellingAmountWithGST(
      productItem,
      productItem.quantity,
    );
    totalMRPPrice += calculateTotalMRPAmountWithGST(
      productItem,
      productItem.quantity,
    );

    totalGstPrice += productItem.quantity * productItem.gst;
    // totalDiscountPrice += productItem.quantity * (productItem.mrp - productItem.sellingPrice);
    const orderItem: IOrderItem = {
      productId: productItem._id,
      sellerId: productItem.sellerId,
      productName: productItem.productName,
      productDescription: productItem.productDescription,
      amount: productItem.sellingPrice,
      discountAmount: productItem.mrp - productItem.sellingPrice,
      totalAmount: calculateTotalSellingAmountWithGST(
        productItem,
        productItem.quantity,
      ),
      quantity: productItem.quantity,
      gstAmount: productItem.gst,
      uom: productItem.uom,
      unit: productItem.unit,
      image: productItem.images && productItem.images[0],
    };
    orderItems.push(orderItem);
  });
  return {
    totalSellingPrice,
    totalMRPPrice,
    totalGstPrice,
    totalDiscountPrice: totalMRPPrice - totalSellingPrice,
    totalPriceToBePaid: totalSellingPrice + deliveryCharge,
    orderItems,
  };
};

const getPaymentId = (
  result: RazorPayFailure | RazorPaySuccess,
  paymentType: PAYMENT_TYPE,
) => {
  // @ts-ignore
  if (result.error) {
    return `err_${paymentType.toLocaleLowerCase()}_${new Date().getTime()}`;
  } else {
    // @ts-ignore
    return result.razorpay_payment_id;
  }
};
