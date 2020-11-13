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
/* Props 
    type: would define the Upload fileType Name
*/
class FileUpload extends Component {
    constructor(props) {
        super(props);
    }
    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files,
        })
        const files = event.target.files;
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            event.target.value = null // discard selected file
            WarningToast({
                title: 'Maximum Files',
                message: msg
            });
            return false;
        }
        const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']

        let size = 120000; // 15MegaByte 
        for (var x = 0; x < files.length; x++) {
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
            type
        } = this.props;
        const data = new FormData()
        for (var x = 0; x < files.length; x++) {
            data.append(type, files[x])
        }

        axios.put(IMAGE_UPLOAD_API_URL, data, {})
            .then(res => { // then print response status
                this.props.onResult(res.data);
            })
    }
    render() {
        return ( < input type = "file"
            class = "form-control"
            multiple onChange = {
                this.onChangeHandler
            }
            />
        )
    }
}
export default FileUpload;