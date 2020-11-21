import React, {useState} from 'react';
import {useEffect} from 'react';
import {ScrollView, FlatList} from 'react-native';
import OrderAction from '../../../actions/orders';
import {getUserId} from '../../../services/storage-service';
import {Container} from '../../../components';
import {IOrder} from '../../../interfaces/orders';
import {showToastByResponse} from '../../../components/Toast';
import {keyExtractor} from '../../../helpers/render-helpers';
import {Text, Card} from 'react-native-elements';
import {Row} from 'react-native-easy-grid';
import {OrderCard} from './order-card';

export function MyOrders() {
  const orderAction = new OrderAction();
  const [orders, setOrders] = useState([] as IOrder[]);
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    const userId = await getUserId();
    if (!userId) {
      // Do Redirection
    } else {
      const orderResponse = await orderAction.getOrdersByUserId(userId);
      console.log(orderResponse);
      if (orderResponse.success) {
        setOrders(orderResponse.data);
      } else {
        showToastByResponse(orderResponse);
      }
    }
  };
  return (
    <Container>
      <ScrollView>
        <FlatList
          data={orders}
          keyExtractor={keyExtractor}
          renderItem={({item}) => <OrderCard orderData={item} />}
        />
      </ScrollView>
    </Container>
  );
}
