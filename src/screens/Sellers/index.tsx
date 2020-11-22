import React, {useState, useEffect, useRef} from 'react';
import {Container} from '../../components';
import {useNavigation, navigate} from '../../navigation';
import {HeaderSearchBar} from './SearchBar';
import {Seller} from './sellers';
import {FlatList} from 'react-native-gesture-handler';
import {getNoOfColumns, keyExtractor} from '../../helpers/render-helpers';
import SellerAction from '../../actions/seller';
import {ISeller} from '../../interfaces/classes/seller';
import {showToastByResponse} from '../../components/Toast';
import ROUTE_NAMES from '../../routes/name';
const sellerAction = new SellerAction();
export function SellersList() {
  let isRendered = useRef(false);
  const [search, setSearch] = useState('');
  const [sellerListData, setSellerListData] = useState<ISeller[]>();
  // @ts-ignore
  const navigation = useNavigation();
  useEffect(() => {}, [search]);

  useEffect(() => {
    isRendered.current = true;
    getSellerData();
    return () => {
      isRendered.current = false;
    };
  }, []);

  const getSellerData = async () => {
    const sellerDataResponse = await sellerAction.getAllSellers();
    if (sellerDataResponse.success && isRendered.current) {
      setSellerListData(sellerDataResponse.data);
    } else {
      showToastByResponse(sellerDataResponse);
    }
  };

  return (
    <Container>
      <HeaderSearchBar onChangeText={setSearch} value={search} />
      {sellerListData?.length === 0 ? null : (
        <FlatList
          data={sellerListData}
          horizontal={false}
          numColumns={getNoOfColumns()}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <Seller
              data={item}
              onClick={() =>
                navigate(
                  navigation,
                  ROUTE_NAMES.productListBySellerId.replace(
                    ':sellerId',
                    item._id,
                  ),
                  {sellerId: item._id},
                )
              }
            />
          )}
        />
      )}
    </Container>
  );
}
