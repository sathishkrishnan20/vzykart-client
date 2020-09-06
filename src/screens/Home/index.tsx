import React, {useState, useEffect} from 'react';
import {Container} from '../../components';
import {useNavigation, navigate} from '../../navigation';
import {HeaderSearchBar} from './SearchBar';
import {Shops} from './Shops';
import {FlatList} from 'react-native';
import {getNoOfColumns} from '../../helpers/render-helpers';
import ShopService from '../../services/services';
import {IShop} from '../../interfaces/shop';
const shopService = new ShopService();
export function Home() {
  const [search, setSearch] = useState('');
  const [shopList, setShopList] = useState<IShop[]>();
  // @ts-ignore
  const navigation = useNavigation();
  useEffect(() => {}, [search]);

  useEffect(() => {
    const shopData = shopService.getShopList();
    setTimeout(() => setShopList(shopData), 3000);
  }, []);

  // const setSearchData = (searchText: string) => {
  //   console.log(searchText);
  //   setSearch(searchText);
  // };
  return (
    <Container>
      <HeaderSearchBar onChangeText={setSearch} value={search} />
      <FlatList
        data={shopList}
        horizontal={false}
        numColumns={getNoOfColumns()}
        renderItem={({item}) => (
          <Shops
            data={item}
            onClick={() => navigate(navigation, 'DetailsScreen')}
          />
        )}
      />
    </Container>
  );
}
