import { ApiClient } from '../../http/client';
import { Pagination } from '../../type';
import { IBannerContent } from './model';

export class BannerApi {
  public constructor(public readonly client: ApiClient) {}

  public async list(page = 1, limit = 20): Promise<Pagination<IBannerContent>> {
    const params = { page, limit };
    return this.client.get('/banners/', params);
  }
}
