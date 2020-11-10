import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {Row} from 'react-native-easy-grid';
import {IProduct} from '../../interfaces/products';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CART_INC_DEC} from '../../interfaces/enums';

export const CardQtyIncDec = ({
  qty,
  quantityHandler,
}: {
  qty: number;
  quantityHandler: (incOrDec: CART_INC_DEC) => void;
}) => {
  return (
    <Row>
      <TouchableOpacity
        onPress={() => quantityHandler(CART_INC_DEC.DECREMENT)}
        style={{borderWidth: 1, maxHeight: 25, borderColor: '#cccccc'}}>
        <MaterialIcons name="remove" size={25} color="#cccccc" />
      </TouchableOpacity>
      <Text
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#cccccc',
          paddingHorizontal: 7,
          paddingTop: 3,
          color: '#bbbbbb',
          fontSize: 14,
        }}>
        {qty}
      </Text>
      <TouchableOpacity
        onPress={() => quantityHandler(CART_INC_DEC.INCREMENT)}
        style={{borderWidth: 1, maxHeight: 25, borderColor: '#cccccc'}}>
        <MaterialIcons name="add" size={25} color="#cccccc" />
      </TouchableOpacity>
    </Row>
  );
};
