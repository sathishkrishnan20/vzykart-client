import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList} from 'react-native';
import OrderAction from '../../../actions/orders';
import {getSellerId} from '../../../services/storage-service';
import {Container, Loader} from '../../../components';
import {IOrder} from '../../../interfaces/orders';
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

export function AdminOrders(props: ComponentProp) {
  const orderAction = new OrderAction();
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
    orderStatus: VALID_ORDER_STATUS,
  ) => {
    const adminId = store.getState().auth.adminId;
    const orderUpdateRequestData = {
      orderStatus: orderStatus,
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
  return (
    <Container>
      <Loader visible={isLoading} />
      <FlatList
        data={orders}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<SectionTitle title="Orders" />}
        renderItem={({item}) => (
          <OrderCard
            orderData={item}
            statusUpdateButtons={getFollowUpStatusUpdateButtons(
              item.orderStatus,
              USER_TYPE.SALES_USER,
            )}
            onChangeStatus={(updatedStatus: VALID_ORDER_STATUS) =>
              updateOrderByOrderId(item._id, updatedStatus)
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
