import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {IOrderCard, IOrderCardState, IStatusUpdateActions} from '../../interfaces/orders';
import {Text, Card} from 'react-native-elements';
import {Row, Col, Grid} from 'react-native-easy-grid';
import {IS_BIG_SCREEN} from '../../config';
import {getUserMessageByOrderStatus, getColorByOrderStatus} from './helpers';
import Address from '../Address';
import {Button} from '../Button';
import {VALID_ORDER_STATUS} from '../../interfaces/enums';
import MultiSelect from '../MultiSelect';
import {Item} from 'react-native-picker-select';
import {WarningToast} from '../Toast';
import colors from '../../colors';

export const OrderCard = ({orderData, onClick, disabled = false, statusUpdateButtons = [], onChangeStatus, deliveryPersonList}: IOrderCardState) => {
  return IS_BIG_SCREEN ? (
    <TouchableOpacity disabled={disabled} onPress={onClick}>
      <Card>
        <Grid>
          <Col>
            <RenderProductData orderData={orderData} />
            <RenderOrderStatusData orderData={orderData} />
          </Col>
          <Col>
            <RenderPaymentData orderData={orderData} />
            <RenderActionButtons deliveryPersonList={deliveryPersonList} onChangeStatus={onChangeStatus} statusUpdateButtons={statusUpdateButtons} />
          </Col>

          {orderData.deliveryAddress ? (
            <Col>
              <RenderUserInfo orderData={orderData} />
              <Address data={orderData.deliveryAddress} />
            </Col>
          ) : null}
        </Grid>
      </Card>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity disabled={disabled} onPress={onClick}>
      <Card containerStyle={{margin: 4}}>
        <RenderUserInfo orderData={orderData} />
        <RenderProductData orderData={orderData} />
        <RenderPaymentData orderData={orderData} />
        <RenderOrderStatusData orderData={orderData} />
        <RenderActionButtons deliveryPersonList={deliveryPersonList} onChangeStatus={onChangeStatus} statusUpdateButtons={statusUpdateButtons} />
      </Card>
    </TouchableOpacity>
  );
};

const RenderUserInfo = ({orderData}: IOrderCard) => {
  return (
    <View>
      <Row>
        <Text style={[styles.textName, styles.bold]}>Order for:</Text>
        <Text style={[styles.textName]}>
          {orderData.userInfo?.firstName} {orderData.userInfo?.lastName}
        </Text>
      </Row>
      <Row>
        <Text style={[styles.textName, styles.bold]}>Email / Mobile:</Text>
        <Text style={[styles.textName]}>
          {orderData.userInfo?.email} {orderData.userInfo?.mobileNumber}
        </Text>
      </Row>
    </View>
  );
};

const RenderProductData = ({orderData}: IOrderCard) => {
  return (
    <View>
      <Row>
        <Text style={styles.textName} numberOfLines={1}>
          Created at:
        </Text>
        <Text style={[styles.textName, styles.bold]} numberOfLines={1}>
          {new Date(orderData.createdDate).toLocaleDateString() + ' ' + new Date(orderData.createdDate).toLocaleTimeString()}
        </Text>
      </Row>
      <Row>
        <Text style={styles.textName} numberOfLines={1}>
          Invoice Number:
        </Text>
        <Text style={[styles.textName, styles.bold]} numberOfLines={1}>
          {orderData.invoiceNumber}
        </Text>
      </Row>
      <Row>
        <Text style={styles.textName} numberOfLines={1}>
          Order Status:
        </Text>
        <Text style={[styles.textName, styles.bold, {color: getColorByOrderStatus(orderData.orderStatus)}]} numberOfLines={2}>
          {orderData.orderStatus}
        </Text>
      </Row>

      <Text style={styles.textName} numberOfLines={1}>
        {orderData.orderItems.length} Items
      </Text>
      <Text style={[styles.textName, styles.bold]} numberOfLines={1}>
        {orderData.orderItems.map((item) => item.productName).join(', ')}{' '}
      </Text>
    </View>
  );
};

