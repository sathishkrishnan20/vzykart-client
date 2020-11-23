import React from 'react';
import {View} from 'react-native';

import Address from '../Address';

import {OrderCard} from './order-card';
import {SectionTitle} from '../Section-Title';
import {IS_BIG_SCREEN} from '../../config';
import {IOrder, IStatusUpdateActions} from '../../interfaces/orders';

interface OrderOverViewState extends IStatusUpdateActions {
  orderData: IOrder;
}

const OrderOverView = ({
  orderData,
  onChangeStatus,
  statusUpdateButtons = [],
}: OrderOverViewState) => {
  return (
    <>
      <SectionTitle title={'Order Overview'} />
      <OrderCard
        orderData={orderData}
        statusUpdateButtons={statusUpdateButtons}
        onChangeStatus={onChangeStatus}
        onClick={() => {}}
        disabled={true}
      />
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

export {OrderOverView};
