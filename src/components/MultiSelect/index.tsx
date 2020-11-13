import React from 'react';
import {IS_WEB, IS_ANDROID} from '../../config';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Select from 'react-select';
import {Text} from 'react-native-elements';
import {Item} from 'react-native-picker-select';
import {View} from 'react-native';
interface IMultiSelect {
  items: Item[];
  onSelectedItemsChange: (key: string, value: Item[]) => void;
  selectedItems: Item[];
  stateKey: string;
  label: string;
}
const MultiSelect = ({
  items,
  onSelectedItemsChange,
  selectedItems,
  stateKey,
  label = 'Select Items',
}: IMultiSelect) => {
  return (
    <>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'gray',
          fontSize: 16,
          marginLeft: 8,
          marginBottom: IS_ANDROID ? -4 : 4,
        }}>
        {label}
      </Text>
      {IS_WEB ? (
        <Select
          defaultValue={[items[2], items[3]]}
          isMulti
          value={selectedItems}
          name="colors"
          options={items}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedItems) =>
            onSelectedItemsChange(stateKey, selectedItems as Item[])
          }
        />
      ) : (
        <View>
          <SectionedMultiSelect
            items={items}
            IconRenderer={Icons as any}
            uniqueKey="value"
            displayKey={'label'}
            selectText={label}
            onSelectedItemsChange={(items: unknown[]) => {
              console.log(items);
              onSelectedItemsChange(stateKey, items as Item[]);
            }}
            selectedItems={selectedItems}
          />
        </View>
      )}
    </>
  );
};
export default MultiSelect;
