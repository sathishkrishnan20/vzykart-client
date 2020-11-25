import React, {useEffect} from 'react';
import {IAddUpdate} from '../../../interfaces/table-component';
import {INPUT_COMPONENT, INPUT_DATA_TYPE} from '../../../interfaces/enums';
import {useState} from 'react';
import {IProductChangeStateTypes} from '../../../interfaces/classes/seller-add-products';
import TableWriteComponent from '../../../components/Table/add-update';
import {Button} from 'react-native-elements';
import {showToastByResponse} from '../../../components/Toast';
import {View, ScrollView} from 'react-native';
import {Container} from '../../../components';
import {convertObjectToArray} from '../../../helpers';
import {IS_BIG_SCREEN} from '../../../config';
import {ISalesUserCreateRequest} from '../../../interfaces/classes/sales-user';
import SalesUserAction from '../../../actions/sales-user';
import SellerAction from '../../../actions/seller';
import {ISeller} from '../../../interfaces/classes/seller';
import {Item} from 'react-native-picker-select';
import {getSellerId} from '../../../services/storage-service';

export function WriteAdminSellerSalesUserData() {
  const initialSalesUserInfo: ISalesUserCreateRequest = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    userName: '',
    sellerId: '',
  };
  const salesUserAction = new SalesUserAction();
  const sellerAction = new SellerAction();
  const [salesUserInfo, setSalesUserInfo] = useState(initialSalesUserInfo);
  const [sellerItemData, setSellerItemData] = useState([] as Item[]);
  const onSalesUserInfoChange = (name: string, value: string) => {
    setSalesUserInfo((prevState) => ({...prevState, [name]: value}));
  };

  useEffect(() => {
    getSellersList();
  }, []);
  const getSellersList = async () => {
    const response = await sellerAction.getAllSellers();
    if (response.success) {
      const sellerList: ISeller[] = response.data;
      const sellerItems: Item[] = sellerList.map((sellerInfo) => {
        return {
          label: sellerInfo.sellerName,
          value: sellerInfo._id,
        };
      });
      setSellerItemData(sellerItems);
    }
  };
  const addressTableComponent: IAddUpdate[][] = [
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'First Name',
        stateKey: 'firstName',
        value: salesUserInfo.firstName,
        changeState: (value: IProductChangeStateTypes) =>
          onSalesUserInfoChange('firstName', value as string),
      },
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Last Name',
        stateKey: 'lastName',
        value: salesUserInfo.lastName,
        changeState: (value: IProductChangeStateTypes) =>
          onSalesUserInfoChange('lastName', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.SINGLE_SELECT,
        label: 'Select Seller Id',
        stateKey: 'sellerId',
        value: salesUserInfo.sellerId,
        selectionItems: sellerItemData,
        changeState: (value: IProductChangeStateTypes) =>
          onSalesUserInfoChange('sellerId', value as string),
      },
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'User Name',
        stateKey: 'userName',
        value: salesUserInfo.userName,
        changeState: (value: IProductChangeStateTypes) =>
          onSalesUserInfoChange('userName', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Email',
        stateKey: 'email',
        inputDataType: INPUT_DATA_TYPE.EMAIl,
        value: salesUserInfo.email,
        changeState: (value: IProductChangeStateTypes) =>
          onSalesUserInfoChange('email', value as string),
      },
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Mobile Number',
        stateKey: 'mobileNumber',
        inputDataType: INPUT_DATA_TYPE.NUMBER,
        value: salesUserInfo.mobileNumber,
        changeState: (value: IProductChangeStateTypes) =>
          onSalesUserInfoChange('mobileNumber', value as string),
      },
    ],
  ];

  const saveSeller = async () => {
    const sellerCreateResponse = await salesUserAction.createSalesUserByAdmin(
      salesUserInfo,
    );
    console.log(sellerCreateResponse);
    showToastByResponse(sellerCreateResponse);
    if (sellerCreateResponse.success) {
      resetSalesUserInfoState();
    }
    return sellerCreateResponse;
  };

  const resetSalesUserInfoState = () =>
    setSalesUserInfo({...initialSalesUserInfo});

  return (
    <Container>
      <ScrollView>
        <View style={{marginTop: 8}}>
          <TableWriteComponent
            changeState={() => console.debug()}
            componentData={
              IS_BIG_SCREEN
                ? addressTableComponent
                : convertObjectToArray(addressTableComponent)
            }
          />
          <Button onPress={saveSeller} title="Save Address" />
        </View>
      </ScrollView>
    </Container>
  );
}
