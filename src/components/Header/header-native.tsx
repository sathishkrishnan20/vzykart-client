import React from 'react';
import {View} from 'react-native';
import ROUTE_NAMES from '../../routes/name';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../colors';
import {useSelector} from 'react-redux';
import {withBadge} from 'react-native-elements';
export function HeaderRight({navigation, logout}: any) {
  const storeSelector = useSelector((state) => state);
  // @ts-ignore
  const CartIcon: any = withBadge(storeSelector.cart.cartItems.length, {
    badgeStyle: {
      backgroundColor: colors.cartBadgeColor,
    },
  })(Icon);
  return (
    <View
      style={{
        marginRight: 10,
        flexDirection: 'row',
      }}>
      <View style={{marginLeft: 4, marginRight: 4}}>
        <CartIcon onPress={() => navigation.navigate(ROUTE_NAMES.userCart)} style={{marginRight: 5, marginTop: 10}} size={24} status="success" color={'#FFF'} name="cart" />
      </View>
      {/* <View style={{marginLeft: 4, marginRight: 4}}>
                    <NotificationIcon
                      style={{marginRight: 5, marginTop: 10}}
                      size={24}
                      status="success"
                      color={'#FFF'}
                      name="notifications"
                    />
                  </View> */}
      <View style={{marginLeft: 4, marginRight: 4}}>
        <Icon onPress={() => logout()} style={{marginRight: 5, marginTop: 10}} name="power-sharp" color={'#FFF'} size={24} />
      </View>
    </View>
  );
}
