import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CardQtyIncDec} from '../../components/cart-qty-inc-dec';
import {getCartItem} from '../../services/storage-service';
import ProductAction from '../../actions/products';
import {
  ICartItem,
  ICartScreenState,
  ProductAndCart,
} from '../../interfaces/classes/cart';
import {ComponentProp} from '../../interfaces';
import {navigateToCheckoutPage} from '../../navigation';
import {
  updateCartDataOnStorage,
  calculateTotalSellingAmountWithGST,
  calculateTotalMRPAmountWithGST,
  getImageLink,
} from '../../helpers';
import {IS_WEB, IS_BIG_SCREEN} from '../../config';
import Image from '../../components/Image/image';
import colors from '../../colors';
import {Row} from 'react-native-easy-grid';

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
      refreshCount: 0,
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
    if (IS_WEB) {
      let updatedCart = this.state.cartItems; /* Clone it first */
      updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
      this.setState({
        cartItems: updatedCart,
        refreshCount: this.state.refreshCount + 1,
      }); /* Update the state */
      updateCartDataOnStorage(updatedCart);
    } else {
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
              this.setState({
                cartItems: updatedCart,
                refreshCount: this.state.refreshCount + 1,
              }); /* Update the state */
              updateCartDataOnStorage(updatedCart);
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  subtotalPrice = () => {
    const {cartItems} = this.state;
    if (cartItems) {
      return cartItems.reduce(
        (sum: number, item: ProductAndCart) =>
          sum +
          (item.checked === 1
            ? calculateTotalSellingAmountWithGST(item, item.quantity)
            : 0),
        0,
      );
    }
    return 0;
  };
  processCheckout = () => {
    const {cartItems} = this.state;
    const checkedProducts = cartItems.filter((ele) => ele.checked === 1);
    navigateToCheckoutPage(this.props, checkedProducts);
  };

  render() {
    const {cartItems, cartItemsIsLoading, selectAll, refreshCount} = this.state;

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
                    marginTop: 4,
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
                          uri: getImageLink(
                            item.images &&
                              item.images[0] &&
                              (item.images[0]
                                .optimizedDestinationPath as string),
                          ),
                        }}
                        style={[
                          styles.centerElement,
                          {
                            height: IS_BIG_SCREEN ? 140 : 80,
                            width: IS_BIG_SCREEN ? 140 : 80,
                          },
                        ]}
                      />
                    </TouchableOpacity>
                    <View
                      style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.text,
                          {marginTop: 4, fontSize: IS_BIG_SCREEN ? 18 : 14},
                        ]}>
                        {item.productName}
                      </Text>
                      <Text style={[styles.textLight, styles.marginTopSmall]}>
                        {'Seller: ' + item.sellerInfo?.sellerName}
                      </Text>

                      <Row>
                        <Text
                          numberOfLines={1}
                          style={[styles.text, styles.marginTopSmall]}>
                          Price:{' '}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.textLight,
                            styles.marginTopSmall,
                            styles.strikeThrough,
                          ]}>
                          {' ₹'}
                          {item.mrp + item.gst}
                        </Text>
                        {/* <Text
                          numberOfLines={1}
                          style={[
                            styles.textLight,
                            styles.strikeThrough,
                            styles.marginTopSmall,
                            {fontSize: 12, alignSelf: 'center'},
                          ]}>
                          {' + '}₹{item.gst}(GST)
                        </Text> */}
                      </Row>
                      <Row>
                        <Text style={[styles.text, styles.marginTopSmall]}>
                          Offer: ₹{item.sellingPrice + item.gst}
                        </Text>
                        {/* <Text
                          numberOfLines={1}
                          style={[
                            styles.text,
                            styles.marginTopModerate,
                            {fontSize: 12, alignSelf: 'center'},
                          ]}>
                          {' + '}₹{item.gst}(GST)
                        </Text> */}
                      </Row>
                      <Row>
                        <Text style={{color: '#333333', marginTop: 5}}>
                          Total: {item.quantity} * ₹
                          {item.sellingPrice + item.gst} = ₹
                          {calculateTotalSellingAmountWithGST(
                            item,
                            item.quantity,
                          )}{' '}
                        </Text>
                        <Text
                          style={[
                            styles.textLight,
                            styles.strikeThrough,
                            styles.marginTopSmall,
                          ]}>
                          ₹{calculateTotalMRPAmountWithGST(item, item.quantity)}
                        </Text>
                      </Row>

                      <CardQtyIncDec
                        cartProducts={cartItems}
                        productId={item._id}
                        onUpdateCartProducts={(cartProducts: ICartItem[]) => {
                          updateCartDataOnStorage(cartProducts);
                        }}
                        refreshCount={refreshCount}
                        updateQuantity={(quantity: number) => {
                          const newItems = [...cartItems];
                          newItems[i].quantity = quantity;
                          this.setState({cartItems: newItems});
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
                  <Text>₹{this.subtotalPrice().toFixed(2)}</Text>
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
                onPress={() => this.processCheckout()}>
                <Text style={{color: '#ffffff'}}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerElement: {justifyContent: 'center', alignItems: 'center'},
  text: {
    color: '#333333',
    fontSize: 15,
  },
  textLight: {
    color: colors.gray,
    fontSize: 15,
  },
  marginTopSmall: {
    marginTop: IS_BIG_SCREEN ? 4 : 2,
  },
  marginTopModerate: {
    marginTop: IS_BIG_SCREEN ? 8 : 4,
  },
  marginLarge: {
    marginTop: IS_BIG_SCREEN ? 10 : 5,
  },
  strikeThrough: {textDecorationLine: 'line-through'},
});
