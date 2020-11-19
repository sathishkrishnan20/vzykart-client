import {getService, putService} from '../services/http-service';
import {IResponse} from '../interfaces/request-response';
import {IUserInfo} from '../interfaces';
class UserAction {
  async getUserByUserId(userId: string): Promise<IResponse> {
    const result = await getService('/users/' + userId).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
  async updateUserByUserId(
    userId: string,
    data: IUserInfo,
  ): Promise<IResponse> {
    const result = await putService('/users/' + userId, data).catch(
      (ex) => ex.response,
    );
    return result.data;
  }
}
export default UserAction;
