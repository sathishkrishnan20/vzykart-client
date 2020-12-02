import axios from 'axios';
import {API_URL} from '../config';

export const postService = async (endPoint: string, data: any) => {
  let fullPath = API_URL + endPoint;
  let resp = await axios.post(fullPath, data);
  return resp;
};

export const getService = async (endPoint: string) => {
  let fullPath = API_URL + endPoint;
  let resp = await axios.get(fullPath);
  return resp;
};
export const putService = async (endPoint: string, data: any) => {
  let fullPath = API_URL + endPoint;
  let resp = await axios.put(fullPath, data);
  return resp;
};
export const deleteService = async (endPoint: string, data: any = {}) => {
  let fullPath = API_URL + endPoint;
  let resp = await axios.delete(fullPath, data);
  return resp;
};
export const uploadMultiPart = async (endPoint: string, formData: any) => {
  try {
    var req = {
      method: 'PUT',
      url: API_URL + endPoint,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
        accept: 'application/json',
      },
    };
    console.log(req);
    // @ts-ignore
    const response = await axios(req);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
