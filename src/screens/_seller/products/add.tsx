import React, {useEffect, Component} from 'react';

import {StyleSheet, View} from 'react-native';
import {Text, Input} from 'react-native-elements';
import {Row, Col, Grid} from 'react-native-easy-grid';

import Table from '../../../components/Table';
import TableWriteComponent from '../../../components/Table/add-update';
import {IAddUpdate} from '../../../interfaces/table-component';
// import RNPickerSelect from 'react-native-picker-select';
class SellerAddProducts extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      productPrefix: '',
      productName: '',
      productDescription: '',
      mrp: '',
      tradePrice: '',
      sellingPrice: '',
      discount: '',
      gst: '',
      shopId: '',
      uom: '',
      unit: '',
      categories: [],
    };
  }
  changeState(key: string, value: string) {
    this.setState({[key]: value});
  }
  render() {
    const data: IAddUpdate[][] = [
      [
        {
          component: 'TEXT',
          label: 'Product Name',
          stateKey: 'productName',
          //   onChange: this.changeState.bind({
          //     stateKey: 'productName',
          //   }),
        },
        {
          component: 'TEXT',
          label: 'Product Prefix',
          stateKey: 'productPrefix',
          //  onChange: this.changeState.bind({stateKey: 'productPrefix'}),
        },
        {
          component: 'TEXT',
          label: 'MRP',
          stateKey: 'mrp',
          // onChange: this.changeState.bind({stateKey: 'mrp'}),
        },
      ],
      [
        {
          component: 'TEXT',
          label: 'Product Description',
          stateKey: 'productDescription',
          // onChange: this.changeState.bind({stateKey: 'productDescription'}),
        },
      ],
    ];
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text h4 style={{fontWeight: 'bold', color: '#FC7E40'}}>
          Add Product
        </Text>
        <TableWriteComponent
          changeState={(key: string, value: string) =>
            this.changeState(key, value)
          }
          componentData={data}
        />
        {/* <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          placeholder={'Select one'}
          items={[
            {label: 'Football', value: 'football'},
            {label: 'Baseball', value: 'baseball'},
            {label: 'Hockey', value: 'hockey'},
          ]}
        /> */}
      </View>
    );
  }
}
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
});
export default SellerAddProducts;
