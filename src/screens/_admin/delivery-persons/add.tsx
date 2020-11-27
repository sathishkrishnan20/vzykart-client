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
import {IDeliveryPersonCreateRequest} from '../../../interfaces/classes/delivery-person';
import DeliveryPersonAction from '../../../actions/delivery-person';

export function WriteAdminDeliveryPersonData() {
  const initialState: IDeliveryPersonCreateRequest = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    userName: '',
  };
  const deliveryPersonAction = new DeliveryPersonAction();
  const [deliveryPersonInfo, setDeliveryPersonInfo] = useState(initialState);
  const onUserInfoChange = (name: string, value: string) => {
    setDeliveryPersonInfo((prevState) => ({...prevState, [name]: value}));
  };

  useEffect(() => {}, []);

  const addressTableComponent: IAddUpdate[][] = [
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'First Name',
        stateKey: 'firstName',
        value: deliveryPersonInfo.firstName,
        changeState: (value: IProductChangeStateTypes) =>
          onUserInfoChange('firstName', value as string),
      },
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Last Name',
        stateKey: 'lastName',
        value: deliveryPersonInfo.lastName,
        changeState: (value: IProductChangeStateTypes) =>
          onUserInfoChange('lastName', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'User Name',
        stateKey: 'userName',
        value: deliveryPersonInfo.userName,
        changeState: (value: IProductChangeStateTypes) =>
          onUserInfoChange('userName', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Email',
        stateKey: 'email',
        inputDataType: INPUT_DATA_TYPE.EMAIl,
        value: deliveryPersonInfo.email,
        changeState: (value: IProductChangeStateTypes) =>
          onUserInfoChange('email', value as string),
      },
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Mobile Number',
        stateKey: 'mobileNumber',
        inputDataType: INPUT_DATA_TYPE.NUMBER,
        value: deliveryPersonInfo.mobileNumber,
        changeState: (value: IProductChangeStateTypes) =>
          onUserInfoChange('mobileNumber', value as string),
      },
    ],
  ];

  const saveSeller = async () => {
    const sellerCreateResponse = await deliveryPersonAction.createDeliveryByAdmin(
      deliveryPersonInfo,
    );
    console.log(sellerCreateResponse);
    showToastByResponse(sellerCreateResponse);
    if (sellerCreateResponse.success) {
      resetSalesUserInfoState();
    }
    return sellerCreateResponse;
  };

  const resetSalesUserInfoState = () =>
    setDeliveryPersonInfo({...initialState});

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
          <Button onPress={saveSeller} title="Save" />
        </View>
      </ScrollView>
    </Container>
  );
}
