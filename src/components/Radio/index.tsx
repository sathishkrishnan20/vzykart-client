import React from 'react';
import {ButtonGroup, CheckBox} from 'react-native-elements';
import { Row, Col, Grid } from 'react-native-easy-grid'
interface RadioProps {
  buttons: string[];
  selectedItem: string;
  onPress: (selectedItem: string) => void;
  containerCustomStyle?: any;
}

export function Radio({
  buttons,
  selectedItem,
  onPress,
  containerCustomStyle = {},
}: RadioProps) {
  function component1(this: any) {
    return (
      
      <CheckBox
        containerStyle={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent',
          marginLeft: 0,
        }}
        title={this.item}
        onPress={() => onPress(this.item)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={selectedItem === this.item}></CheckBox>
    );
  }

  const buttonsComp = buttons.map((item, index) => {
    return {
      element: component1.bind({item, index}),
    };
  });

  return (
   
    <ButtonGroup
      containerBorderRadius={0}
      buttonContainerStyle={{
        borderColor: 'transparent',
      }}
      buttonStyle={{
        borderColor: 'transparent',
        borderWidth: 0,
      }}
      onPress={(index: number) => onPress(buttons[index])}
      selectedIndex={buttons.indexOf(selectedItem)}
      buttons={buttonsComp}
      containerStyle={[
        {
          borderColor: 'transparent',
          borderWidth: 0,
        },
        containerCustomStyle,
      ]}
      selectedButtonStyle={{backgroundColor: 'transparent'}}
      innerBorderStyle={{color: 'transparent', width: 0}}
    />
   
  );
}
