import React, {useState, useEffect} from 'react';
import {Container, Loader} from '../../components';
import {Button} from 'react-native-elements';
import {ProductSummary, SubTotalComponent} from './ProductSummary';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ProductAndCart, ICartItem} from '../../interfaces/classes/cart';
import {IS_WEB} from '../../config';
import {keyExtractor} from '../../helpers/render-helpers';
import {IUserInfo, ComponentProp, IUserAddress} from '../../interfaces';
import Address from '../../components/Address';
import {View, Dimensions} from 'react-native';
import {Row, Col} from 'react-native-easy-grid';
import {Payment} from '../../components/PayButton';
import {SectionTitle} from '../../components/Section-Title';
import {CRUD, PAYMENT_TYPE} from '../../interfaces/enums';
import {
  getUserId,
  getCartItem,
  setCartItem,
} from '../../services/storage-service';
import UserAction from '../../actions/users';
import {WriteAddress} from '../_users/Profile/AddAddress';
import {getParamForCheckoutPage, navigateByProp} from '../../navigation';
import {createOrder, getSellingAndDiscountGSTPrice} from './helper';
import {WarningToast} from '../../components/Toast';
import {RazorPaySuccess} from '../../interfaces/razorpay';
import ROUTE_NAMES from '../../routes/name';

export function Checkout(props: ComponentProp) {
  const userAction = new UserAction();
  const [checkoutProducts, setCheckoutProducts] = useState(
    [] as ProductAndCart[],
  );

  const [deliveryAddressIndex, setDeliveryAddressIndex] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(5);
  const [userData, setUserData] = useState({} as IUserInfo);
  const [enableAddressCreate, setEnableAddressCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkoutItemsFromProp = getParamForCheckoutPage(props);
    setCheckoutProducts(checkoutItemsFromProp);
    getUserProfileData();
  }, []);

  const getUserProfileData = async () => {
    try {
      setIsLoading(true);
      const userId = (await getUserId()) as string;
      if (!userId) {
        // Do Redirect Function
      }
      const userResponse = await userAction.getUserByUserId(userId);
      setIsLoading(false);
      if (userResponse.success) {
        setUserData(userResponse.data);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const getSellingAndDiscountPrice = () => {
    return getSellingAndDiscountGSTPrice(checkoutProducts, deliveryCharge);
  };
  const RenderProductSummaryFlatList = () => {
    return (
      <FlatList
        data={checkoutProducts}
        numColumns={1}
        keyExtractor={keyExtractor}
        renderItem={({item}) => <ProductSummary productInfo={item} />}
        ListFooterComponent={IS_WEB ? null : renderSubTotalComp()}
      />
    );
  };

  const renderSubTotalComp = () => {
    const {
      totalDiscountPrice,
      totalSellingPrice,
      totalMRPPrice,
      totalGstPrice,
    } = getSellingAndDiscountPrice();
    return (
      <SubTotalComponent
        totalGstPrice={totalGstPrice}
        sellingPrice={totalSellingPrice}
        discountPrice={totalDiscountPrice}
        deliveryCharge={deliveryCharge}
        totalMRPPrice={totalMRPPrice}
      />
    );
  };
  const onSuccessOrder = async (
    paymentType: PAYMENT_TYPE,
    result: RazorPaySuccess,
  ) => {
    try {
      setIsLoading(true);

      if (userData.address && userData.address[deliveryAddressIndex]) {
        const deliveryAddressInfo: IUserAddress =
          userData.address && userData.address[deliveryAddressIndex];
        const orderResp = await createOrder(
          checkoutProducts,
          deliveryAddressInfo,
          deliveryCharge,
          paymentType,
          result,
        );
        setIsLoading(false);
        if (orderResp.success) {
          removeProductFromCart();
          navigateByProp(
            props,
            ROUTE_NAMES.userOrderDetails.replace(
              ':orderId',
              orderResp.data.insertedId,
            ),
            {orderId: orderResp.data.insertedId},
          );
        }
      } else {
        WarningToast({
          title: 'Select Address',
          message: 'Please Select Delivery Address and Continue',
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const removeProductFromCart = async () => {
    const productIds = checkoutProducts.map((item) => item.productId);
    const cartItemsOnStorage = (await getCartItem()) as ICartItem[];
    const updatedCartItems = cartItemsOnStorage.filter(
      (productItem) => productIds.includes(productItem.productId) === false,
    );
    setCartItem(updatedCartItems);
  };
  const renderPaymentComp = () => {
    const {totalPriceToBePaid} = getSellingAndDiscountPrice();
    console.log(userData);
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
        <Payment
          name={userData.firstName + ' ' + userData.lastName}
          amount={String(totalPriceToBePaid * 100)}
          description={
            'Order of ' + checkoutProducts.length + ' Items for ' + userData._id
          }
          prefill={{
            name: userData.firstName + ' ' + userData.lastName,
            email: userData.email || 'sathishkrish20@gmail.com',
            contact: userData.mobileNumber || '8883334889',
          }}
          onSuccess={onSuccessOrder}
          onFailure={() => {}}
        />
      </View>
    );
  };

  return (
    <Container>
      <ScrollView>
        <View style={{marginBottom: 50}}>
          <SectionTitle title={'Products'} />
          {Dimensions.get('window').width > 600 ? (
            <Row size={12}>
              <Col size={8}>{RenderProductSummaryFlatList()}</Col>
              <Col size={4}>{renderSubTotalComp()}</Col>
            </Row>
          ) : (
            RenderProductSummaryFlatList()
          )}

          <Loader visible={isLoading} />

          <FlatList
            data={userData.address || []}
            ListHeaderComponent={() => (
              <SectionTitle title={'Delivery Address'} />
            )}
            ListFooterComponent={() =>
              enableAddressCreate === false ? (
                <Button
                  onPress={() => setEnableAddressCreate(true)}
                  title="Add New Address"
                />
              ) : null
            }
            numColumns={1}
            keyExtractor={keyExtractor}
            renderItem={({item, index}) => (
              <View>
                <Address
                  buttons={[CRUD.SELECT]}
                  onSelect={() => setDeliveryAddressIndex(index)}
                  checked={index === deliveryAddressIndex}
                  containerStyle={{margin: 6}}
                  data={item}
                />
              </View>
            )}
          />
          {enableAddressCreate ? (
            <WriteAddress
              editAddressIndex={-1}
              userData={userData}
              onResult={(status: boolean) => {
                if (status) {
                  setEnableAddressCreate(false);
                  getUserProfileData();
                }
              }}
            />
          ) : null}
        </View>
      </ScrollView>
      {renderPaymentComp()}
    </Container>
  );
}
