import React from 'react';
import {ActivityIndicator, Text, StyleSheet} from 'react-native';

import {Image, Card} from 'react-native-elements';
import {Row, Col} from 'react-native-easy-grid';
import {IS_WEB} from '../../config';
export const SellerHeader = () => {
  return (
    <Card>
      <Row size={IS_WEB ? 12 : 0} style={{height: 160}}>
        <Col size={IS_WEB ? 4 : 0}>
          <Image
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/1/13/Supermarkt.jpg',
            }}
            style={{width: 200, height: 150}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </Col>
        <Col size={IS_WEB ? 4 : 0}>
          <Text style={styles.text}> Selvaraj Stores </Text>
        </Col>
      </Row>
    </Card>
  );
};
const styles = StyleSheet.create({
  text: {},
});
