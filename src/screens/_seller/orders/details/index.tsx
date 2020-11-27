import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';

import OrderAction from '../../../../actions/orders';
import {Container, Loader} from '../../../../components';
import {showToastByResponse} from '../../../../components/Toast';
import {ProductCardsOrdered} from '../../../../components/Orders/product-card';
import {OrderOverView} from '../../../../components/Orders/order-overview';
import {keyExtractor} from '../../../../helpers/render-helpers';

import {IOrder, IOrderOnChangeStatusProp} from '../../../../interfaces/orders';
import {ComponentProp} from '../../../../interfaces';
import {getParamsByProp} from '../../../../navigation';
import {getFollowUpStatusUpdateButtons} from '../../../../components/Orders/helpers';
import {USER_TYPE, VALID_ORDER_STATUS} from '../../../../interfaces/enums';
import {getSellerId} from '../../../../services/storage-service';
import DeliveryPersonAction from '../../../../actions/delivery-person';
import {Item} from 'react-native-picker-select';

export function SellerOrderDetails(props: ComponentProp) {
  const orderAction = new OrderAction();
  const [orderData, setOrderData] = useState({} as IOrder);
  const [isLoading, setIsLoading] = useState(false);
  const deliveryPersonAction = new DeliveryPersonAction();
  const [deliveryPersonListAsItem, setDeliveryPersonListAsItem] = useState(
    [] as Item[],
  );
  useEffect(() => {
    getOrderInfo();
    getDeliveryUsers();
  }, []);
  const getOrderInfo = async () => {
    try {
      setIsLoading(true);

      const params = getParamsByProp(props);
      const orderResponse = await orderAction.getOrdersByOrderId(
        params.orderId,
      );
      if (orderResponse.success) {
        setOrderData(orderResponse.data);
      } else {
        showToastByResponse(orderResponse);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
  const updateOrderByOrderId = async (
    orderId: string,
    updatedNodes: IOrderOnChangeStatusProp,
  ) => {
    const userId = (await getSellerId()) as string;
    const orderUpdateRequestData = {
      ...updatedNodes,
      updatedBy: userId,
      updatedUserType: USER_TYPE.SALES_USER,
    };
    const orderResponse = await orderAction.updateOrdersByOrderId(
      orderId,
      orderUpdateRequestData,
    );
    if (orderResponse.success) {
      getOrderInfo();
    } else {
      showToastByResponse(orderResponse);
    }
  };

  return (
    <Container>
      <SafeAreaView style={{flex: 1}}>
        <Loader visible={isLoading} />
        {Object.keys(orderData).length ? (
          <View>
            <FlatList
              ListHeaderComponent={
                <OrderOverView
                  deliveryPersonList={deliveryPersonListAsItem}
                  statusUpdateButtons={getFollowUpStatusUpdateButtons(
                    orderData.orderStatus,
                    USER_TYPE.SALES_USER,
                  )}
                  onChangeStatus={(updatedNodes: IOrderOnChangeStatusProp) =>
                    updateOrderByOrderId(orderData._id, updatedNodes)
                  }
                  orderData={orderData}
                />
              }
              data={orderData.orderItems || []}
              keyExtractor={keyExtractor}
              renderItem={({item}) => (
                <ProductCardsOrdered productInfo={item} />
              )}
            />
          </View>
        ) : null}
      </SafeAreaView>
    </Container>
  );
}
