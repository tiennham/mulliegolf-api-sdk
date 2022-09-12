import { ApiClient } from '../../http/client';
import {
  Notification,
  NotificationDevice,
  RegisterDeviceParam,
  MarkAsReadParams,
  MarkAsArchivedParams,
  MarkAsDisableParams,
  Badge
} from './models';

import { Pagination, YesNo } from '../../type';

export class NotificationApi {
  public constructor(public readonly client: ApiClient) {}

  public async registerDevice(params: RegisterDeviceParam): Promise<NotificationDevice> {
    const uri = '/notifications/fcm/devices/';
    return this.client.post<NotificationDevice, RegisterDeviceParam>(uri, params);
  }

  public async unregisterDevice(registrationId: string): Promise<void> {
    const uri = `/notifications/fcm/devices/${registrationId}/`;
    return this.client.delete(uri);
  }

  public async list(category?: string, page = 1, limit = 20): Promise<Pagination<Notification>> {
    const params = { category: category, page, limit };
    return this.client.get('/notifications/', params);
  }

  public async maskAsRead(ids: Array<string>): Promise<void> {
    const uri = `/notifications/read/`;
    const params: MarkAsReadParams = {
      all: YesNo.NO,
      ids: ids,
    };
    return this.client.post(uri, params);
  }

  public async maskAsReadAll(): Promise<void> {
    const uri = `/notifications/read/`;
    const params: MarkAsReadParams = {
      all: YesNo.YES,
      ids: [],
    };
    return this.client.post(uri, params);
  }

  public async maskAsArchived(ids: Array<string>): Promise<void> {
    const uri = `/notifications/archive/`;
    const params: MarkAsArchivedParams = {
      all: YesNo.NO,
      ids: ids,
      category: '',
    };
    return this.client.post(uri, params);
  }

  public async maskAsArchivedCategory(category: string): Promise<void> {
    const uri = `/notifications/archive/`;
    const params: MarkAsArchivedParams = {
      all: YesNo.YES,
      ids: [],
      category: category,
    };
    return this.client.post(uri, params);
  }

  public async maskAsArchivedAll(): Promise<void> {
    const uri = `/notifications/archive/`;
    const params: MarkAsArchivedParams = {
      all: YesNo.YES,
      ids: [],
      category: '',
    };
    return this.client.post(uri, params);
  }

  public async maskAsDisableAll(): Promise<void> {
    const uri = `/notifications/disable/`;
    const params: MarkAsDisableParams = {
      all: YesNo.YES,
      ids: [],
    };
    return this.client.post(uri, params);
  }

   public async maskAsDisable(ids: Array<string>): Promise<void> {
    const uri = `/notifications/disable/`;
    const params: MarkAsDisableParams = {
      all: YesNo.NO,
      ids: ids,
    };
    return this.client.post(uri, params);
  }

  public async getBadge(): Promise<Badge> {
    const uri = `/notifications/badge/`;
    return this.client.get(uri);
  }
}
