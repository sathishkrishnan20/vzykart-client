import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {SectionTitle} from '../../../components/Section-Title';
import colors from '../../../colors';
import {ICategory} from '../../../interfaces/master';
import {keyExtractor} from '../../../helpers/render-helpers';
import {Text, Avatar} from 'react-native-elements';
import {IS_BIG_SCREEN} from '../../../config';
import MasterAction from '../../../actions/master';
import {getImageLink} from '../../../helpers';
import {useNavigation, navigate} from '../../../navigation';
import ROUTE_NAMES from '../../../routes/name';

export function Categories() {
  const [categories, setCategories] = useState([] as ICategory[]);
  const masterAction = new MasterAction();
  // @ts-ignore
  const navigation = useNavigation();

  useEffect(() => {
    getAllCategoryList();
  }, []);
  const getAllCategoryList = async () => {
    const categoryData = await masterAction.getCategories();
    if (categoryData.success) {
      setCategories(categoryData.data);
    }
  };

  return (
    <View>
      <SectionTitle
        backgroundStyle={{backgroundColor: colors.white}}
        textStyle={{color: colors.black}}
        title={'Shop by Category'}
      />
      <View style={{margin: 20}}>
        <FlatList
          horizontal={true}
          data={categories}
          renderItem={({item, index}) => (
            <View key={'' + index}>
              <Avatar
                onPress={() =>
                  navigate(
                    navigation,
                    ROUTE_NAMES.productListFilters.replace(
                      ':filters',
                      JSON.stringify({filterParams: {categories: item._id}}),
                    ),
                    {filterParams: {categories: item._id}},
                  )
                }
                size={IS_BIG_SCREEN ? 150 : 100}
                rounded
                source={{
                  uri: getImageLink(
                    item.categoryImage.optimizedDestinationPath,
                  ),
                }}
                containerStyle={{flex: 2, marginLeft: 20}}
              />
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 20,
                  fontSize: IS_BIG_SCREEN ? 18 : 14,
                  color: colors.gray,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                {item.category}
              </Text>
            </View>
          )}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
}
