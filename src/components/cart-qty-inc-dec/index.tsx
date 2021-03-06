import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Row} from 'react-native-easy-grid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CART_INC_DEC} from '../../interfaces/enums';
import {IS_WEB} from '../../config';
import {ICartItem} from '../../interfaces/classes/cart';
import colors from '../../colors';

interface State {
  productId: string;
  cartProducts: ICartItem[];
  onUpdateCartProducts: (cartItems: ICartItem[]) => void;
  updateQuantity: (quantity: number) => void;
  refreshCount: number;
}
export function CardQtyIncDec({
  productId,
  cartProducts,
  onUpdateCartProducts,
  updateQuantity,
  refreshCount,
}: State) {
  const [quantity, setQuantity] = useState(0);
  const [productIndexOnCart, setProductIndexOnCart] = useState(-1);

  useEffect(() => {
    setQuantityAndProdIndex();
  }, [refreshCount]);

  const setQuantityAndProdIndex = () => {
    let quantity = 0;
    let productIndex = cartProducts.findIndex(
      (item: ICartItem) => item.productId === productId,
    );
    if (productIndex !== -1) {
      quantity = cartProducts[productIndex].quantity;
    }
    setQuantity(quantity);
    setProductIndexOnCart(productIndex);
  };

  const qtyHandler = (action: CART_INC_DEC) => {
    const newItems = [...cartProducts]; // clone the array
    let index = productIndexOnCart;
    if (index === -1) {
      newItems.push({
        productId: productId,
        quantity: 0,
        checked: 1,
      });
      index = newItems.length - 1;
      setProductIndexOnCart(index);
    }
    let currentQty = newItems[index]['quantity'];
    if (action === CART_INC_DEC.INCREMENT) {
      newItems[index]['quantity'] = currentQty + 1;
    } else if (action === CART_INC_DEC.DECREMENT) {
      newItems[index]['quantity'] = currentQty > 1 ? currentQty - 1 : 1;
    }
    onUpdateCartProducts(newItems);
    updateQuantity(newItems[index]['quantity']);
    setQuantity(newItems[index]['quantity']);
  };
  return IS_WEB ? (
    <View>
      <RenderQtyComponent quantity={quantity} qtyHandler={qtyHandler} />
    </View>
  ) : (
    <RenderQtyComponent quantity={quantity} qtyHandler={qtyHandler} />
  );
}

const RenderQtyComponent = ({
  quantity,
  qtyHandler,
}: {
  quantity: number;
  qtyHandler: Function;
}) => {
  const marginSize = IS_WEB ? 8 : 4;
  return (
    <Row style={{margin: marginSize}}>
      <TouchableOpacity
        onPress={() => qtyHandler(CART_INC_DEC.DECREMENT)}
        style={{borderWidth: 1, maxHeight: 25, borderColor: colors.gray80}}>
        <MaterialIcons name="remove" size={25} color={colors.gray80} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={true}
        style={{
          borderWidth: 1,
          maxHeight: 25,
          justifyContent: 'center',
          borderColor: colors.gray80,
          paddingLeft: 8,
          paddingRight: 8,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.textGray,
          }}>
          {quantity}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => qtyHandler(CART_INC_DEC.INCREMENT)}
        style={{borderWidth: 1, maxHeight: 25, borderColor: colors.gray80}}>
        <MaterialIcons name="add" size={25} color={colors.gray80} />
      </TouchableOpacity>
    </Row>
  );
};
