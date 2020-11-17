import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CardQtyIncDec} from '../../components/cart-qty-inc-dec';
import {CART_INC_DEC} from '../../interfaces/enums';
import {getCartItem} from '../../services/storage-service';
import ProductAction from '../../actions/products';
import {
  ICartItem,
  ICartScreenState,
  ProductAndCart,
} from '../../interfaces/classes/cart';
import {IProduct} from '../../interfaces/products';
import {ComponentProp} from '../../interfaces';

export default class Cart extends React.Component<
  ComponentProp,
  ICartScreenState
> {
  productAction: ProductAction;
  constructor(props: ComponentProp) {
    super(props);
    this.state = {
      selectAll: false,
      cartItemsIsLoading: false,
      cartItems: [],
    };
    this.productAction = new ProductAction();
  }
  async componentDidMount() {
    const cartProducts = (await getCartItem()) as ICartItem[];
    const productObj: {[key: string]: ProductAndCart} = {};
    const productResponse = await this.productAction.getProductsByMultipleIds(
      cartProducts.map((item) => item.productId).join(','),
    );
    if (productResponse.success) {
      productResponse.data.forEach((element: ProductAndCart) => {
        productObj[element._id] = element;
      });
    }
    const updatedCartProducts = cartProducts.map((item) => {
      return {
        ...item,
        ...productObj[item.productId],
      };
    });
    console.log(updatedCartProducts);
    this.setState({cartItems: updatedCartProducts});
  }
  selectHandler = (index: number, value: number) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems[index]['checked'] = value === 1 ? 0 : 1; // set the new value
    this.setState({cartItems: newItems}); // set new state
  };

  selectHandlerAll = (value: boolean) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems.map((_item, index) => {
      return (newItems[index]['checked'] = value === true ? 0 : 1); // set the new value
    });
    this.setState({
      cartItems: newItems,
      selectAll: value === true ? false : true,
    }); // set new state
  };

  deleteHandler = (index: number) => {
    Alert.alert(
      'Are you sure you want to delete this item from your cart?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            let updatedCart = this.state.cartItems; /* Clone it first */
            updatedCart.splice(
              index,
              1,
            ); /* Remove item from the cloned cart state */
            this.setState({cartItems: updatedCart}); /* Update the state */
          },
        },
      ],
      {cancelable: false},
    );
  };

  subtotalPrice = () => {
    const {cartItems} = this.state;
    if (cartItems) {
      return cartItems.reduce(
        (sum: number, item: ProductAndCart) =>
          sum + (item.checked === 1 ? item.quantity * item.sellingPrice : 0),
        0,
      );
    }
    return 0;
  };

  render() {
    const styles = StyleSheet.create({
      centerElement: {justifyContent: 'center', alignItems: 'center'},
    });

    const {cartItems, cartItemsIsLoading, selectAll} = this.state;

    return (
      <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            marginBottom: 10,
          }}>
          <View style={[styles.centerElement, {width: 50, height: 50}]}>
            <Ionicons name="ios-cart" size={25} color="#000" />
          </View>
          <View style={[styles.centerElement, {height: 50}]}>
            <Text style={{fontSize: 18, color: '#000'}}>Shopping Cart</Text>
          </View>
        </View>

        {cartItemsIsLoading ? (
          <View style={[styles.centerElement, {height: 300}]}>
            <ActivityIndicator size="large" color="#ef5739" />
          </View>
        ) : (
          <ScrollView>
            {cartItems &&
              cartItems.map((item: ProductAndCart, i: number) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    marginBottom: 2,
                    height: 120,
                  }}>
                  <View style={[styles.centerElement, {width: 60}]}>
                    <TouchableOpacity
                      style={[styles.centerElement, {width: 32, height: 32}]}
                      onPress={() => this.selectHandler(i, item.checked || 0)}>
                      <Ionicons
                        name={
                          item.checked === 1
                            ? 'ios-checkmark-circle'
                            : 'ios-checkmark-circle-outline'
                        }
                        size={25}
                        color={item.checked === 1 ? '#0faf9a' : '#aaaaaa'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexGrow: 1,
                      flexShrink: 1,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        /*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/
                      }}
                      style={{paddingRight: 10}}>
                      <Image
                        source={{
                          uri:
                            item.images &&
                            item.images[0] &&
                            item.images[0].optimizedDestinationPath,
                        }}
                        style={[
                          styles.centerElement,
                          {height: 60, width: 60, backgroundColor: '#eeeeee'},
                        ]}
                      />
                    </TouchableOpacity>
                    <View
                      style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                      <Text numberOfLines={1} style={{fontSize: 15}}>
                        {item.productName}
                      </Text>
                      {/* <Text numberOfLines={1} style={{color: '#8f8f8f'}}>
                        {item.color ? 'Variation: ' + item.color : ''}
                      </Text> */}
                      <Text
                        numberOfLines={1}
                        style={{color: '#333333', marginBottom: 10}}>
                        ${item.quantity * item.sellingPrice}
                      </Text>
                      <CardQtyIncDec
                        cartProducts={cartItems}
                        productId={item._id}
                        updateQuantity={(quantity: number) => {
                          const newItems = [...cartItems];
                          newItems[i].quantity = quantity;
                          this.setState({cartItems: newItems});

                          console.log(quantity);
                        }}
                      />
                    </View>
                  </View>
                  <View style={[styles.centerElement, {width: 60}]}>
                    <TouchableOpacity
                      style={[styles.centerElement, {width: 32, height: 32}]}
                      onPress={() => this.deleteHandler(i)}>
                      <Ionicons name="md-trash" size={25} color="#ee4d2d" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </ScrollView>
        )}

        {!cartItemsIsLoading && (
          <View
            style={{
              backgroundColor: '#fff',
              borderTopWidth: 2,
              borderColor: '#f6f6f6',
              paddingVertical: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.centerElement, {width: 60}]}>
                <View style={[styles.centerElement, {width: 32, height: 32}]}>
                  <MaterialCommunityIcons
                    name="ticket"
                    size={25}
                    color="#f0ac12"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>Voucher</Text>
                <View style={{paddingRight: 20}}>
                  <TextInput
                    style={{
                      paddingHorizontal: 10,
                      backgroundColor: '#f0f0f0',
                      height: 25,
                      borderRadius: 4,
                    }}
                    placeholder="Enter voucher code"
                    value={''}
                    //onChangeText={(searchKeyword) => {}}
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.centerElement, {width: 60}]}>
                <TouchableOpacity
                  style={[styles.centerElement, {width: 32, height: 32}]}
                  onPress={() => this.selectHandlerAll(selectAll)}>
                  <Ionicons
                    name={
                      selectAll === true
                        ? 'ios-checkmark-circle'
                        : 'ios-checkmark-circle-outline'
                    }
                    size={25}
                    color={selectAll === true ? '#0faf9a' : '#aaaaaa'}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>Select All</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 20,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
                  <Text>${this.subtotalPrice().toFixed(2)}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: 32,
                paddingRight: 20,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: '#0faf9a',
                    width: 100,
                    height: 25,
                    borderRadius: 5,
                  },
                ]}
                onPress={() => console.log('test')}>
                <Text style={{color: '#ffffff'}}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
