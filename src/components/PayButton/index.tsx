import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-elements';
import {IS_WEB, RAZORPAY_KEY, RAZORPAY_LOGO_URL} from '../../config';
//@ts-ignore
import RazorpayCheckout from 'react-native-razorpay';
import colors from '../../colors';
import {postService} from '../../services/http-service';
import {ErrorToast} from '../Toast';
import {Row, Col} from 'react-native-easy-grid';
import {
  RazorPayError,
  RazorPayFailure,
  RazorPaySuccess,
} from '../../interfaces/razorpay';
import {PAYMENT_TYPE} from '../../interfaces/enums';
interface OptionsProps {
  amount: string;
  name: string;
  description: string;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: {
    address: string;
  };
}
interface IPaymentState extends OptionsProps {
  onSuccess: (paymentType: PAYMENT_TYPE, result: RazorPaySuccess) => void;
  onFailure: (paymentType: PAYMENT_TYPE, result: RazorPayFailure) => void;
}

interface IPaymentOptions extends OptionsProps {
  key: string;
  currency: string;
  image: string;
  theme: {
    color: string; // '#3399cc';
  };
  order_id?: string;
  handler?: (response: any) => void;
}

const defaultCurrency = 'INR';
export function Payment({
  amount,
  name,
  description,
  prefill,
  notes,
}: IPaymentState) {
  const [paymentOptions, setPaymentOptions] = useState({} as IPaymentOptions);
  useEffect(() => {
    const options: IPaymentOptions = {
      key: RAZORPAY_KEY,
      image: RAZORPAY_LOGO_URL,
      currency: defaultCurrency,
      name,
      description,
      amount,
      theme: {
        color: colors.themePrimary,
      },
    };
    if (notes) {
      options.notes = notes;
    }
    if (prefill) {
      options.prefill = prefill;
    }
    setPaymentOptions(options);
  }, []);

  const onHandler = async (e: any) => {
    if (IS_WEB) {
      e?.preventDefault();
      const createOrderRequestData = {
        amount: amount,
        currency: defaultCurrency,
      };
      const orderResponse = await postService(
        '/orders/razorpay',
        createOrderRequestData,
      );
      if (orderResponse.status === 200 && orderResponse.data.id) {
        const orderId = orderResponse.data.id;
        paymentOptions.order_id = orderId;
        paymentOptions.handler = (response: RazorPaySuccess) => {
          onSuccess(response);
        };
        // @ts-ignore
        const rzp1 = new window.Razorpay(paymentOptions);
        rzp1.on('payment.failed', function (response: RazorPayFailure) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      } else {
        ErrorToast({message: 'Payment Creation Failed'});
      }
    } else {
      RazorpayCheckout.open(paymentOptions)
        .then((data: RazorPaySuccess) => {
          onSuccess(data);
        })
        .catch((error: RazorPayError) => {
          alert(`Error: ${error.code} | ${error.description}`);
        });
    }
  };
  const onSuccess = (response: RazorPaySuccess) => {
    alert('PaymentId: ' + response.razorpay_payment_id);
    alert('OrderId: ' + response.razorpay_order_id);
    alert('Signature: ' + response.razorpay_signature);
  };
  const onCOD = () => {};
  return (
    <Row>
      <Col>
        <Button title={'Cash On Delivery'} onPress={onCOD}></Button>
      </Col>

      <Col>
        <Button title={'Pay Online'} onPress={onHandler}></Button>
      </Col>
    </Row>
  );
}
