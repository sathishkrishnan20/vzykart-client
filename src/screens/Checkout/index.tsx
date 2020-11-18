import React, {useState} from 'react';
import {Container} from '../../components';
import {Header, Text, Button} from 'react-native-elements';
import {ProductSummary, RenderSubTotal} from './ProductSummary';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ProductAndCart} from '../../interfaces/classes/cart';
import {IS_WEB} from '../../config';
import {keyExtractor} from '../../helpers/render-helpers';
import {IUserAddress} from '../../interfaces';
import Address from '../../components/Address';
import {View, TouchableHighlight, Dimensions} from 'react-native';
import colors from '../../colors';
import {Row, Col} from 'react-native-easy-grid';
import {Payment} from '../../components/PayButton';

export function Checkout() {
  const [deliveryAddressIndex, setDeliveryAddressIndex] = useState(0);
  const data: ProductAndCart[] = [
    {
      quantity: 4,
      productId: '5fade5850b3ecfe771ce591b',
      _id: '5fade5850b3ecfe771ce591b',
      productName: 'Lux',
      productDescription: 'Lux Soap',
      mrp: 100,
      tradePrice: 90,
      sellingPrice: 110,
      discount: 0,
      gst: 0,
      uom: '667atsas',
      unit: '123',
      categories: ['Lagos', 'Kaduna'],
      sellerId: '5fa90fa1207f370732e06674',
      images: [],
    },
    {
      productId: '5fade5ae0b3ecfe771ce591d',
      quantity: 5,
      images: [],
      _id: '5fade5ae0b3ecfe771ce591d',
      productName: 'Pedigree',
      productDescription: 'Pedigree for DOG',
      mrp: 10,
      tradePrice: 123,
      sellingPrice: 12,
      discount: 0,
      gst: 0,
      uom: 'a0s0a8ssbsd',
      unit: '100',
      categories: ['Maiduguri'],
      sellerId: '5fa90fa1207f370732e06674',
    },
    {
      productId: '5fade5ae0b3ecfe771ce591d',
      quantity: 5,
      images: [],
      _id: '5fade5ae0b3ecfe771ce591d',
      productName: 'Pedigree',
      productDescription: 'Pedigree for DOG',
      mrp: 10,
      tradePrice: 123,
      sellingPrice: 12,
      discount: 0,
      gst: 0,
      uom: 'a0s0a8ssbsd',
      unit: '100',
      categories: ['Maiduguri'],
      sellerId: '5fa90fa1207f370732e06674',
    },
    {
      productId: '5fade5ae0b3ecfe771ce591d',
      quantity: 5,
      images: [],
      _id: '5fade5ae0b3ecfe771ce591d',
      productName: 'Pedigree',
      productDescription: 'Pedigree for DOG',
      mrp: 10,
      tradePrice: 123,
      sellingPrice: 12,
      discount: 0,
      gst: 0,
      uom: 'a0s0a8ssbsd',
      unit: '100',
      categories: ['Maiduguri'],
      sellerId: '5fa90fa1207f370732e06674',
    },
  ];
  const userAddress: IUserAddress[] = [
    {
      no_and_street: '1/120, West Street',
      address_line_1: 'Vairavikinaru',
      post_office_name: 'KoodanKulam Po',
      district: 'Tirunelveli',
      city: 'Koodan Kulam',
      state: 'TamilNadu',
      country: 'India',
      pin_code: 627106,
      locality: 'Opp to Chandran Store',
    },
    {
      no_and_street: '1/120, West Street',
      address_line_1: 'Vairavikinaru',
      post_office_name: 'KoodanKulam Po',
      district: 'Tirunelveli',
      city: 'Koodan Kulam',
      state: 'TamilNadu',
      country: 'India',
      pin_code: 627106,
      locality: 'Opp to Chandran Store',
    },
    {
      no_and_street: '1/120, West Street',
      address_line_1: 'Vairavikinaru',
      post_office_name: 'KoodanKulam Po',
      district: 'Tirunelveli',
      city: 'Koodan Kulam',
      state: 'TamilNadu',
      country: 'India',
      pin_code: 627106,
      locality: 'Opp to Chandran Store',
    },
  ];
  const HeaderComp = ({headerText}: {headerText: string}) => {
    return (
      <View
        style={{
          backgroundColor: colors.themePrimary,
          justifyContent: 'center',
          height: 40,
          borderRadius: 10,
          margin: IS_WEB ? 8 : 4,
          marginBottom: IS_WEB ? 0 : -2,
        }}>
        <Text style={{color: colors.white}}> {headerText} </Text>
      </View>
    );
  };
  const RenderProductSummaryFlatList = () => {
    return (
      <FlatList
        data={data}
        numColumns={1}
        keyExtractor={keyExtractor}
        renderItem={({item}) => <ProductSummary productInfo={item} />}
        ListFooterComponent={IS_WEB ? null : <RenderSubTotal />}
      />
    );
  };
  return (
    <Container>
      <ScrollView>
        <HeaderComp headerText={'Products'} />
        {Dimensions.get('window').width > 600 ? (
          <Row size={12}>
            <Col size={8}>
              <RenderProductSummaryFlatList />
            </Col>
            <Col size={4}>
              <RenderSubTotal />
            </Col>
          </Row>
        ) : (
          <RenderProductSummaryFlatList />
        )}

        <FlatList
          data={userAddress}
          ListHeaderComponent={() => (
            <HeaderComp headerText={'Delivery Address'} />
          )}
          numColumns={1}
          keyExtractor={keyExtractor}
          renderItem={({item, index}) => (
            <View>
              <Address
                onSelect={() => setDeliveryAddressIndex(index)}
                checked={index === deliveryAddressIndex}
                containerStyle={{margin: 6}}
                name={'Sathish'}
                data={item}
              />
            </View>
          )}
        />
        <Payment
          name={'Delivery'}
          amount={String(300 * 100)}
          description={'Test Transaction'}
          prefill={{
            name: 'Gaurav Kumar',
            email: 'gaurav.kumar@example.com',
            contact: '9999999999',
          }}
          notes={{
            address: 'Razorpay Corporate Office',
          }}
        />
      </ScrollView>
    </Container>
  );
}
