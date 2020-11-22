import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import OrderAction from '../../../../actions/orders';

import {Container} from '../../../../components';
import Address from '../../../../components/Address';
import {showToastByResponse} from '../../../../components/Toast';

import {keyExtractor} from '../../../../helpers/render-helpers';
import {OrderCard} from '../order-card';
import {IOrder} from '../../../../interfaces/orders';
import {ComponentProp} from '../../../../interfaces';
import {getParamsByProp} from '../../../../navigation';
import {SectionTitle} from '../../../../components/Section-Title';
import {ProductCardsOrdered} from './product-card';
import {IS_BIG_SCREEN} from '../../../../config';

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
  const OrderOverView = () => {
    return (
      <>
        <SectionTitle title={'Order Overview'} />
        <OrderCard orderData={orderData} onClick={() => {}} disabled={true} />
        {IS_BIG_SCREEN ? null : (
          <View>
            <SectionTitle title={'Delivery Details'} />
            <Address
              containerStyle={{margin: 4}}
              data={orderData.deliveryAddress}
            />
          </View>
        )}
        <SectionTitle title={'Products'} />
      </>
    );
  };

  return (
    <Container>
      <SafeAreaView style={{flex: 1}}>
        {Object.keys(orderData).length ? (
          <View>
            <FlatList
              ListHeaderComponent={<OrderOverView />}
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
