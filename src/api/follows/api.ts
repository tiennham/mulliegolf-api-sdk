import { ApiClient } from '../../http/client';
import { Pagination } from '../../type';
import { Follows, FollowsArgs } from './models';

export class FollowsApi {
  public constructor(public readonly client: ApiClient) {}

  public async getFollows(type?: string, q?: string, page = 1, limit = 20): Promise<Pagination<Follows>> {
    //type is followers to get list followers
    const params = { type: type, search: q, page, limit };
    const uri = `/follows/`;
    return this.client.get(uri, params);
  }

  public async createFollow(args: FollowsArgs): Promise<Follows> {
    return this.client.post<Follows, FollowsArgs>('/follows/', args);
  }

  public async checkFollow(args: FollowsArgs): Promise<Follows> {
    const uri = `/follows/detail/`;
    return this.client.get(uri, args);
  }

  public async unFollow(args: FollowsArgs): Promise<void> {
    const uri = `/follows/detail/`;
    return this.client.delete(uri, args);
  }

  public async removeFollow(args: FollowsArgs): Promise<void> {
    const uri = `/follows/delete/`;
    return this.client.post(uri, args);
  }

  public async getFollowsOtherProfile(user_id?:string, type?: string, q?: string, page = 1, limit = 20): Promise<Pagination<Follows>> {
    //type is followers to get list followers
    //type is following to get list following
    const params = { type: type, search: q, page, limit };
    const uri = `/follows/other/${user_id}/`;
    return this.client.get(uri, params);
  }
}
