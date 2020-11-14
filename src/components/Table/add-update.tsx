import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Text, Input} from 'react-native-elements';
import {Row, Col, Grid} from 'react-native-easy-grid';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import {ITableAddUpdate} from '../../interfaces/table-component';
import {INPUT_COMPONENT} from '../../interfaces/enums';
import {IS_ANDROID, IS_WEB} from '../../config';
import MultiSelect from '../MultiSelect';
import DateTimePicker from '../DateTimePicker/picker';
import FileUpload from '../FileUpload/upload';
import {IProductImage} from '../../interfaces/products';

export default function TableWriteComponent({
  componentData,
  changeState,
}: ITableAddUpdate) {
  return (
    <>
      {componentData.map((itemData, index: number) => {
        return (
          <Row key={'' + index} style={{marginBottom: 4}}>
            {itemData.map((componentItem, componentIndex: number) => {
              return (
                <Col key={`${index}${componentIndex}`}>
                  {componentItem.component === INPUT_COMPONENT.TEXT ? (
                    <Input
                      style={{padding: 4}}
                      label={componentItem.label}
                      value={componentItem.value as string}
                      placeholder={componentItem.label}
                      errorStyle={{color: 'red'}}
                      onChangeText={(changedText: string) => {
                        changeState(componentItem.stateKey, changedText);
                      }}
                      //  errorMessage="ENTER A VALID ERROR HERE"
                    />
                  ) : null}
                  {componentItem.component === INPUT_COMPONENT.SINGLE_SELECT ? (
                    <>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'gray',
                          fontSize: 16,
                          marginLeft: 8,
                          marginBottom: IS_ANDROID ? -4 : 4,
                        }}>
                        {componentItem.label}
                      </Text>
                      <RNPickerSelect
                        placeholder={{
                          label: componentItem.label,
                          value: null,
                          color: '#gray',
                        }}
                        items={componentItem.selectionItems || []}
                        onValueChange={(value) => {
                          changeState(componentItem.stateKey, value);
                        }}
                        style={{
                          ...pickerSelectStyles,
                          iconContainer: {
                            top: 20,
                            right: 10,
                          },
                          placeholder: {
                            color: 'gray',
                            fontSize: 12,
                            fontWeight: 'bold',
                          },
                          viewContainer: {
                            marginEnd: 8,
                          },
                        }}
                        value={componentItem.value}
                        Icon={() => {
                          if (IS_WEB) return null;
                          return (
                            <View
                              style={{
                                backgroundColor: 'transparent',
                                borderTopWidth: 10,
                                borderTopColor: 'gray',
                                borderRightWidth: 10,
                                borderRightColor: 'transparent',
                                borderLeftWidth: 10,
                                borderLeftColor: 'transparent',
                                width: 0,
                                height: 0,
                              }}
                            />
                          );
                        }}
                      />
                    </>
                  ) : null}

                  {componentItem.component === INPUT_COMPONENT.MULTI_SELECT ? (
                    <MultiSelect
                      items={componentItem.selectionItems || []}
                      stateKey={componentItem.stateKey}
                      onSelectedItemsChange={changeState}
                      selectedItems={(componentItem.value as Item[]) || []}
                      label={componentItem.label}
                    />
                  ) : null}

                  {componentItem.component === INPUT_COMPONENT.DATE_PICKER ? (
                    <DateTimePicker
                      date={componentItem.value as Date}
                      stateKey={componentItem.stateKey}
                      showDatePicker={componentItem.showDatePicker || false}
                      changeState={changeState}
                      showDatePickerStateKey={
                        componentItem.showDatePickerStateKey || ''
                      }
                    />
                  ) : null}
                  {componentItem.component === INPUT_COMPONENT.FILE_UPLOAD ? (
                    <FileUpload
                      type={componentItem.label || 'image'}
                      images={componentItem.value}
                      onDeleteImage={(images: IProductImage[]) =>
                        changeState(componentItem.stateKey, images)
                      }
                      onResult={(images: IProductImage[]) =>
                        changeState(componentItem.stateKey, images)
                      }
                    />
                  ) : null}
                </Col>
              );
            })}
          </Row>
        );
      })}
    </>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginLeft: 8,
    fontSize: 16,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, //  to ensure the text is never behind the icon
  },
  inputWeb: {
    marginLeft: 8,
    fontSize: 16,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});