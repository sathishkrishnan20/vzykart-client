import React, {CSSProperties} from 'react';
import {Text, Card} from 'react-native-elements';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {IUserAddress} from '../../interfaces';
import {IS_WEB} from '../../config';
import {Row, Col} from 'react-native-easy-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface AddressInfo {
  name: string;
  data: IUserAddress;
  containerStyle?: StyleProp<ViewStyle>;
  checked?: boolean;
  onSelect?: () => void;
}
const leftRowSize = IS_WEB ? 4 : 15;

const Address = ({
  data,
  name,
  checked,
  onSelect,
  containerStyle = {},
}: AddressInfo) => {
  return (
    <Card containerStyle={containerStyle}>
      <Row size={100}>
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
        <Col size={100 - leftRowSize}>
          <Text style={[styles.textName, styles.bold]}>{name}</Text>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.textName}>{data.no_and_street}</Text>
            {data.address_line_1 ? (
              <Text style={styles.textName}>{data.address_line_1}</Text>
            ) : null}
          </View>
          <Row>
            <Text style={styles.textName}>{data.city}</Text>
            <Text style={styles.textName}>{data.district}</Text>
          </Row>
          <Row>
            <Text style={styles.textName}>{data.pin_code}</Text>
          </Row>
          {data.locality ? (
            <Row>
              <Text style={styles.textNameLight}>{data.locality}</Text>
            </Row>
          ) : null}
        </Col>
      </Row>
    </Card>
  );
};

const styles = StyleSheet.create({
  textName: {
    fontSize: IS_WEB ? 18 : 14,
    color: '#4B5164',
    fontWeight: '400',
    marginLeft: IS_WEB ? 8 : 4,
    marginBottom: IS_WEB ? 8 : 4,
  },
  textNameLight: {
    fontSize: IS_WEB ? 14 : 12,
    color: 'gray',
    fontWeight: '200',
    marginLeft: IS_WEB ? 8 : 4,
    marginBottom: IS_WEB ? 8 : 4,
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
