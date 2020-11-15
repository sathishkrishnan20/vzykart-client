import {USER_TYPE} from '../enums';

export interface IRegisterAPI {
  password: string;
  userName?: string;
  email?: string;
  mobileNumber?: number;
}

export interface ILoginAPI {
  password: string;
  userEntry: string;
}

export interface IGenAuthCodeAPI {
  userEntry: string;
}
export interface IForgotPasswordAPI {
  issuerId: string;
  otpCode: string;
  password: string;
}

export interface ChangePasswordAPI {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
