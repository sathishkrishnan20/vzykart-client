import React from 'react';
import {Text, Card, Icon} from 'react-native-elements';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {IUserAddress} from '../../interfaces';
import {IS_BIG_SCREEN} from '../../config';
import {Row, Col} from 'react-native-easy-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CRUD} from '../../interfaces/enums';
import colors from '../../colors';
interface AddressInfo {
  data: IUserAddress;
  containerStyle?: StyleProp<ViewStyle>;
  checked?: boolean;
  onSelect?: () => void;
  buttons?: CRUD[];
  onClickUpdate?: () => void;
  onClickDelete?: () => void;
  onClickAdd?: () => void;
}

const Address = ({
  data,

  checked,
  onSelect,
  buttons = [],
  onClickUpdate,
  onClickDelete,
  containerStyle = {},
  onClickAdd,
}: AddressInfo) => {
  let leftRowSize = buttons.includes(CRUD.SELECT)
    ? IS_BIG_SCREEN
      ? 4
      : 15
    : 0;
  leftRowSize =
    buttons.includes(CRUD.UPDATE) || buttons.includes(CRUD.DELETE)
      ? IS_BIG_SCREEN
        ? 4
        : 15
      : leftRowSize;
  return (
    <Card containerStyle={containerStyle}>
      <Row size={100}>
        {buttons.includes(CRUD.SELECT) ? (
          <Col size={leftRowSize}>
            <View style={[styles.centerElement, {width: 60}]}>
              <TouchableOpacity
                style={[styles.centerElement, {width: 32, height: 32}]}
                onPress={() => (onSelect ? onSelect() : null)}>
                <Ionicons
                  name={
                    checked
                      ? 'ios-checkmark-circle'
                      : 'ios-checkmark-circle-outline'
                  }
                  size={25}
                  color={checked ? '#0faf9a' : '#aaaaaa'}
                />
              </TouchableOpacity>
            </View>
          </Col>
        ) : null}
        <Col size={100 - leftRowSize}>
          <Text style={[styles.textName, styles.bold]}>{data.name}</Text>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={[styles.textName]}>{data.no_and_street}</Text>
            {data.address_line_1 ? (
              <Text style={[styles.textName]}>{data.address_line_1}</Text>
            ) : null}
          </View>
          <Row>
            <Text style={[styles.textName]}>{data.city}</Text>
            <Text style={[styles.textName]}>{data.district}</Text>
          </Row>
          <Row>
            <Text style={[styles.textName]}>{data.pin_code}</Text>
          </Row>
          <Row>
            <Text style={[styles.textName]}>{data.contactNumber}</Text>
          </Row>
          {data.locality ? (
            <Row>
              <Text style={styles.textNameLight}>{data.locality}</Text>
            </Row>
          ) : null}
          {buttons.includes(CRUD.CREATE) ? (
            <View
              style={{
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: -50,
              }}>
              <Col size={100 - (100 - leftRowSize)}>
                <Icon
                  reverse
                  name="plus-circle"
                  type="font-awesome"
                  color={'#1BAF99'}
                  onPress={onClickAdd}
                />
              </Col>
            </View>
          ) : null}
        </Col>
        {buttons.includes(CRUD.UPDATE) || buttons.includes(CRUD.DELETE) ? (
          <Col size={100 - (100 - leftRowSize)}>
            {buttons.includes(CRUD.UPDATE) ? (
              <Icon onPress={onClickUpdate} size={25} name="edit" />
            ) : null}
            {buttons.includes(CRUD.DELETE) ? (
              <Icon onPress={onClickDelete} size={25} name="delete" />
            ) : null}
          </Col>
        ) : null}
      </Row>
    </Card>
  );
};

const styles = StyleSheet.create({
  textName: {
    fontSize: IS_BIG_SCREEN ? 18 : 14,
    color: colors.textGray,
    fontWeight: '400',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
  },
  textNameLight: {
    fontSize: IS_BIG_SCREEN ? 14 : 12,
    color: colors.gray,
    fontWeight: '200',
    marginLeft: IS_BIG_SCREEN ? 8 : 4,
    marginBottom: IS_BIG_SCREEN ? 8 : 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  colDirection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Address;
