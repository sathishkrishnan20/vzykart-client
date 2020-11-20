import React, {useEffect} from 'react';
import {IAddUpdate} from '../../../interfaces/table-component';
import {INPUT_COMPONENT} from '../../../interfaces/enums';
import {IUserInfo, IUserAddress} from '../../../interfaces';
import {useState} from 'react';
import {IProductChangeStateTypes} from '../../../interfaces/classes/seller-add-products';
import TableWriteComponent from '../../../components/Table/add-update';
import {Button} from 'react-native-elements';
import {showToastByResponse} from '../../../components/Toast';
import {getUserId} from '../../../services/storage-service';
import UserAction from '../../../actions/users';
interface IAddAddress {
  userData: IUserInfo;
  editAddressIndex: number; // -1 for Add rest for Update the particular Index Address
  onResult: (status: boolean) => void;
  defaultData?: IUserAddress;
}
export function WriteAddress({
  userData,
  onResult,
  editAddressIndex,
  defaultData,
}: IAddAddress) {
  const addressInitialState: IUserAddress = {
    name: '',
    no_and_street: '',
    address_line_1: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pin_code: '',
    locality: '',
    type: 'Point',
    contactNumber: '',
  };
  const userAction = new UserAction();
  const [addressState, setAddressState] = useState(addressInitialState);
  const onAddressChange = (name: string, value: string) => {
    setAddressState((prevState) => ({...prevState, [name]: value}));
  };
  useEffect(() => {
    if (defaultData) {
      setAddressState(defaultData);
    }
  }, []);
  const addressTableComponent: IAddUpdate[][] = [
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Name',
        stateKey: 'name',
        value:
          addressState.name ||
          (userData.firstName ? userData.firstName : '') +
            ' ' +
            (userData.lastName ? userData.lastName : ''),
        changeState: (value: IProductChangeStateTypes) =>
          onAddressChange('name', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Number and Street',
        stateKey: 'numberAndStreet',
        value: addressState.no_and_street,
        changeState: (value: IProductChangeStateTypes) =>
          onAddressChange('no_and_street', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Address Line 1',
        stateKey: 'addressLineOne',
        value: addressState.address_line_1 || '',
        changeState: (value: IProductChangeStateTypes) =>
          onAddressChange('address_line_1', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'City/Village',
        stateKey: 'city',
        value: addressState.city,
        changeState: (value: IProductChangeStateTypes) =>
          onAddressChange('city', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'District',
        stateKey: 'district',
        value: addressState.district,
        changeState: (value: IProductChangeStateTypes) =>
          onAddressChange('district', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'State',
        stateKey: 'state',
        value: addressState.state,
        changeState: (value: IProductChangeStateTypes) =>
          onAddressChange('state', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Country',
        stateKey: 'country',
        value: addressState.country,
        changeState: (value: IProductChangeStateTypes) =>
          onAddressChange('country', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Pin Code',
        stateKey: 'pinCode',
        value: addressState.pin_code,
        changeState: (value: IProductChangeStateTypes) =>
          onAddressChange('pin_code', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Contact Number',
        stateKey: 'contactNumber',
        value: addressState.contactNumber || userData.mobileNumber || '',
        changeState: (value: IProductChangeStateTypes) =>
          onAddressChange('contactNumber', value as string),
      },
    ],
  ];

  const saveAddress = async () => {
    const userAddressData = userData.address || [];
    const newAddressRequest: IUserAddress = {
      coordinates: [1, 2],
      type: 'Point',
      ...addressState,
    };
    if (editAddressIndex === -1) {
      // New Address
      userAddressData.push(newAddressRequest);
    } else {
      // Updating Existing Address
      userAddressData[editAddressIndex] = newAddressRequest;
    }
    const addressRequestData = {
      address: userAddressData,
    };
    const userUpdateResponse = await callUserUpdate(addressRequestData);
    if (userUpdateResponse.success) {
      resetAddressState();
      onResult(true);
    }
  };
  const resetAddressState = () => setAddressState({...addressInitialState});

  const callUserUpdate = async (request: IUserInfo) => {
    const userId = (await getUserId()) as string;
    const userUpdateResponse = await userAction.updateUserByUserId(
      userId,
      request,
    );
    showToastByResponse(userUpdateResponse);
    return userUpdateResponse;
  };

  return (
    <>
      <TableWriteComponent
        changeState={() => console.debug()}
        componentData={addressTableComponent}
      />
      <Button onPress={saveAddress} title="Save Address" />
    </>
  );
}