const RenderPaymentData = ({orderData}: IOrderCard) => {
  return IS_BIG_SCREEN === false ? (
    <Row>
      <Text style={[styles.textName]} numberOfLines={1}>
        ₹{orderData.totalSellingAmountWithGST} + ₹{orderData.deliveryCharge}
        (Delivery Charge) = ₹{orderData.totalPayableAmount}
      </Text>
    </Row>
  ) : (
    <View>
      <Row>
        <Text style={[styles.textName]} numberOfLines={1}>
          Product Amount: ₹{orderData.totalSellingAmountWithGST}
        </Text>
      </Row>
      <Row>
        <Text style={[styles.textName]} numberOfLines={1}>
          Delivery Charge: ₹{orderData.deliveryCharge}
        </Text>
      </Row>
      {orderData.promoCodeInfo && orderData.promoCodeInfo?.discountAmount ? (
        <Row>
          <Text style={[styles.textName]} numberOfLines={1}>
            Promo Code Discount: -₹{orderData.promoCodeInfo?.discountAmount}
          </Text>
        </Row>
      ) : null}
      <Text style={[styles.textName]} numberOfLines={1}>
        Total = ₹{orderData.totalPayableAmount}
      </Text>
      <Text style={[styles.textNameLight]} numberOfLines={1}>
        Payment Mode: {orderData.paymentMode}
      </Text>
    </View>
  );
};

const RenderOrderStatusData = ({orderData}: IOrderCard) => {
  return (
    <Row>
      <Text style={[styles.textName]} numberOfLines={2}>
        {getUserMessageByOrderStatus(orderData.orderStatus)}
      </Text>
    </Row>
  );
};

function RenderActionButtons({statusUpdateButtons, onChangeStatus, deliveryPersonList = []}: IStatusUpdateActions) {
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState([] as Item[] | string[]);
  const getDeliveryPersonId = (): string => {
    if (selectedDeliveryPerson && selectedDeliveryPerson[0]) {
      if (typeof selectedDeliveryPerson[0] === 'string') {
        return selectedDeliveryPerson[0];
      } else {
        return selectedDeliveryPerson[0].value;
      }
    } else {
      WarningToast({message: 'Please Select Delivery Person'});
      return '';
    }
  };
  return (
    <Row>
      {typeof onChangeStatus === 'function' &&
        statusUpdateButtons?.map((item) =>
          item.value === VALID_ORDER_STATUS.DELIVERY_BOY_ASSIGNED ? (
            <Grid>
              <Row style={{marginTop: IS_BIG_SCREEN ? 8 : 4}}>
                <TouchableOpacity onPress={(e) => e.preventDefault()} style={{width: '90%'}}>
                  <MultiSelect
                    disableLabelOnWeb={true}
                    label={'Select Delivery Person'}
                    items={deliveryPersonList}
                    onSelectedItemsChange={(value: Item[] | string[]) => {
                      console.log(value);
                      setSelectedDeliveryPerson(value);
                    }}
                    singleSelect={true}
                    selectedItems={selectedDeliveryPerson}
                  />
                </TouchableOpacity>
              </Row>
              <Row
                style={{
                  marginTop: IS_BIG_SCREEN ? -48 : 0,
                  width: '90%',
                }}>
                <TouchableOpacity>
                  <Button
                    disabled={item.disabled || false}
                    onPress={() => {
                      const deliveryPersonId = getDeliveryPersonId();
                      if (deliveryPersonId) {
                        onChangeStatus({
                          orderStatus: item.value,
                          deliveryPersonId: deliveryPersonId,
                          deliveryBoyAssignedDate: new Date(),
                        });
                      }
                    }}
                    buttonStyle={[item.style]}
                    title={item.label}
                  />
                </TouchableOpacity>
              </Row>
            </Grid>
          ) : (
            <Col>
              <Button disabled={item.disabled || false} onPress={() => onChangeStatus({orderStatus: item.value})} buttonStyle={item.style} title={item.label} />
            </Col>
          ),
        )}
    </Row>
  );
}

const styles = StyleSheet.create({
  textName: {
    fontSize: IS_BIG_SCREEN ? 18 : 14,
    color: colors.textGray,
    fontWeight: '400',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
  },
  textNameLight: {
    fontSize: IS_BIG_SCREEN ? 14 : 12,
    color: 'gray',
    fontWeight: '200',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
    marginTop: IS_BIG_SCREEN ? 4 : 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  colDirection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
