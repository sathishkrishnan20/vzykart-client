import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList} from 'react-native';
import OrderAction from '../../../actions/orders';
import {getUserId} from '../../../services/storage-service';
import {Container} from '../../../components';
import {IOrder} from '../../../interfaces/orders';
import {showToastByResponse} from '../../../components/Toast';
import {keyExtractor} from '../../../helpers/render-helpers';
import {OrderCard} from './order-card';
import {ComponentProp} from '../../../interfaces';
import ROUTE_NAMES from '../../../routes/name';
import {navigateByProp} from '../../../navigation';

export function MyOrders(props: ComponentProp) {
  const orderAction = new OrderAction();
  const [orders, setOrders] = useState([] as IOrder[]);
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    const userId = (await getUserId()) as string;
    const orderResponse = await orderAction.getOrdersByUserId(userId);
    if (orderResponse.success) {
      setOrders(orderResponse.data);
    } else {
      showToastByResponse(orderResponse);
    }
  };
  return (
    <Container>
      <FlatList
        data={orders}
        keyExtractor={keyExtractor}
        renderItem={({item}) => (
          <OrderCard
            orderData={item}
            onClick={() =>
              navigateByProp(
                props,
                ROUTE_NAMES.userOrderDetails.replace(':orderId', item._id),
                {orderId: item._id},
              )
            }
          />
        )}
      />
    </Container>
  );
}
