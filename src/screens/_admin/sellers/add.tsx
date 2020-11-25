import React, {useEffect} from 'react';
import {IAddUpdate} from '../../../interfaces/table-component';
import {INPUT_COMPONENT, INPUT_DATA_TYPE} from '../../../interfaces/enums';
import {IUserInfo, IUserAddress, ComponentProp} from '../../../interfaces';
import {useState} from 'react';
import {IProductChangeStateTypes} from '../../../interfaces/classes/seller-add-products';
import TableWriteComponent from '../../../components/Table/add-update';
import {Button} from 'react-native-elements';
import {showToastByResponse} from '../../../components/Toast';
import {getUserId} from '../../../services/storage-service';
import UserAction from '../../../actions/users';
import {
  ISeller,
  ISellerCreateRequest,
} from '../../../interfaces/classes/seller';
import {View, ScrollView} from 'react-native';
import {Container} from '../../../components';
import {convertObjectToArray} from '../../../helpers';
import {IS_BIG_SCREEN} from '../../../config';
import {IProductImage} from '../../../interfaces/products';
import SellerAction from '../../../actions/seller';

export function WriteSellerData() {
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
  };
  const initialSellerInfo: ISellerCreateRequest = {
    sellerName: '',
    sellerDescription: '',
    contactName: '',
    email: '',
    mobileNumber: '',
    location: addressInitialState,

    sellerThumbImage: {
      optimizedDestinationPath: '',
      destinationPath: '',
      active: false,
    },
  };
  const sellerAction = new SellerAction();
  const [addressState, setAddressState] = useState(addressInitialState);
  const [sellerInfo, setSellerInfo] = useState(initialSellerInfo);
  const [sellerThumbImage, setSellerThumbImage] = useState({} as IProductImage);

  const onAddressChange = (name: string, value: string) => {
    setAddressState((prevState) => ({...prevState, [name]: value}));
  };

  const onSellerInfoChange = (name: string, value: string) => {
    setSellerInfo((prevState) => ({...prevState, [name]: value}));
  };

  useEffect(() => {}, []);

  const addressTableComponent: IAddUpdate[][] = [
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Seller Name',
        stateKey: 'name',
        value: sellerInfo.sellerName,
        changeState: (value: IProductChangeStateTypes) =>
          onSellerInfoChange('sellerName', value as string),
      },
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Description',
        stateKey: 'sellerDescription',
        value: sellerInfo.sellerDescription,
        changeState: (value: IProductChangeStateTypes) =>
          onSellerInfoChange('sellerDescription', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Contact Name',
        stateKey: 'contactName',
        value: sellerInfo.contactName || '',
        changeState: (value: IProductChangeStateTypes) =>
          onSellerInfoChange('contactName', value as string),
      },
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Contact Number',
        stateKey: 'mobileNumber',
        value: sellerInfo.mobileNumber || '',
        changeState: (value: IProductChangeStateTypes) =>
          onSellerInfoChange('mobileNumber', value as string),
      },
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Email',
        stateKey: 'email',
        inputDataType: INPUT_DATA_TYPE.EMAIl,
        value: sellerInfo.email || '',
        changeState: (value: IProductChangeStateTypes) =>
          onSellerInfoChange('email', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.SUB_HEADER,
        label: 'Address Info',
        stateKey: 'name',
        value: 'Address Info',
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
        component: INPUT_COMPONENT.FILE_UPLOAD,
        label: 'image',
        stateKey: 'sellerThumbImage',
        multi: false,
        value: Object.keys(sellerThumbImage).length ? [sellerThumbImage] : [],
        changeState: (value: IProductChangeStateTypes) => {
          const images = value as IProductImage[];
          setSellerThumbImage(images[0]);
        },
      },
    ],
  ];

  const saveSeller = async () => {
    const sellerCreateRequest: ISellerCreateRequest = {
      ...sellerInfo,
      sellerThumbImage: sellerThumbImage,
      location: addressState,
    };
    callCreateSeller(sellerCreateRequest);
    console.log(sellerCreateRequest);
  };

  const callCreateSeller = async (request: ISellerCreateRequest) => {
    const sellerCreateResponse = await sellerAction.createSellerByAdminId(
      request,
    );
    showToastByResponse(sellerCreateResponse);
    if (sellerCreateResponse.success) {
      resetAddressState();
      resetSellerInfoState();
      resetSellerThumbImage();
    }
    return sellerCreateResponse;
  };
  const resetAddressState = () => setAddressState({...addressInitialState});
  const resetSellerInfoState = () => setSellerInfo({...initialSellerInfo});
  const resetSellerThumbImage = () => setSellerThumbImage({} as IProductImage);

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
