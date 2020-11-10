import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Text, Input} from 'react-native-elements';
import {Row, Col, Grid} from 'react-native-easy-grid';
import {ITableAddUpdate} from '../../interfaces/table-component';

export default function TableWriteComponent({
  componentData,
  changeState,
}: ITableAddUpdate) {
  return (
    <>
      {componentData.map((itemData) => {
        return (
          <Row style={{maxHeight: 50}}>
            {itemData.map((componentItem) => {
              return (
                <Col>
                  <Input
                    placeholder={componentItem.label}
                    errorStyle={{color: 'red'}}
                    onChangeText={(changedText: string) => {
                      changeState(componentItem.stateKey, changedText);
                    }}
                    //  errorMessage="ENTER A VALID ERROR HERE"
                  />
                </Col>
              );
            })}
          </Row>
        );
      })}
    </>
  );
}
