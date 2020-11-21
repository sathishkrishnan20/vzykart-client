import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {IOrder} from '../../../interfaces/orders';
import {Text, Card} from 'react-native-elements';
import {Row, Col, Grid} from 'react-native-easy-grid';
import {IS_BIG_SCREEN} from '../../../config';
import {getUserMessageByOrderStatus, getColorByOrderStatus} from './helpers';
import Address from '../../../components/Address';

interface IOrderCard {
  orderData: IOrder;
}
interface IOrderCardState extends IOrderCard {
  onClick: () => void;
  disabled?: boolean;
}

export const OrderCard = ({
  orderData,
  onClick,
  disabled = false,
}: IOrderCardState) => {
  return IS_BIG_SCREEN ? (
    <TouchableHighlight disabled={disabled} onPress={onClick}>
      <OrderCardBigScreen orderData={orderData} />
    </TouchableHighlight>
  ) : (
    <TouchableOpacity disabled={disabled} onPress={onClick}>
      <Card containerStyle={{margin: 4}}>
        <RenderProductData orderData={orderData} />
        <RenderPaymentData orderData={orderData} />
        <RenderOrderStatusData orderData={orderData} />
      </Card>
    </TouchableOpacity>
  );
};

export const OrderCardBigScreen = ({orderData}: IOrderCard) => {
  return (
    <Card>
      <Grid>
        <Col>
          <RenderProductData orderData={orderData} />
          <RenderOrderStatusData orderData={orderData} />
        </Col>
        <Col>
          <RenderPaymentData orderData={orderData} />
        </Col>
        {orderData.deliveryAddress ? (
          <Col>
            <Address data={orderData.deliveryAddress} />
          </Col>
        ) : null}
      </Grid>
    </Card>
  );
};

const RenderProductData = ({orderData}: IOrderCard) => {
  return (
    <View>
      <Row>
        <Text style={styles.textName} numberOfLines={1}>
          Invoice Number:
        </Text>
        <Text style={[styles.textName, styles.bold]} numberOfLines={1}>
          {orderData.invoiceNumber}
        </Text>
      </Row>
      <Row>
        <Text style={styles.textName} numberOfLines={1}>
          Order Status:
        </Text>
        <Text
          style={[
            styles.textName,
            styles.bold,
            {color: getColorByOrderStatus(orderData.orderStatus)},
          ]}
          numberOfLines={2}>
          {orderData.orderStatus}
        </Text>
      </Row>

      <Text style={styles.textName} numberOfLines={1}>
        {orderData.orderItems.length} Items
      </Text>
      <Text style={[styles.textName, styles.bold]} numberOfLines={1}>
        {orderData.orderItems.map((item) => item.productName).join(', ')}{' '}
      </Text>
    </View>
  );
};

const RenderPaymentData = ({orderData}: IOrderCard) => {
  return IS_BIG_SCREEN === false ? (
    <Row>
      <Text style={[styles.textName]} numberOfLines={1}>
        ₹{orderData.amount} + ₹{orderData.deliveryCharge}(Delivery Charge) = ₹
        {orderData.totalAmount}
      </Text>
    </Row>
  ) : (
    <View>
      <Row>
        <Text style={[styles.textName]} numberOfLines={1}>
          Product Amount: ₹{orderData.amount}
        </Text>
      </Row>
      <Row>
        <Text style={[styles.textName]} numberOfLines={1}>
          Delivery Charge: ₹{orderData.deliveryCharge}
        </Text>
      </Row>
      <Text style={[styles.textName]} numberOfLines={1}>
        Total = ₹{orderData.totalAmount}
      </Text>
      <Text style={[styles.textNameLight]} numberOfLines={1}>
        Payment Mode: {orderData.paymentMode}
      </Text>
    </View>
  );
};

const RenderOrderStatusData = ({orderData}: IOrderCard) => {
  return (
    <Row>
      <Text style={[styles.textName]} numberOfLines={2}>
        {getUserMessageByOrderStatus(orderData.orderStatus)}
      </Text>
    </Row>
  );
};

const styles = StyleSheet.create({
  textName: {
    fontSize: IS_BIG_SCREEN ? 18 : 14,
    color: '#4B5164',
    fontWeight: '400',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
  },
  textNameLight: {
    fontSize: IS_BIG_SCREEN ? 14 : 12,
    color: 'gray',
    fontWeight: '200',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
    marginTop: IS_BIG_SCREEN ? 4 : 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  colDirection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
