import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {withBadge} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavLink, useHistory} from 'react-router-dom';
import ROUTE_NAMES from '../../routes/name';
import {IS_BIG_SCREEN} from '../../config';
import HeaderMenu from './material-header';
import {USER_TYPE} from '../../interfaces/enums';

export function Header({
  hasLoggedIn,
  title,
  menus,
  notificationCount,
  onLogout,
  cartLength,
  userType,
}: any) {
  const CartIcon: any = withBadge(cartLength)(Icon);
  const NotificationIcon: any = withBadge(notificationCount)(Icon);
  const history = useHistory();
  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#F02245', '#F68535']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text
              accessibilityRole="header"
              aria-level="3"
              style={styles.title}>
              {title}
            </Text>
          </View>

          <View style={styles.headerRight}>
            {IS_BIG_SCREEN
              ? menus.map(
                  (
                    menuItem: {title: string; navigationLink: string},
                    index: number,
                  ) => (
                    <NavLink
                      key={'' + index}
                      exact
                      activeClassName="active"
                      to={menuItem.navigationLink}
                      style={{textDecoration: 'none'}}>
                      <Text style={styles.navText}>{menuItem.title}</Text>
                    </NavLink>
                  ),
                )
              : null}

            {hasLoggedIn ? (
              <>
                <NavLink
                  exact
                  to={ROUTE_NAMES.userCart}
                  style={{textDecoration: 'none', marginLeft: 20}}>
                  <CartIcon
                    size={24}
                    status="success"
                    color={'#FFF'}
                    type="ionicon"
                    name="cart"
                  />
                </NavLink>
                <NavLink
                  exact
                  activeClassName="active"
                  to="/Notification"
                  style={{textDecoration: 'none', marginLeft: 20}}>
                  <NotificationIcon
                    size={24}
                    status="success"
                    color={'#FFF'}
                    type="ionicon"
                    name="notifications"
                  />
                </NavLink>
                <Icon
                  onPress={() => {
                    const dynamicParam =
                      String(userType) === USER_TYPE.SALES_USER
                        ? 'seller'
                        : 'user';
                    history.push(
                      ROUTE_NAMES.dynamicLogin.replace(
                        ':userType',
                        dynamicParam,
                      ),
                    );
                    onLogout();
                  }}
                  style={{marginLeft: 20}}
                  name="power-sharp"
                  color={'#FFF'}
                  size={24}
                />
                {IS_BIG_SCREEN === false ? <HeaderMenu menus={menus} /> : null}
              </>
            ) : (
              <>
                <NavLink
                  exact
                  activeClassName="active"
                  to={ROUTE_NAMES.register}
                  style={{textDecoration: 'none'}}>
                  <Text style={styles.navText}>Register</Text>
                </NavLink>
                <NavLink
                  exact
                  activeClassName="active"
                  to="/user/login"
                  style={{textDecoration: 'none'}}>
                  <Text style={[styles.navText, {marginRight: 40}]}>Login</Text>
                </NavLink>
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ff4e3f',
    backgroundColor: '#F68535',
  },
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 5,

    minHeight: 50,
  },
  headerCenter: {
    flex: 1,
  },
  headerLeft: {
    width: 150,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    fontStyle: 'italic',
    marginLeft: 20,
  },
  navText: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'OpenSans',
    fontWeight: '500',
    color: '#fff',
  },
});

export default Header;
