import React, {useState} from 'react';
import {Overlay, Text} from 'react-native-elements';
import {View, StyleSheet, Dimensions} from 'react-native';
// @ts-ignore
import Modal from 'modal-react-native-web';
import {IS_WEB, IS_BIG_SCREEN} from '../../config';
import {Button} from '../Button';
import colors from '../../colors';

interface ModalProp {
  title: string;
  subTitle: string;
  visible: boolean;
  buttons: {
    title: string;
    onPress: () => void;
    color?: string;
  }[];
  toggleModal: (value: boolean) => void;
}
export const ConfirmModal = ({visible, toggleModal, title, subTitle, buttons}: ModalProp) => {
  const toggleOverlay = () => {
    toggleModal(!visible);
  };

  const OverLayItems = () => {
    return (
      <View style={styles.viewContainer}>
        {IS_BIG_SCREEN ? (
          <Text style={styles.textTitle} h2>
            {title}
          </Text>
        ) : (
          <Text style={styles.textTitle} h4>
            {title}
          </Text>
        )}

        <Text style={styles.subTextTitle}>{subTitle}</Text>
        <View style={styles.buttonContainer}>
          {buttons.map((item) => (
            <Button titleStyle={{padding: 8}} onPress={item.onPress} buttonStyle={[styles.deleteButton, {backgroundColor: item.color || colors.themePrimary, borderColor: item.color || colors.themePrimary}]} title={item.title}></Button>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View>
      {IS_WEB ? (
        <Overlay ModalComponent={Modal} isVisible={visible} onBackdropPress={toggleOverlay}>
          <OverLayItems />
        </Overlay>
      ) : (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <OverLayItems />
        </Overlay>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    margin: 8,
    // IS_BIG_SCREEN ? 500 : Dimensions.get('window').width - 100,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subTextTitle: {
    fontWeight: '200',
    marginTop: 8,
    fontSize: IS_BIG_SCREEN ? 20 : 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: 10,
  },
});
