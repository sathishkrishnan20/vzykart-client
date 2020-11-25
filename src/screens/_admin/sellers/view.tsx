import React, {Component, useState, useEffect, useRef} from 'react';

import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

import {SellerViewProductsState} from '../../../interfaces/classes/seller-add-products';
import ProductAction from '../../../actions/products';
import {getSellerId} from '../../../services/storage-service';
import {ScrollView} from 'react-native-gesture-handler';
import TableComponent from '../../../components/Table/view';
import {TableHeader} from '../../../interfaces/table-component';
import {CRUD} from '../../../interfaces/enums';
import {navigateByProp} from '../../../navigation';
import {ComponentProp} from '../../../interfaces';
import {Button, Loader} from '../../../components/index';
import ROUTE_NAMES from '../../../routes/name';
import {ISeller, ISellerFlatten} from '../../../interfaces/classes/seller';
import SellerAction from '../../../actions/seller';
import {showToastByResponse} from '../../../components/Toast';
import convertFlatten from '../../../helpers/convert-flat-object';

export function AdminViewSellers(props: ComponentProp) {
  const sellerAction = new SellerAction();
  const headerData: TableHeader[] = [
    {
      label: 'Seller Name',
      node: 'sellerName',
    },
    {
      label: 'Seller Desc',
      node: 'sellerDescription',
    },
    {
      label: 'Contact Name',
      node: 'contactName',
    },
    {
      label: 'Contact Number',
      node: 'mobileNumber',
    },
    {
      label: 'Street',
      node: 'location.no_and_street',
    },
    {
      label: 'city',
      node: 'location.city',
    },
  ];
  let isRendered = useRef(false);
  const [sellerListData, setSellerListData] = useState<ISellerFlatten[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isRendered.current = true;
    getSellerData();
    return () => {
      isRendered.current = false;
    };
  }, []);

  const getSellerData = async () => {
    try {
      setIsLoading(true);
      const sellerDataResponse = await sellerAction.getAllSellers();
      if (sellerDataResponse.success && isRendered.current) {
        const sellerList: ISeller[] = sellerDataResponse.data;
        const flattenSellerList = sellerList.map((sellerItem) =>
          convertFlatten(sellerItem),
        );
        console.log(flattenSellerList);
        setSellerListData((flattenSellerList as unknown) as ISellerFlatten[]);
      } else {
        showToastByResponse(sellerDataResponse);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        <Text
          h4
          style={{fontWeight: 'bold', color: '#FC7E40', marginBottom: 8}}>
          View Sellers
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
            onPress={() => navigateByProp(props, ROUTE_NAMES.adminAddSellers)}
            title="Add Sellers"></Button>
        </View>

        <Loader visible={isLoading} />

        <ScrollView style={styles.dataWrapper}>
          <TableComponent
            headerData={headerData}
            valueData={sellerListData}
            showActions={false}
            widthData={[200, 300, 200, 200, 100, 200]}
            uniqueIdKeyName={'_id'}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
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
  dataWrapper: {marginTop: -1},
});
