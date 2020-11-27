import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

import {ScrollView} from 'react-native-gesture-handler';
import {TableHeader} from '../../../interfaces/table-component';
import {Button, Loader} from '../../../components';
import TableComponent from '../../../components/Table/view';
import {IDeliveryPerson} from '../../../interfaces/classes/delivery-person';
interface SalesUserViewState {
  onClickAdd: () => void;
  isLoading: boolean;
  ListData: IDeliveryPerson[];
}
export const DeliveryPersonView = ({
  onClickAdd,
  isLoading,
  ListData,
}: SalesUserViewState) => {
  const headerData: TableHeader[] = [
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
  const widthData = [200, 200, 200, 250, 200];
  return (
    <View style={styles.container}>
      <Text h4 style={{fontWeight: 'bold', color: '#FC7E40', marginBottom: 8}}>
        View Delivery Persons
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button
          onPress={() => onClickAdd()}
          title="Add Delivery Person"></Button>
      </View>

      <Loader visible={isLoading} />

      <ScrollView style={styles.dataWrapper}>
        <TableComponent
          headerData={headerData}
          valueData={ListData}
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
