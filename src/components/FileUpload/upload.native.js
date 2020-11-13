import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList
} from 'react-native';
import {
  Icon,
  Text,
  Button,
  Overlay,
  Image,
  
} from 'react-native-elements';
import { Col, Row } from 'react-native-easy-grid'
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {
  SERVER_URL,
  IS_IOS
} from '../../config';
import { uploadMultiPart } from '../../services/http-service';
const screenWidth = Dimensions.get('screen').width;
const overLayWidth = screenWidth * 0.80;
const PICKER_TYPES = {
  CAMERA: 'CAMERA',
  LIBRARY: 'LIBRARY'
}
class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openOptionModal: false,
      images: []
    }
  }
  setOptionModalState() {
    this.setState({ openOptionModal: !this.state.openOptionModal })
  }

  openPicker(pickerType) {
     this.setState({ openOptionModal: false })
    if (pickerType === PICKER_TYPES.CAMERA) {
          ImagePicker.openCamera({
                cropping: true,
                width: 500,
                height: 500,
                multiple: false,
                compressImageMaxWidth: 640,
                compressImageMaxHeight: 480,
                freeStyleCropEnabled: true,
            }).then(images => {
                this.uploadImageToServer(images);
            }).catch(ex => {
                console.log(ex);
          });
    } else if(pickerType === PICKER_TYPES.LIBRARY) {
            ImagePicker.openPicker({
                multiple: true,
                width: 300,
                height: 400,
                cropping: true,
                freeStyleCropEnabled: true,
                avoidEmptySpaceAroundImage: true,
            }).then(images => {
                this.uploadImageToServer(images);
            }).catch(ex => {
                console.log(ex);
            });
    }
  }

  async uploadImageToServer(imageData) {
     const {
       type
     } = this.props;
     const { images } = this.state;
      const formData = new FormData();
      for (let index = 0; index < imageData.length; index++) {
        const image = imageData[index];
         formData.append(type, {
           uri: IS_IOS ? 'file//' + image.path : image.path,
           type: image.mime,
           name: String(image.path.split('/').pop()).toLowerCase()
         });
      }
       var res = await uploadMultiPart('/image/upload', formData);
       const response = res.data;
       console.log(response);
       const updatedImages = [...response.data, ...images, ]
      this.setState({
        images: updatedImages
      })
      
  }





  render() {
    const { openOptionModal, images }  = this.state;
    
    return (
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button
          onPress={() => this.setOptionModalState()}
          icon = {{
            name: "cloud-upload",
            size: 15,
            color: "white"
          }}
          title = "Image Upload"/>
          
          <FlatList
            numColumns={3}
            data={images}
            renderItem={({item}) => (
             <Image
                  source={{ uri: SERVER_URL + item.optimizedDestinationPath }}
                  style={{ width: 200, height: 200 }}
                  PlaceholderContent={<ActivityIndicator />}
                />
          )}/>
         {
           /*<View style={{ flexDirection : 'row', flexWrap: "wrap"}}> 
          { images.map(item => {
           return (
            <Image
              source={{ uri: SERVER_URL + item.optimizedDestinationPath }}
              style={{ width: 200, height: 200 }}
              PlaceholderContent={<ActivityIndicator />}
          />
           )
         }) } 
         < /View>*/
         }
        
        
          <Overlay isVisible={openOptionModal} onBackdropPress={() => this.setOptionModalState()}>
            <View style={{ width: overLayWidth }}>
              <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                  <Text style={{ marginRight: 'auto', fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>{'Select Option'}</Text>
                  <Icon style={{marginLeft: 'auto'}} name='close' type='font-awesome' color='gray' onPress={() => this.setOptionModalState()} />
              </View>
              
              <TouchableOpacity onPress={() => this.openPicker(PICKER_TYPES.CAMERA)} testID='chooseCemara'>
                  <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 10 }}>Take photo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.openPicker(PICKER_TYPES.LIBRARY)} testID='chooselibrary'>
                  <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 10 }}>Choose from library</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
      </View>
    );
  }
}

export default FileUpload;
