import React, {useState, useEffect} from 'react';
import {Container} from '../../components';
import {Button} from 'react-native-elements';
import {ProductSummary, SubTotalComponent} from './ProductSummary';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ProductAndCart} from '../../interfaces/classes/cart';
import {IS_WEB} from '../../config';
import {keyExtractor} from '../../helpers/render-helpers';
import {IUserInfo, ComponentProp} from '../../interfaces';
import Address from '../../components/Address';
import {View, Dimensions} from 'react-native';
import {Row, Col} from 'react-native-easy-grid';
import {Payment} from '../../components/PayButton';
import {SectionTitle} from '../../components/Section-Title';
import {CRUD} from '../../interfaces/enums';
import {getUserId} from '../../services/storage-service';
import UserAction from '../../actions/users';
import {WriteAddress} from '../_users/Profile/AddAddress';
import {getParamForCheckoutPage} from '../../navigation';

export function Checkout(props: ComponentProp) {
  const userAction = new UserAction();
  const [checkoutProducts, setCheckoutProducts] = useState(
    [] as ProductAndCart[],
  );

  const [deliveryAddressIndex, setDeliveryAddressIndex] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(5);
  const [userData, setUserData] = useState({} as IUserInfo);
  const [enableAddressCreate, setEnableAddressCreate] = useState(false);

  useEffect(() => {
    const checkoutItemsFromProp = getParamForCheckoutPage(props);
    setCheckoutProducts(checkoutItemsFromProp);
    getUserProfileData();
  }, []);

  const getUserProfileData = async () => {
    const userId = (await getUserId()) as string;
    if (!userId) {
      // Do Redirect Function
    }
    const userResponse = await userAction.getUserByUserId(userId);
    if (userResponse.success) {
      setUserData(userResponse.data);
    }
  };
  const getSellingAndDiscountPrice = () => {
    let totalSellingPrice = 0;
    let discountPrice = 0;
    checkoutProducts.forEach((productItem) => {
      totalSellingPrice += productItem.quantity * productItem.sellingPrice;
      discountPrice =
        discountPrice +
        productItem.quantity * (productItem.mrp - productItem.sellingPrice);
    });
    return {
      totalSellingPrice,
      discountPrice: discountPrice * -1,
      totalPriceToBePaid: totalSellingPrice + deliveryCharge,
    };
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
    const {discountPrice, totalSellingPrice} = getSellingAndDiscountPrice();
    return (
      <SubTotalComponent
        sellingPrice={totalSellingPrice}
        discountPrice={discountPrice}
        deliveryCharge={deliveryCharge}
      />
    );
  };

  const renderPaymentComp = () => {
    const {totalPriceToBePaid} = getSellingAndDiscountPrice();
    return (
      <Payment
        name={'Delivery'}
        amount={String(totalPriceToBePaid * 100)}
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
    );
  };

  return (
    <Container>
      <ScrollView>
        <SectionTitle title={'Products'} />
        {Dimensions.get('window').width > 600 ? (
          <Row size={12}>
            <Col size={8}>{RenderProductSummaryFlatList()}</Col>
            <Col size={4}>{renderSubTotalComp()}</Col>
          </Row>
        ) : (
          RenderProductSummaryFlatList()
        )}

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

        {renderPaymentComp()}
      </ScrollView>
    </Container>
  );
}
