import React, {useState, useEffect} from 'react';
import {Container} from '../../components';
import {useNavigation, navigate} from '../../navigation';
import {HeaderSearchBar} from './SearchBar';
import {Seller} from './sellers';
import {FlatList} from 'react-native-gesture-handler';
import {getNoOfColumns, keyExtractor} from '../../helpers/render-helpers';
import SellerService from '../../services/services';
import {ISeller} from '../../interfaces/seller';
const sellerService = new SellerService();
export function Home() {
  const [search, setSearch] = useState('');
  const [sellerList, setSellerList] = useState<ISeller[]>();
  // @ts-ignore
  const navigation = useNavigation();
  useEffect(() => {}, [search]);

  useEffect(() => {
    const sellerData = sellerService.getSellerList();
    setTimeout(() => setSellerList(sellerData), 3000);
  }, []);

  // const setSearchData = (searchText: string) => {
  //   console.log(searchText);
  //   setSearch(searchText);
  // };
  return (
    <Container>
      <HeaderSearchBar onChangeText={setSearch} value={search} />
      {sellerList?.length === 0 ? null : (
        <FlatList
          data={sellerList}
          horizontal={false}
          numColumns={getNoOfColumns()}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <Seller
              data={item}
              onClick={() => navigate(navigation, 'ProductList')}
            />
          )}
        />
      )}
    </Container>
  );
}
