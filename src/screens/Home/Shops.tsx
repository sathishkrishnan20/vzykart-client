import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {Row, Col} from 'react-native-easy-grid';
import {IS_WEB} from '../../config';
import {IShop} from '../../interfaces/shop';
interface IShopsProp {
  data: IShop;
  onClick: () => void;
}
export function Shops({data, onClick}: IShopsProp) {
  return (
    <Row size={12} style={{margin: 4}}>
      <Col size={12}>
        <TouchableOpacity onPress={onClick}>
          <Card containerStyle={{borderRadius: 2, margin: 2}}>
            <Row size={IS_WEB ? 12 : 0} style={styles.rowStyle}>
              <Image
                source={{
                  uri: data.display_thumb_url,
                }}
                resizeMode={'stretch'}
                style={{
                  width: '100%',
                  height: 200,
                  alignItems: 'center',
                }}
              />
            </Row>
            <Row size={IS_WEB ? 12 : 0} style={styles.secondRow}>
              <Col size={IS_WEB ? 12 : 0}>
                <Text style={styles.mainText}>{data.name}</Text>
                <Text style={styles.subText}>{data.short_description}</Text>
              </Col>
            </Row>
          </Card>
        </TouchableOpacity>
      </Col>
    </Row>
  );
}

const styles = StyleSheet.create({
  rowStyle: {
    height: 100,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondRow: {
    paddingTop: 10,
    paddingBottom: 10,

    height: 80,
    borderTopColor: '#000',
    borderTopWidth: 0.3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  subText: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
});
