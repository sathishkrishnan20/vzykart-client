import React from 'react';
import {IS_WEB, IS_ANDROID} from '../../config';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Select from 'react-select';
import {Text} from 'react-native-elements';
import {Item} from 'react-native-picker-select';
import {View} from 'react-native';
import {Row} from 'react-native-easy-grid';

interface IMultiSelect {
  items: Item[];
  onSelectedItemsChange: (value: Item[] | string[]) => void;
  selectedItems: Item[] | string[];
  stateKey?: string;
  label: string;
  disabled?: boolean;
  singleSelect?: boolean;
  disableLabelOnWeb?: boolean;
}
const MultiSelect = ({
  items,
  onSelectedItemsChange,
  selectedItems,
  label = 'Select Items',
  disabled = false,
  singleSelect = false,
  disableLabelOnWeb,
}: IMultiSelect) => {
  return (
    <>
      {disableLabelOnWeb ? null : (
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
      )}
      {IS_WEB ? (
        <Select
          isDisabled={disabled}
          styles={{
            menuPortal: (base) => ({...base, zIndex: 9999}),
            menu: (provided) => ({...provided, zIndex: 999}),
            container: (provided) => ({...provided, width: '100%'}),
          }}
          onFocus={(e) => e.preventDefault()}
          menuPortalTarget={document.querySelector('body')}
          defaultValue={[items[0]]}
          isMulti={!singleSelect}
          value={selectedItems as Item[]}
          name="colors"
          options={items}
          className="basic-multi-select"
          classNamePrefix="Select"
          onChange={(selectedItems) =>
            onSelectedItemsChange(
              singleSelect
                ? ([selectedItems] as Item[])
                : (selectedItems as Item[]),
            )
          }
        />
      ) : (
        <View>
          <SectionedMultiSelect
            disabled={disabled}
            items={items}
            single={singleSelect}
            IconRenderer={Icons as any}
            uniqueKey="value"
            displayKey={'label'}
            selectText={label}
            onSelectedItemsChange={(items) => {
              onSelectedItemsChange((items as unknown[]) as string[]);
            }}
            selectedItems={selectedItems}
          />
        </View>
      )}
    </>
  );
};
export default MultiSelect;
