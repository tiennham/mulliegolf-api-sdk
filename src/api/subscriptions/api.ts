import { ApiClient } from '../../http/client';
import { Pagination } from '../../type';
import { SuccessMessage, Package, SubscriptionArgs, SubscriptionInfo, SubscriptionSetting } from './model';

export class SubscriptionApi {
  public constructor(public readonly client: ApiClient) {}

  public async listSubscriptionPackage(): Promise<Pagination<Package>> {
    const uri = '/subscriptions/';
    return this.client.get(uri);
  }

  public async subscript(args: SubscriptionArgs): Promise<SuccessMessage> {
    const uri = '/subscriptions/';
    return this.client.post<SuccessMessage, SubscriptionArgs>(uri, args, {}, true);
  }

  public async validateReceipt(args: SubscriptionArgs): Promise<SuccessMessage> {
    const uri = '/subscriptions/validate-receipt/';
    return this.client.post<SuccessMessage, SubscriptionArgs>(uri, args, {}, true);
  }

  public async currentSubcription(): Promise<SubscriptionInfo> {
    const uri = '/subscriptions/me/';
    return this.client.get(uri);
  }

  public async getSubscriptionSetting(): Promise<SubscriptionSetting> {
    const uri = '/subscriptions/settings/';
    return this.client.get(uri);
  }
}
