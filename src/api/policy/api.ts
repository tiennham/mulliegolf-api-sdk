import { ApiClient } from '../../http/client';
import { Policy } from './models';
import { Pagination } from '../../type';

export class PolicyApi {
  public constructor(public readonly client: ApiClient) {}

  public async getPolicy(q?: string, page = 1, limit = 20): Promise<Pagination<Policy>> {
    //  type search must be 'FAQS', 'CONTACT', 'TERM', 'PRIVACY', 'OTHER',
    const params = { search: q, page, limit };
    const uri = `/policy/`;
    return this.client.get(uri, params);
  }
}
