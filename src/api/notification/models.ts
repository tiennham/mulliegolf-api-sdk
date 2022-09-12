import { User } from '../user/models';
import { YesNo, PlatForm } from '../../type';
import { Params } from '../../http/client';

export interface NotificationCategory {
  id: string;
  name: string;
}

export interface Notification {
  id: string;
  verb: string;
  title: string;
  content: string;
  content_v2: string;
  created: string;
  read: string;
  actor?: User;
  category?: NotificationCategory;
}

export interface NotificationDevice {
  id: number;
  name?: string;
  registration_id: string;
  device_id: string;
  type?: PlatForm;
  date_created?: Date | string;
}

export interface Badge {
  badge: number;
  number_messages: number;
}

export interface MarkAsReadParams extends Params {
  all: YesNo; // either all or ids is required
  ids: Array<string>;
}

export interface MarkAsDisableParams extends Params {
  all: YesNo; // either all or ids is required
  ids: Array<string>;
}

export type MarkAsArchivedParams = MarkAsReadParams;

export interface RegisterDeviceParam extends Params {
  name?: string;
  registration_id: string;
  device_id?: string;
  type?: PlatForm;
}
