import React from 'react';
import {StyleSheet} from 'react-native';
import {IOrder} from '../../../interfaces/orders';
import {Text, Card} from 'react-native-elements';
import {Row} from 'react-native-easy-grid';
import {IS_WEB} from '../../../config';
interface IOrderCardState {
  orderData: IOrder;
}

export const OrderCard = ({orderData}: IOrderCardState) => {
  return (
    <Card>
      <Row size={100}>
        <Text> {orderData.amount} </Text>
      </Row>
    </Card>
  );
};

const styles = StyleSheet.create({
  textName: {
    fontSize: IS_WEB ? 18 : 14,
    color: '#4B5164',
    fontWeight: '400',
    marginLeft: IS_WEB ? 8 : 4,
    marginBottom: IS_WEB ? 8 : 4,
  },
  textNameLight: {
    fontSize: IS_WEB ? 14 : 12,
    color: 'gray',
    fontWeight: '200',
    marginLeft: IS_WEB ? 8 : 4,
    marginBottom: IS_WEB ? 8 : 4,
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
