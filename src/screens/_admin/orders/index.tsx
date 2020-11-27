import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList} from 'react-native';
import OrderAction from '../../../actions/orders';
import {getSellerId} from '../../../services/storage-service';
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
import {store} from '../../../routes/store';
import DeliveryPersonAction from '../../../actions/delivery-person';
import {Item} from 'react-native-picker-select';

export function AdminOrders(props: ComponentProp) {
  const orderAction = new OrderAction();
  const deliveryPersonAction = new DeliveryPersonAction();
  const [deliveryPersonListAsItem, setDeliveryPersonListAsItem] = useState(
    [] as Item[],
  );
  const [orders, setOrders] = useState([] as IOrder[]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    try {
      setIsLoading(true);
      const orderResponse = await orderAction.getOrdersByAdminId();
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
    const adminId = store.getState().auth.adminId;
    const orderUpdateRequestData = {
      ...updatedNodes,
      updatedBy: adminId,
      updatedUserType: USER_TYPE.ADMIN,
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
  const getDeliveryUsers = async () => {
    try {
      const items = await deliveryPersonAction.getAllDeliveryPersonsAsItem();
      setDeliveryPersonListAsItem(items);
    } catch (error) {
      setIsLoading(false);
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
              USER_TYPE.SALES_USER,
            )}
            onChangeStatus={(updatedValue: IOrderOnChangeStatusProp) =>
              updateOrderByOrderId(item._id, updatedValue)
            }
            onClick={() =>
              navigateByProp(
                props,
                ROUTE_NAMES.adminOrdersDetails.replace(':orderId', item._id),
                {orderId: item._id},
              )
            }
          />
        )}
      />
    </Container>
  );
}
