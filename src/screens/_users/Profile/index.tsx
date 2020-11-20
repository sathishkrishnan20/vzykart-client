import React, {useEffect, useState} from 'react';
import {Container} from '../../../components';
import {ScrollView, View, StyleSheet, FlatList} from 'react-native';
import {Text, Card, Button, Icon} from 'react-native-elements';
import {Grid, Col, Row} from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../colors';
import {IS_WEB} from '../../../config';
import Image from '../../../components/Image/image';
import {getUserId} from '../../../services/storage-service';
import UserAction from '../../../actions/users';
import {IUserAddress, IUserInfo} from '../../../interfaces';
import Address from '../../../components/Address';
import {keyExtractor} from '../../../helpers/render-helpers';
import {SectionTitle} from '../../../components/Section-Title';
import TableWriteComponent from '../../../components/Table/add-update';
import {INPUT_COMPONENT, CRUD} from '../../../interfaces/enums';
import {IProductChangeStateTypes} from '../../../interfaces/classes/seller-add-products';
import {showToastByResponse} from '../../../components/Toast';
import {IAddUpdate} from '../../../interfaces/table-component';
import {WriteAddress} from './AddAddress';

export function Profile() {
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
  const [userData, setUserData] = useState({} as IUserInfo);
  const [addressState, setAddressState] = useState(addressInitialState);
  const [enableAddressCreate, setEnableAddressCreate] = useState(false);
  const [userDataOnEditMode, setUserDataOnEditMode] = useState(false);
  const [editAddressIndex, setEditAddressIndex] = useState(-1);

  const userDataReadComponent = [
    {
      label: 'First Name',
      value: userData.firstName,
    },
    {
      label: 'Last Name',
      value: userData.lastName,
    },
    {
      label: 'Email',
      value: userData.email,
    },
    {
      label: 'Mobile Number',
      value: userData.mobileNumber,
    },
  ];
  const userDataWriteComponent: IAddUpdate[][] = [
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'First Name',
        stateKey: 'firstName',
        value: userData.firstName || '',
        changeState: (value: IProductChangeStateTypes) =>
          onUserDataChange('firstName', value as string),
      },
    ],
    [
      {
        component: INPUT_COMPONENT.TEXT,
        label: 'Last Name',
        stateKey: 'lastName',
        value: userData.lastName || '',
        changeState: (value: IProductChangeStateTypes) =>
          onUserDataChange('lastName', value as string),
      },
    ],
  ];

  useEffect(() => {
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
  const saveUserData = async () => {
    const requestData: IUserInfo = {
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
    const response = await callUserUpdate(requestData);
    if (response.success) {
      setUserDataOnEditMode(false);
    }
  };

  const callUserUpdate = async (request: IUserInfo) => {
    const userId = (await getUserId()) as string;
    const userUpdateResponse = await userAction.updateUserByUserId(
      userId,
      request,
    );
    showToastByResponse(userUpdateResponse);
    if (userUpdateResponse.success) getUserProfileData();
    return userUpdateResponse;
  };

  const resetAddressState = () => setAddressState({...addressInitialState});

  const onUserDataChange = (name: string, value: string) => {
    setUserData((prevState) => ({...prevState, [name]: value}));
  };

  const renderProfileView = () => {
    return (
      <View style={[styles.rectLeftTop]}>
        <LinearGradient
          colors={colors.themeGradient}
          style={styles.rectLeftTopInnerArc}>
          <Image
            style={styles.rectLeftTopInnerImg}
            source={require('../../../assets/images/female.png')}
          />
        </LinearGradient>
        {userDataOnEditMode === false ? (
          <Card containerStyle={styles.infoCard}>
            <Row>
              <Col size={90}>
                {userDataReadComponent.map((item) => (
                  <Row size={12} key={item.label}>
                    <Row size={4}>
                      <Text style={{}}>{item.label}</Text>
                    </Row>
                    <Row size={1}>
                      <Text style={{}}>{':'}</Text>
                    </Row>
                    <Row size={7}>
                      <Text style={{}}>{item.value}</Text>
                    </Row>
                  </Row>
                ))}
              </Col>
              <Col size={10}>
                <Icon onPress={() => setUserDataOnEditMode(true)} name="edit" />
              </Col>
            </Row>
          </Card>
        ) : (
          <>
            <TableWriteComponent
              componentData={userDataWriteComponent}
              changeState={() => console.debug()}
            />
            <Button onPress={saveUserData} title="Save" />
          </>
        )}
      </View>
    );
  };

  const renderAddress = () => {
    return (
      <>
        <FlatList
          data={userData.address || []}
          ListHeaderComponent={
            <SectionTitle title={'Address'} /> // <HeaderComp headerText={'Delivery Address'} />
          }
          ListFooterComponent={() =>
            enableAddressCreate === false && editAddressIndex === -1 ? (
              <Button
                onPress={() => setEnableAddressCreate(true)}
                title="Add New Address"
              />
            ) : null
          }
          numColumns={1}
          removeClippedSubviews={false}
          keyExtractor={keyExtractor}
          renderItem={({item, index}) =>
            editAddressIndex === index ? (
              <WriteAddress
                defaultData={addressState}
                editAddressIndex={editAddressIndex}
                userData={userData}
                onResult={(status: boolean) => {
                  if (status) {
                    resetAddressState();
                    setEnableAddressCreate(false);
                    setEditAddressIndex(-1);
                    getUserProfileData();
                  }
                }}
              />
            ) : (
              <Address
                onClickUpdate={() => {
                  setAddressState(item);
                  setEditAddressIndex(index);
                }}
                buttons={[CRUD.UPDATE]}
                containerStyle={{margin: 6}}
                data={item}
              />
            )
          }
        />
        {enableAddressCreate && editAddressIndex === -1 ? (
          <WriteAddress
            editAddressIndex={-1}
            userData={userData}
            onResult={(status: boolean) => {
              if (status) {
                resetAddressState();
                setEnableAddressCreate(false);
                setEditAddressIndex(-1);
                getUserProfileData();
              }
            }}
          />
        ) : null}
      </>
    );
  };

  return (
    <Container>
      <ScrollView>
        <View style={styles.flexContainer}></View>

        {IS_WEB ? (
          <Grid>
            <Col size={40}>{renderProfileView()}</Col>
            <Col size={60}>{renderAddress()}</Col>
          </Grid>
        ) : (
          <>
            {renderProfileView()}
            {renderAddress()}
          </>
        )}
      </ScrollView>
    </Container>
  );
}
const styles = StyleSheet.create({
  flexContainer: {
    margin: 0,
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  rectLeftTop: {
    backgroundColor: '#FFFFFF',
    width: IS_WEB ? '28em' : '100%',
    marginLeft: 2,
    marginTop: 2,
    borderRadius: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginLeft: 4,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 16,
  },

  rectLeftTopInnerArc: {
    width: IS_WEB ? '100%' : '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  rectLeftTopInnerImg: {
    height: 150,
    width: 150,
    top: IS_WEB ? 0 : 0,
    left: IS_WEB ? '11.5rem' : 88,
    right: 0,
    borderRadius: 50,
    zIndex: 99,
  },
  rectLeftTopInner2: {
    backgroundColor: '#FFFFFF',
    height: 130,
    width: IS_WEB ? '31rem' : 31 * 8,
    marginTop: IS_WEB ? '1em' : 8,
    borderRadius: 16,
  },
});
