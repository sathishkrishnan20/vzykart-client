import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import ZoomImageViewer from 'react-native-image-zoom-viewer';
import {BackHandler, Modal} from 'react-native';

import {SERVER_URL} from '../../config';
import {keyExtractor} from '../../helpers/render-helpers';
import {IProductImage} from '../../interfaces/products';
import {getImageLink} from '../../helpers';
interface IImageViewer {
  images: IProductImage[];
  onDeleteImage: (images: IProductImage[]) => void;
  disabled: boolean;
}
export const ImageViewer = ({
  images,
  onDeleteImage,
  disabled = false,
}: IImageViewer) => {
  const deleteImage = (imageIndex: number) => {
    images[imageIndex].active = false;
    onDeleteImage(images);
  };
  return (
    <View>
      <FlatList
        numColumns={3}
        data={images.filter((item) => item.active !== false)}
        renderItem={({item, index}) => (
          <View style={{margin: 5}}>
            <View
              style={{
                alignItems: 'flex-end',
                flexDirection: 'row',
              }}>
              <Image
                // onPress={() => <ZoomView images={images} />}
                source={{uri: getImageLink(item.optimizedDestinationPath)}}
                style={{width: 200, height: 200}}
                PlaceholderContent={<ActivityIndicator />}>
                {disabled ? null : (
                  <Icon
                    disabled={disabled}
                    style={{
                      marginLeft: 'auto',
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 25,
                      height: 25,
                      backgroundColor: '#fff',
                      borderRadius: 50,
                    }}
                    name="close"
                    type="font-awesome"
                    color="gray"
                    onPress={() => deleteImage(index)}
                  />
                )}
              </Image>
            </View>
          </View>
        )}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export function ZoomView({images}: IImageViewer) {
  const [isModalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    if (isModalVisible) {
      setModalVisible(false);
    }
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', closeModal as any);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', closeModal as any);
  }, []);

  // Here is how I call the modal in the jsx
  return (
    <Modal
      transparent
      onRequestClose={() => {
        closeModal();
        // this.props.navigation.pop()
      }}
      visible={isModalVisible}>
      <ZoomImageViewer
        enableSwipeDown
        imageUrls={images.map((item) => {
          return {url: item.optimizedDestinationPath};
        })}
        onSwipeDown={closeModal}
        saveToLocalByLongPress={false}
      />
    </Modal>
  );
}
