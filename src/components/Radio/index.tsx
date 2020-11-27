import React from 'react';
import {ButtonGroup, CheckBox} from 'react-native-elements';

interface RadioProps {
  buttons: string[];
  selectedItem: string;
  onPress: (selectedItem: string) => void;
  containerWidth?: number;
}

export function Radio({
  buttons,
  selectedItem,
  onPress,
  containerWidth,
}: RadioProps) {
  function component1(this: any) {
    return (
      <CheckBox
        containerStyle={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent',
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
        borderWidth: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
      buttonStyle={{
        borderColor: 'transparent',
        borderWidth: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
      onPress={(index: number) => onPress(buttons[index])}
      selectedIndex={buttons.indexOf(selectedItem)}
      buttons={buttonsComp}
      containerStyle={[
        {
          borderColor: 'transparent',
          borderWidth: 0,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        },
        containerWidth ? {width: containerWidth} : {},
      ]}
      selectedButtonStyle={{backgroundColor: 'transparent'}}
      innerBorderStyle={{color: 'transparent', width: 0}}
    />
  );
}
