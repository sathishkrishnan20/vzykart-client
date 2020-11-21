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
import AuthAction from '../../../actions/auth';
import {ComponentProp} from '../../../interfaces';
import ROUTE_NAMES from '../../../routes/name';
import {navigateByProp} from '../../../navigation';

export function MyOrders(props: ComponentProp) {
  const orderAction = new OrderAction();
  const authAction = new AuthAction();
  const [orders, setOrders] = useState([] as IOrder[]);
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    const isLoggedIn = authAction.redirectUserIfNotLogged(
      props,
      ROUTE_NAMES.userOrders,
    );
    if (isLoggedIn) {
      const userId = (await getUserId()) as string;
      const orderResponse = await orderAction.getOrdersByUserId(userId);
      if (orderResponse.success) {
        setOrders(orderResponse.data);
      } else {
        showToastByResponse(orderResponse);
      }
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
