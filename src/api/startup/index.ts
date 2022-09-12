import { ApiClient } from '../../http/client';
import { StartupApiResponse } from './models';

export class StartupApi {
  public constructor(public readonly client: ApiClient) {}
  public async get(platform?: string): Promise<StartupApiResponse> {
    const uri = `/startup/`;
    return this.client.get(uri, {platform: platform}, false);
  }
}
