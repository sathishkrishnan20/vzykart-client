import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList} from 'react-native';
import OrderAction from '../../../actions/orders';
import {
  getSellerId,
  getDeliveryPersonId,
} from '../../../services/storage-service';
import {Container, Loader} from '../../../components';
import {IOrder, IOrderOnChangeStatusProp} from '../../../interfaces/orders';
import {showToastByResponse} from '../../../components/Toast';
import {keyExtractor} from '../../../helpers/render-helpers';
import {OrderCard} from '../../../components/Orders/order-card';
import {ComponentProp} from '../../../interfaces';
import ROUTE_NAMES from '../../../routes/name';
import {navigateByProp} from '../../../navigation';
import {SectionTitle} from '../../../components/Section-Title';
import {getFollowUpStatusUpdateButtons} from '../../../components/Orders/helpers';
import {USER_TYPE, VALID_ORDER_STATUS} from '../../../interfaces/enums';
import DeliveryPersonAction from '../../../actions/delivery-person';
import {Item} from 'react-native-picker-select';
import {IDeliveryPerson} from '../../../interfaces/classes/delivery-person';

export function DeliveryPersonOrders() {
  const orderAction = new OrderAction();
  const deliveryPersonAction = new DeliveryPersonAction();
  const [orders, setOrders] = useState([] as IOrder[]);
  const [deliveryPersonListAsItem, setDeliveryPersonListAsItem] = useState(
    [] as Item[],
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    try {
      setIsLoading(true);
      const userId = (await getDeliveryPersonId()) as string;
      const orderResponse = await orderAction.getOrdersByDeliveryPersonId(
        userId,
      );
      if (orderResponse.success) {
        setOrders(orderResponse.data);
      } else {
        showToastByResponse(orderResponse);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const updateOrderByOrderId = async (
    orderId: string,
    updatedNodes: IOrderOnChangeStatusProp,
  ) => {
    const userId = (await getDeliveryPersonId()) as string;
    const orderUpdateRequestData = {
      ...updatedNodes,
      updatedBy: userId,
      updatedUserType: USER_TYPE.DELIVERY_PERSON,
    };
    const orderResponse = await orderAction.updateOrdersByOrderId(
      orderId,
      orderUpdateRequestData,
    );
    if (orderResponse.success) {
      getOrders();
    } else {
      showToastByResponse(orderResponse);
    }
  };
  return (
    <Container>
      <Loader visible={isLoading} />
      <FlatList
        data={orders}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<SectionTitle title="Orders" />}
        renderItem={({item}) => (
          <OrderCard
            deliveryPersonList={deliveryPersonListAsItem}
            orderData={item}
            statusUpdateButtons={getFollowUpStatusUpdateButtons(
              item.orderStatus,
              USER_TYPE.DELIVERY_PERSON,
            )}
            onChangeStatus={(updatedNodes: IOrderOnChangeStatusProp) =>
              updateOrderByOrderId(item._id, updatedNodes)
            }
            disabled={true}
            onClick={() => {}}
          />
        )}
      />
    </Container>
  );
}
