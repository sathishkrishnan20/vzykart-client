import {ProductAndCart} from '../../interfaces/classes/cart';
import {IUserAddress} from '../../interfaces';
import {PAYMENT_TYPE, VALID_ORDER_STATUS, BOOKING_FROM} from '../../interfaces/enums';
import {RazorPaySuccess, RazorPayFailure} from '../../interfaces/razorpay';
import {IOrderCreate, IOrderProducts} from '../../interfaces/orders';
import {getUserId} from '../../services/storage-service';
import {IS_WEB} from '../../config';
import {calculateTotalSellingAmountWithGST, calculateTotalMRPAmountWithGST} from '../../helpers';
import OrderAction from '../../actions/orders';
import {showToastByResponse} from '../../components/Toast';
export const createOrder = async (items: ProductAndCart[], deliveryAddress: IUserAddress, deliveryCharge: number, paymentType: PAYMENT_TYPE, result: RazorPayFailure | RazorPaySuccess) => {
  const {totalMRPAmountWithoutGST, totalMRPAmountWithGST, totalSellingAmountWithoutGST, totalSellingAmountWithGST, totalGstAmountForMRPPrice, totalGstAmountForSellingPrice, totalPayable, orderItems, totalDiscountAmount} = getSellingAndDiscountGSTPrice(items, deliveryCharge);
  const orderCreateRequest: IOrderCreate = {
    userId: (await getUserId()) as string,
    deliveryAddress: deliveryAddress,
    orderStatus: VALID_ORDER_STATUS.CREATED,
    totalMRPAmountWithGST,
    totalMRPAmountWithoutGST,
    totalSellingAmountWithGST,
    totalSellingAmountWithoutGST,
    totalGstAmountForMRPPrice,
    totalGstAmountForSellingPrice,
    totalDiscountAmount,
    deliveryCharge: deliveryCharge,
    totalPayableAmount: totalPayable,
    totalAmountPaid: paymentType === PAYMENT_TYPE.ONLINE ? totalPayable : 0,
    totalAmountDue: paymentType === PAYMENT_TYPE.ONLINE ? 0 : totalPayable,
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
  const orderCreateResponse = await orderAction.createNewOrder(orderCreateRequest);
  showToastByResponse(orderCreateResponse);
  return orderCreateResponse;
};

export const getSellingAndDiscountGSTPrice = (items: ProductAndCart[], deliveryCharge: number) => {
  let totalMRPAmountWithoutGST = 0;
  let totalMRPAmountWithGST = 0;
  let totalSellingAmountWithoutGST = 0;
  let totalSellingAmountWithGST = 0;

  let totalGstAmountForMRPPrice: number = 0;
  let totalGstAmountForSellingPrice: number = 0;
  let totalDiscountAmount: number = 0;
  const orderItems: IOrderProducts[] = [];

  items.forEach((productItem) => {
    const MRPAmountWithoutGST = productItem.mrp * productItem.quantity;
    const MRPAmountWithGST = calculateTotalMRPAmountWithGST(productItem, productItem.quantity);
    totalMRPAmountWithoutGST += MRPAmountWithoutGST;
    totalMRPAmountWithGST += MRPAmountWithGST;
    totalGstAmountForMRPPrice += MRPAmountWithGST - MRPAmountWithoutGST;

    const sellingAmountWithoutGST = productItem.sellingPrice * productItem.quantity;
    const sellingAmountWithGST = calculateTotalSellingAmountWithGST(productItem, productItem.quantity);
    totalSellingAmountWithoutGST += sellingAmountWithoutGST;
    totalSellingAmountWithGST += sellingAmountWithGST;
    totalGstAmountForSellingPrice += sellingAmountWithGST - sellingAmountWithoutGST;

    totalDiscountAmount += MRPAmountWithGST - sellingAmountWithGST;

    const mrpAmountWithGSTPerQuantity = calculateTotalMRPAmountWithGST(productItem, 1);
    const mrpAmountWithoutGSTPerQuantity = productItem.mrp * 1;

    const sellingAmountWithGSTPerQuantity = calculateTotalSellingAmountWithGST(productItem, 1);
    const sellingAmountWithoutGSTPerQuantity = productItem.sellingPrice * 1;

    const orderItem: IOrderProducts = {
      productId: productItem._id,
      sellerId: productItem.sellerId,
      productName: productItem.productName,
      productDescription: productItem.productDescription,

      mrpAmountWithGSTPerQty: mrpAmountWithGSTPerQuantity,
      mrpAmountWithoutGSTPerQty: mrpAmountWithoutGSTPerQuantity,
      sellingAmountWithGSTPerQty: sellingAmountWithGSTPerQuantity,
      sellingAmountWithoutGSTPerQty: sellingAmountWithoutGSTPerQuantity,
      gstAmountForMPRPricePerQty: mrpAmountWithGSTPerQuantity - mrpAmountWithoutGSTPerQuantity,
      gstAmountForSellingPricePerQty: sellingAmountWithGSTPerQuantity - sellingAmountWithoutGSTPerQuantity,
      discountAmount: mrpAmountWithGSTPerQuantity - sellingAmountWithGSTPerQuantity,
      quantity: productItem.quantity,
      gstPercentage: productItem.gstPercentage,

      uom: productItem.uom,
      unit: productItem.unit,
      image: productItem.images && productItem.images[0],
    };
    orderItems.push(orderItem);
  });
  return {
    totalMRPAmountWithoutGST,
    totalMRPAmountWithGST,
    totalSellingAmountWithoutGST,
    totalSellingAmountWithGST,
    totalGstAmountForMRPPrice,
    totalGstAmountForSellingPrice,
    totalPayable: totalSellingAmountWithGST + deliveryCharge,
    orderItems,
    totalDiscountAmount,
  };
};

const getPaymentId = (result: RazorPayFailure | RazorPaySuccess, paymentType: PAYMENT_TYPE) => {
  // @ts-ignore
  if (result.error) {
    return `err_${paymentType.toLocaleLowerCase()}_${new Date().getTime()}`;
  } else {
    // @ts-ignore
    return result.razorpay_payment_id;
  }
};

const calculatePercentageAmount = (amount: number, percentage: number) => {
  return (amount * percentage) / 100;
};
