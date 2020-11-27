export interface IDeliveryPersonCreateRequest {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}
export interface IDeliveryPerson extends IDeliveryPersonCreateRequest {}
