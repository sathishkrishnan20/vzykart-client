import React, {
    Component
} from 'react';
import axios from 'axios';
import {
    IMAGE_UPLOAD_API_URL
} from '../../config';
import {
    ErrorToast,
    WarningToast
} from '../Toast';
import {
    ImageViewer
} from './image-viewer';
/* Props 
    type: would define the Upload fileType Name,
    images: {
        destinationPath: string
        optimizedDestinationPath: string
    }[]
*/
class FileUpload extends Component {

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files,
        })
        const files = event.target.files;
        const maximumImages = this.props.multi === false ? 1 : 3; 
        if (files.length > maximumImages) {
            const msg = 'Only' + maximumImages + 'images can be uploaded at a time'
            event.target.value = null // discard selected file
            WarningToast({
                title: 'Maximum Files',
                message: msg
            });
            return false;
        }
        const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']

        let size = 1200000; // 15MegaByte 
        for (let x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                ErrorToast({
                    title: 'File Too Large',
                    message: files[x].size + ' is too large, please pick a smaller file\n'
                });
                event.target.value = null;
                return false;
            }
            if (types.every(type => files[x].type !== type)) {
                ErrorToast({
                    title: 'Unsupported File Type',
                    message: files[x].type + ' is not a supported format\n'
                });
                event.target.value = null;
                return false;
            }
        }
        this.onClickHandler(event.target.files)
    }
    onClickHandler = (files) => {
        const {
            type, images
        } = this.props;
        const data = new FormData()
        for (var x = 0; x < files.length; x++) {
            data.append(type, files[x])
        }

        axios.put(IMAGE_UPLOAD_API_URL, data, {})
            .then(res => { // then print response status
                if (res.data.success) {
                    const updatedImages = [...res.data.data, ...images, ]
                    this.props.onResult(updatedImages);
                }
            })
    }
    render() {
        const {
            images,
            onDeleteImage,
            disabled = false
        } = this.props;
        return (<>
            {
                disabled ?  null:
                <input type = "file" className= "form-control" multiple onChange={this.onChangeHandler}/> 
              }
           
             <ImageViewer 
                disabled={disabled}
                onDeleteImage={onDeleteImage}
                images={images}/> 
           
            </>
        )
    }
}
export default FileUpload;