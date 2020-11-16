import React from 'react';
import {SearchBar} from 'react-native-elements';
export function HeaderSearchBar({search, setSearch, ...props}: any) {
  return (
    <SearchBar containerStyle={{}} placeholder="Type Here..." {...props} />
  );
}
