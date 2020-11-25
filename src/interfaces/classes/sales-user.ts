export interface ISalesUserCreateRequest {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  sellerId: string;
}
export interface ISalesUser extends ISalesUserCreateRequest {}
