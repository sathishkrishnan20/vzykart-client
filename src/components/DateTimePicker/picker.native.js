import React from 'react';
import {IS_WEB} from '../../config';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import RNDateTimePicker, {Event} from '@react-native-community/datetimepicker';
// import ReactDatePicker from 'react-datepicker';


const DateTimePicker = ({
  date,
  changeState,
  showDatePicker,
  stateKey,
  showDatePickerStateKey,
  disabled = false
}) => {
  console.log('showDatePicker on Date Pic', showDatePicker);
  return (
    <View>
      <View>
        <TouchableOpacity
          disabled={disabled}
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginLeft: 8,
            marginRight: 8,
          }}
          onPress={() => changeState(showDatePickerStateKey, true)}>
          <Text
            style={{
              fontWeight: '200',
              color: 'gray',
              fontSize: 14,
              marginTop: 8,
              marginBottom: 6,
            }}>
            {date.toISOString() || 'Show time picker'}
          </Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <RNDateTimePicker
          
          testID="dateTimePicker"
          value={date}
          mode={'datetime'}
          display="default"
          onChange={(event, date) => {
            console.log(event);
            changeState(showDatePickerStateKey, false);
            changeState(stateKey, date || new Date());
          }}
        />
      )}
    </View>
  );
};
export default DateTimePicker;
