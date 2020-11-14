import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavLink} from 'react-router-dom';

const Header = ({title, menus, notificationCount}: any) => {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#F02245', '#F68535']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {/* <Text aria-level = '2' >MatrimonyIn</Text> */}
          </View>
          <View style={styles.headerCenter}>
            <Text
              accessibilityRole="header"
              aria-level="3"
              style={styles.title}>
              {title}
            </Text>
          </View>
          <View style={styles.headerRight}>
            {menus.map(
              (
                menuItem: {title: string; navigationLink: string},
                index: number,
              ) => (
                <NavLink
                  key={'' + index}
                  exact
                  activeClassName="active"
                  to="/Home"
                  style={{textDecoration: 'none'}}>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      fontFamily: 'OpenSans',
                      fontWeight: '500',
                      color: '#fff',
                    }}>
                    {menuItem.title}
                  </Text>
                </NavLink>
              ),
            )}

            {isAuthenticated ? null : (
              <NavLink
                exact
                activeClassName="active"
                to="/signup"
                style={{textDecoration: 'none'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'OpenSans',
                    fontWeight: '500',
                    color: '#fff',
                    marginLeft: 150,
                  }}>
                  Register
                </Text>
              </NavLink>
            )}

            {isAuthenticated ? (
              <NavLink
                exact
                activeClassName="active"
                to="/logout"
                style={{textDecoration: 'none'}}>
                {/* <TouchableOpacity onPress={localStorage.clear()}> */}
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'OpenSans',
                    fontWeight: '500',
                    color: '#fff',
                    marginLeft: 20,
                  }}>
                  Logout
                </Text>
                {/* </TouchableOpacity> */}
              </NavLink>
            ) : (
              <NavLink
                exact
                activeClassName="active"
                to="/login"
                style={{textDecoration: 'none'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'OpenSans',
                    fontWeight: '500',
                    color: '#fff',
                    marginLeft: 20,
                  }}>
                  Login
                </Text>
              </NavLink>
            )}
            <NavLink
              exact
              activeClassName="active"
              to="/Notification"
              style={{textDecoration: 'none'}}>
              <MaterialIcons
                style={{fontSize: 25, color: '#fff', marginLeft: 50}}
                name="notifications"
              />
              <Text
                style={{
                  position: 'absolute',
                  fontSize: 16,
                  fontFamily: 'OpenSans',
                  fontWeight: '500',
                  color: '#fff',
                  marginTop: -4,
                  marginLeft: -4,
                }}>
                {notificationCount}
              </Text>
            </NavLink>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
    // </div>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ff4e3f',
    backgroundColor: '#F68535',
  },
  header: {
    height: 70,
    padding: 10,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 50,
  },
  headerCenter: {
    flex: 1,
  },
  headerLeft: {
    width: 150,
  },
  headerRight: {
    width: 700,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    fontStyle: 'italic',
  },
});

export default Header;
