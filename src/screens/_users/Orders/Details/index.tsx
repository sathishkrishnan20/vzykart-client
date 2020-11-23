import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import OrderAction from '../../../../actions/orders';

import {Container} from '../../../../components';
import {showToastByResponse} from '../../../../components/Toast';

import {keyExtractor} from '../../../../helpers/render-helpers';
import {IOrder} from '../../../../interfaces/orders';
import {ComponentProp} from '../../../../interfaces';
import {getParamsByProp} from '../../../../navigation';
import {ProductCardsOrdered} from '../../../../components/Orders/product-card';
import {OrderOverView} from '../../../../components/Orders/order-overview';

export function OrderDetails(props: ComponentProp) {
  const orderAction = new OrderAction();
  const [orderData, setOrderData] = useState({} as IOrder);
  useEffect(() => {
    getOrderInfo();
  }, []);
  const getOrderInfo = async () => {
    const params = getParamsByProp(props);
    const orderResponse = await orderAction.getOrdersByOrderId(params.orderId);
    if (orderResponse.success) {
      setOrderData(orderResponse.data);
    } else {
      showToastByResponse(orderResponse);
    }
  };

  return (
    <Container>
      <SafeAreaView style={{flex: 1}}>
        {Object.keys(orderData).length ? (
          <View>
            <FlatList
              ListHeaderComponent={<OrderOverView orderData={orderData} />}
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
