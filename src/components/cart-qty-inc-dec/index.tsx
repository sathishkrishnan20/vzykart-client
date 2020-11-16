import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Row} from 'react-native-easy-grid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CART_INC_DEC} from '../../interfaces/enums';
import {IS_WEB} from '../../config';
import {getCartItem, setCartItem} from '../../services/storage-service';
import {ICartItem} from '../../interfaces/classes/cart';
import {store} from '../../routes/store';
import {USER_CART} from '../../providers/constants';

interface State {
  qty: number;
  productId: string;
  cartProducts: ICartItem[];
  quantityHandler: (incOrDec: CART_INC_DEC) => void;
}
export function CardQtyIncDec({productId, cartProducts}: State) {
  const [quantity, setQuantity] = useState(0);
  const [productIndexOnCart, setProductIndexOnCart] = useState(-1);
  const [cartData, setCartData] = useState([] as ICartItem[]);

  useEffect(() => {
    let quantity = 0;
    let productIndex =
      cartProducts.findIndex(
        (item: ICartItem) => item.productId === productId,
      ) || -1;

    if (productIndex !== -1) {
      quantity = cartProducts[productIndex].quantity;
    }
    setQuantity(quantity);
    setProductIndexOnCart(productIndex);
    setCartData(cartProducts);
  }, []);

  useEffect(() => {
    if (cartData[productIndexOnCart]) {
      setQuantity(cartData[productIndexOnCart].quantity || 0);
      updateStorage(cartData[productIndexOnCart].quantity);
    }
  }, [cartData]);

  const updateStorage = async (qty: number) => {
    const cartDataOnStorage = (await getCartItem()) as ICartItem[];
    const productDataIndexOnStorage = cartDataOnStorage.findIndex(
      (item) => item.productId === productId,
    );
    if (productDataIndexOnStorage === -1) {
      cartDataOnStorage.push({
        productId,
        quantity: qty,
      });
    } else {
      if (quantity === 0) {
        // cartDataOnStorage.splice(productDataIndexOnStorage, 1);
      } else {
        cartDataOnStorage[productDataIndexOnStorage].quantity = qty;
      }
    }
    setCartItem(cartDataOnStorage);
    store.dispatch({
      type: USER_CART,
      cartItems: cartDataOnStorage,
    } as never);
  };

  const qtyHandler = (action: CART_INC_DEC) => {
    const newItems = [...cartData]; // clone the array
    let index = productIndexOnCart;
    if (index === -1) {
      newItems.push({
        productId: productId,
        quantity: 0,
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

    setCartData(newItems);
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
          {quantity}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => qtyHandler(CART_INC_DEC.INCREMENT)}
        style={{borderWidth: 1, maxHeight: 25, borderColor: '#cccccc'}}>
        <MaterialIcons name="add" size={25} color="#cccccc" />
      </TouchableOpacity>
    </Row>
  );
};
