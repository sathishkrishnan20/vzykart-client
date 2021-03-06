import React from 'react';
import {View} from 'react-native';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './picker-web-style.css'

const DateTimePicker = ({
  date,
  changeState,
  showDatePicker,
  stateKey,
  showDatePickerStateKey,
  label = 'Select Date',
  disabled = false
}) => {
  console.log('showDatePicker on Date Pic', showDatePicker);
  return (
    <View style={{ margin: 8 }}>
      <ReactDatePicker
        disabled={disabled}
        selected={date}
        onChange={(date) => changeState(stateKey, date)}
        className="red-border"
        calendarContainer = { ({ children }) => (
        <div style={{  color: "#000" }}>
        <CalendarContainer>
          <div style={{ background: "#f0f0f0" }}>
            { label} 
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>)
        
        }
      />
    </View>
  );
};

export default DateTimePicker;
