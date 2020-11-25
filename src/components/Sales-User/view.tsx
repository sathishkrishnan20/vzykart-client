import React, {useState, useEffect, useRef} from 'react';

import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

import {ScrollView} from 'react-native-gesture-handler';
import {Loader} from '../Loader';
import {Button} from '../Button';
import TableComponent from '../Table/view';
import {TableHeader} from '../../interfaces/table-component';
interface SalesUserViewState {
  onClickAdd: () => void;
  isLoading: boolean;
  salesUserListData: any[];
}
export const SalesUserView = ({
  onClickAdd,
  isLoading,
  salesUserListData,
}: SalesUserViewState) => {
  const headerData: TableHeader[] = [
    {
      label: 'Seller Id',
      node: 'sellerId',
    },
    {
      label: 'First Name',
      node: 'firstName',
    },
    {
      label: 'Last Name',
      node: 'lastName',
    },
    {
      label: 'User Name',
      node: 'userName',
    },
    {
      label: 'email',
      node: 'email',
    },
    {
      label: 'Mobile Number',
      node: 'mobileNumber',
    },
  ];
  const widthData = [200, 200, 200, 100, 200, 200];
  return (
    <View style={styles.container}>
      <Text h4 style={{fontWeight: 'bold', color: '#FC7E40', marginBottom: 8}}>
        View Sales Users
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button onPress={() => onClickAdd()} title="Add Sellers"></Button>
      </View>

      <Loader visible={isLoading} />

      <ScrollView style={styles.dataWrapper}>
        <TableComponent
          headerData={headerData}
          valueData={salesUserListData}
          showActions={false}
          widthData={widthData}
          uniqueIdKeyName={'_id'}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    fontFamily: 'OpenSans',
    backgroundColor: '#fff',
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  dataWrapper: {marginTop: -1},
});
