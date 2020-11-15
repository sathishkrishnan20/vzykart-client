import {USER_TYPE} from '../enums';
export interface LoginState {
  userEntry: string;
  password: string;
  userType: USER_TYPE;
  isLoading: boolean;
  showPassword: boolean;
  enableForgotPassword: boolean;
  otpCode: string;
  userId: string;
}

export interface SignUpState {
  email: string;
  mobileNumber: string;
  password: string;
  userType: USER_TYPE;
  isLoading: boolean;
  useEmail: boolean;
}
