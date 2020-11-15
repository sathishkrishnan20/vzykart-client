import {USER_TYPE} from '../enums';

export interface IRegisterAPI {
  type: USER_TYPE;
  password: string;
  userName?: string;
  email?: string;
  mobileNumber?: number;
}

export interface ILoginAPI {
  type: USER_TYPE;
  password: string;
  userEntry: string;
}

export interface IGenAuthCodeAPI {
  type: USER_TYPE;
  userEntry: string;
}
export interface IForgotPasswordAPI {
  type: USER_TYPE;
  issuerId: string;
  otpCode: string;
  password: string;
}

export interface ChangePasswordAPI {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
