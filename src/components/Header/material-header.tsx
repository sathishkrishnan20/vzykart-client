import React from 'react';
import {View} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useHistory} from 'react-router-dom';
interface ThreeDotMenuState {
  menus: {
    title: string;
    navigationLink: string;
  }[];
}
function HeaderMenu({menus}: ThreeDotMenuState) {
  const history = useHistory();
  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Icon
            style={{marginLeft: 20}}
            name="dots-vertical"
            color={'#FFF'}
            size={24}
          />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{margin: 8}}>
          {menus.map((item) => (
            <MenuOption
              customStyles={{
                optionWrapper: {
                  margin: 4,
                },
                optionText: {
                  fontFamily: 'Helvetica-Light',
                },
              }}
              onSelect={() => {
                history.push(item.navigationLink);
              }}
              text={item.title}
            />
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );
}
export default HeaderMenu;
