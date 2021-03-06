import React, {useState, useEffect} from 'react';
import {Container, Loader} from '../../components';
import {Button} from 'react-native-elements';
import {ProductSummary, SubTotalComponent, PromoCodeComponent} from './ProductSummary';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ProductAndCart, ICartItem} from '../../interfaces/classes/cart';
import {IS_WEB, IS_BIG_SCREEN} from '../../config';
import {keyExtractor} from '../../helpers/render-helpers';
import {IUserInfo, ComponentProp, IUserAddress} from '../../interfaces';
import Address from '../../components/Address';
import {View, Dimensions} from 'react-native';
import {Row, Col, Grid} from 'react-native-easy-grid';
import {Payment} from '../../components/PayButton';
import {SectionTitle} from '../../components/Section-Title';
import {CRUD, PAYMENT_TYPE, INPUT_COMPONENT} from '../../interfaces/enums';
import {getUserId, getCartItem, setCartItem, getUserType} from '../../services/storage-service';
import UserAction from '../../actions/users';
import {WriteAddress} from '../_users/Profile/AddAddress';
import {getParamForCheckoutPage, navigateByProp} from '../../navigation';
import {createOrder, getSellingAndDiscountGSTPrice} from './helper';
import {WarningToast} from '../../components/Toast';
import {RazorPaySuccess} from '../../interfaces/razorpay';
import ROUTE_NAMES from '../../routes/name';
import {IProductChangeStateTypes} from '../../interfaces/classes/seller-add-products';
import TableWriteComponent from '../../components/Table/add-update';
import PromoCodeAction from '../../actions/promocodes';
export function Checkout(props: ComponentProp) {
  const userAction = new UserAction();
  const [checkoutProducts, setCheckoutProducts] = useState([] as ProductAndCart[]);

  const [deliveryAddressIndex, setDeliveryAddressIndex] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(5);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [promoCodeDiscountAmount, setPromoCodeDiscountAmount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');

  const [userData, setUserData] = useState({} as IUserInfo);
  const [enableAddressCreate, setEnableAddressCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [askNameInputs, setAskNameInputs] = useState(false);
  const firstNameLastNameInput = [
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'First Name',
        stateKey: 'firstName',
        value: firstName,
        changeState: (value: IProductChangeStateTypes) => setFirstName(value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Last Name',
        stateKey: 'lastName',
        value: lastName || '',
        changeState: (value: IProductChangeStateTypes) => setLastName(value as string),
      },
    ],
  ];

  useEffect(() => {
    const checkoutItemsFromProp = getParamForCheckoutPage(props);
    setCheckoutProducts(checkoutItemsFromProp);
    getUserProfileData();
    const {totalPayable} = getSellingAndDiscountGSTPrice(checkoutItemsFromProp, deliveryCharge, promoCodeDiscountAmount); // getSellingAndDiscountPrice();
    setTotalPayableAmount(totalPayable);
  }, []);

  const onPromoCodeSuccess = (appliedPromoCode: string, promoCodeDiscountValue: number) => {
    const {totalPayable} = getSellingAndDiscountGSTPrice(checkoutProducts, deliveryCharge, promoCodeDiscountValue); // getSellingAndDiscountPrice();
    setTotalPayableAmount(totalPayable);
    setAppliedPromoCode(appliedPromoCode);
    setPromoCodeDiscountAmount(promoCodeDiscountValue);
  };

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
        if (!userResponse.data.firstName || !userResponse.data.lastName) {
          setAskNameInputs(true);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const getSellingAndDiscountPrice = () => {
    return getSellingAndDiscountGSTPrice(checkoutProducts, deliveryCharge, promoCodeDiscountAmount);
  };
  const RenderProductSummaryFlatList = () => {
    return (
      <>
        <FlatList
          data={checkoutProducts}
          numColumns={1}
          keyExtractor={keyExtractor}
          renderItem={({item}) => <ProductSummary productInfo={item} />}
          ListFooterComponent={
            IS_BIG_SCREEN ? null : (
              <>
                <PromoCodeComponent onSuccess={onPromoCodeSuccess} amountToApplyPromoCode={totalPayableAmount} />
                <RenderSubTotalComp />
              </>
            )
          }
        />
      </>
    );
  };

  const RenderSubTotalComp = () => {
    const {totalGstAmountForSellingPrice, totalSellingAmountWithGST, totalDiscountAmount, totalMRPAmountWithGST} = getSellingAndDiscountPrice();
    return <SubTotalComponent promoCodeDiscountAmount={promoCodeDiscountAmount} totalPayablePrice={totalPayableAmount} totalMRPPrice={totalMRPAmountWithGST} sellingPrice={totalSellingAmountWithGST} totalGstPrice={totalGstAmountForSellingPrice} discountPrice={totalDiscountAmount} deliveryCharge={deliveryCharge} />;
  };
  const onSuccessOrder = async (paymentType: PAYMENT_TYPE, result: RazorPaySuccess) => {
    try {
      setIsLoading(true);

      if (userData.address && userData.address[deliveryAddressIndex]) {
        const deliveryAddressInfo: IUserAddress = userData.address && userData.address[deliveryAddressIndex];
        const promoCodeInfo = {
          discountAmount: promoCodeDiscountAmount,
          promoCode: appliedPromoCode,
        };
        const orderResp = await createOrder(checkoutProducts, deliveryAddressInfo, deliveryCharge, promoCodeInfo, paymentType, result);
        setIsLoading(false);
        if (orderResp.success) {
          const promoCodeAction = new PromoCodeAction();
          const requestData = {
            promoCode: appliedPromoCode,
            userType: await getUserType(),
            userId: (await getUserId()) as string,
            amountToApplyPromoCode: totalPayableAmount,
          };
          promoCodeAction.applyPromoCode(requestData);
          removeProductFromCart();
          navigateByProp(props, ROUTE_NAMES.userOrderDetails.replace(':orderId', orderResp.data.insertedId), {orderId: orderResp.data.insertedId});
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
    const updatedCartItems = cartItemsOnStorage.filter((productItem) => productIds.includes(productItem.productId) === false);
    setCartItem(updatedCartItems);
  };
  const renderPaymentComp = () => {
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
          amount={String(Number(totalPayableAmount) * 100)}
          description={'Order of ' + checkoutProducts.length + ' Items for ' + userData._id}
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
          {IS_BIG_SCREEN ? (
            <Grid>
              <Col size={8}>{RenderProductSummaryFlatList()}</Col>
              <Col size={4}>
                <Row>
                  <Col>
                    <PromoCodeComponent onSuccess={onPromoCodeSuccess} amountToApplyPromoCode={totalPayableAmount} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <RenderSubTotalComp />
                  </Col>
                </Row>
              </Col>
            </Grid>
          ) : (
            RenderProductSummaryFlatList()
          )}

          <Loader visible={isLoading} />

          <FlatList
            data={userData.address || []}
            ListHeaderComponent={() => <SectionTitle title={'Delivery Address'} />}
            ListFooterComponent={() => (enableAddressCreate === false && (!userData.address || userData.address?.length === 0) ? <Button onPress={() => setEnableAddressCreate(true)} title="Add New Address" /> : null)}
            numColumns={1}
            keyExtractor={keyExtractor}
            renderItem={({item, index}) => (
              <View>
                <Address onClickAdd={() => setEnableAddressCreate(true)} buttons={index === (userData.address && userData.address.length - 1) ? [CRUD.SELECT, CRUD.CREATE] : [CRUD.SELECT]} onSelect={() => setDeliveryAddressIndex(index)} checked={index === deliveryAddressIndex} containerStyle={{margin: 6}} data={item} />
              </View>
            )}
          />
          {enableAddressCreate ? (
            <View style={{marginTop: 8}}>
              {askNameInputs ? (
                <View style={{marginTop: 8}}>
                  <TableWriteComponent changeState={() => {}} componentData={firstNameLastNameInput} />
                </View>
              ) : null}
              <View style={{marginTop: 8}}>
                <WriteAddress
                  additionalUserInfoToUpdate={askNameInputs ? {firstName, lastName} : undefined}
                  editAddressIndex={-1}
                  userData={userData}
                  onResult={(status: boolean) => {
                    if (status) {
                      setEnableAddressCreate(false);
                      getUserProfileData();
                    }
                  }}
                />
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
      {renderPaymentComp()}
    </Container>
  );
}
