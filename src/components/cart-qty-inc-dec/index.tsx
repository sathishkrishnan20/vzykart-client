import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Row} from 'react-native-easy-grid';
import {IProduct} from '../../interfaces/products';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CART_INC_DEC} from '../../interfaces/enums';
import {IS_WEB} from '../../config';
interface State {
  qty: number;
  quantityHandler: (incOrDec: CART_INC_DEC) => void;
}
export const CardQtyIncDec = ({qty, quantityHandler}: State) => {
  return IS_WEB ? (
    <View>{renderQtyComponent({qty, quantityHandler})}</View>
  ) : (
    renderQtyComponent({qty, quantityHandler})
  );
};

const renderQtyComponent = ({qty, quantityHandler}: State) => {
  const marginSize = IS_WEB ? 8 : 4;
  return (
    <Row style={{margin: marginSize}}>
      <TouchableOpacity
        onPress={() => quantityHandler(CART_INC_DEC.DECREMENT)}
        style={{borderWidth: 1, maxHeight: 25, borderColor: '#cccccc'}}>
        <MaterialIcons name="remove" size={25} color="#cccccc" />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={true}
        style={{
          borderWidth: 1,
          maxHeight: 25,
          justifyContent: 'center',
          borderColor: '#cccccc',
          paddingLeft: 8,
          paddingRight: 8,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#4B5164',
          }}>
          {qty}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => quantityHandler(CART_INC_DEC.INCREMENT)}
        style={{borderWidth: 1, maxHeight: 25, borderColor: '#cccccc'}}>
        <MaterialIcons name="add" size={25} color="#cccccc" />
      </TouchableOpacity>
    </Row>
  );
};
