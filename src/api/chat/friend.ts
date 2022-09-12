import { ApiClient } from '../../http/client';
import { Pagination } from '../../type';
import { User } from '../user/models';

export class FriendApi {
  public constructor(public readonly client: ApiClient) {}

  public async list(q?: string, page = 1, limit = 20): Promise<Pagination<User>> {
    const params = { search: q, page, limit };
    return this.client.get('/chat/friends/', params);
  }

  public async listOnline(page = 1, limit = 20): Promise<Pagination<User>> {
    const uri = `/chat/friends/online/`;
    const params = { page, limit };
    return this.client.get(uri, params);
  }
}
